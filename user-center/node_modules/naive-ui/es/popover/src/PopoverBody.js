import { h, vShow, withDirectives, Transition, ref, defineComponent, computed, mergeProps, inject, onBeforeUnmount, watch, toRef, provide } from 'vue';
import { VFollower, VFocusTrap } from 'vueuc';
import { clickoutside, mousemoveoutside } from 'vdirs';
import { NxScrollbar } from '../../_internal/scrollbar';
import { useTheme, useConfig, useThemeClass } from '../../_mixins';
import { formatLength, isSlotEmpty, resolveWrappedSlot, useAdjustedTo } from '../../_utils';
import { popoverLight } from '../styles';
import { popoverBodyInjectionKey } from './interface';
import style from './styles/index.cssr';
import { drawerBodyInjectionKey } from '../../drawer/src/interface';
import { modalBodyInjectionKey } from '../../modal/src/interface';
export const popoverBodyProps = Object.assign(Object.assign({}, useTheme.props), { to: useAdjustedTo.propTo, show: Boolean, trigger: String, showArrow: Boolean, delay: Number, duration: Number, raw: Boolean, arrowPointToCenter: Boolean, arrowStyle: [String, Object], displayDirective: String, x: Number, y: Number, flip: Boolean, overlap: Boolean, placement: String, width: [Number, String], keepAliveOnHover: Boolean, scrollable: Boolean, contentStyle: [Object, String], headerStyle: [Object, String], 
    // private
    animated: Boolean, onClickoutside: Function, internalTrapFocus: Boolean, 
    // deprecated
    minWidth: Number, maxWidth: Number });
