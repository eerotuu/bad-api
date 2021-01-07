(this["webpackJsonpbad-api"]=this["webpackJsonpbad-api"]||[]).push([[0],{44:function(e,t,n){},45:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(0),a=n.n(c),i=n(12),s=n.n(i),u=(n(44),n(8)),o=(n(45),n(46),n(37)),j=n(23),l=n(15),d=n(17),b=n(36),h=n(34),p=n(35),O=function(e){var t=e.productType,n=e.productCategoryData,a=e.isLoading,i=e.setIsLoading,s=Object(c.useState)([]),o=Object(u.a)(s,2),j=o[0],l=o[1];Object(c.useEffect)((function(){!function(){var e=n.map((function(e){return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{style:{textAlign:"left"},children:e.name}),Object(r.jsx)("td",{children:e.color.join(", ")}),Object(r.jsx)("td",{children:e.manufacturer}),Object(r.jsx)("td",{children:e.price}),Object(r.jsx)("td",{children:e.DATAPAYLOAD})]},e.id)}));l(e),i(!1)}()}),[n]);var b=function(){return Object(r.jsxs)("div",{className:"content_center_screen",children:[Object(r.jsx)(d.a,{animation:"border",style:{width:"10rem",height:"10rem"}}),Object(r.jsx)("h4",{style:{marginTop:"1rem"},children:"Creating List..."})]})},O=function(){return Object(r.jsxs)(h.a,{responsive:!0,size:"sm",children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{style:{textAlign:"left"},children:"Product name"}),Object(r.jsx)("th",{children:"Available colors"}),Object(r.jsx)("th",{children:"Manufacturer"}),Object(r.jsx)("th",{children:"Price"}),Object(r.jsx)("th",{children:"Availability"})]})}),Object(r.jsx)("tbody",{children:j})]})};return Object(r.jsxs)("div",{style:{width:"100%"},children:[Object(r.jsx)(p.a,{className:"justify-content-center",style:{margin:"1rem"},children:Object(r.jsx)("h1",{children:t})}),a||!j.length?Object(r.jsx)(b,{}):Object(r.jsx)(O,{})]})},f=n(11),x=n.n(f),m=n(22),v=n(14),g=n.n(v),y="https://bad-api-assignment.reaktor.com/",A=(g.a.create({baseURL:"https://bad-api-assignment.reaktor.com/products/",headers:{Accept:"application/json"}}),g.a.create({baseURL:"".concat(y).concat("v2/").concat("products/"),headers:{Accept:"application/json"},timeout:1e5})),L=(g.a.create({baseURL:y.concat("availability/"),headers:{Accept:"application/json"}}),g.a.create({baseURL:"".concat(y).concat("v2/").concat("availability/"),headers:{Accept:"application/json"},timeout:1e5})),k=n(38),T=function(e,t){var n=t.id;return e.has(n)?e.set(n,Object.assign(e.get(n),t)):e.set(n,t),e},w=function(e,t){return t.reduce(T,e)},S=function(e,t){var n=e;return n[t.type]=n[t.type]||[],n[t.type].push(t),n},C=function(e,t){if(Array.isArray(e)&&e.length)return e;throw Error(t)},P=function(){var e=Object(m.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map((function(e){return A.get(e)})));case 2:return n=e.sent,e.abrupt("return",n.map((function(e){return C(e.data,"The server returned an empty product data.")})).flat());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(m.a)(x.a.mark((function e(t){var n,r,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.reduce((function(e,t){return e.has(t.manufacturer)||e.set(t.manufacturer,L.get(t.manufacturer)),e}),new Map).values(),e.next=3,Promise.all(n);case 3:return r=e.sent,c=r.map((function(e){return C(e.data.response,"The server returned an empty availability data.")})).flat(),e.abrupt("return",{products:t,availability:c});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(e){var t,n,r,c=e.products,a=e.availability,i=(t=/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/,a.filter((function(e){return"object"===typeof e})).map((function(e){var n=e;n.id=e.id.toLowerCase();var r=t.exec(e.DATAPAYLOAD)[1];return n.DATAPAYLOAD=r.replace("INSTOCK","In Stock").replace("OUTOFSTOCK","Out of Stock").replace("LESSTHAN10","< 10"),n})));return(n=c,r=i,Object(k.a)([n,r].reduce(w,new Map).values())).filter((function(e){return"undefined"!==typeof e.type})).reduce(S,{})},D=function(){var e=Object(m.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",P(t).then(I).then(N));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E="Gloves",F="Facemasks",U="Beanies",_="Gloves",B=function(){var e=Object(c.useState)(!0),t=Object(u.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(!0),s=Object(u.a)(i,2),h=s[0],p=s[1],f=Object(c.useState)([]),x=Object(u.a)(f,2),m=x[0],v=x[1],g=Object(c.useState)(!1),y=Object(u.a)(g,2),A=y[0],L=y[1],k=Object(c.useState)(""),T=Object(u.a)(k,2),w=T[0],S=T[1],C=Object(c.useState)(_),P=Object(u.a)(C,2),I=P[0],N=P[1],B=Object(c.useRef)(!1),R=function(e){v(e),a(!1),L(!1),B.current=!0},K=function(e){B.current||(S(e.message),L(!0),a(!1))},M=function(){return D(["gloves","facemasks","beanies"]).then(R).catch(K)};Object(c.useEffect)((function(){M(),setInterval((function(){M()}),3e5)}),[]);var Y=function(e){I!==e&&(p(!0),N(e))},G=function(){return Object(r.jsxs)(j.a,{bg:"dark",variant:"dark",children:[Object(r.jsx)(j.a.Brand,{children:"Bad-Api"}),Object(r.jsx)(j.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(r.jsxs)(l.a,{className:"mr-auto",children:[Object(r.jsx)(l.a.Link,{onClick:function(){return Y(E)},children:E}),Object(r.jsx)(l.a.Link,{onClick:function(){return Y(F)},children:F}),Object(r.jsx)(l.a.Link,{onClick:function(){return Y(U)},children:U})]})]})},J=function(){return Object(r.jsxs)("div",{className:"content_center_screen",children:[Object(r.jsx)(d.a,{animation:"border",style:{width:"10rem",height:"10rem"}}),Object(r.jsx)("h4",{style:{marginTop:"1rem"},children:"Finding Products..."})]})},V=function(){L(!1),a(!0),p(!0),M()},z=function(){return Object(r.jsxs)("div",{className:"content_center_screen align-text-left",children:[Object(r.jsx)("h1",{children:"Oops! Something went wrong."}),Object(r.jsx)("p",{children:w}),Object(r.jsx)("p",{children:"The API has a built-in intentional failure case which might be causing these."}),Object(r.jsx)(b.a,{variant:"primary",onClick:V,children:"Try Again"})]})},H=function(){return A?Object(r.jsx)(z,{}):n?Object(r.jsx)(J,{}):Object(r.jsx)(O,{productType:I,productCategoryData:m[I.toLowerCase()],isLoading:h,setIsLoading:p})};return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(G,{}),Object(r.jsx)(o.a,{children:Object(r.jsx)(H,{})})]})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,73)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),a(e),i(e)}))};s.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(B,{})}),document.getElementById("root")),R()}},[[71,1,2]]]);
//# sourceMappingURL=main.d66b6c30.chunk.js.map