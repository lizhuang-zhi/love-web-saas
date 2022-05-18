"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLockHtmlScroll = exports.lockHtmlScrollRightCompensationRef = void 0;
const vue_1 = require("vue");
let lockCount = 0;
let originalMarginRight = '';
let originalOverflow = '';
let originalOverflowX = '';
let originalOverflowY = '';
exports.lockHtmlScrollRightCompensationRef = (0, vue_1.ref)('0px');
function useLockHtmlScroll(lockRef) {
    // not browser
    if (typeof document === 'undefined')
        return;
    const el = document.documentElement;
    let watchStopHandle;
    (0, vue_1.onMounted)(() => {
        watchStopHandle = (0, vue_1.watch)(lockRef, (value) => {
            if (value) {
                if (!lockCount) {
                    const scrollbarWidth = window.innerWidth - el.offsetWidth;
                    if (scrollbarWidth > 0) {
                        originalMarginRight = el.style.marginRight;
                        el.style.marginRight = `${scrollbarWidth}px`;
                        exports.lockHtmlScrollRightCompensationRef.value = `${scrollbarWidth}px`;
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
                    exports.lockHtmlScrollRightCompensationRef.value = '0px';
                }
            }
        }, {
            immediate: true
        });
    });
    (0, vue_1.onBeforeUnmount)(() => {
        watchStopHandle === null || watchStopHandle === void 0 ? void 0 : watchStopHandle();
    });
}
exports.useLockHtmlScroll = useLockHtmlScroll;
