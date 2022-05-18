import{N as e,a,H as t,u as s}from"./HelpButton.baea5046.js";import{u as o}from"./useTools.4f5383e0.js";import{aL as l,_ as i,d as n,N as r,e as u,aA as d,c as p,u as c,r as f,R as v,aQ as m,f as h,o as g,g as N,h as y,w as U,$ as j,aS as b,p as x,k as _,i as w,j as I,t as B}from"./index.d061a68e.js";import{N as S}from"./Space.a83db671.js";import{N as F,u as z}from"./Upload.e117e3cf.js";import{u as T}from"./use-notification.41a48f00.js";import"./get-slot.65c4337d.js";import"./Add.97a551e1.js";const k=n({components:{NInput:r,NButton:u,NDivider:e,NSpace:S,NSpin:a,NUpload:F,NPopover:d,HelpButton:t},setup(){const e=b+"/upload/3",a=p(!1),t=c(),i=p("保存设置"),n=p(""),r=T(),u=z(),d=p(!1),h=p(""),g=f({userId:""}),N=f({Authorization:localStorage.getItem("token")}),y=p([]),{splitFileName:U}=o();v((async()=>{g.userId=t.state.user.userid;let e=await function(e){return l({url:"/getinfo/3",method:"post",data:e})}({userId:t.state.user.userid});console.log(e);let s=e.data;if(s){n.value=s.upText;let e=U(s.fileName);""!==s.fileName&&(y.value[0]={name:e,url:s.fileUrl,status:"finished"}),h.value=s.fileName,i.value="修改设置"}else i.value="保存设置";a.value=!1})),m((async()=>{let e=await function(e){return l({url:"/delfile/upload/3",method:"post",data:e})}({userId:t.state.user.userid});console.log(e)}));const{saveSetting:j}=s(),x=async()=>{let e=null;var a,s;"保存设置"==i.value?(e=await function(e){return l({url:"/createinfo/3",method:"post",data:e})}({userId:t.state.user.userid,upText:n.value,fileName:h.value}),i.value="修改设置"):"修改设置"==i.value&&(e=await function(e){return l({url:"/updateinfo/3",method:"post",data:e})}({userId:t.state.user.userid,upText:n.value,fileName:h.value})),console.log(e),200==e.status&&(a="success",s=e.message,r[a]({content:s,duration:1500}))};return{apiBaseUrlUpload:e,loading:a,btnText:i,description:n,distance:p(18),saveContent:async()=>{a.value=!0,await j(x),a.value=!1},handleFinish:({file:e,event:a})=>{const s=(null==a?void 0:a.target).response,o=JSON.parse(s);return console.log(o),200==o.status?(u.success(o.message),e.status="finished",h.value=t.state.user.userid+"-"+e.name):(u.error(o.message+",请稍后重试"),e.status="error"),console.log(e),e},beforeUpload:e=>{var a;return!((null==(a=e.file.file)?void 0:a.size)>=4194304)||(u.error("限制视频大小为4MB以内，建议剪辑后上传, 这样会小一些"),!1)},fileList:y,data:g,headers:N,removeFile:async()=>{h.value=""},tipEvent:async()=>{d.value=!0},showPopover:d}}}),C=(e=>(x("data-v-09eb98ae"),e=e(),_(),e))((()=>w("h2",null,"第三页 - 你的视频",-1))),L={class:"container"},A=I("上传文件"),H=I(" 视频上方显示文字: ");var R=i(k,[["render",function(e,a,t,s,o,l){const i=h("n-divider"),n=h("n-button"),r=h("n-upload"),u=h("n-input"),d=h("n-space"),p=h("help-button"),c=h("n-spin");return g(),N(j,null,[C,y(c,{size:"large",show:e.loading},{default:U((()=>[w("div",L,[y(i),y(d,{vertical:"",size:e.distance},{default:U((()=>[y(r,{action:e.apiBaseUrlUpload,max:"1",data:e.data,headers:e.headers,accept:"video/mp4,.mov","file-list":e.fileList,"onUpdate:file-list":a[0]||(a[0]=a=>e.fileList=a),onFinish:e.handleFinish,onBeforeUpload:e.beforeUpload,onRemove:e.removeFile},{default:U((()=>[y(n,null,{default:U((()=>[A])),_:1})])),_:1},8,["action","data","headers","file-list","onFinish","onBeforeUpload","onRemove"]),y(d,{align:"center"},{default:U((()=>[H,y(u,{value:e.description,"onUpdate:value":a[1]||(a[1]=a=>e.description=a),type:"text",size:"large",placeholder:"请输入.."},null,8,["value"])])),_:1})])),_:1},8,["size"])]),y(d,{style:{"margin-top":"20px"},justify:"center"},{default:U((()=>[y(p,{picSrc:"https://tva1.sinaimg.cn/large/e6c9d24ely1h2bu6f50qij213r0lhdks.jpg",place:"left-start",heightValue:"355"}),y(n,{strong:"",secondary:"",type:"primary",onClick:e.saveContent},{default:U((()=>[I(B(e.btnText),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["show"])],64)}],["__scopeId","data-v-09eb98ae"]]);export{R as default};