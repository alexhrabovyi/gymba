"use strict";(self.webpackChunkreact_config=self.webpackChunkreact_config||[]).push([[6452],{8828:function(e,t,c){var n,a=c(1504);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var c=arguments[t];for(var n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n])}return e},s.apply(this,arguments)}t.c=e=>a.createElement("svg",s({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 18 20"},e),n||(n=a.createElement("path",{d:"M2 5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5zm5 12H5V8h2zm6 0h-2V8h2zm.618-15L12 0H6L4.382 2H0v2h18V2z"})))},4332:function(e,t,c){c.d(t,{c:function(){return u}}),c(3248);var n=c(1504),a=c(3284),s=c(4768),i=c(2084),l=c.n(i),o=c(344),r={nav:"vYt_SOxa",list:"RYHhZhNM",link:"xKuaqUkN",circle:"bjyKqlFY"},d=c(7624);function u(){const e=(0,a.W4)(),t=(0,s.g3)(),[c,i]=(0,n.useState)(null);if(e.categoryId&&e.subcategoryId){const n={categoryId:e.categoryId};if(e.subcategoryId&&e.productId&&(n.subcategoryId=e.subcategoryId),!c&&"idle"===t.state){const e=JSON.stringify(n);t.submit(e,{action:"/getBreadCrumbsInfo",method:"POST",encType:"application/json"})}}t.data&&t.data!==c&&i(t.data);const u=[];return c?Object.values(c).forEach((e=>{let{id:t,name:c,link:a}=e;u.push((0,d.jsxs)(n.Fragment,{children:[(0,d.jsx)("li",{children:(0,d.jsx)("span",{className:r.circle})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.cH,{className:l()(r.link),to:a,alt:c,children:c})})]},t))})):e.articleId&&u.push((0,d.jsxs)(n.Fragment,{children:[(0,d.jsx)("li",{children:(0,d.jsx)("span",{className:r.circle})}),(0,d.jsx)("li",{children:(0,d.jsx)(s.cH,{className:l()(r.link),to:"/news",alt:"Новини",children:"Новини"})})]},"news")),(0,d.jsx)("nav",{className:l()(o.c.container,r.nav),children:(0,d.jsxs)("ul",{className:r.list,children:[(0,d.jsx)("li",{children:(0,d.jsx)(s.cH,{className:r.link,to:"/",alt:"Головна",children:"Головна"})}),u]})})}},5092:function(e,t,c){c.d(t,{c:function(){return f}}),c(3248),c(2168),c(5104),c(8312);var n,a,s,i=c(1504),l=c(4768),o=c(3284),r=c(2084),d=c.n(r),u="CpoH1eIb",m="k0qI0HxD",p="v8ThU_WS",h="KRfFMB2B";function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var c=arguments[t];for(var n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n])}return e},x.apply(this,arguments)}var g=e=>i.createElement("svg",x({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24"},e),n||(n=i.createElement("circle",{cx:12,cy:12,r:2})),a||(a=i.createElement("circle",{cx:20,cy:12,r:2})),s||(s=i.createElement("circle",{cx:4,cy:12,r:2}))),j=c(3108),b=c(7624),f=(0,i.memo)((e=>{let{pageAmount:t}=e;const[c,n]=(0,l.k5)(),a=(0,o.Yi)(),s=(0,i.useRef)(null),[r,x]=(0,i.useState)(),f=(0,i.useCallback)((()=>{x(window.innerWidth)}),[]);(0,i.useLayoutEffect)((()=>{f()}),[f]),(0,j.c)(f);const[N,k]=(0,i.useState)((()=>c.has("page")?+c.get("page"):1));N>t&&0!==t&&(k(1),c.delete("page"),n(c));const v=(0,i.useCallback)((()=>{if("loading"===a.state){const e=new URLSearchParams(a.location.search);if(e.has("page")){const t=+e.get("page");t!==N&&k(t)}else 1!==N&&k(1)}}),[a,N]);let y,B,w,I,C,P,S;(0,i.useEffect)(v,[v]),r>576?(y=t>9,B=y&&N>5,w=y&&N<=t-5):(y=t>7,B=y&&N>4,w=y&&N<=t-4),r>576?y&&!B?(I=1,C=7,S=8):y&&!w?(I=t-6,C=t,P=I-1):B&&w?(I=N-2,C=N+2,P=N-3,S=N+3):y||(I=1,C=t):r<=576&&(y&&!B?(I=1,C=5,S=6):y&&!w?(I=t-4,C=t,P=I-1):B&&w?(I=N-1,C=N+1,P=N-2,S=N+2):y||(I=1,C=t));const E=[];for(let e=I;e<=C;e+=1)E.push((0,b.jsxs)(i.Fragment,{children:[(0,b.jsx)("button",{type:"submit",id:e,onClick:()=>k(e),className:d()(u,e===N&&"BCAIu4mI"),style:{borderRadius:e===I?"4px 0 0 4px":e===C?"0px 4px 4px 0":""},"aria-label":`Перейти на сторінку товарів ${e}`,children:e}),e!==C&&(0,b.jsx)("span",{className:"Y59Bhtlf"})]},e));return(0,b.jsxs)("form",{ref:s,className:"tb_YeEur",onSubmit:function(e){e.preventDefault(),c.set("page",N),n(c)},children:[B&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("button",{type:"submit",id:1,onClick:()=>{k(1),c.set("page",1),n(c)},className:d()(u,m),"aria-label":"Перейти на сторінку товарів 1",children:1}),(0,b.jsx)("button",{type:"submit",id:P,onClick:()=>{k(P),c.set("page",P),n(c)},className:p,"aria-label":`Перейти на сторінку товарів ${P}`,children:(0,b.jsx)(g,{className:h})})]}),E,w&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("button",{type:"submit",id:S,onClick:()=>{k(S),c.set("page",S),n(c)},className:p,"aria-label":`Перейти на сторінку товарів ${S}`,children:(0,b.jsx)(g,{className:h})}),(0,b.jsx)("button",{type:"submit",id:t,onClick:()=>{k(t),c.set("page",t),n(c)},className:d()(u,m),"aria-label":`Перейти на сторінку товарів ${t}`,children:t})]})]})}))},1228:function(e,t,c){c.d(t,{c:function(){return v}});var n,a=c(1504),s=c(4768),i=c(3284),l=c(2084),o=c.n(l),r=c(5940),d=c(9331),u=c(4480),m=c(7420),p=c(1004),h=c(5072),x={card:"ng9dABx4",iconButtonsBlock:"p4hzF2wi",iconButton:"ZZp2HNCb",iconButton_active:"r1jitE9Q",icon:"mhNwLyHJ",spinner:"NfvoTWw1",imageLink:"mIWGXKxs",image:"nXba8_IH",textLink:"L37eDdj5",priceAndCartBlock:"sow6mheQ",oldPrice:"n0o9avSy",price:"gFCxKShI",priceSpan:"uYxY3R1Q",cartButton:"U4HKTUVn",cartIcon:"iBYknE7B",longCard:"w0amIRyi",longImageLink:"JpPVJb61",longImage:"DUq5oKm5",nameAndIconButtons:"OMxa_Mhb",longIconButtonsBlock:"brKOVlyr",longPriceAndCartBlock:"HDJvLypx",longCartButton:"JzF4uXeY"},g=c(7752),j=c(876),b=c(3884);function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var c=arguments[t];for(var n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n])}return e},f.apply(this,arguments)}var N=e=>a.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 8 6"},e),n||(n=a.createElement("path",{fill:"#fff",d:"M8 1.044c.006.323-.133.58-.356.804Q6.28 3.2 4.92 4.55c-.373.369-.741.738-1.117 1.107-.462.455-1.094.458-1.552.007Q1.28 4.715.322 3.753C-.103 3.324-.107 2.675.309 2.26c.405-.415 1.067-.415 1.505 0q.205.193.4.395c.232.241.248.544.04.804-.134.168-.14.297-.024.409.12.112.272.095.422-.056Q4.41 2.068 6.168.329c.46-.454 1.164-.435 1.576.037A1 1 0 0 1 8 1.044"}))),k=c(7624),v=(0,a.memo)((e=>{let{name:t,categoryId:n,subcategoryId:l,productId:f,price:v,oldPrice:y,isShortCard:B}=e;const w=(0,s.g3)(),I=(0,s.g3)(),C=(0,s.g3)(),[P]=(0,a.useState)((()=>c(3144)(`./${f}.webp`))),[S,E]=(0,a.useState)(!1),[L,O]=(0,a.useState)(!1),[A,T]=(0,a.useState)(!1);if((0,r.c)(w,"/wishlist"),w.data){const e=w.data.wishlistIds.find((e=>{let[t,c,a]=e;return t===n&&c===l&&a===f}));e!==S&&E(e)}if((0,r.c)(I,"/cart"),I.data){const e=I.data.cartIds.find((e=>e.categoryId===n&&e.subcategoryId===l&&e.productId===f));e!==L&&O(e)}if((0,r.c)(C,"/compare"),C.data){const e=C.data.compareIds.find((e=>{let[t,c,a]=e;return t===n&&c===l&&a===f}));e!==A&&T(e)}function H(){const e=JSON.stringify([n,l,f]);S?w.submit(e,{action:"/wishlist",method:"DELETE",encType:"application/json"}):w.submit(e,{action:"/wishlist",method:"PATCH",encType:"application/json"})}function $(){const e=JSON.stringify([n,l,f]);L?I.submit(e,{action:"/cart",method:"DELETE",encType:"application/json"}):I.submit(e,{action:"/cart",method:"PATCH",encType:"application/json"})}function M(){const e=JSON.stringify([n,l,f]);A?C.submit(e,{action:"/compare",method:"DELETE",encType:"application/json"}):C.submit(e,{action:"/compare",method:"PATCH",encType:"application/json"})}"loading"===w.state&&("patch"!==w.formMethod||S?"delete"===w.formMethod&&S&&E(!1):E(!0)),"loading"===I.state&&("patch"!==I.formMethod||L?"delete"===I.formMethod&&L&&O(!1):O(!0)),"loading"===C.state&&("patch"!==C.formMethod||A?"delete"===C.formMethod&&A&&T(!1):T(!0));const F=`/${n}/${l}/${f}`;return B?(0,k.jsxs)("div",{className:x.card,children:[(0,k.jsxs)("div",{className:x.iconButtonsBlock,children:[(0,k.jsx)("button",{type:"button",className:o()(x.iconButton,A&&x.iconButton_active),"aria-label":A?`Видалити ${t} з порівняння`:`Добавить ${t} в порівняння`,onClick:M,children:(0,k.jsx)(g.c,{className:x.icon})}),(0,k.jsx)("button",{type:"button",className:o()(x.iconButton,S&&x.iconButton_active),"aria-label":S?`Видалити ${t} зі списку бажань`:`Добавить ${t} до списку бажань`,onClick:H,children:(0,k.jsx)(j.c,{className:x.icon})})]}),(0,k.jsx)(s.cH,{className:x.imageLink,to:F,alt:t,children:(0,k.jsx)(a.Suspense,{fallback:(0,k.jsx)(u.c,{className:x.spinner}),children:(0,k.jsx)(i.g5,{resolve:P,children:(0,k.jsx)(m.c,{className:x.image,alt:t})})})}),(0,k.jsx)(s.cH,{className:o()(h.c.link,x.textLink),to:F,alt:t,children:t}),(0,k.jsxs)("div",{className:x.priceAndCartBlock,children:[(0,k.jsxs)("div",{className:x.priceBlock,children:[y&&(0,k.jsxs)("p",{className:x.oldPrice,children:[y,"₴/шт"]}),(0,k.jsxs)("p",{className:x.price,children:[(0,d.c)(v),(0,k.jsx)("span",{className:x.priceSpan,children:"₴/шт"})]})]}),(0,k.jsx)(p.c,{className:x.cartButton,ariaLabel:L?`Видалити ${t} з кошика`:`Додати ${t} до кошику`,onClick:$,children:L?(0,k.jsx)(N,{className:x.cartIcon}):(0,k.jsx)(b.c,{className:x.cartIcon})})]})]}):(0,k.jsxs)("div",{className:x.longCard,children:[(0,k.jsx)(s.cH,{className:x.longImageLink,to:F,alt:t,children:(0,k.jsx)(a.Suspense,{fallback:(0,k.jsx)(u.c,{className:x.spinner}),children:(0,k.jsx)(i.g5,{resolve:P,children:(0,k.jsx)(m.c,{className:x.longImage,alt:t})})})}),(0,k.jsxs)("div",{className:x.nameAndIconButtons,children:[(0,k.jsx)(s.cH,{className:o()(h.c.link,x.longTextLink),to:F,alt:t,children:t}),(0,k.jsxs)("div",{className:x.longIconButtonsBlock,children:[(0,k.jsx)("button",{type:"button",className:o()(x.iconButton,A&&x.iconButton_active),"aria-label":A?`Видалити ${t} з порівняння`:`Додати ${t} в порівняння`,onClick:M,children:(0,k.jsx)(g.c,{className:x.icon})}),(0,k.jsx)("button",{type:"button",className:o()(x.iconButton,S&&x.iconButton_active),"aria-label":S?`Видалити ${t} зі списку бажань`:`Додати ${t} до списку бажань`,onClick:H,children:(0,k.jsx)(j.c,{className:x.icon})})]})]}),(0,k.jsxs)("div",{className:x.longPriceAndCartBlock,children:[(0,k.jsxs)("div",{className:x.priceBlock,children:[y&&(0,k.jsxs)("p",{className:x.oldPrice,children:[y,"₴/шт"]}),(0,k.jsxs)("p",{className:x.price,children:[(0,d.c)(v),(0,k.jsx)("span",{className:x.priceSpan,children:"₴/шт"})]})]}),(0,k.jsx)(p.c,{className:x.longCartButton,ariaLabel:L?`Видалити ${t} з кошика`:`Додати ${t} до кошику`,onClick:$,children:L?"У кошику":"Додати до кошику"})]})]})}))},6452:function(e,t,c){c.r(t),c.d(t,{default:function(){return f}});var n=c(4332),a=c(1504),s=c(4768),i=c(2084),l=c.n(i),o=c(5940),r=c(1228),d=c(6354),u=c(5092),m=c(344),p=c(9224),h={main:"nAL_uwjB",titleAndButtonBlock:"_30v1eNB",title:"I50BD8mZ",deleteBtn:"y9OcTVq0",binIcon:"kIF3S3ly",productBlock:"cMBEgs9G",noProductBlock:"JxYJS0Na",noProductContent:"bp9lLJRN",noProductLine:"LqdkGwf4",noProductText:"SzAuVMp0",spinnerBlock:"bLM11K05",paginationBlock:"kH7YOzez"},x=c(8828),g=c(2860),j=c(7624);function b(){const e=(0,s.g3)(),[t,c]=(0,a.useState)(null),n=(0,a.useMemo)((()=>null==t?void 0:t.wishlistProducts),[t]),i=null==t?void 0:t.pageAmount;(0,o.c)(e,"/wishlist"),e.data&&e.data.wishlistProductsPerPageAndPageAmount!==t&&c(e.data.wishlistProductsPerPageAndPageAmount),"loading"===e.state&&"delete"===e.formMethod&&n.length&&c({wishlistProducts:[]});const b=(0,a.useMemo)((()=>{if(n)return n.map((e=>(0,j.jsx)(r.c,{name:e.product.name,categoryId:e.categoryId,subcategoryId:e.subcategoryId,productId:e.product.id,price:e.product.price,oldPrice:e.product.oldPrice,isShortCard:!0},e.product.id)))}),[n]);return(0,j.jsxs)("main",{className:l()(m.c.container,h.main),children:[(0,j.jsxs)("div",{className:h.titleAndButtonBlock,children:[(0,j.jsx)("h1",{className:l()(p.c.text,p.c.textFw800,p.c.text48px,p.c.textBlack,h.title),children:"Список бажань"}),b&&b.length>0&&(0,j.jsxs)("button",{type:"button",className:h.deleteBtn,onClick:function(){const t=JSON.stringify("");e.submit(t,{method:"DELETE",encType:"application/json"})},"aria-label":"Видалити все",children:[(0,j.jsx)(x.c,{className:h.binIcon}),"Видалити все"]})]}),(0,j.jsx)("div",{className:h.productBlock,children:b?b.length>0?b:(0,j.jsx)("div",{className:h.noProductBlock,children:(0,j.jsxs)("div",{className:h.noProductContent,children:[(0,j.jsx)(g.c,{className:h.noProductLine}),(0,j.jsx)("p",{className:l()(p.c.text,p.c.textFw800,p.c.text32px,h.noProductText),children:"Бажаних товарів немає"}),(0,j.jsx)("p",{className:l()(p.c.text,p.c.text24px,p.c.textGrey),children:"Саме час додати!"})]})}):(0,j.jsx)(d.c,{blockClassName:h.spinnerBlock})}),(0,j.jsx)("div",{className:h.paginationBlock,children:(0,j.jsx)(u.c,{pageAmount:i})})]})}function f(){return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(n.c,{}),(0,j.jsx)(b,{})]})}},9331:function(e,t,c){function n(e){const t=e.toString().split("").reverse();let c=0,n=0;return t.forEach(((e,a)=>{n%3==0&&0!==a&&(t.splice(a+c,0," "),c+=1),n+=1})),t.reverse().join("")}c.d(t,{c:function(){return n}})}}]);