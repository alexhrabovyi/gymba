"use strict";(self.webpackChunkreact_config=self.webpackChunkreact_config||[]).push([[6600],{9040:function(e,t,n){n.d(t,{c:function(){return m}}),n(3248);var c=n(1504),s=n(3284),a=n(4768),i=n(2084),l=n.n(i),r=n(60),o=n(4772),d={nav:"vYt_SOxa",list:"RYHhZhNM",link:"xKuaqUkN",circle:"bjyKqlFY"},u=n(7624);function m(){const e=(0,s.W4)(),[t,n]=(0,c.useState)(null),{data:i}=(0,r.u4)();function m(e,t,n){return(0,u.jsxs)(c.Fragment,{children:[(0,u.jsx)("li",{children:(0,u.jsx)("span",{className:d.circle})}),(0,u.jsx)("li",{children:(0,u.jsx)(a.cH,{className:l()(d.link),to:n,alt:t,children:t})})]},e)}i&&null===t&&n(i);const x=[];if(t&&e.categoryId&&e.subcategoryId){const n=t.entities[e.categoryId];if(!n)return;if(x.push(m(n.id,n.name,`/${n.id}`)),e.subcategoryId&&e.productId){const t=n.subcategories.entities[e.subcategoryId];if(!t)return;x.push(m(t.id,t.name,`/${n.id}/${t.id}`))}}else e.articleId&&x.push(m("news","Новини","/news"));return(0,u.jsx)("nav",{className:l()(o.c.container,d.nav),children:(0,u.jsxs)("ul",{className:d.list,children:[(0,u.jsx)("li",{children:(0,u.jsx)(a.cH,{className:d.link,to:"/",alt:"Головна",children:"Головна"})}),x]})})}},9464:function(e,t,n){n.d(t,{c:function(){return g}});var c,s=n(1504),a=n(4768),i=n(3284),l=n(2084),r=n.n(l),o=n(60),d=n(9331),u=n(4480),m=n(7420),x=n(2112),p=n(120),h={card:"ng9dABx4",iconButtonsBlock:"p4hzF2wi",iconButton:"ZZp2HNCb",iconButton_active:"r1jitE9Q",icon:"mhNwLyHJ",spinner:"NfvoTWw1",imageLink:"mIWGXKxs",image:"nXba8_IH",textLink:"L37eDdj5",priceAndCartBlock:"sow6mheQ",oldPrice:"n0o9avSy",price:"gFCxKShI",priceSpan:"uYxY3R1Q",cartButton:"U4HKTUVn",cartIcon:"iBYknE7B",longCard:"w0amIRyi",longImageLink:"JpPVJb61",longImage:"DUq5oKm5",nameAndIconButtons:"OMxa_Mhb",longIconButtonsBlock:"brKOVlyr",longPriceAndCartBlock:"HDJvLypx",longCartButton:"JzF4uXeY"},j=n(7752),b=n(876),f=n(3884);function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e},N.apply(this,arguments)}var B=e=>s.createElement("svg",N({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 8 6"},e),c||(c=s.createElement("path",{fill:"#fff",d:"M8 1.044c.006.323-.133.58-.356.804Q6.28 3.2 4.92 4.55c-.373.369-.741.738-1.117 1.107-.462.455-1.094.458-1.552.007Q1.28 4.715.322 3.753C-.103 3.324-.107 2.675.309 2.26c.405-.415 1.067-.415 1.505 0q.205.193.4.395c.232.241.248.544.04.804-.134.168-.14.297-.024.409.12.112.272.095.422-.056Q4.41 2.068 6.168.329c.46-.454 1.164-.435 1.576.037A1 1 0 0 1 8 1.044"}))),v=n(7624),g=(0,s.memo)((e=>{let{name:t,categoryId:c,subcategoryId:l,productId:N,price:g,oldPrice:k,isShortCard:I,wishlistMutationFunc:C,compareMutationFunc:y}=e;const[S]=(0,s.useState)((()=>n(3144)(`./${N}.webp`))),[w,P]=(0,s.useState)(!1),[A,$]=(0,s.useState)(!1),[F,L]=(0,s.useState)(!1),{data:E}=(0,o.oZ)();if(E){const e=!!E.find((e=>{let[t,n,s]=e;return t===c&&n===l&&s===N}));w!==e&&P(e)}const{data:_}=(0,o.jy)();if(_){const e=!!_.find((e=>e.categoryId===c&&e.subcategoryId===l&&e.productId===N));A!==e&&$(e)}const{data:O}=(0,o.GK)();if(O){const e=!!O.find((e=>{let[t,n,s]=e;return t===c&&n===l&&s===N}));F!==e&&L(e)}function T(e,t,n){const s=JSON.stringify([c,l,N]);e?n(s):t(s)}const[M]=(0,o.SU)(),[R]=(0,o.QW)();function H(){T(w,M,R),C&&C(c,l,N)}const[X]=(0,o.oB)(),[q]=(0,o.Wu)();function D(){T(A,X,q)}const[J]=(0,o.i4)(),[W]=(0,o.ie)();function K(){T(F,J,W),y&&y(c,l,N)}const Y=`/${c}/${l}/${N}`;return I?(0,v.jsxs)("div",{className:h.card,children:[(0,v.jsxs)("div",{className:h.iconButtonsBlock,children:[(0,v.jsx)("button",{type:"button",className:r()(h.iconButton,F&&h.iconButton_active),"aria-label":F?`Видалити ${t} з порівняння`:`Добавить ${t} в порівняння`,onClick:K,children:(0,v.jsx)(j.c,{className:h.icon})}),(0,v.jsx)("button",{type:"button",className:r()(h.iconButton,w&&h.iconButton_active),"aria-label":w?`Видалити ${t} зі списку бажань`:`Добавить ${t} до списку бажань`,onClick:H,children:(0,v.jsx)(b.c,{className:h.icon})})]}),(0,v.jsx)(a.cH,{className:h.imageLink,to:Y,alt:t,children:(0,v.jsx)(s.Suspense,{fallback:(0,v.jsx)(u.c,{className:h.spinner}),children:(0,v.jsx)(i.g5,{resolve:S,children:(0,v.jsx)(m.c,{className:h.image,alt:t})})})}),(0,v.jsx)(a.cH,{className:r()(p.c.link,h.textLink),to:Y,alt:t,children:t}),(0,v.jsxs)("div",{className:h.priceAndCartBlock,children:[(0,v.jsxs)("div",{className:h.priceBlock,children:[k&&(0,v.jsxs)("p",{className:h.oldPrice,children:[k,"₴/шт"]}),(0,v.jsxs)("p",{className:h.price,children:[(0,d.c)(g),(0,v.jsx)("span",{className:h.priceSpan,children:"₴/шт"})]})]}),(0,v.jsx)(x.c,{className:h.cartButton,ariaLabel:A?`Видалити ${t} з кошика`:`Додати ${t} до кошику`,onClick:D,children:A?(0,v.jsx)(B,{className:h.cartIcon}):(0,v.jsx)(f.c,{className:h.cartIcon})})]})]}):(0,v.jsxs)("div",{className:h.longCard,children:[(0,v.jsx)(a.cH,{className:h.longImageLink,to:Y,alt:t,children:(0,v.jsx)(s.Suspense,{fallback:(0,v.jsx)(u.c,{className:h.spinner}),children:(0,v.jsx)(i.g5,{resolve:S,children:(0,v.jsx)(m.c,{className:h.longImage,alt:t})})})}),(0,v.jsxs)("div",{className:h.nameAndIconButtons,children:[(0,v.jsx)(a.cH,{className:r()(p.c.link,h.longTextLink),to:Y,alt:t,children:t}),(0,v.jsxs)("div",{className:h.longIconButtonsBlock,children:[(0,v.jsx)("button",{type:"button",className:r()(h.iconButton,F&&h.iconButton_active),"aria-label":F?`Видалити ${t} з порівняння`:`Додати ${t} в порівняння`,onClick:K,children:(0,v.jsx)(j.c,{className:h.icon})}),(0,v.jsx)("button",{type:"button",className:r()(h.iconButton,w&&h.iconButton_active),"aria-label":w?`Видалити ${t} зі списку бажань`:`Додати ${t} до списку бажань`,onClick:H,children:(0,v.jsx)(b.c,{className:h.icon})})]})]}),(0,v.jsxs)("div",{className:h.longPriceAndCartBlock,children:[(0,v.jsxs)("div",{className:h.priceBlock,children:[k&&(0,v.jsxs)("p",{className:h.oldPrice,children:[k,"₴/шт"]}),(0,v.jsxs)("p",{className:h.price,children:[(0,d.c)(g),(0,v.jsx)("span",{className:h.priceSpan,children:"₴/шт"})]})]}),(0,v.jsx)(x.c,{className:h.longCartButton,ariaLabel:A?`Видалити ${t} з кошика`:`Додати ${t} до кошику`,onClick:D,children:A?"У кошику":"Додати до кошику"})]})]})}))},9731:function(e,t,n){n.d(t,{c:function(){return p}});var c,s,a,i=n(1504),l=n(2084),r=n.n(l),o=n(2112),d=n(9396);function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e},u.apply(this,arguments)}var m=e=>i.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 100 100"},e),c||(c=i.createElement("path",{fill:"#E8EFF5",d:"m50 99 50-90H0z"})),s||(s=i.createElement("path",{fill:"#2A79CC",d:"M55.577 54.415h3.272c.614 2.62-.692 5.566-3.046 6.88-2.262 1.26-5.106.8-6.917-1.132-.964-1.029-1.54-2.264-1.555-3.697-.039-3.128-.023-6.255-.023-9.383v-4.75c0-.12 0-.238-.016-.357-.093-.752-.738-1.03-1.336-.578-.645.483-1.283.982-1.967 1.504-.66-.839-1.305-1.662-1.989-2.525.21-.175.404-.34.606-.507 1.671-1.362 3.334-2.724 5.005-4.078.505-.412 1.073-.697 1.718-.38.684.34.963.942.963 1.718-.007 6.295-.007 12.582 0 18.877 0 1.67 1.236 2.866 2.83 2.77a2.62 2.62 0 0 0 2.455-2.54c.016-.587 0-1.18 0-1.822M51.606 28.033c0 1.686-1.33 3.048-2.985 3.048-1.647 0-3-1.378-2.984-3.048s1.376-3.049 3.008-3.033 2.96 1.37 2.96 3.033"})),a||(a=i.createElement("path",{stroke:"#2A79CC",d:"M55.577 54.415h3.272c.614 2.62-.692 5.566-3.046 6.88-2.262 1.26-5.106.8-6.917-1.132-.964-1.029-1.54-2.264-1.555-3.697-.039-3.128-.023-6.255-.023-9.383v-4.75c0-.12 0-.238-.016-.357-.093-.752-.738-1.03-1.336-.578-.645.483-1.283.982-1.967 1.504-.66-.839-1.305-1.662-1.989-2.525.21-.175.404-.34.606-.507 1.671-1.362 3.334-2.724 5.005-4.078.505-.412 1.073-.697 1.718-.38.684.34.963.942.963 1.718-.007 6.295-.007 12.582 0 18.877 0 1.67 1.236 2.866 2.83 2.77a2.62 2.62 0 0 0 2.455-2.54c.016-.587 0-1.18 0-1.822ZM51.606 28.033c0 1.686-1.33 3.048-2.985 3.048-1.647 0-3-1.378-2.984-3.048s1.376-3.049 3.008-3.033 2.96 1.37 2.96 3.033Z"}))),x=n(7624),p=(0,i.forwardRef)(((e,t)=>{let{title:n,subtitle:c,btnOnClick:s}=e;return(0,x.jsxs)("div",{className:"d8fKU6aB",children:[(0,x.jsx)(m,{className:"MHYIEn7m"}),(0,x.jsx)("p",{className:r()(d.c.text,d.c.textFw800,d.c.text18px,d.c.textBlack,"cjBCAsfU"),children:n}),(0,x.jsx)("p",{className:r()(d.c.text,d.c.textBlack),children:c}),(0,x.jsx)(o.c,{ref:t,className:"vFUCA5b1",onClick:s,"aria-haspopup":"dialog","aria-label":"Відкрити вікно Задати питання",children:"Зв'язатися з нами"})]})}))},2408:function(e,t,n){n.d(t,{c:function(){return j}});var c=n(1504),s=n(4768),a=n(2084),i=n.n(a),l=n(3036),r=n(2792),o=n(4184),d=n(128),u=n(2112),m=n(9396),x=n(120),p="MEd8WchS",h=n(7624),j=(0,c.memo)((e=>{let{isActive:t,setIsActive:n,openButtonRef:c}=e;return(0,h.jsxs)(l.c,{isActive:t,setIsActive:n,label:"Вікно задати питання",openButton:c.current,children:[(0,h.jsx)("p",{className:i()(m.c.text,m.c.textFw800,m.c.text36px,"DJpZbcXZ"),children:"Задати питання"}),(0,h.jsxs)(r.c,{className:"chiZHsG8",children:[(0,h.jsx)(o.c,{type:"text",name:"name",inputClassName:p,placeholder:"Ім'я",required:!0}),(0,h.jsx)(o.c,{type:"email",name:"email",inputClassName:p,placeholder:"Електронна пошта",required:!0}),(0,h.jsx)(d.c,{name:"comment",textareaBlockClassName:"nDj2h1g5",textareaClassName:"P7TatDpQ",placeholder:"Напишіть ваше запитання щодо товару",required:!0,textareaType:"question"}),(0,h.jsxs)("div",{className:"aCpugU2D",children:[(0,h.jsx)(u.c,{type:"submit",className:"iYOW8che",children:"Відправити"}),(0,h.jsxs)("p",{className:i()(m.c.text,m.c.text14px,m.c.textBlack),children:["Надсилаючи повідомлення ви даєте згоду на обробку ",(0,h.jsx)(s.cH,{to:"/terms",alt:"Умови обробки персональних даних",className:i()(x.c.link,x.c.link14px,x.c.linkBlue),children:"персональних даних"})]})]})]})]})}))},9792:function(e,t,n){n.d(t,{c:function(){return u}});var c,s=n(2084),a=n.n(s),i={button:"OUrxeeqA",button_disabled:"B78dt5Sc",button_prev:"lkIgs5CY",chevronIcon:"Ed6cARZi"},l=n(1504);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e},r.apply(this,arguments)}var o=e=>l.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"1em",height:"1em"},e),c||(c=l.createElement("path",{d:"m8 2 5 10-5 10h4l5-10-5-10z"}))),d=n(7624);function u(e){let{className:t,isInactive:n,isPrev:c=!1,id:s,onClick:l,label:r}=e;return!r&&c?r="Показати попередній слайд":r||c||(r="Показати наступний слайд"),(0,d.jsx)("button",{id:s,type:"button",className:a()(t,i.button,c&&i.button_prev,n&&i.button_disabled),onClick:l,"aria-hidden":n,disabled:n,"aria-label":r,children:(0,d.jsx)(o,{className:i.chevronIcon})})}},2652:function(e,t,n){n.d(t,{c:function(){return a}});var c=n(1504),s=n(7624),a=(0,c.memo)((e=>{let{activeSlideId:t,setActiveSlideId:n,slides:a,gap:i,perView:l=1}=e;const r=(0,c.useRef)(null),o=(0,c.useRef)(null),d=(100-+i*(+l-1))/+l,u=`repeat(${a.length}, ${d}%)`,m=-(t*d+t*+i),x=(0,c.useCallback)((()=>{Array.from(o.current.children).forEach(((e,t)=>e.setAttribute("data-slide-id",t)))}),[a]);return(0,c.useEffect)(x,[x]),(0,s.jsx)("div",{ref:r,className:"aOCMz4om",children:(0,s.jsx)("div",{ref:o,className:"Gck6XODN",style:{gridTemplateColumns:u,gap:`${i}%`,transform:`translateX(${m}%)`},onPointerDown:function(e){e.preventDefault();const c=r.current,s=o.current,d=s.lastElementChild,u=s.style.transform;s.style.transitionDuration="0s";const m=e.clientX,x=c.getBoundingClientRect().left,p=s.getBoundingClientRect().left-x;let h,j;function b(e){const t=e.clientX;j=p+(t-m);const n=d.getBoundingClientRect().right,a=c.getBoundingClientRect().right;j>0?j/=4:Math.floor(n)<Math.floor(a)?j=(j-h)/4+h:h=j,s.style.transform=`translateX(${j}px)`}document.addEventListener("pointermove",b),document.addEventListener("pointerup",(function(e){document.removeEventListener("pointermove",b),s.style.transitionDuration="1s";const r=.05*c.offsetWidth,x=e.clientX-m,p=d.getBoundingClientRect().right,h=c.getBoundingClientRect().right;if(Math.abs(x)>r&&j<0&&p>h){const e=c.getBoundingClientRect();let t=e.top+1;if(t<0&&(t=e.bottom-1),o.current.style.zIndex="10000",x<0){let c=e.right-1,s=document.elementFromPoint(c,t).closest("[data-slide-id]");s||(c-=e.width*(+i/100),s=document.elementFromPoint(c,t).closest("[data-slide-id]"));const a=+s.dataset.slideId;n(a-(l-1)),o.current.style.zIndex=""}else if(x>0){let c=e.left+1,s=document.elementFromPoint(c,t).closest("[data-slide-id]");s||(c+=e.width*(+i/100),s=document.elementFromPoint(c,t).closest("[data-slide-id]"));const a=+s.dataset.slideId;n(a),o.current.style.zIndex=""}}else j>0&&0!==t?n(0):p<h&&t!==a.length-l?n(a.length-l):s.style.transform=u}),{once:!0})},children:a})})}))},128:function(e,t,n){n.d(t,{c:function(){return r}});var c=n(1504),s=n(2084),a=n.n(s),i=n(7624),l=(0,c.memo)((e=>{let{name:t,className:n,placeholder:c,id:s,required:l,textareaType:r}=e;return(0,i.jsx)("textarea",{name:t,className:a()("rBxtwqLl",n),placeholder:c,id:s,required:l,"data-textarea-type":r})})),r=(0,c.memo)((e=>{let{name:t,textareaBlockClassName:n,textareaClassName:c,placeholder:s,id:r,required:o,textareaType:d}=e;return(0,i.jsx)("div",{className:a()("blRBo9PQ",n),children:(0,i.jsx)(l,{name:t,className:["nvRIdODl",c],placeholder:s,id:r,required:o,textareaType:d})})}))},6600:function(e,t,n){n.r(t),n.d(t,{default:function(){return q}});var c=n(9040),s=(n(3248),n(1504)),a=n(3284),i=n(4768),l=n(2084),r=n.n(l),o=n(60),d=n(3108),u=n(2843),m=n(4480),x=n(7420),p=n(7228),h=n(2652),j=n(2112),b={banner:"p7XzxBsH",banner_active:"pDydHA_J",triangle:"_ONInYcM",link:"XNE1cjpF"},f=n(7624);function N(e){let{isActive:t=!1,setIsActive:n}=e;const c=(0,s.useCallback)((()=>{t&&setTimeout((()=>{document.addEventListener("click",(()=>{n(!1)}),{once:!0})}))}),[t,n]);(0,s.useEffect)(c,[c]);const a=(0,s.useCallback)((()=>{t&&setTimeout((()=>n(!1)),3e3)}),[t,n]);return(0,s.useEffect)(a,[a]),(0,f.jsxs)("div",{className:r()(b.banner,t&&b.banner_active),children:[(0,f.jsx)("span",{className:b.triangle}),(0,f.jsx)(i.cH,{className:b.link,to:"/cart",alt:"Перейти до кошику",tabIndex:t?"0":"-1","aria-hidden":!t,children:"Перейти до кошику"})]})}var B=n(9731),v=n(9464),g=n(9792),k=n(9396),I=(0,s.memo)((e=>{let{categoryId:t,subcategoryId:n,productId:c}=e;const[a,i]=(0,s.useState)(null),[l,u]=(0,s.useState)(),[m,x]=(0,s.useState)(0),j=(0,s.useCallback)((()=>{i(window.innerWidth)}),[]);(0,s.useLayoutEffect)((()=>{j()}),[j]),(0,d.c)(j);const b=`${t}/${n}/${c}`,{data:N}=(0,o._K)(b);N&&l!==N&&u(N);const B=(0,s.useMemo)((()=>l?l.map((e=>(0,f.jsx)("div",{className:"sbZdXInU",children:(0,f.jsx)(v.c,{name:e.name,categoryId:t,subcategoryId:n,productId:e.id,price:e.price,oldPrice:e.oldPrice,isShortCard:!0},e.id)},e.id))):[]),[l,t,n]);let I=4;return a<=1100&&(I=3),a<=768&&(I=2),a<=430&&(I=1),0!==B.length&&m>B.length-I&&x(B.length-I),(0,f.jsxs)("article",{className:"JdXpwBbH",children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textFw800,k.c.text38px,k.c.textBlack,"e3ec5ivp"),children:"Аналоги"}),(0,f.jsx)("div",{className:"SRzt69ws",children:l?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(h.c,{activeSlideId:m,setActiveSlideId:x,slides:B,gap:"0",perView:I}),(0,f.jsx)(g.c,{className:"bxWOKoML",isInactive:0===m,isPrev:!0,onClick:()=>x((e=>e-1))}),(0,f.jsx)(g.c,{className:"Ju21I3gp",isInactive:m===(B.length-I||0),onClick:()=>x((e=>e+1))})]}):(0,f.jsx)(p.c,{})})]})})),C=n(3036),y=n(2792),S=n(4184),w=n(128),P=n(2408),A=n(9361),$=n(9288),F=n(9072),L={backdrop:"GnKdJG0D",sliderBlock:"bMac8h7P",slide:"pKhrx5Ge",slideImg:"hfw3DxFn",sliderBtn:"ijsGgk3w",prevBtn:"XY5Pv_kY",nextBtn:"HyWuGYxo"},E=(0,s.memo)((e=>{let{imgIds:t,isOpen:c=!1,setIsOpen:i,activeSlideId:l,setActiveSlideId:o,productName:d}=e;const u=(0,s.useRef)(null),p=(0,s.useRef)(null);(0,A.c)(c),(0,$.c)(p,c);const j=(0,s.useMemo)((()=>t.map((e=>n(3144)(`./${e}.webp`)))),[t]).map(((e,t)=>(0,f.jsx)("div",{className:L.slide,children:(0,f.jsx)(s.Suspense,{fallback:(0,f.jsx)(m.c,{className:L.spinner}),children:(0,f.jsx)(a.g5,{resolve:e,children:(0,f.jsx)(x.c,{className:L.slideImg,alt:d})})})},t)));return(0,f.jsx)("div",{ref:u,className:r()(F.c.backdrop,L.backdrop,c&&F.c.backdrop_active),onClick:function(e){e.target===u.current&&i(!1)},children:(0,f.jsxs)("aside",{ref:p,className:L.sliderBlock,"aria-hidden":!c,role:"dialog","aria-modal":!0,"aria-label":`Галерея зображень ${d}`,tabIndex:c?"0":"-1",children:[(0,f.jsx)(h.c,{slides:j,gap:20,activeSlideId:l,setActiveSlideId:o}),(0,f.jsx)(g.c,{className:r()(L.sliderBtn,L.prevBtn),isInactive:0===l,isPrev:!0,onClick:()=>o((e=>e-1))}),(0,f.jsx)(g.c,{className:r()(L.sliderBtn,L.nextBtn),isInactive:l===j.length-1,onClick:()=>o((e=>e+1))})]})})})),_=n(4772),O=n(120),T={main:"zSZuRKMm",main_inactive:"DxhoNfFm",title:"t1n0luS2",additionalButtonsBlock:"hFCP3Nhw",iconButton:"vwzJXnC5",iconButton_active:"NmzJyDgW",buttonIcon:"yK0C77Je",mainBlock:"fII_fvQS",imageSliderBlock:"dDXy0J2V",imagePaginationBlock:"I4pwkBIw",paginationBtn:"tvGuFCyI",paginationBtn_active:"IxJFDUWF",paginationBtnSpinner:"QTgEa9oa",paginationBtnImg:"TrBqDqsc",slide:"VHsqMdIY",galleryButton:"fLVyJf56",slideImgSpinner:"wc6CGWcI",slideImg:"z0ZrA3rt",mainSpecsBlock:"Imhiouf0",mainSpecsTitle:"f6HwuqSz",mainSpecsList:"ZBLXOKtx",mainSpec:"fRZfbCrQ",priceAndCartBlock:"YSJWlRcL",oldPrice:"hnbsEEXQ",mainPriceBlock:"jBXcPXlm",discountBlock:"EXWpfHdC",cartBtnAndBannerBlock:"aO_hEO9j",cartButton:"Le8lYNug",tabList:"NhurIYP1",tabButtonLine:"mmROofsQ",tabButtonLine_active:"nKIHXcV5",tabButton:"e5tX_SAx",tabPanelsAndBannerBlock:"W29lkHA9",tabPanel:"dCY6t70E",tabPanel_active:"XL4eraR1",descriptionBlock:"X1lBO6oO",descriptionSubtitle:"VHtm1jdT",specsBlock:"hr3mq70M",specsTitle:"tbupf2xQ",specsList:"yKox3019",spec:"GqTtvH2l",noCommentsBlock:"FaqbbKZ4",noCommentsTextBlock:"jkraBeDl",noCommentsLine:"bMh6_C6J",noCommentsText:"F4RR40jQ",commentButton:"U0f74QEw",bannerBlock:"doyNdkqH",popupTitle:"gAyCqSMP",popupForm:"DjTHlnCe",input:"menaYoCk",textareaBlock:"UojnR4jC",textarea:"E9yu01il",submitAndTermsBlock:"GF6LSqLJ",submitButton:"Z7FaTyVo"},M=n(876),R=n(7752),H=n(2860);function X(){const e=(0,a.W4)(),t=(0,s.useRef)(),c=(0,s.useRef)(),l=(0,s.useRef)(),b=(0,s.useRef)(),[v,g]=(0,s.useState)(null),[A,$]=(0,s.useState)([]),[F,L]=(0,s.useState)(null),[X,q]=(0,s.useState)(!1),[D,J]=(0,s.useState)(!1),[W,K]=(0,s.useState)(!1),[Y,Q]=(0,s.useState)(0),[Z,G]=(0,s.useState)(!1),[z,U]=(0,s.useState)(!0),[V,ee]=(0,s.useState)(!1),[te,ne]=(0,s.useState)(!1),[ce,se]=(0,s.useState)(!1),ae=`${e.categoryId}/${e.subcategoryId}/${e.productId}`,{categoryId:ie,subcategoryId:le,productId:re}=e,oe=(0,s.useMemo)((()=>null==v?void 0:v.product),[v]),de=(0,s.useCallback)((()=>{L(window.innerWidth)}),[]);(0,s.useLayoutEffect)((()=>{de()}),[de]),(0,d.c)(de);const{status:ue,data:me,isLoading:xe,isFetching:pe}=(0,o.um)(ae);if("fulfilled"===ue)me!==v&&g(me);else if("rejected"===ue)throw new Response(null,{status:404});const{data:he}=(0,o.oZ)();if(he){const e=!!he.find((e=>{let[t,n,c]=e;return t===ie&&n===le&&c===re}));X!==e&&q(e)}const{data:je}=(0,o.jy)();if(je){const e=!!je.find((e=>e.categoryId===ie&&e.subcategoryId===le&&e.productId===re));D!==e&&J(e)}const{data:be}=(0,o.GK)();if(be){const e=!!be.find((e=>{let[t,n,c]=e;return t===ie&&n===le&&c===re}));W!==e&&K(e)}const fe=(0,s.useCallback)((()=>{if(!oe)return;const e=[[oe.id,n(3144)(`./${oe.id}.webp`)]],{additionalImgs:t}=oe;t&&t.forEach((t=>{e.push([t,n(3144)(`./${t}.webp`)])})),$(e),Q(0)}),[oe]);(0,s.useEffect)(fe,[fe]);const Ne=(0,s.useMemo)((()=>A.map(((e,t)=>{let[n,c]=e;return(0,f.jsx)("button",{type:"button",className:r()(T.paginationBtn,t===Y&&T.paginationBtn_active),onClick:()=>Q(t),"aria-label":`Перейти до слайду ${t}`,children:(0,f.jsx)(s.Suspense,{fallback:(0,f.jsx)(m.c,{className:T.paginationBtnSpinner}),children:(0,f.jsx)(a.g5,{resolve:c,children:(0,f.jsx)(x.c,{className:T.paginationBtnImg,alt:oe.name})})})},n)}))),[A,Y,oe]),Be=(0,s.useMemo)((()=>A.map((e=>{let[t,n]=e;return(0,f.jsx)("div",{className:T.slide,children:(0,f.jsx)("button",{type:"button",className:T.galleryButton,onPointerDown:e=>{const t=e.clientX;document.addEventListener("pointerup",(e=>{const n=e.clientX;Math.abs(t-n)>5||se(!0)}),{once:!0})},"aria-haspopup":"dialog","aria-label":"Відкрити зображення на весь екран",children:(0,f.jsx)(s.Suspense,{fallback:(0,f.jsx)(m.c,{className:T.slideImgSpinner}),children:(0,f.jsx)(a.g5,{resolve:n,children:(0,f.jsx)(x.c,{className:T.slideImg,alt:oe.name})})})})},t)}))),[oe,A]),ve=(0,s.useMemo)((()=>{if(!oe)return;const{mainSpecs:e}=oe;return Object.entries(e).map((e=>{let[t,n]=e;return(0,f.jsxs)("li",{className:T.mainSpec,children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textGrey),children:`${t}:`}),(0,f.jsx)("p",{className:r()(k.c.text,k.c.textBlack),children:n})]},t)}))}),[oe]);let ge;oe&&oe.oldPrice&&(ge=(oe.oldPrice-oe.price)/oe.oldPrice*100,ge=ge.toFixed(0));const ke=(0,s.useCallback)((()=>{if(!oe)return;let e;return e=z?(0,u.c)(c.current):(0,u.c)(t.current),e.forEach((e=>{e.tabIndex="-1",e.setAttribute("aria-hidden",!0)})),()=>{e.forEach((e=>{e.tabIndex="0",e.setAttribute("aria-hidden",!1)}))}}),[oe,z]);(0,s.useEffect)(ke,[ke]);const Ie=(0,s.useMemo)((()=>{if(oe&&oe.description)return(0,f.jsxs)("div",{className:T.descriptionBlock,children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textFw800,k.c.text32px,k.c.textBlack,T.descriptionSubtitle),children:"Про товар"}),(0,f.jsx)("p",{className:r()(k.c.text,k.c.textBlack),children:oe.description})]})}),[oe]),Ce=(0,s.useMemo)((()=>{if(!oe)return;const e=Object.entries({...oe["specs-filters"],...oe.specs});return(0,f.jsxs)("div",{className:T.specsBlock,children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textFw800,k.c.text24px,k.c.textBlack,T.specsTitle),children:"Характеристики"}),(0,f.jsx)("ul",{className:T.specsList,children:e.map(((e,t)=>{let[n,c]=e;return"object"==typeof c&&(c=c.join(", ")),(0,f.jsxs)("li",{className:T.spec,children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textGrey),children:`${n}:`}),(0,f.jsx)("p",{className:r()(k.c.text,k.c.textBlack),children:c})]},t)}))})]})}),[oe]),ye=(0,s.useMemo)((()=>{if(!oe)return;const e=[oe.id],{additionalImgs:t}=oe;return t&&t.forEach((t=>e.push(t))),e}),[oe]);function Se(e,t,n){const c=JSON.stringify([ie,le,oe.id]);e?n(c):t(c)}const[we]=(0,o.SU)(),[Pe]=(0,o.QW)();function Ae(){Se(X,we,Pe)}const[$e]=(0,o.oB)(),[Fe]=(0,o.Wu)(),[Le]=(0,o.i4)(),[Ee]=(0,o.ie)();function _e(){Se(W,Le,Ee)}return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("main",{className:r()(_.c.container,T.main,!xe&&pe&&T.main_inactive),children:[(0,f.jsx)("h1",{className:r()(k.c.text,k.c.textFw800,k.c.text38px,k.c.textBlackj,T.title),children:null==oe?void 0:oe.name}),oe?(0,f.jsxs)(f.Fragment,{children:[F>576&&(0,f.jsxs)("div",{className:T.additionalButtonsBlock,children:[(0,f.jsxs)("button",{type:"button",className:r()(T.iconButton,X&&T.iconButton_active),onClick:Ae,"aria-label":X?`Видалити ${oe.name} зі списку бажань`:`Додати ${oe.name} до списку бажань`,children:[(0,f.jsx)(M.c,{className:T.buttonIcon}),X?"В обраному":"В обране"]}),(0,f.jsxs)("button",{type:"button",className:r()(T.iconButton,W&&T.iconButton_active),onClick:_e,"aria-label":W?`Видалити ${oe.name} з порівняння`:`Додати ${oe.name} в порівняння`,children:[(0,f.jsx)(R.c,{className:T.buttonIcon}),W?"В порівнянні":" До порівняння"]})]}),(0,f.jsxs)("div",{className:T.mainBlock,children:[(0,f.jsxs)("div",{className:T.imageSliderBlock,children:[(0,f.jsx)("div",{className:T.imagePaginationBlock,children:Ne}),(0,f.jsx)(h.c,{activeSlideId:Y,setActiveSlideId:Q,slides:Be,gap:20})]}),(0,f.jsxs)("div",{className:T.mainSpecsBlock,children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textFw800,k.c.text14px,k.c.textBlack,T.mainSpecsTitle),children:"Основні характеристики"}),(0,f.jsx)("ul",{className:T.mainSpecsList,children:ve}),(0,f.jsx)("a",{href:"#descriptionTabPanel",className:r()(O.c.link,O.c.linkBlue),alt:"Переглянути всі характеристики",onClick:()=>U(!0),children:"Переглянути всі"})]}),F<=576&&(0,f.jsxs)("div",{className:T.additionalButtonsBlock,children:[(0,f.jsxs)("button",{type:"button",className:r()(T.iconButton,X&&T.iconButton_active),onClick:Ae,"aria-label":X?`Видалити ${oe.name} зі списку бажань`:`Додати ${oe.name} до списку бажань`,children:[(0,f.jsx)(M.c,{className:T.buttonIcon}),X?"В обраному":"В обране"]}),(0,f.jsxs)("button",{type:"button",className:r()(T.iconButton,W&&T.iconButton_active),onClick:_e,"aria-label":W?`Видалити ${oe.name} з порівняння`:`Додати ${oe.name} в порівняння`,children:[(0,f.jsx)(R.c,{className:T.buttonIcon}),W?"В порівнянні":" До порівняння"]})]}),(0,f.jsxs)("div",{className:T.priceAndCartBlock,children:[oe.oldPrice&&(0,f.jsx)("p",{className:T.oldPrice,children:`${oe.oldPrice} ₴/шт`}),(0,f.jsxs)("div",{className:T.mainPriceBlock,children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textFw800,k.c.text48px,k.c.textBlack,T.mainPrice),children:oe.price}),(0,f.jsx)("span",{className:r()(k.c.text,k.c.textBlack),children:"₴/шт"}),oe.oldPrice&&(0,f.jsx)("div",{className:T.discountBlock,children:`-${ge}%`})]}),(0,f.jsxs)("div",{className:T.cartBtnAndBannerBlock,children:[(0,f.jsx)(j.c,{className:T.cartButton,ariaLabel:D?`Видалити ${oe.name} з кошика`:`Додати ${oe.name} до кошику`,onClick:function(){Se(D,$e,Fe)},children:D?"У кошику":"Додати до кошику"}),(0,f.jsx)(N,{isActive:Z,setIsActive:G})]})]})]}),(0,f.jsxs)("div",{className:T.tabList,role:"tablist",children:[(0,f.jsxs)("button",{type:"button",className:T.tabButton,role:"tab","aria-selected":z,"aria-controls":"descriptionTabPanel","aria-label":"Показати панель Опис",onClick:()=>U(!0),children:["Опис",(0,f.jsx)("span",{className:r()(T.tabButtonLine,z&&T.tabButtonLine_active)})]}),(0,f.jsxs)("button",{type:"button",className:T.tabButton,role:"tab","aria-selected":!z,"aria-controls":"commentTabPanel","aria-label":"Показати панель Відгуки",onClick:()=>U(!1),children:["Відгуки",(0,f.jsx)("span",{className:r()(T.tabButtonLine,!z&&T.tabButtonLine_active)})]})]}),(0,f.jsxs)("div",{className:T.tabPanelsAndBannerBlock,children:[(0,f.jsxs)("div",{className:T.tabPanels,children:[(0,f.jsxs)("div",{ref:t,className:r()(T.tabPanel,z&&T.tabPanel_active),id:"descriptionTabPanel",role:"tabpanel",children:[Ie,Ce]}),(0,f.jsx)("div",{ref:c,className:r()(T.tabPanel,!z&&T.tabPanel_active),id:"commentTabPanel",role:"tabpanel",children:(0,f.jsxs)("div",{className:T.noCommentsBlock,children:[(0,f.jsxs)("div",{className:T.noCommentsTextBlock,children:[(0,f.jsx)(H.c,{className:T.noCommentsLine}),(0,f.jsx)("p",{className:r()(k.c.text,k.c.textFw800,k.c.text32px,T.noCommentsText),children:"Відгуків немає"}),(0,f.jsx)("p",{className:r()(k.c.text,k.c.text24px,k.c.textGrey),children:"Будьте першим, хто залише відгук!"})]}),(0,f.jsx)(j.c,{ref:l,className:T.commentButton,onClick:()=>ee(!0),"aria-haspopup":"dialog","aria-label":"Відкрити вікно Написати відгук",children:"Написати відгук"})]})})]}),(0,f.jsx)("aside",{className:T.bannerBlock,children:(0,f.jsx)(B.c,{title:"Є питання щодо товару?",subtitle:"Запитайте нас і ми допоможемо Вам визначитися з вибором.",btnOnClick:function(){ne(!0)},ref:b})})]}),(0,f.jsx)(I,{categoryId:ie,subcategoryId:le,productId:re})]}):(0,f.jsx)(p.c,{})]}),oe&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(C.c,{isActive:V,setIsActive:ee,label:"Вікно написати відгук",openButton:l.current,children:[(0,f.jsx)("p",{className:r()(k.c.text,k.c.textFw800,k.c.text36px,T.popupTitle),children:"Залишити відгук"}),(0,f.jsxs)(y.c,{className:T.popupForm,children:[(0,f.jsx)(S.c,{type:"text",name:"name",inputClassName:T.input,placeholder:"Ім'я",required:!0}),(0,f.jsx)(S.c,{type:"email",name:"email",inputClassName:T.input,placeholder:"Електронна пошта",required:!0}),(0,f.jsx)(w.c,{name:"comment",textareaBlockClassName:T.textareaBlock,textareaClassName:T.textarea,placeholder:"Враження про товар",required:!0,textareaType:"comment"}),(0,f.jsxs)("div",{className:T.submitAndTermsBlock,children:[(0,f.jsx)(j.c,{type:"submit",className:T.submitButton,children:"Відправити"}),(0,f.jsxs)("p",{className:r()(k.c.text,k.c.text14px,k.c.textBlack),children:["Надсилаючи повідомлення ви даєте згоду на обробку ",(0,f.jsx)(i.cH,{to:"terms",alt:"Умови обробки персональних даних",className:r()(O.c.link,O.c.link14px,O.c.linkBlue),children:"персональних даних"})]})]})]})]}),(0,f.jsx)(P.c,{isActive:te,setIsActive:ne,openButtonRef:b}),(0,f.jsx)(E,{imgIds:ye,isOpen:ce,setIsOpen:se,activeSlideId:Y,setActiveSlideId:Q,productName:oe.name})]})]})}function q(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(c.c,{}),(0,f.jsx)(X,{})]})}},9331:function(e,t,n){function c(e){const t=e.toString().split("").reverse();let n=0,c=0;return t.forEach(((e,s)=>{c%3==0&&0!==s&&(t.splice(s+n,0," "),n+=1),c+=1})),t.reverse().join("")}n.d(t,{c:function(){return c}})}}]);