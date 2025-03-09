"use strict";(self.webpackChunkplayfullovingbinarytree=self.webpackChunkplayfullovingbinarytree||[]).push([[625],{3625:(e,s,n)=>{n.r(s),n.d(s,{default:()=>g});var a=n(5043),t=n(6240),l=n(7353),r=n(9252),i=n(4496),o=n(8903),m=n(1596),h=n(4600),c=n(1906),d=n(794),u=n(4194),x=n(9662),p=n(579);const j=(0,x.A)((0,p.jsx)("path",{d:"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"}),"Send");var b=n(9332);const g=function(){const e="dark"===(0,t.A)().palette.mode,{addMessage:s}=(0,b.o)(),[n,x]=(0,a.useState)({name:"",email:"",phone:"",subject:"",message:""}),[g,v]=(0,a.useState)({}),[A,f]=(0,a.useState)(!1),[y,C]=(0,a.useState)({open:!1,message:"",severity:"success"}),w=e=>{const{name:s,value:n}=e.target;x((e=>({...e,[s]:n}))),g[s]&&v((e=>({...e,[s]:""})))},S=()=>{C((e=>({...e,open:!1})))};return(0,p.jsxs)(l.A,{sx:{minHeight:"100vh",bgcolor:e?"#202123":"#f5f5f5",py:8},children:[(0,p.jsxs)(r.A,{maxWidth:"lg",children:[(0,p.jsx)(i.A,{variant:"h3",sx:{mb:4,textAlign:"center"},children:"\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627"}),(0,p.jsxs)(o.Ay,{container:!0,spacing:4,children:[(0,p.jsx)(o.Ay,{item:!0,xs:12,md:8,children:(0,p.jsxs)(m.A,{elevation:3,sx:{p:4},children:[(0,p.jsx)(i.A,{variant:"h5",sx:{mb:4},children:"\u0623\u0631\u0633\u0644 \u0644\u0646\u0627 \u0631\u0633\u0627\u0644\u0629"}),(0,p.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),(()=>{const e={};return n.name.trim()||(e.name="\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0627\u0644\u0627\u0633\u0645"),n.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.email)||(e.email="\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u063a\u064a\u0631 \u0635\u062d\u064a\u062d"):e.email="\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",n.phone.trim()?/^(05|5)[0-9]{8}$/.test(n.phone.replace(/\s/g,""))||(e.phone="\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d"):e.phone="\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644",n.subject.trim()||(e.subject="\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0633\u0627\u0644\u0629"),n.message.trim()||(e.message="\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0646\u0635 \u0627\u0644\u0631\u0633\u0627\u0644\u0629"),v(e),0===Object.keys(e).length})()){f(!0);try{const e=await fetch("/api/send-message",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),a=await e.json();if(!a.success)throw new Error(a.message||"Failed to send message");s(n),C({open:!0,message:"\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u062a\u0643 \u0628\u0646\u062c\u0627\u062d\u060c \u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064a\u0628\u0627\u064b",severity:"success"}),x({name:"",email:"",phone:"",subject:"",message:""})}catch(a){console.error("Error sending message:",a),C({open:!0,message:"\u0639\u0630\u0631\u0627\u064b\u060c \u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649",severity:"error"})}finally{f(!1)}}},children:[(0,p.jsx)(h.A,{fullWidth:!0,label:"\u0627\u0644\u0627\u0633\u0645",name:"name",variant:"outlined",value:n.name,onChange:w,error:Boolean(g.name),helperText:g.name,sx:{mb:3}}),(0,p.jsx)(h.A,{fullWidth:!0,label:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",name:"email",variant:"outlined",value:n.email,onChange:w,error:Boolean(g.email),helperText:g.email,sx:{mb:3}}),(0,p.jsx)(h.A,{fullWidth:!0,label:"\u0631\u0642\u0645 \u0627\u0644\u062c\u0648\u0627\u0644",name:"phone",variant:"outlined",value:n.phone,onChange:w,error:Boolean(g.phone),helperText:g.phone,sx:{mb:3}}),(0,p.jsx)(h.A,{fullWidth:!0,label:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0633\u0627\u0644\u0629",name:"subject",variant:"outlined",value:n.subject,onChange:w,error:Boolean(g.subject),helperText:g.subject,sx:{mb:3}}),(0,p.jsx)(h.A,{fullWidth:!0,label:"\u0646\u0635 \u0627\u0644\u0631\u0633\u0627\u0644\u0629",name:"message",variant:"outlined",value:n.message,onChange:w,error:Boolean(g.message),helperText:g.message,multiline:!0,rows:4,sx:{mb:3}}),(0,p.jsx)(c.A,{fullWidth:!0,variant:"contained",color:"primary",type:"submit",endIcon:A?null:(0,p.jsx)(j,{}),disabled:A,children:A?"\u062c\u0627\u0631\u064a \u0627\u0644\u0625\u0631\u0633\u0627\u0644...":"\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629"})]})]})}),(0,p.jsx)(o.Ay,{item:!0,xs:12,md:4,children:(0,p.jsxs)(m.A,{elevation:3,sx:{p:4},children:[(0,p.jsx)(i.A,{variant:"h5",sx:{mb:2},children:"\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644"}),(0,p.jsx)(i.A,{sx:{mb:1},children:"\u0627\u0644\u0647\u0627\u062a\u0641: +966 123 456 789"}),(0,p.jsx)(i.A,{sx:{mb:1},children:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a: info@example.com"}),(0,p.jsx)(i.A,{sx:{mb:1},children:"\u0627\u0644\u0639\u0646\u0648\u0627\u0646: \u0634\u0627\u0631\u0639 \u0627\u0644\u0645\u0644\u0643 \u0641\u0647\u062f\u060c \u0627\u0644\u0631\u064a\u0627\u0636\u060c \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629"})]})})]})]}),(0,p.jsx)(d.A,{open:y.open,autoHideDuration:6e3,onClose:S,children:(0,p.jsx)(u.A,{onClose:S,severity:y.severity,sx:{width:"100%"},children:y.message})})]})}}}]);
//# sourceMappingURL=625.191266ea.chunk.js.map