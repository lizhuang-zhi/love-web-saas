import { computed, defineComponent, h, inject } from 'vue';
import { ChevronDownFilledIcon } from '../../_internal/icons';
import { render } from '../../_utils';
import { NBaseIcon } from '../../_internal';
import { menuInjectionKey } from './context';
export default defineComponent({
    name: 'MenuOptionContent',
    props: {
        collapsed: Boolean,
        disabled: Boolean,
        title: [String, Function],
        icon: Function,
        extra: [String, Function],
        showArrow: Boolean,
        childActive: Boolean,
        hover: Boolean,
        paddingLeft: Number,
        selected: Boolean,
        maxIconSize: {
            type: Number,
            required: true
        },
        activeIconSize: {
            type: Number,
            required: true
        },
        iconMarginRight: {
            type: Number,
            required: true
        },
        clsPrefix: {
            type: String,
            required: true
        },
        onClick: Function,
        tmNode: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { props: menuProps } = inject(menuInjectionKey);
        return {
            menuProps,
            style: computed(() => {
                const { paddingLeft } = props;
                return { paddingLeft: paddingLeft && `${paddingLeft}px` };
            }),
            iconStyle: computed(() => {
                const { maxIconSize, activeIconSize, iconMarginRight } = props;
                return {
                    width: `${maxIconSize}px`,
                    height: `${maxIconSize}px`,
                    fontSize: `${activeIconSize}px`,
                    marginRight: `${iconMarginRight}px`
                };
            })
        };
    },
    render() {
        const { clsPrefix, tmNode, menuProps: { renderIcon, renderLabel, renderExtra, expandIcon, nodeProps } } = this;
        const icon = renderIcon ? renderIcon(tmNode.rawNode) : render(this.icon);
        const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(tmNode.rawNode);
        return (h("div", Object.assign({}, attrs, { onClick: (e) => {
                var _a, _b;
                (_a = attrs === null || attrs === void 0 ? void 0 : attrs.onClick) === null || _a === void 0 ? void 0 : _a.call(attrs, e);
                (_b = this.onClick) === null || _b === void 0 ? void 0 : _b.call(this, e);
            }, role: "none", class: [
                `${clsPrefix}-menu-item-content`,
                {
                    [`${clsPrefix}-menu-item-content--selected`]: this.selected,
                    [`${clsPrefix}-menu-item-content--collapsed`]: this.collapsed,
                    [`${clsPrefix}-menu-item-content--child-active`]: this.childActive,
                    [`${clsPrefix}-menu-item-content--disabled`]: this.disabled,
                    [`${clsPrefix}-menu-item-content--hover`]: this.hover
                },
                attrs === null || attrs === void 0 ? void 0 : attrs.class
            ], style: [this.style, (attrs === null || attrs === void 0 ? void 0 : attrs.style) || ''] }),
            icon && (h("div", { class: `${clsPrefix}-menu-item-content__icon`, style: this.iconStyle, role: "none" }, icon)),
            h("div", { class: `${clsPrefix}-menu-item-content-header`, role: "none" },
                renderLabel ? renderLabel(tmNode.rawNode) : render(this.title),
                this.extra || renderExtra ? (h("span", { class: `${clsPrefix}-menu-item-content-header__extra` },
                    ' ',
                    renderExtra ? renderExtra(tmNode.rawNode) : render(this.extra))) : null),
            this.showArrow ? (h(NBaseIcon, { ariaHidden: true, class: `${clsPrefix}-menu-item-content__arrow`, clsPrefix: clsPrefix }, {
                default: () => expandIcon ? (expandIcon(tmNode.rawNode)) : (h(ChevronDownFilledIcon, null))
            })) : null));
    }
});
