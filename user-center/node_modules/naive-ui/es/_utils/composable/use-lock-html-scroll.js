import { onBeforeUnmount, onMounted, watch, ref } from 'vue';
let lockCount = 0;
let originalMarginRight = '';
let originalOverflow = '';
let originalOverflowX = '';
let originalOverflowY = '';
export const lockHtmlScrollRightCompensationRef = ref('0px');
export function useLockHtmlScroll(lockRef) {
    // not browser
    if (typeof document === 'undefined')
        return;
    const el = document.documentElement;
    let watchStopHandle;
    onMounted(() => {
        watchStopHandle = watch(lockRef, (value) => {
            if (value) {
                if (!lockCount) {
                    const scrollbarWidth = window.innerWidth - el.offsetWidth;
                    if (scrollbarWidth > 0) {
                        originalMarginRight = el.style.marginRight;
                        el.style.marginRight = `${scrollbarWidth}px`;
                        lockHtmlScrollRightCompensationRef.value = `${scrollbarWidth}px`;
                    }
                    originalOverflow = el.style.overflow;
                    originalOverflowX = el.style.overflowX;
                    originalOverflowY = el.style.overflowY;
                    el.style.overflow = 'hidden';
                    el.style.overflowX = 'hidden';
                    el.style.overflowY = 'hidden';
                }
                lockCount++;
            }
            else {
                lockCount--;
                if (!lockCount) {
                    el.style.marginRight = originalMarginRight;
                    el.style.overflow = originalOverflow;
                    el.style.overflowX = originalOverflowX;
                    el.style.overflowY = originalOverflowY;
                    lockHtmlScrollRightCompensationRef.value = '0px';
                }
            }
        }, {
            immediate: true
        });
    });
    onBeforeUnmount(() => {
        watchStopHandle === null || watchStopHandle === void 0 ? void 0 : watchStopHandle();
    });
}
