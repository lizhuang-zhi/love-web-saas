import{N as e,u as a}from"./useReduceFn.a4e2f207.js";import{u as t}from"./useTools.4f5383e0.js";import{aP as s,_ as o,d as l,N as i,e as n,ap as r,c as u,u as d,r as p,R as c,am as f,f as v,o as m,g as h,h as g,w as N,$ as b,aR as j,p as y,k as U,i as x,j as _,t as w}from"./index.8b07ba7d.js";import{H as I}from"./HelpButton.8556d62d.js";import{N as B}from"./Divider.cb46a5e1.js";import{N as F}from"./Space.c94dbf27.js";import{N as S,u as z}from"./Upload.443b7270.js";import{u as T}from"./use-notification.ba77bf42.js";import"./get-slot.65c4337d.js";import"./Add.4456dee1.js";const k=l({components:{NInput:i,NButton:n,NDivider:B,NSpace:F,NSpin:e,NUpload:S,NPopover:r,HelpButton:I},setup(){const e=j+"/upload/3",o=u(!1),l=d(),i=u("保存设置"),n=u(""),r=T(),v=z(),m=u(!1),h=u(""),g=p({userId:""}),N=p({Authorization:localStorage.getItem("token")}),b=u([]),{splitFileName:y}=t();c((async()=>{g.userId=l.state.user.userid;let e=await function(e){return s({url:"/getinfo/3",method:"post",data:e})}({userId:l.state.user.userid});console.log(e);let a=e.data;if(a){n.value=a.upText;let e=y(a.fileName);""!==a.fileName&&(b.value[0]={name:e,url:a.fileUrl,status:"finished"}),h.value=a.fileName,i.value="修改设置"}else i.value="保存设置";o.value=!1})),f((async()=>{let e=await function(e){return s({url:"/delfile/upload/3",method:"post",data:e})}({userId:l.state.user.userid});console.log(e)}));const{saveSetting:U}=a(),x=async()=>{let e=null;var a,t;"保存设置"==i.value?(e=await function(e){return s({url:"/createinfo/3",method:"post",data:e})}({userId:l.state.user.userid,upText:n.value,fileName:h.value}),i.value="修改设置"):"修改设置"==i.value&&(e=await function(e){return s({url:"/updateinfo/3",method:"post",data:e})}({userId:l.state.user.userid,upText:n.value,fileName:h.value})),console.log(e),200==e.status&&(a="success",t=e.message,r[a]({content:t,duration:1500}))};return{apiBaseUrlUpload:e,loading:o,btnText:i,description:n,distance:u(18),saveContent:async()=>{o.value=!0,await U(x),o.value=!1},handleFinish:({file:e,event:a})=>{const t=(null==a?void 0:a.target).response,s=JSON.parse(t);return console.log(s),200==s.status?(v.success(s.message),e.status="finished",h.value=l.state.user.userid+"-"+e.name):(v.error(s.message+",请稍后重试"),e.status="error"),console.log(e),e},beforeUpload:e=>{var a;return!((null==(a=e.file.file)?void 0:a.size)>=4194304)||(v.error("限制视频大小为4MB以内，建议剪辑后上传, 这样会小一些"),!1)},fileList:b,data:g,headers:N,removeFile:async()=>{h.value=""},tipEvent:async()=>{m.value=!0},showPopover:m}}}),R=(e=>(y("data-v-ca8d9320"),e=e(),U(),e))((()=>x("h2",null,"第三页 - 你的视频",-1))),C={class:"container"},H=_("上传文件"),L=_(" 视频上方显示文字: ");var P=o(k,[["render",function(e,a,t,s,o,l){const i=v("n-divider"),n=v("n-button"),r=v("n-upload"),u=v("n-input"),d=v("n-space"),p=v("help-button"),c=v("n-spin");return m(),h(b,null,[R,g(c,{size:"large",show:e.loading},{default:N((()=>[x("div",C,[g(i),g(d,{vertical:"",size:e.distance},{default:N((()=>[g(r,{action:e.apiBaseUrlUpload,max:"1",data:e.data,headers:e.headers,accept:"video/mp4,.mov","file-list":e.fileList,"onUpdate:file-list":a[0]||(a[0]=a=>e.fileList=a),onFinish:e.handleFinish,onBeforeUpload:e.beforeUpload,onRemove:e.removeFile},{default:N((()=>[g(n,null,{default:N((()=>[H])),_:1})])),_:1},8,["action","data","headers","file-list","onFinish","onBeforeUpload","onRemove"]),g(d,{align:"center"},{default:N((()=>[L,g(u,{value:e.description,"onUpdate:value":a[1]||(a[1]=a=>e.description=a),type:"text",size:"large",placeholder:"请输入.."},null,8,["value"])])),_:1})])),_:1},8,["size"])]),g(d,{style:{"margin-top":"20px"},justify:"center"},{default:N((()=>[g(p,{picSrc:"https://tva1.sinaimg.cn/large/e6c9d24ely1h2bu6f50qij213r0lhdks.jpg",place:"left-start",heightValue:"355"}),g(n,{strong:"",secondary:"",type:"primary",onClick:e.saveContent},{default:N((()=>[_(w(e.btnText),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["show"])],64)}],["__scopeId","data-v-ca8d9320"]]);export{P as default};
