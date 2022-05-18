import { h, defineComponent, computed, ref, provide } from 'vue';
import { NScrollbar } from '../../_internal';
import { useConfig, useTheme, useThemeClass } from '../../_mixins';
import { layoutLight } from '../styles';
import style from './styles/layout.cssr';
import { positionProp } from './interface';
import { createInjectionKey } from '../../_utils';
const layoutProps = {
    embedded: Boolean,
    position: positionProp,
    nativeScrollbar: {
        type: Boolean,
        default: true
    },
    scrollbarProps: Object,
    onScroll: Function,
    contentStyle: {
        type: [String, Object],
        default: ''
    },
    hasSider: Boolean,
    siderPlacement: {
        type: String,
        default: 'left'
    }
};
export const layoutInjectionKey = createInjectionKey('n-layout');
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createLayoutComponent(isContent) {
    return defineComponent({
        name: isContent ? 'LayoutContent' : 'Layout',
        props: Object.assign(Object.assign({}, useTheme.props), layoutProps),
        setup(props) {
            const scrollableElRef = ref(null);
            const scrollbarInstRef = ref(null);
            const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
            const themeRef = useTheme('Layout', '-layout', style, layoutLight, props, mergedClsPrefixRef);
            function scrollTo(options, y) {
                if (props.nativeScrollbar) {
                    const { value: scrollableEl } = scrollableElRef;
                    if (scrollableEl) {
                        if (y === undefined) {
                            scrollableEl.scrollTo(options);
                        }
                        else {
                            scrollableEl.scrollTo(options, y);
                        }
                    }
                }
                else {
                    const { value: scrollbarInst } = scrollbarInstRef;
                    if (scrollbarInst) {
                        scrollbarInst.scrollTo(options, y);
                    }
                }
            }
            provide(layoutInjectionKey, props);
            const hasSiderStyle = {
                display: 'flex',
                flexWrap: 'nowrap',
                width: '100%',
                flexDirection: 'row'
            };
            const exposedMethods = {
                scrollTo
            };
            const cssVarsRef = computed(() => {
                const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
                return {
                    '--n-bezier': cubicBezierEaseInOut,
                    '--n-color': props.embedded ? self.colorEmbedded : self.color,
                    '--n-text-color': self.textColor
                };
            });
            const themeClassHandle = inlineThemeDisabled
                ? useThemeClass('layout', undefined, cssVarsRef, props)
                : undefined;
            return Object.assign({ mergedClsPrefix: mergedClsPrefixRef, scrollableElRef,
                scrollbarInstRef,
                hasSiderStyle, mergedTheme: themeRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender }, exposedMethods);
        },
        render() {
            var _a;
            const { mergedClsPrefix, hasSider } = this;
            (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
            const hasSiderStyle = hasSider ? this.hasSiderStyle : undefined;
            const layoutClass = [
                this.themeClass,
                isContent && `${mergedClsPrefix}-layout-content`,
                `${mergedClsPrefix}-layout`,
                `${mergedClsPrefix}-layout--${this.position}-positioned`
            ];
            return (h("div", { class: layoutClass, style: this.cssVars }, this.nativeScrollbar ? (h("div", { ref: "scrollableElRef", class: `${mergedClsPrefix}-layout-scroll-container`, style: [this.contentStyle, hasSiderStyle], onScroll: this.onScroll }, this.$slots)) : (h(NScrollbar, Object.assign({}, this.scrollbarProps, { onScroll: this.onScroll, ref: "scrollbarInstRef", theme: this.mergedTheme.peers.Scrollbar, themeOverrides: this.mergedTheme.peerOverrides.Scrollbar, contentStyle: [this.contentStyle, hasSiderStyle] }), this.$slots))));
        }
    });
}
export default createLayoutComponent(false);
