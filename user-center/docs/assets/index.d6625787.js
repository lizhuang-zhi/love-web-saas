import{aP as e,_ as a,d as t,N as s,e as l,u as n,c as o,R as u,f as i,o as r,g as d,h as c,w as p,$ as v,p as f,k as h,i as m,j as g,t as b}from"./index.8b07ba7d.js";import{N as j,u as w}from"./useReduceFn.a4e2f207.js";import{H as y}from"./HelpButton.8556d62d.js";import{N}from"./Divider.cb46a5e1.js";import{N as T}from"./Space.c94dbf27.js";import{u as _}from"./use-notification.ba77bf42.js";import"./get-slot.65c4337d.js";const x=t({components:{NDivider:N,NSpin:j,NSpace:T,NInput:s,NButton:l,HelpButton:y},setup(){const a=n(),t=o(!0),s=o(""),l=o(""),i=_();u((async()=>{let n=await function(a){return e({url:"/getinfo/details",method:"post",data:a})}({userId:a.state.user.userid});console.log(n);let o=n.data;o?(s.value=o.headTitle,l.value="修改设置"):l.value="保存设置",t.value=!1}));const{saveSetting:r}=w(),d=async()=>{let n=null;var o,u,r;"保存设置"==l.value?(n=await(o={userId:a.state.user.userid,headTitle:s.value},e({url:"/createinfo/details",method:"post",data:o})),l.value="修改设置"):"修改设置"==l.value&&(n=await function(a){return e({url:"/updateinfo/details",method:"post",data:a})}({userId:a.state.user.userid,headTitle:s.value})),console.log(n),200==n.status&&(u="success",r=n.message,i[u]({content:r,duration:1500})),t.value=!1};return{loading:t,saveContent:async()=>{t.value=!0,await r(d),t.value=!1},tipEvent:async()=>{showPopover.value=!0},headTitle:s,btnText:l}}}),I=e=>(f("data-v-7adf9f75"),e=e(),h(),e),S=I((()=>m("h2",null,"其他 - 网站其他设置",-1))),k={class:"container"},C=g(" 标签栏主题: "),z=I((()=>m("div",{class:"more"}," 更多功能, 敬请期待... (妈啦, 这不是客套话诶, 真有在开发的诶, 嘿嘿) ",-1)));var B=a(x,[["render",function(e,a,t,s,l,n){const o=i("n-divider"),u=i("n-input"),f=i("n-space"),h=i("help-button"),j=i("n-button"),w=i("n-spin");return r(),d(v,null,[S,c(w,{size:"large",show:e.loading},{default:p((()=>[m("div",k,[c(o),c(f,{vertical:""},{default:p((()=>[c(f,{align:"center"},{default:p((()=>[C,c(u,{value:e.headTitle,"onUpdate:value":a[0]||(a[0]=a=>e.headTitle=a),type:"text",size:"large",placeholder:"请输入.."},null,8,["value"])])),_:1}),c(f,null,{default:p((()=>[c(h,{picSrc:"https://tva1.sinaimg.cn/large/e6c9d24ely1h2botc85zij213k0l8wgc.jpg",place:"left-start",heightValue:"365",widthValue:"570"}),c(j,{strong:"",secondary:"",type:"primary",onClick:e.saveContent},{default:p((()=>[g(b(e.btnText),1)])),_:1},8,["onClick"])])),_:1})])),_:1}),z])])),_:1},8,["show"])],64)}],["__scopeId","data-v-7adf9f75"]]);export{B as default};