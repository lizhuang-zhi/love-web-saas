import { h, ref, computed, defineComponent, inject, watch } from 'vue';
import { VResizeObserver } from 'vueuc';
import { avatarGroupInjectionKey } from './context';
import { tagInjectionKey } from '../../tag/src/Tag';
import { useConfig, useTheme, useThemeClass } from '../../_mixins';
import { avatarLight } from '../styles';
import { createKey, color2Class, resolveWrappedSlot } from '../../_utils';
import style from './styles/index.cssr';
export const avatarProps = Object.assign(Object.assign({}, useTheme.props), { size: [String, Number], src: String, circle: {
        type: Boolean,
        default: undefined
    }, objectFit: String, round: {
        type: Boolean,
        default: undefined
    }, bordered: {
        type: Boolean,
        default: undefined
    }, onError: Function, fallbackSrc: String, 
    /** @deprecated */
    color: String });
export default defineComponent({
    name: 'Avatar',
    props: avatarProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
        const hasLoadErrorRef = ref(false);
        let memoedTextHtml = null;
        const textRef = ref(null);
        const selfRef = ref(null);
        const fitTextTransform = () => {
            const { value: textEl } = textRef;
            if (textEl) {
                if (memoedTextHtml === null || memoedTextHtml !== textEl.innerHTML) {
                    memoedTextHtml = textEl.innerHTML;
                    const { value: selfEl } = selfRef;
                    if (selfEl) {
                        const { offsetWidth: elWidth, offsetHeight: elHeight } = selfEl;
                        const { offsetWidth: textWidth, offsetHeight: textHeight } = textEl;
                        const radix = 0.9;
                        const ratio = Math.min((elWidth / textWidth) * radix, (elHeight / textHeight) * radix, 1);
                        textEl.style.transform = `translateX(-50%) translateY(-50%) scale(${ratio})`;
                    }
                }
            }
        };
        const NAvatarGroup = inject(avatarGroupInjectionKey, null);
        const mergedSizeRef = computed(() => {
            const { size } = props;
            if (size)
                return size;
            const { size: avatarGroupSize } = NAvatarGroup || {};
            if (avatarGroupSize)
                return avatarGroupSize;
            return 'medium';
        });
        const themeRef = useTheme('Avatar', '-avatar', style, avatarLight, props, mergedClsPrefixRef);
        const TagInjection = inject(tagInjectionKey, null);
        const mergedRoundRef = computed(() => {
            if (NAvatarGroup)
                return true;
            const { round, circle } = props;
            if (round !== undefined || circle !== undefined)
                return round || circle;
            if (TagInjection) {
                return TagInjection.roundRef.value;
            }
            return false;
        });
        const mergedBorderedRef = computed(() => {
            if (NAvatarGroup)
                return true;
            return props.bordered || false;
        });
        const handleError = (e) => {
            hasLoadErrorRef.value = true;
            const { onError } = props;
            if (onError) {
                onError(e);
            }
        };
        watch(() => props.src, () => (hasLoadErrorRef.value = false));
        const cssVarsRef = computed(() => {
            const size = mergedSizeRef.value;
            const round = mergedRoundRef.value;
            const bordered = mergedBorderedRef.value;
            const { color: propColor } = props;
            const { self: { borderRadius, fontSize, color, border, colorModal, colorPopover }, common: { cubicBezierEaseInOut } } = themeRef.value;
            let height;
            if (typeof size === 'number') {
                height = `${size}px`;
            }
            else {
                height = themeRef.value.self[createKey('height', size)];
            }
            return {
                '--n-font-size': fontSize,
                '--n-border': bordered ? border : 'none',
                '--n-border-radius': round ? '50%' : borderRadius,
                '--n-color': propColor || color,
                '--n-color-modal': propColor || colorModal,
                '--n-color-popover': propColor || colorPopover,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-merged-size': `var(--n-avatar-size-override, ${height})`
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? useThemeClass('avatar', computed(() => {
                const size = mergedSizeRef.value;
                const round = mergedRoundRef.value;
                const bordered = mergedBorderedRef.value;
                const { color } = props;
                let hash = '';
                if (size) {
                    if (typeof size === 'number') {
                        hash += `a${size}`;
                    }
                    else {
                        hash += size[0];
                    }
                }
                if (round) {
                    hash += 'b';
                }
                if (bordered) {
                    hash += 'c';
                }
                if (color) {
                    hash += color2Class(color);
                }
                return hash;
            }), cssVarsRef, props)
            : undefined;
        return {
            textRef,
            selfRef,
            mergedRoundRef,
            mergedClsPrefix: mergedClsPrefixRef,
            fitTextTransform,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            hasLoadError: hasLoadErrorRef,
            handleError
        };
    },
    render() {
        const { $slots, src, mergedClsPrefix, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        let img;
        if (this.hasLoadError) {
            img = h("img", { src: this.fallbackSrc, style: { objectFit: this.objectFit } });
        }
        else {
            img = resolveWrappedSlot($slots.default, (children) => {
                if (children) {
                    return (h(VResizeObserver, { onResize: this.fitTextTransform }, {
                        default: () => (h("span", { ref: "textRef", class: `${mergedClsPrefix}-avatar__text` }, children))
                    }));
                }
                else if (src) {
                    return (h("img", { src: src, onError: this.handleError, style: { objectFit: this.objectFit } }));
                }
            });
        }
        return (h("span", { ref: "selfRef", class: [`${mergedClsPrefix}-avatar`, this.themeClass], style: this.cssVars }, img));
    }
});
