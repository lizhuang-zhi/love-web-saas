import{aP as e,_ as a,d as s,bi as t,e as o,c as l,u as n,r as i,R as r,am as u,f as d,o as p,g as c,h as f,w as m,$ as v,aR as g,p as h,k as b,i as j,j as y,t as w}from"./index.f7d30468.js";import{N as U,u as F}from"./useReduceFn.d154d423.js";import{H as N}from"./HelpButton.892c2798.js";import{N as x,u as B}from"./Upload.ba360f90.js";import{N as I}from"./Divider.d7e00e05.js";import{u as _}from"./use-notification.3d02f42e.js";import"./Add.60c0e7ff.js";const A=s({components:{NUpload:x,NDivider:I,NModal:t,NButton:o,NSpin:U,HelpButton:N},setup(){const a=g+"/upload/album",s=l(!1),t=l("保存设置"),o=B(),d=_(),p=n(),c=l(""),f=i({userId:""}),m=i({Authorization:localStorage.getItem("token")}),v=l([]);r((async()=>{f.userId=p.state.user.userid;let a=await function(a){return e({url:"/getinfo/8",method:"post",data:a})}({userId:p.state.user.userid});if(console.log(a),a.data){let e=a.data.fileArr;for(let a of e)v.value.push(a);t.value="修改设置"}else t.value="保存设置";s.value=!1})),u((async()=>{let a=await(s={userId:p.state.user.userid},e({url:"/delfile/album",method:"post",data:s}));var s;console.log(a)}));const h=(e,a)=>{d[e]({content:a,duration:1500})},{saveSetting:b}=F(),j=async()=>{let a=null,s=v.value.map((e=>e.name)),o=v.value;var l;"保存设置"==t.value?(a=await(l={userId:p.state.user.userid,fileList:s},e({url:"/createinfo/8",method:"post",data:l})),t.value="修改设置"):"修改设置"==t.value&&(console.log(o),a=await function(a){return e({url:"/updateinfo/8",method:"post",data:a})}({userId:p.state.user.userid,fileList:o})),console.log(a),a?200==a.status&&h("success",a.message):(h("success","文件上传成功"),console.log("服务器读取文件超时, 这里只是在前端显示成功, 服务器还在异步读取"))};return{loading:s,btnText:t,FileList:v,handleFinish:({file:e,event:a})=>{const s=(null==a?void 0:a.target).response,t=JSON.parse(s);if(console.log(t),200==t.status){o.success(t.message);const a={id:e.id,name:t.data,status:"finished"};v.value.push(a)}else o.error(t.message);return console.log(e),e},beforeUpload:e=>{var a;return(null==(a=e.file.file)?void 0:a.size)>=512e3?(o.error("限制图片大小为500KB以内，请重新上传"),!1):(c.value=p.state.user.userid+"-"+e.file.name,!v.value.some((e=>e.name==c.value))||(o.error("该文件已经上传, 请勿重新上传"),!1))},saveContent:async()=>{s.value=!0,await b(j),s.value=!1},apiBaseUrlUploadAlbum:a,uploadData:f,removeFile:async({file:e,fileList:a})=>{const s=e.name;console.log(s),v.value=v.value.filter((e=>e.name!=s)),console.log(v.value)},headers:m,distance:l(30)}}}),L=e=>(h("data-v-390e59a3"),e=e(),b(),e),R=L((()=>j("h2",null,"第八页 - 我们的相册",-1))),S=L((()=>j("h4",null,"从相册中获取前六张图片,放置此页面",-1))),k={class:"container"};var C=a(A,[["render",function(e,a,s,t,o,l){const n=d("n-divider"),i=d("n-upload"),r=d("help-button"),u=d("n-button"),g=d("n-space"),h=d("n-spin");return p(),c(v,null,[R,S,f(h,{size:"large",show:e.loading},{default:m((()=>[j("div",k,[f(n),f(i,{action:e.apiBaseUrlUploadAlbum,headers:e.headers,data:e.uploadData,"default-file-list":e.FileList,"list-type":"image-card",max:"15",accept:".jpg,.jpeg,.png,.webp",onFinish:e.handleFinish,onBeforeUpload:e.beforeUpload,onRemove:e.removeFile},null,8,["action","headers","data","default-file-list","onFinish","onBeforeUpload","onRemove"]),f(g,{style:{"margin-top":"20px"},justify:"center"},{default:m((()=>[f(r,{picSrc:"https://tva1.sinaimg.cn/large/e6c9d24ely1h2bvp0s912j213y0lvjuh.jpg",place:"bottom-start",heightValue:"395",widthValue:"600"}),f(u,{style:{margin:"30px 0 0 20px"},strong:"",secondary:"",type:"primary",onClick:e.saveContent},{default:m((()=>[y(w(e.btnText),1)])),_:1},8,["onClick"])])),_:1})])])),_:1},8,["show"])],64)}],["__scopeId","data-v-390e59a3"]]);export{C as default};