if(!self.define){let e,i={};const t=(t,s)=>(t=new URL(t+".js",s).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>t(e,r),l={module:{uri:r},exports:o,require:c};i[r]=Promise.all(s.map((e=>l[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-2b403519"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"e043999b310c8c1bd8040e2237c23b7a"},{url:"main.js",revision:"03af0c4e34de971471f1373c1d3749bb"},{url:"main.js.LICENSE.txt",revision:"8bd0a105f4d1b7efb900c9fe30e5e773"}],{})}));
