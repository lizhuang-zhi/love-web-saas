var _=Object.defineProperty,g=Object.defineProperties;var v=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var d=(e,o,n)=>o in e?_(e,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[o]=n,i=(e,o)=>{for(var n in o||(o={}))O.call(o,n)&&d(e,n,o[n]);if(c)for(var n of c(o))h.call(o,n)&&d(e,n,o[n]);return e},m=(e,o)=>g(e,v(o));import{i as L,u as y,m as k,p as C,r as S,o as p,s as f,B as s,C as t,F as b,x as B,a2 as $}from"./vendor.46850bd5.js";import{_ as N,m as R}from"./index.0dd35603.js";const U=L({name:"User",setup(){const e=y(),o=k(),{t:n}=C();let a=S(!1);function l(){a.value?(e.commit("user/USER_LOGOUT"),o.push("/login")):a.value=!0}function u(){a.value=!1}return m(i({cancelable:a},R(e.state.user,["name"])),{handleLogOut:l,cancleLogOut:u,t:n})}}),V={class:"content"},j={class:"header"},E=$(" , ");function F(e,o,n,a,l,u){return p(),f("div",V,[s("div",j,[s("h3",null,t(e.t("common.hi"))+", "+t(e.name),1)]),s("p",null,[s("a",{onClick:o[0]||(o[0]=(...r)=>e.handleLogOut&&e.handleLogOut(...r))},t(e.cancelable?e.t("common.confirm"):e.t("common.sign_out")),1),e.cancelable?(p(),f(b,{key:0},[E,s("a",{onClick:o[1]||(o[1]=(...r)=>e.cancleLogOut&&e.cancleLogOut(...r)),style:{opacity:"0.6"}},t(e.t("common.cancel")),1)],64)):B("",!0)])])}var G=N(U,[["render",F],["__scopeId","data-v-4393364d"]]);export{G as default};
//# sourceMappingURL=index.ae7c14c5.js.map
