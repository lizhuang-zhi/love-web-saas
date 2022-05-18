import{a2 as o,a3 as e,a4 as t,y as r,x as n,a5 as a,c as i,l as d,L as l,a6 as s,a7 as u,V as b,a8 as c,q as v,J as p,s as h,v as g,a9 as f,d as m,z as x,B as C,aa as S,F as R,S as z,T as w,ab as y,C as k}from"./index.d061a68e.js";import{g as B}from"./get-slot.65c4337d.js";var F={name:"Radio",common:o,self:o=>{const{borderColor:r,primaryColor:n,baseColor:a,textColorDisabled:i,inputColorDisabled:d,textColor2:l,opacityDisabled:s,borderRadius:u,fontSizeSmall:b,fontSizeMedium:c,fontSizeLarge:v,heightSmall:p,heightMedium:h,heightLarge:g,lineHeight:f}=o;return Object.assign(Object.assign({},e),{labelLineHeight:f,buttonHeightSmall:p,buttonHeightMedium:h,buttonHeightLarge:g,fontSizeSmall:b,fontSizeMedium:c,fontSizeLarge:v,boxShadow:`inset 0 0 0 1px ${r}`,boxShadowActive:`inset 0 0 0 1px ${n}`,boxShadowFocus:`inset 0 0 0 1px ${n}, 0 0 0 2px ${t(n,{alpha:.2})}`,boxShadowHover:`inset 0 0 0 1px ${n}`,boxShadowDisabled:`inset 0 0 0 1px ${r}`,color:a,colorDisabled:d,textColor:l,textColorDisabled:i,dotColorActive:n,dotColorDisabled:r,buttonBorderColor:r,buttonBorderColorActive:n,buttonBorderColorHover:r,buttonColor:a,buttonColorActive:a,buttonTextColor:l,buttonTextColorActive:n,buttonTextColorHover:n,opacityDisabled:s,buttonBoxShadowFocus:`inset 0 0 0 1px ${n}, 0 0 0 2px ${t(n,{alpha:.3})}`,buttonBoxShadowHover:"inset 0 0 0 1px #0000",buttonBoxShadow:"inset 0 0 0 1px #0000",buttonBorderRadius:u})}};const T={name:String,value:{type:[String,Number],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,validator:()=>(b("radio","`checked-value` is deprecated, please use `checked` instead."),!0),default:void 0}},$=n("n-radio-group");function D(o){const e=a(o,{mergedSize(e){const{size:t}=o;if(void 0!==t)return t;if(p){const{mergedSizeRef:{value:o}}=p;if(void 0!==o)return o}return e?e.mergedSize.value:"medium"},mergedDisabled:e=>!!o.disabled||(!!(null==p?void 0:p.disabledRef.value)||!!(null==e?void 0:e.disabled.value))}),{mergedSizeRef:t,mergedDisabledRef:n}=e,b=i(null),v=i(null),p=d($,null),h=i(o.defaultChecked),g=l(o,"checked"),f=s(g,h),m=u((()=>p?p.valueRef.value===o.value:f.value)),x=u((()=>{const{name:e}=o;return void 0!==e?e:p?p.nameRef.value:void 0})),C=i(!1);function S(){n.value||m.value||function(){if(p){const{doUpdateValue:e}=p,{value:t}=o;c(e,t)}else{const{onUpdateChecked:t,"onUpdate:checked":r}=o,{nTriggerFormInput:n,nTriggerFormChange:a}=e;t&&c(t,!0),r&&c(r,!0),n(),a(),h.value=!0}}()}return{mergedClsPrefix:p?p.mergedClsPrefixRef:r(o).mergedClsPrefixRef,inputRef:b,labelRef:v,mergedName:x,mergedDisabled:n,uncontrolledChecked:h,renderSafeChecked:m,focus:C,mergedSize:t,handleRadioInputChange:function(){S()},handleRadioInputBlur:function(){C.value=!1},handleRadioInputFocus:function(){C.value=!0}}}D.props=T;var H=v("radio-group","\n display: inline-block;\n font-size: var(--n-font-size);\n",[p("splitor","\n display: inline-block;\n vertical-align: bottom;\n width: 1px;\n transition:\n background-color .3s var(--n-bezier),\n opacity .3s var(--n-bezier);\n background: var(--n-button-border-color);\n ",[h("checked",{backgroundColor:"var(--n-button-border-color-active)"}),h("disabled",{opacity:"var(--n-opacity-disabled)"})]),h("button-group","\n white-space: nowrap;\n height: var(--n-height);\n line-height: var(--n-height);\n ",[v("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),p("splitor",{height:"var(--n-height)"})]),v("radio-button","\n vertical-align: bottom;\n outline: none;\n position: relative;\n user-select: none;\n display: inline-block;\n box-sizing: border-box;\n padding-left: 14px;\n padding-right: 14px;\n white-space: nowrap;\n transition:\n background-color .3s var(--n-bezier),\n opacity .3s var(--n-bezier),\n border-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n color: var(--n-button-text-color);\n border-top: 1px solid var(--n-button-border-color);\n border-bottom: 1px solid var(--n-button-border-color);\n ",[v("radio-input","\n position: absolute;\n border: 0;\n border-radius: inherit;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n opacity: 0;\n z-index: 1;\n "),p("state-border","\n z-index: 1;\n pointer-events: none;\n position: absolute;\n box-shadow: var(--n-button-box-shadow);\n transition: box-shadow .3s var(--n-bezier);\n left: -1px;\n bottom: -1px;\n right: -1px;\n top: -1px;\n "),g("&:first-child","\n border-top-left-radius: var(--n-button-border-radius);\n border-bottom-left-radius: var(--n-button-border-radius);\n border-left: 1px solid var(--n-button-border-color);\n ",[p("state-border","\n border-top-left-radius: var(--n-button-border-radius);\n border-bottom-left-radius: var(--n-button-border-radius);\n ")]),g("&:last-child","\n border-top-right-radius: var(--n-button-border-radius);\n border-bottom-right-radius: var(--n-button-border-radius);\n border-right: 1px solid var(--n-button-border-color);\n ",[p("state-border","\n border-top-right-radius: var(--n-button-border-radius);\n border-bottom-right-radius: var(--n-button-border-radius);\n ")]),f("disabled","\n cursor: pointer;\n ",[g("&:hover",[p("state-border","\n transition: box-shadow .3s var(--n-bezier);\n box-shadow: var(--n-button-box-shadow-hover);\n "),f("checked",{color:"var(--n-button-text-color-hover)"})]),h("focus",[g("&:not(:active)",[p("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),h("checked","\n background: var(--n-button-color-active);\n color: var(--n-button-text-color-active);\n border-color: var(--n-button-border-color-active);\n "),h("disabled","\n cursor: not-allowed;\n opacity: var(--n-opacity-disabled);\n ")])]);var A=m({name:"RadioGroup",props:Object.assign(Object.assign({},x.props),{name:String,value:[String,Number],defaultValue:{type:[String,Number],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),setup(o){const e=i(null),{mergedSizeRef:t,mergedDisabledRef:n,nTriggerFormChange:d,nTriggerFormInput:u,nTriggerFormBlur:b,nTriggerFormFocus:v}=a(o),{mergedClsPrefixRef:p,inlineThemeDisabled:h,mergedRtlRef:g}=r(o),f=x("Radio","-radio-group",H,F,o,p),m=i(o.defaultValue),y=l(o,"value"),k=s(y,m);C($,{mergedClsPrefixRef:p,nameRef:l(o,"name"),valueRef:k,disabledRef:n,mergedSizeRef:t,doUpdateValue:function(e){const{onUpdateValue:t,"onUpdate:value":r}=o;t&&c(t,e),r&&c(r,e),m.value=e,d(),u()}});const B=S("Radio",g,p),T=R((()=>{const{value:o}=t,{common:{cubicBezierEaseInOut:e},self:{buttonBorderColor:r,buttonBorderColorActive:n,buttonBorderRadius:a,buttonBoxShadow:i,buttonBoxShadowFocus:d,buttonBoxShadowHover:l,buttonColorActive:s,buttonTextColor:u,buttonTextColorActive:b,buttonTextColorHover:c,opacityDisabled:v,[z("buttonHeight",o)]:p,[z("fontSize",o)]:h}}=f.value;return{"--n-font-size":h,"--n-bezier":e,"--n-button-border-color":r,"--n-button-border-color-active":n,"--n-button-border-radius":a,"--n-button-box-shadow":i,"--n-button-box-shadow-focus":d,"--n-button-box-shadow-hover":l,"--n-button-color-active":s,"--n-button-text-color":u,"--n-button-text-color-hover":c,"--n-button-text-color-active":b,"--n-height":p,"--n-opacity-disabled":v}})),D=h?w("radio-group",R((()=>t.value[0])),T,o):void 0;return{selfElRef:e,rtlEnabled:B,mergedClsPrefix:p,mergedValue:k,handleFocusout:function(o){const{value:t}=e;t&&(t.contains(o.relatedTarget)||b())},handleFocusin:function(o){const{value:t}=e;t&&(t.contains(o.relatedTarget)||v())},cssVars:h?void 0:T,themeClass:null==D?void 0:D.themeClass,onRender:null==D?void 0:D.onRender}},render(){var o;const{mergedValue:e,mergedClsPrefix:t,handleFocusin:r,handleFocusout:n}=this,{children:a,isButtonGroup:i}=function(o,e,t){var r;const n=[];let a=!1;for(let i=0;i<o.length;++i){const d=o[i],l=null===(r=d.type)||void 0===r?void 0:r.name;"RadioButton"===l&&(a=!0);const s=d.props;if("RadioButton"===l)if(0===i)n.push(d);else{const o=n[n.length-1].props,r=e===o.value,a=o.disabled,i=e===s.value,l=s.disabled,u={[`${t}-radio-group__splitor--disabled`]:a,[`${t}-radio-group__splitor--checked`]:r},b={[`${t}-radio-group__splitor--disabled`]:l,[`${t}-radio-group__splitor--checked`]:i},c=(r?2:0)+(a?0:1)<(i?2:0)+(l?0:1)?b:u;n.push(k("div",{class:[`${t}-radio-group__splitor`,c]}),d)}else n.push(d)}return{children:n,isButtonGroup:a}}(y(B(this)),e,t);return null===(o=this.onRender)||void 0===o||o.call(this),k("div",{onFocusin:r,onFocusout:n,ref:"selfElRef",class:[`${t}-radio-group`,this.rtlEnabled&&`${t}-radio-group--rtl`,this.themeClass,i&&`${t}-radio-group--button-group`],style:this.cssVars},a)}});export{A as N,F as r,D as s};
