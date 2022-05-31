import{_ as e,d as a,N as t,e as n,ap as s,u as l,a as o,c as u,b as r,R as i,f as c,o as d,a1 as p,w as v,aq as m,i as g,t as f,h as y,j as _,g as h,$ as w,ar as b}from"./index.e6bef697.js";import{N,u as x}from"./useReduceFn.9f971245.js";import{N as j}from"./Space.d17362ee.js";import{N as z}from"./Divider.52d14f9f.js";import{u as C}from"./use-notification.65ba42d5.js";import"./get-slot.65c4337d.js";const O=a({name:"User",components:{NInput:t,NSpace:j,NDivider:z,NButton:n,NSpin:N,NPopover:s},setup(){const e=l(),a=o(),t=u(""),n=u(""),s=u(""),c=u(""),d=u(!0),p=u("修改信息"),v=C(),{t:g}=r();let f=u(!1);i((()=>{t.value=e.state.user.username,n.value=e.state.user.password,s.value=e.state.user.email,c.value=1===e.state.user.gender?"男":"女",d.value=!1}));const{saveSetting:y}=x(),_=async()=>{let a=null;var s,l;"修改信息"==p.value&&(a=await m({userId:e.state.user.userid,username:t.value,password:n.value})),console.log(a),200==a.status&&(s="success",l=a.message,v[s]({content:l,duration:1500})),d.value=!1};return{cancelable:f,handleLogOut:function(){f.value?(e.commit("user/USER_LOGOUT"),a.push("/login")):f.value=!0},cancleLogOut:function(){f.value=!1},t:g,btnText:p,username:t,password:n,email:s,gender:c,saveContent:async()=>{d.value=!0,await y(_),d.value=!1},loading:d}}}),U={class:"container"},k={class:"header"},L=_(" 邮箱: "),S=_(" 性别: "),I=_(" 用户: "),R=_(" 密码: "),T=_(" , ");var D=e(O,[["render",function(e,a,t,n,s,l){const o=c("n-divider"),u=c("n-input"),r=c("n-space"),i=c("n-button"),m=c("n-spin");return d(),p(m,{size:"large",show:e.loading},{default:v((()=>[g("div",U,[g("div",k,[g("h3",null,f(e.t("common.hi"))+", "+f(e.username),1)]),y(o),y(r,{vertical:"",align:"center",size:e.distance},{default:v((()=>[y(r,{align:"center"},{default:v((()=>[L,y(u,{value:e.email,"onUpdate:value":a[0]||(a[0]=a=>e.email=a),type:"text",size:"large",placeholder:"请输入..",readonly:""},null,8,["value"])])),_:1}),y(r,{align:"center"},{default:v((()=>[S,y(u,{value:e.gender,"onUpdate:value":a[1]||(a[1]=a=>e.gender=a),type:"text",size:"large",placeholder:"请输入..",readonly:""},null,8,["value"])])),_:1}),y(r,{align:"center"},{default:v((()=>[I,y(u,{value:e.username,"onUpdate:value":a[2]||(a[2]=a=>e.username=a),type:"text",size:"large",placeholder:"请输入.."},null,8,["value"])])),_:1}),y(r,{align:"center"},{default:v((()=>[R,y(u,{value:e.password,"onUpdate:value":a[3]||(a[3]=a=>e.password=a),type:"text",size:"large",placeholder:"请输入.."},null,8,["value"])])),_:1}),y(r,null,{default:v((()=>[y(i,{strong:"",secondary:"",type:"primary",onClick:e.saveContent},{default:v((()=>[_(f(e.btnText),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["size"]),y(o),g("p",null,[g("a",{onClick:a[4]||(a[4]=(...a)=>e.handleLogOut&&e.handleLogOut(...a))},[y(i,{strong:"",secondary:"",type:"primary"},{default:v((()=>[_(f(e.cancelable?e.t("common.confirm"):e.t("common.sign_out")+"账户"),1)])),_:1})]),e.cancelable?(d(),h(w,{key:0},[T,y(i,{strong:"",secondary:"",type:"warning",onClick:e.cancleLogOut},{default:v((()=>[_(f(e.t("common.cancel")),1)])),_:1},8,["onClick"])],64)):b("",!0)])])])),_:1},8,["show"])}],["__scopeId","data-v-abc6570a"]]);export{D as default};
