"use strict";(self.webpackChunkreact_config=self.webpackChunkreact_config||[]).push([[4025],{8828:function(e,t,c){var n,s=c(1504);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var c=arguments[t];for(var n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n])}return e},l.apply(this,arguments)}t.c=e=>s.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 18 20"},e),n||(n=s.createElement("path",{d:"M2 5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5zm5 12H5V8h2zm6 0h-2V8h2zm.618-15L12 0H6L4.382 2H0v2h18V2z"})))},9040:function(e,t,c){c.d(t,{c:function(){return p}}),c(3248);var n=c(1504),s=c(3284),l=c(4768),a=c(2084),o=c.n(a),r=c(60),i=c(4772),d={nav:"vYt_SOxa",list:"RYHhZhNM",link:"xKuaqUkN",circle:"bjyKqlFY"},u=c(7624);function p(){const e=(0,s.W4)(),[t,c]=(0,n.useState)(null),{data:a}=(0,r.u4)();function p(e,t,c){return(0,u.jsxs)(n.Fragment,{children:[(0,u.jsx)("li",{children:(0,u.jsx)("span",{className:d.circle})}),(0,u.jsx)("li",{children:(0,u.jsx)(l.cH,{className:o()(d.link),to:c,alt:t,children:t})})]},e)}a&&null===t&&c(a);const m=[];if(t&&e.categoryId&&e.subcategoryId){const c=t.entities[e.categoryId];if(!c)return;if(m.push(p(c.id,c.name,`/${c.id}`)),e.subcategoryId&&e.productId){const t=c.subcategories.entities[e.subcategoryId];if(!t)return;m.push(p(t.id,t.name,`/${c.id}/${t.id}`))}}else e.articleId&&m.push(p("news","Новини","/news"));return(0,u.jsx)("nav",{className:o()(i.c.container,d.nav),children:(0,u.jsxs)("ul",{className:d.list,children:[(0,u.jsx)("li",{children:(0,u.jsx)(l.cH,{className:d.link,to:"/",alt:"Головна",children:"Головна"})}),m]})})}},9464:function(e,t,c){c.d(t,{c:function(){return N}});var n,s=c(1504),l=c(4768),a=c(3284),o=c(2084),r=c.n(o),i=c(60),d=c(9331),u=c(4480),p=c(7420),m=c(2112),h=c(120),x={card:"ng9dABx4",iconButtonsBlock:"p4hzF2wi",iconButton:"ZZp2HNCb",iconButton_active:"r1jitE9Q",icon:"mhNwLyHJ",spinner:"NfvoTWw1",imageLink:"mIWGXKxs",image:"nXba8_IH",textLink:"L37eDdj5",priceAndCartBlock:"sow6mheQ",oldPrice:"n0o9avSy",price:"gFCxKShI",priceSpan:"uYxY3R1Q",cartButton:"U4HKTUVn",cartIcon:"iBYknE7B",longCard:"w0amIRyi",longImageLink:"JpPVJb61",longImage:"DUq5oKm5",nameAndIconButtons:"OMxa_Mhb",longIconButtonsBlock:"brKOVlyr",longPriceAndCartBlock:"HDJvLypx",longCartButton:"JzF4uXeY"},b=c(7752),j=c(876),g=c(3884);function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var c=arguments[t];for(var n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n])}return e},f.apply(this,arguments)}var B=e=>s.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 8 6"},e),n||(n=s.createElement("path",{fill:"#fff",d:"M8 1.044c.006.323-.133.58-.356.804Q6.28 3.2 4.92 4.55c-.373.369-.741.738-1.117 1.107-.462.455-1.094.458-1.552.007Q1.28 4.715.322 3.753C-.103 3.324-.107 2.675.309 2.26c.405-.415 1.067-.415 1.505 0q.205.193.4.395c.232.241.248.544.04.804-.134.168-.14.297-.024.409.12.112.272.095.422-.056Q4.41 2.068 6.168.329c.46-.454 1.164-.435 1.576.037A1 1 0 0 1 8 1.044"}))),v=c(7624),N=(0,s.memo)((e=>{let{name:t,categoryId:n,subcategoryId:o,productId:f,price:N,oldPrice:y,isShortCard:k,wishlistMutationFunc:I,compareMutationFunc:C}=e;const[w]=(0,s.useState)((()=>c(3144)(`./${f}.webp`))),[S,A]=(0,s.useState)(!1),[L,P]=(0,s.useState)(!1),[_,$]=(0,s.useState)(!1),{data:E}=(0,i.oZ)();if(E){const e=!!E.find((e=>{let[t,c,s]=e;return t===n&&c===o&&s===f}));S!==e&&A(e)}const{data:O}=(0,i.jy)();if(O){const e=!!O.find((e=>e.categoryId===n&&e.subcategoryId===o&&e.productId===f));L!==e&&P(e)}const{data:T}=(0,i.GK)();if(T){const e=!!T.find((e=>{let[t,c,s]=e;return t===n&&c===o&&s===f}));_!==e&&$(e)}function H(e,t,c){const s=JSON.stringify([n,o,f]);e?c(s):t(s)}const[F]=(0,i.SU)(),[M]=(0,i.QW)();function Q(){H(S,F,M),I&&I(n,o,f)}const[K]=(0,i.oB)(),[J]=(0,i.Wu)();function D(){H(L,K,J)}const[R]=(0,i.i4)(),[V]=(0,i.ie)();function q(){H(_,R,V),C&&C(n,o,f)}const U=`/${n}/${o}/${f}`;return k?(0,v.jsxs)("div",{className:x.card,children:[(0,v.jsxs)("div",{className:x.iconButtonsBlock,children:[(0,v.jsx)("button",{type:"button",className:r()(x.iconButton,_&&x.iconButton_active),"aria-label":_?`Видалити ${t} з порівняння`:`Добавить ${t} в порівняння`,onClick:q,children:(0,v.jsx)(b.c,{className:x.icon})}),(0,v.jsx)("button",{type:"button",className:r()(x.iconButton,S&&x.iconButton_active),"aria-label":S?`Видалити ${t} зі списку бажань`:`Добавить ${t} до списку бажань`,onClick:Q,children:(0,v.jsx)(j.c,{className:x.icon})})]}),(0,v.jsx)(l.cH,{className:x.imageLink,to:U,alt:t,children:(0,v.jsx)(s.Suspense,{fallback:(0,v.jsx)(u.c,{className:x.spinner}),children:(0,v.jsx)(a.g5,{resolve:w,children:(0,v.jsx)(p.c,{className:x.image,alt:t})})})}),(0,v.jsx)(l.cH,{className:r()(h.c.link,x.textLink),to:U,alt:t,children:t}),(0,v.jsxs)("div",{className:x.priceAndCartBlock,children:[(0,v.jsxs)("div",{className:x.priceBlock,children:[y&&(0,v.jsxs)("p",{className:x.oldPrice,children:[y,"₴/шт"]}),(0,v.jsxs)("p",{className:x.price,children:[(0,d.c)(N),(0,v.jsx)("span",{className:x.priceSpan,children:"₴/шт"})]})]}),(0,v.jsx)(m.c,{className:x.cartButton,ariaLabel:L?`Видалити ${t} з кошика`:`Додати ${t} до кошику`,onClick:D,children:L?(0,v.jsx)(B,{className:x.cartIcon}):(0,v.jsx)(g.c,{className:x.cartIcon})})]})]}):(0,v.jsxs)("div",{className:x.longCard,children:[(0,v.jsx)(l.cH,{className:x.longImageLink,to:U,alt:t,children:(0,v.jsx)(s.Suspense,{fallback:(0,v.jsx)(u.c,{className:x.spinner}),children:(0,v.jsx)(a.g5,{resolve:w,children:(0,v.jsx)(p.c,{className:x.longImage,alt:t})})})}),(0,v.jsxs)("div",{className:x.nameAndIconButtons,children:[(0,v.jsx)(l.cH,{className:r()(h.c.link,x.longTextLink),to:U,alt:t,children:t}),(0,v.jsxs)("div",{className:x.longIconButtonsBlock,children:[(0,v.jsx)("button",{type:"button",className:r()(x.iconButton,_&&x.iconButton_active),"aria-label":_?`Видалити ${t} з порівняння`:`Додати ${t} в порівняння`,onClick:q,children:(0,v.jsx)(b.c,{className:x.icon})}),(0,v.jsx)("button",{type:"button",className:r()(x.iconButton,S&&x.iconButton_active),"aria-label":S?`Видалити ${t} зі списку бажань`:`Додати ${t} до списку бажань`,onClick:Q,children:(0,v.jsx)(j.c,{className:x.icon})})]})]}),(0,v.jsxs)("div",{className:x.longPriceAndCartBlock,children:[(0,v.jsxs)("div",{className:x.priceBlock,children:[y&&(0,v.jsxs)("p",{className:x.oldPrice,children:[y,"₴/шт"]}),(0,v.jsxs)("p",{className:x.price,children:[(0,d.c)(N),(0,v.jsx)("span",{className:x.priceSpan,children:"₴/шт"})]})]}),(0,v.jsx)(m.c,{className:x.longCartButton,ariaLabel:L?`Видалити ${t} з кошика`:`Додати ${t} до кошику`,onClick:D,children:L?"У кошику":"Додати до кошику"})]})]})}))},4025:function(e,t,c){c.r(t),c.d(t,{default:function(){return B}});var n=c(9040),s=(c(3248),c(1504)),l=c(2328),a=c(2084),o=c.n(a),r=c(60),i=c(9464),d=c(4772),u=c(9396),p={main:"vLxY_vBT",main_marginBottom:"pW45z337",titleAndButtonBlock:"YeeLi7kA",title:"utbj5ftS",deleteBtn:"Drg9cnN9",binIcon:"hu3Lrd6s",subcategoryBtnAndControlBtnBlock:"K6bPdwbO",subcategoryBtnBlock:"QyjpqaGu",subcategoryBtn:"kjqZcp0Q",subcategoryBtn_active:"SU8pu4eq",deleteSubcBtn:"bAQLJhBx",crossIcon:"U0Kx9bmv",controlBtnBlock:"Pnv0jUm4",controlButton:"YyATDIOJ",controlButton_disabled:"qCp1cKHz",chevronIcon:"hRxC6G2L",chevronIcon_next:"ryvWr43y",productBlock:"j1DSfBp3",productBlock_inactive:"FBobztaf",productCard:"rp76B2e4",noProductBlock:"OZFKJBHr",noProductContent:"RJDAxZbw",noProductLine:"gmsA1UgJ",noProductText:"CAKN5x8E",specsTitleAndControlBtnBlock:"EbqPzAbe",subtitle:"aNrFdkjI",specsControlBtnBlock:"FBKKDcoV",specsControlBtn:"Ee2X5b32",specsControlBtn_active:"jwaF5Eje",specsBlock:"E7xmUiQN",specsTable:"qt_aEG2L",specsTableTBody:"pqNpTdGs",specsTableHeaderRow:"lEIAdHpU",specsTableTh:"AAPA22jl",specsValueRow:"c0MVlRHN",valueCell:"Cy23l5VA"},m=c(2872),h=c(8828),x=c(2036),b=c(2860),j=c(7228),g=c(7624);function f(){var e;const t=(0,l.OY)(),c=(0,s.useRef)(),n=(0,s.useRef)(),[a,f]=(0,s.useState)(null),[B,v]=(0,s.useState)(null),[N,y]=(0,s.useState)(null),[k,I]=(0,s.useState)(null),[C,w]=(0,s.useState)(null),[S,A]=(0,s.useState)("all"),[L]=(0,r.gx)(),P=B?null==a?void 0:a.findIndex((e=>{let{subcategoryId:t}=e;return t===B})):null;var _,$;null===B&&null!=a&&a.length&&v(null===(_=a[0])||void 0===_?void 0:_.subcategoryId),N!==B&&(y(B),I(a[P].categoryId)),a&&null!=a&&a.length&&((null==a?void 0:a.find((e=>{let{subcategoryId:t}=e;return t===B})))||v(null===($=a[0])||void 0===$?void 0:$.subcategoryId));const E=(0,s.useCallback)((()=>{null!=C&&C.length&&(c.current.scrollLeft=0,n.current.scrollLeft=0)}),[C]);(0,s.useEffect)(E,[E]);const O=(null==C||null===(e=C[0])||void 0===e?void 0:e.subcategoryId)!==B,{data:T}=(0,r.W2)();T&&a!==T&&f(T);const H=!B,F=(0,s.useMemo)((()=>({categoryId:k,subcategoryId:B})),[k,B]),{data:M}=(0,r.Qh)(F,{skip:H});M&&C!==M&&w(M);const Q=(0,s.useCallback)(((e,c,n)=>{const s=1===C.length;t(r.cf.util.updateQueryData("getCompareProducts",F,(t=>{const s=t.findIndex((t=>t.categoryId===e&&t.subcategoryId===c&&t.product.id===n));t.splice(s,1)}))),s&&t(r.cf.util.updateQueryData("getCompareSubcategories",void 0,(t=>{const n=t.findIndex((t=>t.categoryId===e&&t.subcategoryId===c));t.splice(n,1)})))}),[C,t,F]),K=0===P,J=P===(a?a.length-1:null),D=(0,s.useMemo)((()=>null==a?void 0:a.map((e=>{let{categoryId:c,subcategoryId:n,subcategoryName:s}=e;return(0,g.jsxs)("div",{className:o()(p.subcategoryBtn,B===n&&p.subcategoryBtn_active),id:`${c}${n}`,role:"button",onClick:e=>{e.target.id===`${c}${n}`&&v(n)},tabIndex:"0","aria-label":`Показати порівняння товарів з категорії ${s}`,"aria-pressed":B===n,children:[(0,g.jsx)("button",{type:"button",className:p.deleteSubcBtn,onClick:()=>{const e=JSON.stringify([c,n]);L(e),1===a.length&&t(r.cf.util.updateQueryData("getCompareProducts",F,(e=>{e.splice(0)})))},"aria-label":`Видалити категорію ${s} з порівняння`,children:(0,g.jsx)(m.c,{className:p.crossIcon})}),s]},n)}))),[a,B,L,t,F]),R=(0,s.useMemo)((()=>null==C?void 0:C.map((e=>(0,g.jsx)("div",{className:p.productCard,children:(0,g.jsx)(i.c,{name:e.product.name,categoryId:e.categoryId,subcategoryId:e.subcategoryId,productId:e.product.id,price:e.product.price,oldPrice:e.product.oldPrice,isShortCard:!0,compareMutationFunc:Q})},e.product.id)))),[C,Q]),V=(0,s.useMemo)((()=>{if(!C||!C.length)return;const e=new Set;return C.forEach((t=>{let{product:c}=t;const n=c["specs-filters"];Object.entries(n).forEach((t=>{let[c]=t;return e.add(c)}))})),Array.from(e).sort(((e,t)=>e.localeCompare(t)))}),[C]),q=(0,s.useMemo)((()=>{if(!V)return;const e={};return V.forEach((t=>{e[t]=[]})),C.forEach((t=>{let{product:c}=t;const n=c["specs-filters"];V.forEach((t=>{let c=n[t];void 0===c&&(c="-"),"object"==typeof c&&(c=c.slice().sort(((e,t)=>e.localeCompare(t))).join(", ")),e[t].push(c)}))})),e}),[C,V]),U=(0,s.useMemo)((()=>{if(!q)return;let e;if("all"===S)e=q;else if("similar"===S){const t={};Object.entries(q).forEach((e=>{let[c,n]=e;const s=n[0];let l=!0;n.slice(1).forEach((e=>{e!==s&&(l=!1)})),l&&(t[c]=n)})),e=t}else if("differ"===S){const t={};Object.entries(q).forEach((e=>{let[c,n]=e;const s=n[0];let l=!1;n.slice(1).forEach((e=>{e!==s&&(l=!0)})),l&&(t[c]=n)})),e=t}return e}),[q,S]),Y=(0,s.useMemo)((()=>{if(!U)return;const e=C.map((e=>{let{product:t}=e;return t.id}));return Object.entries(U).map((t=>{let[c,n]=t;const l=n.map(((t,n)=>(0,g.jsx)("td",{headers:c.split(" ").join(""),className:p.valueCell,children:t},e[n])));return(0,g.jsxs)(s.Fragment,{children:[(0,g.jsx)("tr",{className:p.specsTableHeaderRow,children:(0,g.jsx)("th",{id:c.split(" ").join(""),className:p.specsTableTh,children:c})}),(0,g.jsx)("tr",{className:p.specsValueRow,children:l})]},c)}))}),[U,C]);return(0,g.jsxs)("main",{className:o()(p.main,(!C||0===(null==C?void 0:C.length))&&p.main_marginBottom),children:[(0,g.jsxs)("div",{className:o()(d.c.container,p.controlAndProductBlock),children:[(0,g.jsxs)("div",{className:p.titleAndButtonBlock,children:[(0,g.jsx)("h1",{className:o()(u.c.text,u.c.textFw800,u.c.text48px,u.c.textBlack,p.title),children:"Порівняння товарів"}),(null==D?void 0:D.length)>0&&(0,g.jsxs)("button",{type:"button",className:p.deleteBtn,onClick:function(){const e=JSON.stringify({deleteAll:!0});L(e),t(r.cf.util.updateQueryData("getCompareProducts",F,(e=>{e.splice(0)})))},"aria-label":"Видалити все",children:[(0,g.jsx)(h.c,{className:p.binIcon}),"Видалити все"]})]}),(null==D?void 0:D.length)>0&&(0,g.jsxs)("div",{className:p.subcategoryBtnAndControlBtnBlock,children:[(0,g.jsx)("div",{className:p.subcategoryBtnBlock,children:D}),D.length>1&&(0,g.jsxs)("div",{className:p.controlBtnBlock,children:[(0,g.jsx)("button",{type:"button",className:o()(p.controlButton,K&&p.controlButton_disabled),onClick:function(){v(a[P-1].subcategoryId)},disabled:K,"aria-disabled":K,tabIndex:K?-1:0,"aria-label":"Показати попередню категорію",children:(0,g.jsx)(x.c,{className:p.chevronIcon})}),(0,g.jsx)("button",{type:"button",className:o()(p.controlButton,J&&p.controlButton_disabled),onClick:function(){v(a[P+1].subcategoryId)},disabled:J,"aria-disabled":J,tabIndex:J?-1:0,"aria-label":"Показати наступну категорію",children:(0,g.jsx)(x.c,{className:o()(p.chevronIcon,p.chevronIcon_next)})})]})]}),C&&C.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{ref:c,className:o()(p.productBlock,O&&p.productBlock_inactive),onScroll:function(){const e=c.current;n.current.scrollLeft=e.scrollLeft},children:R}),(0,g.jsxs)("div",{className:p.specsTitleAndControlBtnBlock,children:[(0,g.jsx)("h2",{className:o()(u.c.text,u.c.textFw800,u.c.text24px,u.c.textBlack,p.subtitle),children:"Характеристики"}),(0,g.jsxs)("div",{className:p.specsControlBtnBlock,children:[(0,g.jsx)("button",{type:"button",className:o()(p.specsControlBtn,"all"===S&&p.specsControlBtn_active),onClick:()=>A("all"),"aria-label":"Показати всі характеристики",children:"Усі характеристики"}),(0,g.jsx)("button",{type:"button",className:o()(p.specsControlBtn,"similar"===S&&p.specsControlBtn_active),onClick:()=>A("similar"),"aria-label":"Показати характеристики, що сходяться",children:"Однакові"}),(0,g.jsx)("button",{type:"button",className:o()(p.specsControlBtn,"differ"===S&&p.specsControlBtn_active),onClick:()=>A("differ"),"aria-label":"Показати характеристики, які відрізняються",children:"Різні"})]})]})]}),!C&&(!a||0!==(null==a?void 0:a.length))&&(0,g.jsx)(j.c,{}),(0===(null==C?void 0:C.length)||0===(null==a?void 0:a.length))&&(0,g.jsx)("div",{className:p.noProductBlock,children:(0,g.jsxs)("div",{className:p.noProductContent,children:[(0,g.jsx)(b.c,{className:p.noProductLine}),(0,g.jsx)("p",{className:o()(u.c.text,u.c.textFw800,u.c.text32px,p.noProductText),children:"Немає товарів для порівняння"}),(0,g.jsx)("p",{className:o()(u.c.text,u.c.text24px,u.c.textGrey),children:"Наші товари унікальні, але не настільки!"})]})})]}),C&&C.length>0&&(0,g.jsx)("div",{className:o()(d.c.container,p.specsBlock),children:(0,g.jsx)("table",{ref:n,className:p.specsTable,onScroll:function(){const e=c.current,t=n.current;e.scrollLeft=t.scrollLeft},children:(0,g.jsx)("tbody",{className:p.specsTableTBody,children:Y})})})]})}function B(){return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(n.c,{}),(0,g.jsx)(f,{})]})}},9331:function(e,t,c){function n(e){const t=e.toString().split("").reverse();let c=0,n=0;return t.forEach(((e,s)=>{n%3==0&&0!==s&&(t.splice(s+c,0," "),c+=1),n+=1})),t.reverse().join("")}c.d(t,{c:function(){return n}})}}]);