var Me=Object.defineProperty;var Ae=Object.getOwnPropertySymbols;var Oe=Object.prototype.hasOwnProperty,$e=Object.prototype.propertyIsEnumerable;var ae=(e,t,n)=>t in e?Me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t)=>{for(var n in t||(t={}))Oe.call(t,n)&&ae(e,n,t[n]);if(Ae)for(var n of Ae(t))$e.call(t,n)&&ae(e,n,t[n]);return e};import{u as L,r as v,w as Re,d as Ne,o as l,c as S,a as f,b as Fe,e as B,N as Be,f as p,g as _,h as Pe,i as P,j as K,k as De,l as ie,m as le,n as y,p as V,q as Ue,s as h,F as G,t as Z,v as W,x as I,y as J,z,A as ee,B as u,C as w,D as M,E as He,G as Ve,H as Ge,I as qe,J as xe,K as Qe,L as Ye,M as ce,O as je,P as Xe,Q as q,R as Ke,S as Ze,T as We,U as Je,V as ze,W as et,X as tt,Y as nt,Z as st}from"./vendor.46850bd5.js";const ot=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const A of a.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&o(A)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}};ot();const At={setup(e){const t=L(),n=v(null),o={common:{borderRadius:"4px"},Form:{feedbackTextColorError:"#EF4668"},Input:{border:"none",borderHover:"none",borderFocus:"none",paddingMedium:"20px",errorColorHover:"#FC536E",borderError:"1px solid #FC536E",borderFocusError:"1px solid #FC536E",borderHoverError:"1px solid #FC536E"}},s={common:{primaryColor:"#3a3a3aFF",primaryColorHover:"#2a2a2aFF",primaryColorPressed:"#000000FF",primaryColorSuppl:"#3f3f3fFF"}},a={common:{primaryColor:"#fafafa",primaryColorHover:"#fff",primaryColorPressed:"#fafafa99",primaryColorSuppl:"#f3f3f3"}},A=v(Object.assign(t.state.settings.theme==="theme-dark"?a:s));return Re(()=>{let r=t.state.settings.theme==="theme-dark";n.value=r?Ne:null,A.value=Object.assign(o,r?a:s)}),(r,i)=>(l(),S(B(Be),{theme:n.value,"theme-overrides":A.value},{default:f(()=>[Fe(r.$slots,"default")]),_:3},8,["theme","theme-overrides"]))}},at={setup(e){return(t,n)=>{const o=p("router-view");return l(),S(At,null,{default:f(()=>[_(B(Pe),null,{default:f(()=>[_(o)]),_:1})]),_:1})}}},rt="modulepreload",ue={},it="/rho-admin/",k=function(t,n){return!n||n.length===0?t():Promise.all(n.map(o=>{if(o=`${it}${o}`,o in ue)return;ue[o]=!0;const s=o.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${a}`))return;const A=document.createElement("link");if(A.rel=s?"stylesheet":rt,s||(A.as="script",A.crossOrigin=""),A.href=o,document.head.appendChild(A),s)return new Promise((r,i)=>{A.addEventListener("load",r),A.addEventListener("error",i)})})).then(()=>t())};var O=(e,t)=>{const n=e.__vccOpts||e;for(const[o,s]of t)n[o]=s;return n};const lt=P({components:{NScrollbar:K,NDropdown:De},setup(e,{}){const t=L(),n=ie(),o=le(),s=y(()=>t.state.tabs),a=v(null),{t:A}=V(),r=v(!1),i=v(0),d=v(0),b=N();let m=null;n.path!=="/"&&U(n),o.afterEach(U);function U(c){if(c.path==="/"||c.path==="/login")return;let{name:g,path:T,fullPath:oe,query:X,meta:{title:Te,noCached:Le,i18n:Ie,titleFormat:we}}=c;t.commit("tabs/TABS_ADD",{title:Te,titleFormat:we,name:g,path:T,noCached:Le,i18n:Ie,query:X,fullPath:oe})}function H(c){t.commit("tabs/TABS_CLOSE",c)}function $(c){const g=a.value,T=c.wheelDelta||-c.deltaY*40;let X=g.scrollbarInstRef.containerRef.scrollLeft+T/4;g.scrollTo(X)}function R(c){switch(c){case"close-all":t.commit("tabs/TABS_CLOSE_ALL");break;case"close-left":case"close-others":t.commit("tabs/TABS_CLOSE_MULTI",{tab:m,key:c});break;case"refresh":t.commit("tabs/TABS_REFRESH",m);break}F()}function N(){return[{label:A("common.close_all"),key:"close-all",icon:C("ri-delete-bin-line")},{label:A("common.close_left"),key:"close-left",icon:C("ri-menu-fold-fill")},{label:A("common.close_others"),key:"close-others",icon:C("ri-arrow-left-right-fill")},{label:A("common.refresh"),key:"refresh",icon:C("ri-refresh-line")}]}function Y(c,g){r.value=!1,m=c,J(()=>{r.value=!0,i.value=g.pageX,d.value=g.pageY})}function F(){r.value=!1,m=null}function C(c){return()=>Ue("i",{class:c})}function j(c,g,T){return g?T?T(A(c)):A(c):c}return{scrollbar$:a,tabs:s,showContextMenu:r,CoordX:i,CoordY:d,ContextMenuOptions:b,handleClose:H,handleScroll:$,handleContextMenu:Y,hideContextMenu:F,handleContextMenuSelect:R,generateContextMenu:N,titleFormatter:j}}}),ct=e=>(z("data-v-8751871e"),e=e(),ee(),e),ut={key:0,class:"i-nav-tabs"},dt=["onClick"],mt=ct(()=>u("template",null,null,-1));function ht(e,t,n,o,s,a){const A=p("router-link"),r=p("n-scrollbar"),i=p("n-dropdown");return e.tabs.tabs.length?(l(),h("div",ut,[_(r,{"x-scrollable":"",onWheel:W(e.handleScroll,["prevent"]),ref:"scrollbar$"},{default:f(()=>[(l(!0),h(G,null,Z(e.tabs.tabs,d=>(l(),S(A,{to:d.fullPath,key:d.name,class:M(["i-nav-tab",{"tab-active":e.tabs.active===d.name}]),onContextmenu:W(b=>e.handleContextMenu(d,b),["prevent"])},{default:f(()=>[u("span",null,w(e.titleFormatter(d.title,d.i18n,d.titleFormat)),1),u("i",{class:"ri-close-line",onClick:W(b=>e.handleClose(d),["prevent"])},null,8,dt)]),_:2},1032,["to","class","onContextmenu"]))),128))]),_:1},8,["onWheel"]),_(i,{show:e.showContextMenu,options:e.generateContextMenu(),x:e.CoordX,y:e.CoordY,"on-clickoutside":e.hideContextMenu,onSelect:e.handleContextMenuSelect,trigger:"manual",placement:"bottom-start"},{default:f(()=>[mt]),_:1},8,["show","options","x","y","on-clickoutside","onSelect"])])):I("",!0)}var _t=O(lt,[["render",ht],["__scopeId","data-v-8751871e"]]);const te="RHO-SETTINGS",xn="Daphne Odera",de="RHO",Qn=!1,me={theme:"",locale:"cn"};function ft(){const e=localStorage.getItem(te),t=e?Object.assign({},me,JSON.parse(e)):me;return t.theme&&document.body.classList.add(t.theme),t}const he=ft();function _e(e,t){var n;return e=(n=e.find(o=>o.name==="Main"))==null?void 0:n.children,fe(e)}function fe(e,t){return e.filter(n=>{let{meta:{auth:o=[],hide:s},children:a=[]}=n;return s?!1:(a.length&&(n.children=fe(a)),!0)})}function pt(e){e=e||document.documentElement,document.fullscreenElement||document.webkitFullscreenElement?(document.exitFullscreen||document.webkitExitFullscreen).call(document):(e.requestFullscreen||e.webkitRequestFullScreen).call(e)}const vt=P({name:"Header",components:{NAvatar:He,NTooltip:Ve,NavTabs:_t},setup(e,{attrs:t}){const n=L(),o=n.state.user,{t:s}=V();function a(){n.commit("settings/CHANGE_LOCALE")}function A(){n.commit("settings/CHANGE_THEME")}function r(i){return i.substr(0,1)}return{user:o,attrs:t,fullscreen:pt,changeTheme:A,changeLocale:a,firstLetter:r,t:s}}}),pe=e=>(z("data-v-0a08d1d6"),e=e(),ee(),e),gt={class:"i-header"},bt={class:"i-header-items"},St={class:"i-dropdown"},kt=pe(()=>u("a",{class:"ri-more-fill i-btn"},null,-1)),Et={class:"i-dropmenu"},yt=pe(()=>u("i",{class:"ri-settings-3-fill"},null,-1)),Ct={class:"i-avatar"},Tt={key:0},Lt={key:1};function It(e,t,n,o,s,a){const A=p("nav-tabs"),r=p("router-link"),i=p("n-tooltip");return l(),h("div",gt,[_(A),u("div",bt,[u("div",St,[kt,u("div",Et,[u("a",{onClick:t[0]||(t[0]=(...d)=>e.changeLocale&&e.changeLocale(...d)),class:"ri-translate i-btn"}),_(r,{to:"/settings",class:"i-btn"},{default:f(()=>[yt]),_:1}),u("a",{onClick:t[1]||(t[1]=(...d)=>e.changeTheme&&e.changeTheme(...d)),class:"ri-moon-clear-fill i-btn"}),u("a",{class:"ri-fullscreen-line i-btn",onClick:t[2]||(t[2]=d=>e.fullscreen())})])]),_(i,null,{trigger:f(()=>[e.user.name?(l(),S(r,{key:0,to:"/user",class:"i-btn i-user"},{default:f(()=>[u("span",Ct,w(e.firstLetter(e.user.name)),1)]),_:1})):(l(),S(r,{key:1,to:"/login",class:"ri-ghost-fill i-btn"}))]),default:f(()=>[e.user.name?(l(),h("span",Tt,w(e.user.name),1)):(l(),h("span",Lt,w(e.t("common.sign_in")),1))]),_:1})])])}var wt=O(vt,[["render",It],["__scopeId","data-v-0a08d1d6"]]);const Mt=P({name:"Menu",props:{menus:{type:Array,default:[]},root:{type:Boolean,default:!0}},setup(){const e=le(),t=ie(),{t:n}=V(),o=v(t.path);e.afterEach(A=>{o.value=A.fullPath});function s(A){o.value===A?o.value="/":o.value=A}function a({i18n:A,title:r,titleFormat:i}){return A?(r=n(r),i?i(r):r):r}return{active:o,handleToggle:s,titleFormatter:a}}}),Ot={class:"i-menu-item"},$t=["innerHTML"],Rt=["onClick"],Nt={key:0,class:"i-sub-menu"};function Ft(e,t,n,o,s,a){const A=p("router-link"),r=p("Menu",!0);return l(!0),h(G,null,Z(e.menus,i=>{var d,b;return l(),h("li",{key:i.fullPath,class:M(["i-menu-li",{"i-active":e.active.startsWith(i.path)}])},[u("div",Ot,[_(A,{to:i.path,class:"i-menu-label"},{default:f(()=>{var m;return[((m=i.meta)==null?void 0:m.icon)?(l(),h("span",{key:0,innerHTML:i.meta.icon,class:"i-menu-icon"},null,8,$t)):I("",!0),u("span",{class:M(["i-menu-title",{"i-hide-on-mini":e.root}])},w(e.titleFormatter(i.meta)),3)]}),_:2},1032,["to"]),((d=i.children)==null?void 0:d.length)?(l(),h("i",{key:0,class:M(["ri-arrow-down-s-line i-menu-toggle",{"i-hide-on-mini":e.root}]),onClick:m=>e.handleToggle(i.path)},null,10,Rt)):I("",!0)]),((b=i.children)==null?void 0:b.length)?(l(),h("ul",Nt,[_(r,{menus:i.children,root:!1},null,8,["menus"])])):I("",!0)],2)}),128)}var Bt=O(Mt,[["render",Ft],["__scopeId","data-v-1db6057b"]]),Pt="data:image/png;base64,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";const Dt=P({name:"Sidebar",components:{NScrollbar:K,NAutoComplete:Ge,Menu:Bt,NModal:qe,NSkeleton:xe},setup(){const e=L(),t=50,n=_e(ne,e.state.user.role),{t:o}=V(),s=v(t),a=v(!1),A=y(()=>{let c=`width: ${s.value}px;`;return a.value&&(c+="transition: none !important;"),c}),r=y(()=>s.value<180),i=v(!1),d=v(""),b=v([]),m=v(!0),U=y(()=>e.state.settings.sidebar_reverse&&e.state.settings.theme!=="theme-dark");let H=0,$=s.value,R=$;Qe(()=>{window.innerWidth>720&&(s.value=R=240),document.addEventListener("mouseup",F),document.addEventListener("mousemove",N)}),Ye(()=>{document.removeEventListener("mouseup",F),document.removeEventListener("mousemove",N)});function N(c){if(a.value){c.preventDefault();let g=$+(c.pageX-H);g<180&&(g=t),s.value=g}}function Y(){s.value=s.value===t?R:t}function F(){a.value&&(a.value=!1,s.value!==t&&(R=s.value))}function C(c){a.value=!0,H=c.pageX,$=s.value}function j(){i.value=!i.value}return{Store:e,sidebarReverse:U,APP_LOGO:Pt,APP_TITLE:de,loading:m,menus:n,cssSidebar:A,mini:r,valueSearch:d,modalSearch:i,optionsSearch:b,toggleModalSearch:j,startResizeSidebar:C,handleSidebarToggle:Y,t:o}}}),Ut={class:"i-sidebar-header"},Ht={class:"i-logo"},Vt=["src"],Gt={key:1,class:"i-app-title"},qt={key:0,class:"i-menus"},xt={class:"i-menus"};function Qt(e,t,n,o,s,a){const A=p("n-skeleton"),r=p("Menu"),i=p("n-scrollbar"),d=p("n-auto-complete"),b=p("n-modal");return l(),h(G,null,[u("div",{style:ce(e.cssSidebar),class:M([{"i-sidebar-mini":e.mini,"theme-dark":e.sidebarReverse,"theme-light":e.Store.state.settings.theme==="theme-dark"&&e.Store.state.settings.sidebar_reverse===!0},"i-sidebar"])},[u("div",Ut,[e.loading?(l(),S(A,{key:0,width:40,height:24,sharp:!1})):I("",!0),u("div",Ht,[u("img",{src:e.APP_LOGO,onLoad:t[0]||(t[0]=m=>e.loading=!1)},null,40,Vt)]),e.mini?I("",!0):(l(),h("h1",Gt,w(e.APP_TITLE),1)),u("a",{onClick:t[1]||(t[1]=(...m)=>e.toggleModalSearch&&e.toggleModalSearch(...m)),class:"ri-search-line i-sidebar-search i-btn"}),u("a",{onClick:t[2]||(t[2]=(...m)=>e.handleSidebarToggle&&e.handleSidebarToggle(...m)),class:"ri-menu-4-line i-sidebar-toggle i-btn"})]),e.mini?(l(),h("ul",qt,[_(r,{menus:e.menus},null,8,["menus"])])):(l(),S(i,{key:1},{default:f(()=>[u("ul",xt,[_(r,{menus:e.menus},null,8,["menus"])])]),_:1})),u("div",{onMousedown:t[3]||(t[3]=(...m)=>e.startResizeSidebar&&e.startResizeSidebar(...m)),class:"i-sidebar-toggle-line"},null,32)],6),_(b,{show:e.modalSearch,"onUpdate:show":t[5]||(t[5]=m=>e.modalSearch=m),bordered:!1},{default:f(()=>[_(d,{value:e.valueSearch,"onUpdate:value":t[4]||(t[4]=m=>e.valueSearch=m),options:e.optionsSearch,placeholder:e.t("common.search"),class:"i-search",clearable:"",size:"large"},null,8,["value","options","placeholder"])]),_:1},8,["show"])],64)}var Yt=O(Dt,[["render",Qt],["__scopeId","data-v-7b8cda02"]]);const jt={setup(e){const t=L(),n=y(()=>t.state.tabs.cacheViews);return(o,s)=>{const a=p("router-view");return l(),S(a,null,{default:f(({Component:A})=>[(l(),S(je,{include:B(n)},[(l(),S(Xe(A),{key:o.$route.fullPath}))],1032,["include"]))]),_:1})}}};function Xt(e,t){return Object.fromEntries(t.map(n=>typeof n=="string"?[n,y(()=>e[n])]:[n[1],y(()=>e[n[0]])]))}const Kt=e=>(z("data-v-65c976b1"),e=e(),ee(),e),Zt={class:"i-container"},Wt={class:"i-main"},Jt={key:1,class:"i-empty"},zt=Kt(()=>u("i",{class:"ri-layout-masonry-line"},null,-1)),en=[zt],tn={setup(e){const t=L();_e(ne,t.state.user.role);const{tabs:n}=Xt(t.state.tabs,["tabs"]);return(o,s)=>(l(),h("div",Zt,[_(Yt),u("div",Wt,[_(wt),B(n).length?(l(),S(B(K),{key:0,class:"i-content"},{default:f(()=>[_(jt)]),_:1})):(l(),h("div",Jt,en))])]))}};var nn=O(tn,[["__scopeId","data-v-65c976b1"]]);const sn="/dashboard";var on=[{name:"Dashboard",path:sn,component:()=>k(()=>import("./index.f15bc85b.js"),["assets/index.f15bc85b.js","assets/index.47f2cea8.css","assets/vendor.46850bd5.js"]),meta:{title:"routes.dashboard",i18n:!0,noCached:!0,icon:'<i class="ri-dashboard-fill"></i>'}}];const x="/menu";var An=[{name:"Menu",path:x,redirect:`${x}/1`,component:()=>k(()=>import("./index.54871c10.js"),["assets/index.54871c10.js","assets/vendor.46850bd5.js"]),meta:{title:"routes.menu",icon:'<i class="ri-folder-3-line"></i>',i18n:!0},children:[{name:"Menu-1",path:`${x}/1`,component:()=>k(()=>import("./menu-1.b174aed1.js"),["assets/menu-1.b174aed1.js","assets/menu-1.86e22ac0.css","assets/vendor.46850bd5.js"]),meta:{title:"routes.menu",titleFormat:e=>`${e} I`,auth:[],i18n:!0}},{name:"Menu-2",path:`${x}/2`,component:()=>k(()=>import("./menu-2.ed1ad110.js"),["assets/menu-2.ed1ad110.js","assets/menu-2.83cebf51.css","assets/vendor.46850bd5.js"]),meta:{title:"routes.menu",titleFormat:e=>`${e} II`,auth:[],i18n:!0}}]}];const an="/user";var rn=[{name:"User",path:an,component:()=>k(()=>import("./index.ae7c14c5.js"),["assets/index.ae7c14c5.js","assets/index.b7d402d6.css","assets/vendor.46850bd5.js"]),meta:{title:"routes.user",i18n:!0,hide:!0}}];const ln="/settings";var cn=[{name:"Settings",path:ln,component:()=>k(()=>import("./index.f1da2a20.js"),["assets/index.f1da2a20.js","assets/index.bf03e8d1.css","assets/vendor.46850bd5.js"]),meta:{title:"routes.setting",hide:!0}}],ne=[{name:"Main",path:"/",component:nn,meta:{title:"routes.dashboard",i18n:!0},children:[...on,...An,...rn,...cn]},{name:"Login",path:"/login",component:()=>k(()=>import("./index.7e745914.js"),["assets/index.7e745914.js","assets/index.07a26891.css","assets/vendor.46850bd5.js"]),meta:{title:"common.sign_in",i18n:!0}},{name:"404",path:"/:pathMatch(.*)*",component:()=>k(()=>import("./index.944181ca.js"),["assets/index.944181ca.js","assets/vendor.46850bd5.js"]),meta:{title:"404"}}];const se="user-id",un="user-role";function dn(){const e=q.get(se);return e?JSON.parse(e):!1}function mn(e){q.set(se,JSON.stringify(e))}function hn(){q.remove(se),q.remove(un)}var _n={common:{hi:"\u4F60\u597D",welcome:"\u6B22\u8FCE",sign_in:"\u767B\u5F55",sign_out:"\u6CE8\u9500",sign_up:"\u6CE8\u518C",confirm:"\u786E\u8BA4",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",search:"\u641C\u7D22",username:"\u7528\u6237\u540D",password:"\u5BC6\u7801",back:"\u8FD4\u56DE",close_left:"\u5173\u95ED\u5DE6\u4FA7",close_all:"\u5173\u95ED\u6240\u6709",close_others:"\u5173\u95ED\u5176\u5B83",refresh:"\u5237\u65B0"},routes:{dashboard:"\u4EEA\u8868\u76D8",home:"\u9996\u9875",setting:"\u8BBE\u7F6E",user:"\u7528\u6237\u4E2D\u5FC3",messages:"\u6D88\u606F\u4E2D\u5FC3",menu:"\u83DC\u5355"},settings:{theme_setting:"\u4E3B\u9898\u8BBE\u7F6E",theme_dark:"\u6DF1\u8272",theme_light:"\u6D45\u8272",auto:"\u81EA\u52A8",locale_setting:"\u8BED\u8A00",sidebar_reverse:"\u4FA7\u8FB9\u680F\u53CD\u8272",save:"\u4FDD\u5B58",restore:"\u6062\u590D\u9ED8\u8BA4\u503C",need_reload:"\u9700\u8981\u5237\u65B0\u540E\u751F\u6548",discard:"\u629B\u5F03",cancle:"\u53D6\u6D88"}},fn={common:{hi:"Hi",welcome:"Welcome",sign_in:"Sign In",sign_out:"Sign Out",sign_up:"Sign Up",confirm:"Confirm",cancel:"Cancel",close:"Close",search:"Search",username:"Username",password:"Password",back:"Return Back",close_left:"Close Left",close_all:"Close All",close_others:"Close Others",refresh:"Refresh"},routes:{dashboard:"Dashboard",home:"Home",setting:"Settings",user:"User",messages:"Messages",menu:"Menu"},settings:{theme_setting:"Theme",theme_dark:"Dark",theme_light:"Light",auto:"Auto",locale_setting:"Language",sidebar_reverse:"Sidebar Reverse",save:"Save",discard:"Discard",restore:"Restore",need_reload:"Restore after refresh",cancle:"Cancle"}};const ve=he.locale,Yn=[{label:"\u7B80\u4F53\u4E2D\u6587",value:"cn"},{label:"English",value:"en"}];var D=Ke({missingWarn:!1,silentFallbackWarn:!0,silentTranslationWarn:!0,legacy:!1,locale:ve,fallbackLocale:ve,messages:{cn:_n,en:fn}});const pn=he,vn={CHANGE_THEME:ge,CHANGE_LOCALE:be,UPDATE_SETTINGS:(e,t)=>{Object.assign(e,t),ge(e,e.theme),be(e,e.locale),localStorage.setItem(te,JSON.stringify(t))},RESTORE_SETTINGS:e=>{localStorage.setItem(te,null)}};function ge(e,t){t!==void 0?document.body.classList[t===""?"remove":"add"]("theme-dark"):(e.theme=e.theme===""?"theme-dark":"",document.body.classList.toggle("theme-dark"))}function be(e,t){t!==void 0?D.global.locale.value=t:D.global.locale.value=D.global.locale.value==="cn"?"en":"cn"}var gn={namespaced:!0,state:pn,mutations:vn};const bn=P({props:{messages:{type:Array,default:()=>[]}},setup(e){return re({},Ze(e))}}),Sn={class:"rho-messages"},kn=["onClick","innerHTML"];function En(e,t,n,o,s,a){return l(),h("div",Sn,[(l(!0),h(G,null,Z(e.messages,A=>(l(),h("div",{key:A.key,class:M([{"rho-active":A.show},"rho-message"]),style:ce(A.style),onClick:A.handleClick,innerHTML:A.html},null,14,kn))),128))])}var yn=O(bn,[["render",En],["__scopeId","data-v-1a1d6682"]]);const Cn={html:"...",timeout:3e3,closable:!0},Q=v([]);let Tn=0;const Ln=_(yn,{messages:Q.value});We(Ln,document.body);function In(e={}){const t=wn(e);return Q.value.push(t),Mn(t),J(()=>{setTimeout(()=>{t.show=!0},0)}),t}function wn(e){return typeof e=="string"&&(e=Object.assign({},Cn,{html:e})),e.key=Tn++,Je(e)}function Mn(e){let t=null;e.timeout&&(t=setTimeout(()=>{e.show=!1,Se(e.key)},e.timeout)),e.handleClick=()=>{e.onClick&&e.onClick(),e.closable&&(e.show=!1,Se(e.key),t&&clearTimeout(t))}}function Se(e){setTimeout(()=>{let t=Q.value.findIndex(n=>n.key===e);t>-1&&Q.value.splice(t,1)},240)}const On=ze.create({baseURL:"/api",timeout:8e3});On.interceptors.response.use(e=>e.data,e=>(In('<i class="ri-error-warning-fill" style="margin-right: 8px; color: #ff5b5b; font-size: 1.2em;"></i> \u63A5\u53E3\u8BF7\u6C42\u51FA\u9519'),!1));function $n({username:e,password:t}){return new Promise(n=>{setTimeout(()=>{n(e==="admin"?t==="admin"?{code:200,token:"rho-administrator",name:"\u03C1",avatar:"https://e7.pngegg.com/pngimages/550/224/png-clipart-rho-greek-alphabet-letter-case-gamma-letter-p-miscellaneous-angle-thumbnail.png",role:"admin"}:{code:2,msg:"Wrong Password"}:{code:1,msg:"User Doesn' Exist"})},1e3)})}const ke="USER_LOGIN",Ee="USER_LOGOUT",Rn="USER_INIT";function ye(){return{name:"",token:"",avatar:"",role:""}}const Nn=ye(),Fn={[ke]:(e,t)=>{mn(t)},[Ee]:e=>{e=Object.assign(e,ye()),hn()},[Rn]:(e,t)=>{e.token||(e=Object.assign(e,t))}},Bn={LOGIN:async({commit:e},t)=>{const n=await $n(t);return n.code===200&&e(ke,n),n},LOGOUT:({commit:e})=>{e(Ee)}};var Pn={namespaced:!0,state:Nn,mutations:Fn,actions:Bn};const Dn={tabs:[],active:"",cacheViews:[]},Un={},Hn={TABS_ADD:(e,t)=>{let n=e.tabs.find(o=>o.name===t.name);n?(e.active=t.name,n.fullPath=t.fullPath):(e.active=t.name,e.tabs.push(t)),t.noCached!==!0&&(e.cacheViews.push(t.name),e.cacheViews=[...new Set(e.cacheViews)])},TABS_CLOSE:(e,t)=>{let n=e.tabs.findIndex(s=>s.name===t.name),o=e.cacheViews.findIndex(s=>s===t.name);o>-1&&e.cacheViews.splice(o,1),e.tabs.splice(n,1),e.active===t.name&&(e.tabs.length?(t=e.tabs[n===0?0:--n],E.push({name:t.name})):E.push("/"))},TABS_CLOSE_MULTI:(e,t)=>{let{tab:n,key:o}=t;switch(o){case"close-others":e.tabs=[n],e.active=n.name;break;case"close-left":let s=e.tabs.findIndex(a=>a.name===n.name);s>-1&&e.tabs.splice(0,s),e.active=n.name,E.push({name:n.name});break}},TABS_CLOSE_ALL:e=>{e.tabs=[],e.active="",E.push("/")},TABS_REFRESH:(e,t)=>{let n=e.cacheViews.findIndex(o=>o===t.name);e.cacheViews.splice(n,1),J(()=>{E.push({query:Object.assign({},t.query,{_t:new Date().getTime()})})})}};var Vn={namespaced:!0,state:Dn,getters:Un,mutations:Hn},Ce=et({modules:{settings:gn,user:Pn,tabs:Vn}});const E=tt({history:nt(),routes:ne});E.beforeEach((e,t,n)=>{const o=dn();o&&Ce.commit("user/USER_INIT",o),n()});E.afterEach(e=>{let{title:t,i18n:n}=e==null?void 0:e.meta;t=n?D.global.t(t):t,document.title=`${de} ${t}`});st(at).use(D).use(Ce).use(E).mount("#app");export{xn as A,In as M,Qn as O,O as _,jt as a,Yn as l,Xt as m};
//# sourceMappingURL=index.0dd35603.js.map