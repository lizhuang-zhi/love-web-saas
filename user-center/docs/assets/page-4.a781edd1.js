import{x as e,d as t,y as n,c as a,l,bb as o,C as r,bc as i,m as s,F as u,R as d,am as c,q as p,J as v,v as f,s as h,aG as m,L as g,B as x,b2 as b,ba as w,bd as y,P as S,z as D,T as C,ab as N,be as P,bf as I,bg as j,aY as _,a_ as k,U as T,aF as z,aV as $,bh as B,aP as O,N as R,bi as F,e as U,u as A,r as V,_ as E,aR as M,f as X,o as Y,a1 as L,w as K,h as Z,j as W,bj as H,ap as J,g as q,$ as G,p as Q,k as ee,i as te,a0 as ne,t as ae}from"./index.cd67839e.js";import{N as le}from"./Space.0eece4c8.js";import{N as oe,u as re}from"./Upload.74ca4c3a.js";import{u as ie}from"./use-notification.bcb9ee04.js";import{N as se,u as ue}from"./useReduceFn.86e5a14d.js";import{H as de}from"./HelpButton.ba6037ca.js";import{N as ce}from"./Divider.db043493.js";import"./get-slot.65c4337d.js";import"./Add.47592022.js";function pe(e){return window.TouchEvent&&e instanceof window.TouchEvent}function ve(e,t){let n=e.clientWidth,a=e.clientHeight;if(t){const t=getComputedStyle(e);return n=n-parseFloat(t.getPropertyValue("padding-left"))-parseFloat(t.getPropertyValue("padding-right")),a=a-parseFloat(t.getPropertyValue("padding-top"))-parseFloat(t.getPropertyValue("padding-bottom")),{width:n,height:a}}return{width:n,height:a}}function fe(e,t,n){return e<t?t:e>n?n:e}function he(e,t,n){return n?0===e?t-3:e===t-1?0:e-1:e}function me(e,t){return t?e+1:e}const ge=e("n-carousel-methods");var xe=t({name:"CarouselDots",props:{total:{type:Number,default:0},currentIndex:{type:Number,default:0},dotType:{type:String,default:"dot"},trigger:{type:String,default:"click"},keyboard:Boolean},setup(e){const{mergedClsPrefixRef:t}=n(e),r=a([]),i=l(ge,null);function s(t=e.currentIndex){const{value:n}=r;t>=0&&t<n.length&&n[t].focus()}return o((()=>r.value.length=0)),{mergedClsPrefix:t,dotEls:r,handleKeydown:function(t,n){switch(t.code){case"Enter":case"NumpadEnter":case"Space":return void i.to(n)}e.keyboard&&function(e){var t;const{code:n}=e,a=i.isVertical(),l="PageUp"===n||"ArrowUp"===n,o="PageDown"===n||"ArrowDown"===n,r="PageUp"===n||"ArrowRight"===n,u="PageDown"===n||"ArrowLeft"===n;if(a&&(l&&i.isNextDisabled()||o&&i.isPrevDisabled()))return;if(!a&&(r&&i.isNextDisabled()||u&&i.isPrevDisabled()))return;if(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey)return;const d=null===(t=document.activeElement)||void 0===t?void 0:t.nodeName.toLowerCase();if("input"===d||"textarea"===d)return;(a?l:r)?(e.preventDefault(),i.next(),s(i.getCurrentIndex())):(a?o:u)&&(e.preventDefault(),i.prev(),s(i.getCurrentIndex()))}(t)},handleMouseenter:function(t){"hover"===e.trigger&&i.to(t)},handleClick:function(t){"click"===e.trigger&&i.to(t)}}},render(){const{mergedClsPrefix:e,dotEls:t}=this;return r("div",{class:[`${e}-carousel__dots`,`${e}-carousel__dots--${this.dotType}`],role:"tablist"},i(this.total,(n=>{const a=n===this.currentIndex;return r("div",{"aria-selected":a,ref:e=>t.push(e),role:"button",tabindex:"0",class:[`${e}-carousel__dot`,a&&`${e}-carousel__dot--active`],key:n,onClick:()=>this.handleClick(n),onMouseenter:()=>this.handleMouseenter(n),onKeydown:e=>this.handleKeydown(e,n)})})))}});const be=r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},r("g",{fill:"none"},r("path",{d:"M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z",fill:"currentColor"}))),we=r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},r("g",{fill:"none"},r("path",{d:"M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z",fill:"currentColor"})));var ye=t({name:"CarouselArrow",setup(e){const{mergedClsPrefixRef:t}=n(e),{isVertical:a,isPrevDisabled:o,isNextDisabled:r,prev:i,next:s}=l(ge,null);return{mergedClsPrefix:t,isVertical:a,isPrevDisabled:o,isNextDisabled:r,prev:i,next:s}},render(){const{mergedClsPrefix:e}=this;return r("div",{class:`${e}-carousel__arrow-group`},r("div",{class:[`${e}-carousel__arrow`,this.isPrevDisabled()&&`${e}-carousel__arrow--disabled`],role:"button",onClick:this.prev},be),r("div",{class:[`${e}-carousel__arrow`,this.isNextDisabled()&&`${e}-carousel__arrow--disabled`],role:"button",onClick:this.next},we))}}),Se=t({name:"CarouselItem",setup(e){const{mergedClsPrefixRef:t}=n(e),o=l(ge,null);o||s("carousel-item","`n-carousel-item` must be placed inside `n-carousel`.");const r=a(),i=u((()=>{const{value:e}=r;return Boolean(e&&o.isPrev(e))})),p=u((()=>{const{value:e}=r;return Boolean(e&&o.isNext(e))})),v=u((()=>{const{value:e}=r;return Boolean(e&&o.isActive(e))})),f=u((()=>{const{value:e}=r;return e&&o.getSlideStyle(e)})),h=u((()=>{const{value:e}=r;return e&&o.getSlideIndex(e)}));return d((()=>o.addSlide(r.value))),c((()=>{o.removeSlide(r.value)})),{mergedClsPrefix:t,selfElRef:r,isPrev:i,isNext:p,isActive:v,index:h,style:f,prevSlideStyle:o.prevSlideStyleRef,nextSlideStyle:o.nextSlideStyleRef,handleClick:function(e){const{value:t}=h;void 0!==t&&(null==o||o.onCarouselItemClick(t,e))}}},render(){var e;const{$slots:t,mergedClsPrefix:n,isPrev:a,isNext:l,isActive:o,index:i,style:s}=this;return r("div",{ref:"selfElRef",class:[`${n}-carousel__slide`,{[`${n}-carousel__slide--current`]:o,[`${n}-carousel__slide--prev`]:a,[`${n}-carousel__slide--next`]:l}],role:"option",tabindex:"-1","data-index":i,"aria-hidden":!o,style:[s,a?this.prevSlideStyle:"",l?this.nextSlideStyle:""],onClickCapture:this.handleClick},null===(e=t.default)||void 0===e?void 0:e.call(t,{isPrev:a,isNext:l,isActive:o,index:i}))}}),De=p("carousel","\n position: relative;\n width: 100%;\n height: 100%;\n overflow: hidden;\n",[v("slides","\n display: flex;\n width: 100%;\n height: 100%;\n transition-timing-function: var(--n-bezier);\n transition-property: transform;\n touch-action: pan-y;\n ",[v("slide","\n flex-shrink: 0;\n position: relative;\n width: 100%;\n height: 100%;\n outline: none;\n overflow: hidden;\n ",[f("> img","\n display: block;\n ")])]),v("dots","\n position: absolute;\n display: flex;\n flex-wrap: nowrap;\n ",[h("dot",[v("dot","\n height: var(--n-dot-size);\n width: var(--n-dot-size);\n background-color: var(--n-dot-color);\n border-radius: 50%;\n cursor: pointer;\n transition:\n box-shadow .3s var(--n-bezier),\n background-color .3s var(--n-bezier);\n outline: none;\n ",[f("&:focus","\n background-color: var(--n-dot-color-focus);\n "),h("active","\n background-color: var(--n-dot-color-active);\n ")])]),h("line",[v("dot","\n border-radius: 9999px;\n width: var(--n-dot-line-width);\n height: 4px;\n background-color: var(--n-dot-color);\n cursor: pointer;\n transition:\n width .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier),\n background-color .3s var(--n-bezier);\n outline: none;\n ",[f("&:focus","\n background-color: var(--n-dot-color-focus);\n "),h("active","\n width: var(--n-dot-line-width-active);\n background-color: var(--n-dot-color-active);\n ")])])]),v("arrow","\n transition: background-color .3s var(--n-bezier);\n cursor: pointer;\n height: 28px;\n width: 28px;\n display: flex;\n align-items: center;\n justify-content: center;\n background-color: rgba(255, 255, 255, .2);\n color: var(--n-arrow-color);\n border-radius: 8px;\n user-select: none;\n font-size: 18px;\n ",[f("svg","\n height: 1em;\n width: 1em;\n "),f("&:hover","\n background-color: rgba(255, 255, 255, .3);\n ")]),h("vertical",[v("slides","\n flex-direction: column;\n touch-action: pan-x;\n "),h("fade",[v("slide","\n top: 50%;\n left: unset;\n transform: translateY(-50%);\n ")]),h("card",[v("slide","\n top: 50%;\n left: unset;\n transform: translateY(-50%) translateZ(-400px);\n ",[h("current","\n transform: translateY(-50%) translateZ(0);\n "),h("prev","\n transform: translateY(-100%) translateZ(-200px);\n "),h("next","\n transform: translateY(0%) translateZ(-200px);\n ")])])]),h("usercontrol",[v("slides",[f(">",[f("div","\n position: absolute;\n top: 50%;\n left: 50%;\n transform: translate(-50%, -50%);\n ")])])]),h("left",[v("dots","\n transform: translateY(-50%);\n top: 50%;\n left: 12px;\n flex-direction: column;\n ",[h("line",[v("dot","\n width: 4px;\n height: var(--n-dot-line-width);\n margin: 4px 0;\n transition:\n height .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier),\n background-color .3s var(--n-bezier);\n outline: none;\n ",[h("active","\n height: var(--n-dot-line-width-active);\n ")])])]),v("dot","\n margin: 4px 0;\n ")]),v("arrow-group","\n position: absolute;\n display: flex;\n flex-wrap: nowrap;\n "),h("vertical",[v("arrow","\n transform: rotate(90deg);\n ")]),h("show-arrow",[h("bottom",[v("dots","\n transform: translateX(0);\n bottom: 18px;\n left: 18px;\n ")]),h("top",[v("dots","\n transform: translateX(0);\n top: 18px;\n left: 18px;\n ")]),h("left",[v("dots","\n transform: translateX(0);\n top: 18px;\n left: 18px;\n ")]),h("right",[v("dots","\n transform: translateX(0);\n top: 18px;\n right: 18px;\n ")])]),h("left",[v("arrow-group","\n bottom: 12px;\n left: 12px;\n flex-direction: column;\n ",[f("> *:first-child","\n margin-bottom: 12px;\n ")])]),h("right",[v("dots","\n transform: translateY(-50%);\n top: 50%;\n right: 12px;\n flex-direction: column;\n ",[h("line",[v("dot","\n width: 4px;\n height: var(--n-dot-line-width);\n margin: 4px 0;\n transition:\n height .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier),\n background-color .3s var(--n-bezier);\n outline: none;\n ",[h("active","\n height: var(--n-dot-line-width-active);\n ")])])]),v("dot","\n margin: 4px 0;\n "),v("arrow-group","\n bottom: 12px;\n right: 12px;\n flex-direction: column;\n ",[f("> *:first-child","\n margin-bottom: 12px;\n ")])]),h("top",[v("dots","\n transform: translateX(-50%);\n top: 12px;\n left: 50%;\n ",[h("line",[v("dot","\n margin: 0 4px;\n ")])]),v("dot","\n margin: 0 4px;\n "),v("arrow-group","\n top: 12px;\n right: 12px;\n ",[f("> *:first-child","\n margin-right: 12px;\n ")])]),h("bottom",[v("dots","\n transform: translateX(-50%);\n bottom: 12px;\n left: 50%;\n ",[h("line",[v("dot","\n margin: 0 4px;\n ")])]),v("dot","\n margin: 0 4px;\n "),v("arrow-group","\n bottom: 12px;\n right: 12px;\n ",[f("> *:first-child","\n margin-right: 12px;\n ")])]),h("fade",[v("slide","\n position: absolute;\n opacity: 0;\n transition-property: opacity;\n ",[h("current","\n opacity: 1;\n ")])]),h("card",[v("slides","\n perspective: 1000px;\n "),v("slide","\n position: absolute;\n left: 50%;\n opacity: 0;\n transform: translateX(-50%) translateZ(-400px);\n transition-property: opacity, transform;\n ",[h("current","\n opacity: 1;\n transform: translateX(-50%) translateZ(0);\n z-index: 1;\n "),h("prev","\n opacity: 0.4;\n transform: translateX(-100%) translateZ(-200px);\n "),h("next","\n opacity: 0.4;\n transform: translateX(0%) translateZ(-200px);\n ")])])]);const Ce=((...e)=>e)("transitionDuration","transitionTimingFunction"),Ne=Object.assign(Object.assign({},D.props),{defaultIndex:{type:Number,default:0},currentIndex:Number,showArrow:Boolean,dotType:{type:String,default:"dot"},dotPlacement:{type:String,default:"bottom"},slidesPerView:{type:[Number,String],default:1},spaceBetween:{type:Number,default:0},centeredSlides:Boolean,direction:{type:String,default:"horizontal"},autoplay:Boolean,interval:{type:Number,default:5e3},loop:{type:Boolean,default:!0},effect:{type:String,default:"slide"},showDots:{type:Boolean,default:!0},trigger:{type:String,default:"click"},transitionStyle:{type:Object,default:()=>({transitionDuration:"300ms"})},transitionProps:Object,draggable:Boolean,prevSlideStyle:[Object,String],nextSlideStyle:[Object,String],touchable:{type:Boolean,default:!0},mousewheel:Boolean,keyboard:Boolean,"onUpdate:currentIndex":Function,onUpdateCurrentIndex:Function});let Pe=!1;var Ie=t({name:"Carousel",props:Ne,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:l}=n(e),o=a(null),r=a([]),i={value:[]},s=u((()=>"custom"===e.effect)),p=u((()=>!s.value&&"slide"===e.effect)),v=u((()=>e.loop&&1===e.slidesPerView)),f=u((()=>p.value&&v.value)),h=u((()=>s.value||e.centeredSlides||"slide"!==e.effect?1:e.slidesPerView)),N=u((()=>s.value?1:e.slidesPerView)),P=u((()=>"auto"===h.value||"auto"===e.slidesPerView&&e.centeredSlides)),I=u((()=>e.transitionStyle?m(e.transitionStyle,Ce):{})),j=u((()=>s.value?0:function(e){if(void 0===e)return 0;if("number"==typeof e)return e;const t=e.match(/^((\d+)?\.?\d+?)(ms|s)?$/);if(t){const[,e,,n="ms"]=t;return Number(e)*("ms"===n?1:1e3)}return 0}(I.value.transitionDuration))),_=u((()=>"vertical"===e.direction)),k=u((()=>_.value?"height":"width")),T=a({width:0,height:0}),O=u((()=>{const{value:t}=r,{length:n}=t;if(!n)return[];if(P.value)return t.map((e=>ve(e)));const{value:a}=N,{value:l}=T,{value:o}=k;let i=l[o];if("auto"!==a){const{spaceBetween:t}=e,n=i-(a-1)*t,l=1/Math.max(1,a);i=n*l}return t.map((()=>Object.assign(Object.assign({},l),{[o]:i})))})),R=u((()=>{const{value:t}=O,{length:n}=t;if(!n)return[];const{centeredSlides:a,spaceBetween:l}=e,{value:o}=k,{[o]:r}=T.value;let i=0;return t.map((({[o]:e})=>{let t=i;return a&&(t+=(e-r)/2),i+=e+l,t}))}));let F=!1;const U=u((()=>{const{value:t}=O,{length:n}=t;if(!n)return[];const{value:a}=k;if(s.value)return t.map((e=>({[a]:`${e[a]}px`})));const{effect:l,spaceBetween:o}=e,{value:r}=_,i=r?"bottom":"right",u=[];for(let e=0;e<n;e++){const n=t[e][a],r={[a]:`${n}px`,[`margin-${i}`]:`${o}px`};!F||"fade"!==l&&"card"!==l||Object.assign(r,I.value),u.push(r)}return u})),A=u((()=>{const{value:e}=h,{length:t}=r.value;if("auto"!==e)return t-e+1;{const{value:e}=O,{length:n}=e;if(!n)return t;const{value:a}=R,{value:l}=k,o=T.value[l];let r=e[e.length-1][l],i=n;for(;i>1&&r<o;)i--,r+=a[i]-a[i-1];return i!==n&&i++,i<1&&(i=1),i}})),V=u((()=>{const{value:e}=A;return f.value&&e>3?e-2:e})),E=e.defaultIndex+(f.value?1:0),M=a(he(E,A.value,f.value)),X=a(E),Y=a(E);let L=0;function K(t,n=j.value){var a,l;const{value:o}=A;if((t=fe(t,0,o-1))!==Y.value){const{value:r}=M;f.value&&V.value>2&&(0===r&&t===V.value?t=0:r===V.value-1&&1===t&&(t=o-1));const i=M.value=he(t,A.value,f.value);X.value=t,Y.value=me(i,f.value),p.value?oe(t,n):(!s.value&&n>0&&(ne=!0),le()),i!==r&&(null===(a=e["onUpdate:currentIndex"])||void 0===a||a.call(e,i,r),null===(l=e.onUpdateCurrentIndex)||void 0===l||l.call(e,i,r))}}function Z(t=Y.value){return n=t,a=A.value,l=e.loop,n<0?null:0===n?l?a-1:null:n-1;var n,a,l}function W(t=Y.value){return n=t,a=A.value,l=e.loop,n>a-1?null:n===a-1?l?0:null:n+1;var n,a,l}function H(e){return Y.value===se(e)}function J(){return null===Z()}function q(){return null===W()}function G(e){const t=me(e,f.value);e===M.value&&t===Y.value||K(t)}function Q(){const e=Z();null!==e&&K(e)}function ee(){const e=W();null!==e&&K(e)}const te=a({});let ne=!1;function ae(t,n=0){const a="vertical"===e.direction;te.value=Object.assign({},I.value,{transform:a?`translateY(${-t}px)`:`translateX(${-t}px)`,transitionDuration:`${n}ms`})}function le(e=0){p.value?oe(Y.value,e):0!==L&&ae(L=0,e)}function oe(e,t=j.value){const n=re(e);n!==L&&t>0&&(ne=!0),ae(n,t),L=re(Y.value)}function re(e){let t;return t=e>=A.value-1?ie():R.value[e]||0,t}function ie(){if("auto"===h.value){const{value:e}=k,{[e]:t}=T.value,{value:n}=R,a=n[n.length-1];let l;if(void 0===a)l=t;else{const{value:t}=O;l=a+t[t.length-1][e]}return l-t}{const{value:e}=R;return e[A.value-1]||0}}function se(e){return"number"==typeof e?e:r.value.indexOf(e)}const ue={to:G,prev:()=>{ne&&f.value||Q()},next:()=>{ne&&f.value||ee()},isVertical:()=>_.value,isHorizontal:()=>!_.value,isPrev:function(e){const t=se(e);return null!==t&&Z()===t},isNext:function(e){const t=se(e);return null!==t&&W()===t},isActive:H,isPrevDisabled:J,isNextDisabled:q,getCurrentIndex:()=>M.value,getSlideIndex:se,getSlideStyle:function(e){const t=se(e);if(-1!==t)return U.value[t]},addSlide:function(e){e&&r.value.push(e)},removeSlide:function(e){if(!e)return;const t=se(e);-1!==t&&r.value.splice(t,1)},onCarouselItemClick:function(t,n){let a=!(ne||28&Ne);"card"!==e.effect||s.value||8&Ne||H(t)||(G(t),a=!1),a||(n.preventDefault(),n.stopPropagation())},prevSlideStyleRef:g(e,"prevSlideStyle"),nextSlideStyleRef:g(e,"nextSlideStyle")};x(ge,ue);let de=null;function ce(t){de&&(clearInterval(de),de=null);const{autoplay:n,interval:a}=e;n&&a&&!t&&(de=window.setInterval(ee,a))}function xe(){const{autoplay:t}=e;t?ce():V.value<2&&ce(!0)}let be=0,we=0,ye=0,Se=0,Ne=1;function Ie(e){const{value:t}=_,n=t?"height":"width",a=T.value[n],l=pe(e)?e.touches[0]:e,o=t?l.clientY-we:l.clientX-be;ye=fe(o,-a,a),Ne=4,p.value&&ae(L-ye,0)}function je(){const e=Date.now()-Se,{value:t}=k,{value:n}=Y,{value:a}=p;let l=n;if(!ne&&a&&0!==ye){const e=L-ye,t=[...R.value.slice(0,A.value-1),ie()];let n=null;for(let a=0;a<t.length;a++){const o=Math.abs(t[a]-e);if(null!==n&&n<o)break;n=o,l=a}}if(l===n){const a=T.value[t];ye>a/2||ye/e>.4?l=Z(n):(ye<-a/2||ye/e<-.4)&&(l=W(n))}null!==l&&l!==n?(Ne=8,K(l)):(Ne=4&Ne?16:32,le(j.value)),xe(),_e()}function _e(){1&Ne||(Pe=!1,6&Ne&&(Ne=1)),be=0,we=0,ye=0,Se=0,$("touchmove",document,Ie),$("touchend",document,je),$("touchcancel",document,je),$("mousemove",document,Ie),$("mouseup",document,je)}d((()=>{b(xe),w((()=>F=!0))})),c((()=>{_e(),ce(!0)})),y((()=>{const{value:e}=r,{value:t}=i,n=new Map,a=e=>n.has(e)?n.get(e):-1;let l=!1;for(let o=0;o<e.length;o++){const a=t.findIndex((t=>t.el===e[o]));a!==o&&(l=!0),n.set(e[o],a)}l&&e.sort(((e,t)=>a(e)-a(t)))})),S(g(e,"currentIndex"),(e=>void 0!==e&&G(e))),S(f,(()=>{w((()=>G(M.value)))})),S(R,(()=>p.value&&le()),{deep:!0}),S(p,(e=>{e?le():(ne=!1,ae(L=0))}));const ke={arrowSlotProps:u((()=>Object.assign({total:V.value,currentIndex:M.value},m(ue,["to","prev","next","isPrevDisabled","isNextDisabled"])))),dotSlotProps:u((()=>({total:V.value,currentIndex:M.value,to:G})))},Te={getCurrentIndex:()=>M.value,to:G,prev:Q,next:ee},ze=D("Carousel","-carousel",De,B,e,t),$e=u((()=>{const{common:{cubicBezierEaseInOut:e},self:{dotSize:t,dotColor:n,dotColorActive:a,dotColorFocus:l,dotLineWidth:o,dotLineWidthActive:r,arrowColor:i}}=ze.value;return{"--n-bezier":e,"--n-dot-color":n,"--n-dot-color-focus":l,"--n-dot-color-active":a,"--n-dot-size":t,"--n-dot-line-width":o,"--n-dot-line-width-active":r,"--n-arrow-color":i}})),Be=l?C("carousel",void 0,$e,e):void 0;return Object.assign(Object.assign(Object.assign({mergedClsPrefix:t,selfElRef:o,slideVNodes:i,duplicatedable:f,userWantsControl:s,autoSlideSize:P,displayIndex:M,realIndex:Y,slideStyles:U,translateStyle:te,handleTouchstart:function(t){if(Pe)return;Se=Date.now(),Ne=2,Pe=!0,ce(!0),"touchstart"===t.type||t.target.isContentEditable||t.preventDefault();const n=pe(t)?t.touches[0]:t;_.value?we=n.clientY:be=n.clientX,e.touchable&&(z("touchmove",document,Ie),z("touchend",document,je),z("touchcancel",document,je)),e.draggable&&(z("mousemove",document,Ie),z("mouseup",document,je))},handleTransitionEnd:function(){const{value:e}=X,{value:t}=Y;ne&&e!==t?oe(t,0):ce(),p.value&&(te.value.transitionDuration="0ms"),ne=!1},handleMousewheel:function(e){if(e.preventDefault(),ne)return;const{value:t}=_;let{deltaX:n,deltaY:a}=e;e.shiftKey&&!n&&(n=a);const l=(n||a)>0?1:-1;let o=0,r=0;t?r=l:o=l,(r*a>=10||o*n>=10)&&(1!==l||q()?-1!==l||J()||Q():ee())},handleResize:function(){T.value=ve(o.value,!0),ce()},handleSlideResize:function(){var e,t;P.value&&(null===(t=(e=O.effect).scheduler)||void 0===t||t.call(e),O.effect.run())},isActive:function(e){return M.value===e}},ke),Te),{cssVars:l?void 0:$e,themeClass:null==Be?void 0:Be.themeClass,onRender:null==Be?void 0:Be.onRender})},render(){var e;const{mergedClsPrefix:t,showArrow:n,userWantsControl:a,draggable:l,touchable:o,slideStyles:i,dotType:s,dotPlacement:u,transitionProps:d={},arrowSlotProps:c,dotSlotProps:p,$slots:{default:v,dots:f,arrow:h}}=this,m=v&&N(v())||[];let g=function(e,t=[]){Array.isArray(e)&&e.forEach((e=>{e.type&&"CarouselItem"===e.type.name&&t.push(e)}));return t}(m);g.length||(g=m.map((e=>r(Se,null,{default:()=>P(e)}))));const{length:x}=g;return x>1&&this.duplicatedable&&(g.push(je(g[0],0,"append")),g.unshift(je(g[x-1],x-1,"prepend"))),this.slideVNodes.value=g,this.autoSlideSize&&(g=g.map((e=>r(I,{onResize:this.handleSlideResize},{default:()=>e})))),null===(e=this.onRender)||void 0===e||e.call(this),r("div",{ref:"selfElRef",class:[this.themeClass,`${t}-carousel`,"vertical"===this.direction&&`${t}-carousel--vertical`,this.showArrow&&`${t}-carousel--show-arrow`,`${t}-carousel--${u}`,`${t}-carousel--${this.direction}`,`${t}-carousel--${this.effect}`,a&&`${t}-carousel--usercontrol`],style:this.cssVars},r(I,{onResize:this.handleResize},{default:()=>r("div",{class:`${t}-carousel__slides`,role:"listbox",style:this.translateStyle,onMousedown:l?this.handleTouchstart:void 0,onTouchstart:o?this.handleTouchstart:void 0,onWheel:this.mousewheel?this.handleMousewheel:void 0,onTransitionend:this.handleTransitionEnd},a?g.map(((e,t)=>r("div",{style:i[t],key:t},_(r(T,Object.assign({},d),{default:()=>e}),[[k,this.isActive(t)]])))):g)}),this.showDots&&j(f,p,(()=>[p.total>1&&r(xe,{key:s+u,total:p.total,currentIndex:p.currentIndex,dotType:s,trigger:this.trigger,keyboard:this.keyboard})])),n&&j(h,c,(()=>[r(ye,null)])))}});function je(e,t,n){return P(e,{key:`carousel-item-duplicate-${t}-${n}`})}const _e=t({name:"CarouselItem",components:{NCarousel:Ie,NInput:R,NSpace:le,NUpload:oe,NModal:F,NButton:U},props:["picIndex","itemData"],setup(e,{emit:t}){const n=M+"/upload/4",l=A(),o=re(),r=ie(),i=V([]),s=V({Authorization:localStorage.getItem("token")}),u=V({userId:""});d((()=>{u.userId=l.state.user.userid,""==e.itemData.fileObj.url&&i.pop()}));return S([()=>e.itemData.fileObj.url,()=>e.itemData.fileObj.name,()=>e.itemData.fileObj.id],(([e,t,n])=>{""!=e&&(i[0]={name:t,url:e,status:"finished",id:n})}),{immediate:!0,deep:!0}),{apiBaseUrlUpload:n,headers:s,uploadData:u,previewFileList:i,beforeUpload:e=>{var t;return!((null==(t=e.file.file)?void 0:t.size)>=512e3)||(o.error("限制图片大小为500KB以内，请重新上传"),!1)},removeSingleFile:async({file:t,fileList:n})=>{const a=e.itemData.fileObj.name;console.log(a);let l=await(o={fileName:a},O({url:"/delfile/upload/single/4",method:"post",data:o}));var o,i,s;console.log(l),e.itemData.fileObj.url="",200==l.status&&(i="success",s=l.message,r[i]({content:s,duration:1500}))},handleFinish:({file:n,event:a})=>{const l=(null==a?void 0:a.target).response,r=JSON.parse(l);if(console.log(r),200==r.status){o.success(r.message);let n=r.data.fileName,a=e.picIndex;console.log(n),t("updateFileName",{newFileName:n,picIndex:a})}else o.error(r.message);return n},distance:a(36)}}}),ke=W(" 描述: "),Te=W(" 描述: "),ze=W(" 主题: "),$e=W(" 配图: "),Be=W(" 主题: "),Oe=W(" 描述: ");const Re=t({components:{NDivider:ce,NCarousel:Ie,NSpace:le,CarouselItem:E(_e,[["render",function(e,t,n,a,l,o){const r=X("n-input"),i=X("n-space"),s=X("n-upload");return Y(),L(i,{align:"center"},{default:K((()=>[Z(i,{vertical:"",size:e.distance},{default:K((()=>[Z(i,{align:"center"},{default:K((()=>[ke,Z(r,{value:e.itemData.leftTopDesc,"onUpdate:value":t[0]||(t[0]=t=>e.itemData.leftTopDesc=t),type:"text",placeholder:"请输入.."},null,8,["value"])])),_:1}),Z(i,{align:"center"},{default:K((()=>[Te,Z(r,{value:e.itemData.leftBottomDesc,"onUpdate:value":t[1]||(t[1]=t=>e.itemData.leftBottomDesc=t),type:"text",placeholder:"请输入.."},null,8,["value"])])),_:1}),Z(i,{align:"center"},{default:K((()=>[ze,Z(r,{value:e.itemData.leftTitle,"onUpdate:value":t[2]||(t[2]=t=>e.itemData.leftTitle=t),type:"text",placeholder:"请输入.."},null,8,["value"])])),_:1})])),_:1},8,["size"]),Z(i,{vertical:""},{default:K((()=>[Z(i,null,{default:K((()=>[$e,Z(s,{action:e.apiBaseUrlUpload,headers:e.headers,data:e.uploadData,"default-file-list":e.previewFileList,"list-type":"image-card",max:"1",accept:".jpg,.jpeg,.png,.webp",onBeforeUpload:e.beforeUpload,onRemove:e.removeSingleFile,onFinish:e.handleFinish},null,8,["action","headers","data","default-file-list","onBeforeUpload","onRemove","onFinish"])])),_:1}),Z(i,{align:"center"},{default:K((()=>[Be,Z(r,{value:e.itemData.rightTitle,"onUpdate:value":t[3]||(t[3]=t=>e.itemData.rightTitle=t),type:"text",placeholder:"请输入.."},null,8,["value"])])),_:1}),Z(i,{align:"center"},{default:K((()=>[Oe,Z(r,{value:e.itemData.rightDesc,"onUpdate:value":t[4]||(t[4]=t=>e.itemData.rightDesc=t),type:"text",placeholder:"请输入.."},null,8,["value"])])),_:1})])),_:1})])),_:1})}]]),NConfigProvider:H,NButton:U,NSpin:se,NPopover:J,HelpButton:de},setup(){const e=A(),t=a(""),n=a(!1),l=ie(),o=a(!1);let r=V([{leftTopDesc:"",leftBottomDesc:"",leftTitle:"",rightTitle:"",rightDesc:"",fileObj:{id:"",name:"",status:"finished",url:""}},{leftTopDesc:"",leftBottomDesc:"",leftTitle:"",rightTitle:"",rightDesc:"",fileObj:{id:"",name:"",status:"finished",url:""}},{leftTopDesc:"",leftBottomDesc:"",leftTitle:"",rightTitle:"",rightDesc:"",fileObj:{id:"",name:"",status:"finished",url:""}},{leftTopDesc:"",leftBottomDesc:"",leftTitle:"",rightTitle:"",rightDesc:"",fileObj:{id:"",name:"",status:"finished",url:""}},{leftTopDesc:"",leftBottomDesc:"",leftTitle:"",rightTitle:"",rightDesc:"",fileObj:{id:"",name:"",status:"finished",url:""}}]);d((async()=>{let a=await(l={userId:e.state.user.userid},O({url:"/getinfo/4",method:"post",data:l}));var l;console.log(a);let o=a.data;if(o){for(let e=0;e<o.RotationMap.length;e++){let t=o.RotationMap[e];for(let n in t)r[e][n]=t[n]}console.log(r),t.value="修改设置"}else t.value="保存设置";n.value=!1})),c((async()=>{let t=await(n={userId:e.state.user.userid},O({url:"/delfile/upload/4",method:"post",data:n}));var n;console.log(t)}));const{saveSetting:i}=ue(),s=async()=>{let n=null;var a,o,i;"保存设置"==t.value?(n=await(a={userId:e.state.user.userid,RotationMap:r},O({url:"/createinfo/4",method:"post",data:a})),t.value="修改设置"):"修改设置"==t.value&&(console.log(r),n=await function(e){return O({url:"/updateinfo/4",method:"post",data:e})}({userId:e.state.user.userid,RotationMap:r})),console.log(n),200==n.status&&(o="success",i=n.message,l[o]({content:i,duration:1300}))};return{arr:r,themeOverrides:{Carousel:{dotColor:"#afafaf",dotColorActive:"#555",arrowColor:"#666"}},btnText:t,loading:n,showPopover:o,saveContent:async()=>{n.value=!0,await i(s),n.value=!1},updateFileName:async({newFileName:e,picIndex:t})=>{r[t].fileObj.id=t,r[t].fileObj.name=e},tipEvent:async()=>{o.value=!0}}}}),Fe=(e=>(Q("data-v-d53cd29c"),e=e(),ee(),e))((()=>te("h2",null,"第四页 - 我们的轮播图",-1))),Ue={class:"container"};var Ae=E(Re,[["render",function(e,t,n,a,l,o){const r=X("n-divider"),i=X("carousel-item"),s=X("n-space"),u=X("n-carousel"),d=X("n-config-provider"),c=X("help-button"),p=X("n-button"),v=X("n-spin");return Y(),q(G,null,[Fe,Z(v,{size:"large",show:e.loading},{default:K((()=>[te("div",Ue,[Z(r),Z(d,{"theme-overrides":e.themeOverrides},{default:K((()=>[Z(u,{"show-arrow":"","dot-type":"line"},{default:K((()=>[(Y(!0),q(G,null,ne(e.arr,((t,n)=>(Y(),q("div",{class:"carousel-item-box",key:n},[Z(s,{justify:"center",align:"center"},{default:K((()=>[Z(i,{picIndex:n,itemData:t,onUpdateFileName:e.updateFileName},null,8,["picIndex","itemData","onUpdateFileName"])])),_:2},1024)])))),128))])),_:1})])),_:1},8,["theme-overrides"]),Z(r)]),Z(s,{style:{"margin-top":"20px"},justify:"center"},{default:K((()=>[Z(c,{picSrc:"https://tva1.sinaimg.cn/large/e6c9d24ely1h2abgxktlwj21ck0u0jwk.jpg",place:"left-start",heightValue:"370",widthValue:"500"}),Z(p,{strong:"",secondary:"",type:"primary",onClick:e.saveContent},{default:K((()=>[W(ae(e.btnText),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["show"])],64)}],["__scopeId","data-v-d53cd29c"]]);export{Ae as default};