export const renderArrow = ({ arrowStyle, clsPrefix }) => {
    return (h("div", { key: "__popover-arrow__", class: `${clsPrefix}-popover-arrow-wrapper` },
        h("div", { class: `${clsPrefix}-popover-arrow`, style: arrowStyle })));
};
export default defineComponent({
    name: 'PopoverBody',
    inheritAttrs: false,
    props: popoverBodyProps,
    setup(props, { slots, attrs }) {
        const { namespaceRef, mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
        const themeRef = useTheme('Popover', '-popover', style, popoverLight, props, mergedClsPrefixRef);
        const followerRef = ref(null);
        const NPopover = inject('NPopover');
        const bodyRef = ref(null);
        const followerEnabledRef = ref(props.show);
        const directivesRef = computed(() => {
            const { trigger, onClickoutside } = props;
            const directives = [];
            const { positionManuallyRef: { value: positionManually } } = NPopover;
            if (!positionManually) {
                if (trigger === 'click' && !onClickoutside) {
                    directives.push([
                        clickoutside,
                        handleClickOutside,
                        undefined,
                        { capture: true }
                    ]);
                }
                if (trigger === 'hover') {
                    directives.push([mousemoveoutside, handleMouseMoveOutside]);
                }
            }
            if (onClickoutside) {
                directives.push([
                    clickoutside,
                    handleClickOutside,
                    undefined,
                    { capture: true }
                ]);
            }
            if (props.displayDirective === 'show') {
                directives.push([vShow, props.show]);
            }
            return directives;
        });
        const styleRef = computed(() => {
            return [
                {
                    width: props.width === 'trigger' ? '' : formatLength(props.width)
                },
                props.maxWidth ? { maxWidth: formatLength(props.maxWidth) } : {},
                props.minWidth ? { minWidth: formatLength(props.minWidth) } : {},
                inlineThemeDisabled ? undefined : cssVarsRef.value
            ];
        });
        const cssVarsRef = computed(() => {
            const { common: { cubicBezierEaseInOut, cubicBezierEaseIn, cubicBezierEaseOut }, self: { space, spaceArrow, padding, fontSize, textColor, dividerColor, color, boxShadow, borderRadius, arrowHeight, arrowOffset, arrowOffsetVertical } } = themeRef.value;
            return {
                '--n-box-shadow': boxShadow,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-bezier-ease-in': cubicBezierEaseIn,
                '--n-bezier-ease-out': cubicBezierEaseOut,
                '--n-font-size': fontSize,
                '--n-text-color': textColor,
                '--n-color': color,
                '--n-divider-color': dividerColor,
                '--n-border-radius': borderRadius,
                '--n-arrow-height': arrowHeight,
                '--n-arrow-offset': arrowOffset,
                '--n-arrow-offset-vertical': arrowOffsetVertical,
                '--n-padding': padding,
                '--n-space': space,
                '--n-space-arrow': spaceArrow
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? useThemeClass('popover', undefined, cssVarsRef, props)
            : undefined;
        NPopover.setBodyInstance({
            syncPosition
        });
        onBeforeUnmount(() => {
            NPopover.setBodyInstance(null);
        });
        watch(toRef(props, 'show'), (value) => {
            // If no animation, no transition component will be applied to the
            // component. So we need to trigger follower manaully.
            if (props.animated)
                return;
            if (value) {
                followerEnabledRef.value = true;
            }
            else {
                followerEnabledRef.value = false;
            }
        });
        function syncPosition() {
            var _a;
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        }
        function handleMouseEnter(e) {
            if (props.trigger === 'hover' && props.keepAliveOnHover) {
                NPopover.handleMouseEnter(e);
            }
        }
        function handleMouseLeave(e) {
            if (props.trigger === 'hover' && props.keepAliveOnHover) {
                NPopover.handleMouseLeave(e);
            }
        }
        function handleMouseMoveOutside(e) {
            if (props.trigger === 'hover' &&
                !getTriggerElement().contains(e.target)) {
                NPopover.handleMouseMoveOutside(e);
            }
        }
        function handleClickOutside(e) {
            if ((props.trigger === 'click' &&
                !getTriggerElement().contains(e.target)) ||
                props.onClickoutside) {
                NPopover.handleClickOutside(e);
            }
        }
        function getTriggerElement() {
            return NPopover.getTriggerElement();
        }
        provide(popoverBodyInjectionKey, bodyRef);
        provide(drawerBodyInjectionKey, null);
        provide(modalBodyInjectionKey, null);
        function renderContentNode() {
            themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
            let contentNode;
            const { internalRenderBodyRef: { value: renderBody } } = NPopover;
            const { value: mergedClsPrefix } = mergedClsPrefixRef;
            if (!renderBody) {
                const { value: extraClass } = NPopover.extraClassRef;
                const { internalTrapFocus } = props;
                const renderContentInnerNode = () => {
                    const content = resolveWrappedSlot(slots.header, (children) => {
                        var _a;
                        const body = children ? ([
                            h("div", { class: `${mergedClsPrefix}-popover__header`, style: props.headerStyle }, children),
                            h("div", { class: `${mergedClsPrefix}-popover__content`, style: props.contentStyle }, slots)
                        ]) : props.scrollable ? ((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) : (h("div", { class: `${mergedClsPrefix}-popover__content`, style: props.contentStyle }, slots));
                        const maybeScrollableBody = props.scrollable ? (h(NxScrollbar, { contentClass: children ? undefined : `${mergedClsPrefix}-popover__content`, contentStyle: children ? undefined : props.contentStyle }, {
                            default: () => body
                        })) : (body);
                        return maybeScrollableBody;
                    });
                    const arrow = props.showArrow
                        ? renderArrow({
                            arrowStyle: props.arrowStyle,
                            clsPrefix: mergedClsPrefix
                        })
                        : null;
                    return [content, arrow];
                };
                contentNode = h('div', mergeProps({
                    class: [
                        `${mergedClsPrefix}-popover`,
                        themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value,
                        extraClass.map((v) => `${mergedClsPrefix}-${v}`),
                        {
                            [`${mergedClsPrefix}-popover--scrollable`]: props.scrollable,
                            [`${mergedClsPrefix}-popover--overlap`]: props.overlap,
                            [`${mergedClsPrefix}-popover--show-arrow`]: props.showArrow,
                            [`${mergedClsPrefix}-popover--show-header`]: !isSlotEmpty(slots.header),
                            [`${mergedClsPrefix}-popover--raw`]: props.raw,
                            [`${mergedClsPrefix}-popover--manual-trigger`]: props.trigger === 'manual',
                            [`${mergedClsPrefix}-popover--center-arrow`]: props.arrowPointToCenter
                        }
                    ],
                    ref: bodyRef,
                    style: styleRef.value,
                    onKeydown: NPopover.handleKeydown,
                    onMouseenter: handleMouseEnter,
                    onMouseleave: handleMouseLeave
                }, attrs), internalTrapFocus ? (h(VFocusTrap, { active: props.show, autoFocus: true }, { default: renderContentInnerNode })) : (renderContentInnerNode()));
            }
            else {
                contentNode = renderBody(
                // The popover class and overlap class must exists, they will be used
                // to place the body & transition animation.
                // Shadow class exists for reuse box-shadow.
                [
                    `${mergedClsPrefix}-popover`,
                    themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value,
                    props.overlap && `${mergedClsPrefix}-popover--overlap`
                ], bodyRef, styleRef.value, handleMouseEnter, handleMouseLeave);
            }
            return props.displayDirective === 'show' || props.show
                ? withDirectives(contentNode, directivesRef.value)
                : null;
        }
        return {
            namespace: namespaceRef,
            isMounted: NPopover.isMountedRef,
            zIndex: NPopover.zIndexRef,
            followerRef,
            adjustedTo: useAdjustedTo(props),
            followerEnabled: followerEnabledRef,
            renderContentNode
        };
    },
    render() {
        return (h(VFollower, { zIndex: this.zIndex, show: this.show, enabled: this.followerEnabled, to: this.adjustedTo, x: this.x, y: this.y, flip: this.flip, placement: this.placement, containerClass: this.namespace, ref: "followerRef", overlap: this.overlap, width: this.width === 'trigger' ? 'target' : undefined, teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey }, {
            default: () => {
                return this.animated ? (h(Transition, { name: "popover-transition", appear: this.isMounted, 
                    // Don't use watch to enable follower, since the transition may
                    // make position sync timing very subtle and buggy.
                    onEnter: () => {
                        this.followerEnabled = true;
                    }, onAfterLeave: () => {
                        this.followerEnabled = false;
                    } }, {
                    default: this.renderContentNode
                })) : (this.renderContentNode());
            }
        }));
    }
});
