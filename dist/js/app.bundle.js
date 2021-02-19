!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}n.r(t);var o=new WeakSet,s=new WeakSet,c=new WeakSet,h=new WeakSet,l=function(){var e,t,n;function l(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),h.add(this),c.add(this),s.add(this),o.add(this),r(this,"methods",[]),r(this,"lastAction",performance.now()),r(this,"highestPrecision",1/0),a(this,o,d).call(this)}return e=l,(t=[{key:"update",value:function(e,t){var n=a(this,c,f).call(this,e);n&&(this.methods[n.index].frequency=t,a(this,h,y).call(this,t))}},{key:"add",value:function(e){return e.id||(e.id=Date.now()),a(this,c,f).call(this,e.id)||(e.lastAction=performance.now(),this.methods.push(e),a(this,h,y).call(this,e.frequency)),e.id}},{key:"clear",value:function(){this.methods=[]}}])&&i(e.prototype,t),n&&i(e,n),l}(),d=function(){window.requestAnimationFrame(a(this,s,u).bind(this))},u=function(e){e-this.lastAction>=this.highestPrecision&&(this.lastAction=e,this.methods.forEach((function(t){e-t.lastAction>=t.frequency&&(t.lastAction=e,t.fn())}))),a(this,o,d).call(this)},f=function(e){var t,n=this.methods.filter((function(n,i){return n.id===e&&(t=i,!0)}));return 1===n.length?{method:n[0],index:t}:null},y=function(e){this.highestPrecision=e<this.highestPrecision?e:this.highestPrecision};function p(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}var b={UP:0,RIGHT:1,DOWN:2,LEFT:3},v={CLEAR:0,APPLE:1,SELF:2},w=new WeakSet,x=new WeakSet,k=new WeakSet,S=new WeakSet,E=new WeakSet,P=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),E.add(this),S.add(this),k.add(this),x.add(this),w.add(this),g(this,"head",{x:0,y:0}),g(this,"body",[]),g(this,"length",3),g(this,"grid",{}),g(this,"history",[]),g(this,"bounds",0),this.head.x=t.x,this.head.y=t.y,this.body.push(this.head),this.grid=n,this.bounds=i,m(this,x,I).call(this)}var t,n,i;return t=e,(n=[{key:"promote",value:function(){this.length++}},{key:"doesIntersect",value:function(e){var t=!1;return this.body.forEach((function(n){n.x===e.x&&n.y===e.y&&(t=!0)})),t}},{key:"go",value:function(e){var t=m(this,S,O).call(this,e);if(this.doesIntersect(t))return v.SELF;var n=m(this,E,T).call(this,t);for(this.history.push(this.head),this.head=t,this.body.push(t);this.body.length>this.length;){var i=this.body.shift();this.history.includes(i)||this.history.push(i)}return m(this,x,I).call(this),n?v.APPLE:v.CLEAR}}])&&p(t.prototype,n),i&&p(t,i),e}(),L=function(){for(;this.history.length>0;){var e=this.history.pop();this.grid[e.y][e.x].node.classList.remove("head"),this.doesIntersect(e)||(this.grid[e.y][e.x].node.classList.remove("body"),this.grid[e.y][e.x].node.classList.remove("was-apple"))}},I=function(){var e=this;m(this,w,L).call(this),this.grid[this.head.y][this.head.x].node.classList.add("head"),this.body.forEach((function(t){e.grid[t.y][t.x].node.classList.add("body")}))},A=function(e){return e.x+1>this.bounds&&(e.x=0),e.x<0&&(e.x=this.bounds-1),e.y+1>this.bounds&&(e.y=0),e.y<0&&(e.y=this.bounds-1),e},O=function(e){var t={x:this.head.x,y:this.head.y};switch(e){case b.UP:t.y--;break;case b.RIGHT:t.x++;break;case b.DOWN:t.y++;break;case b.LEFT:t.x--}return m(this,k,A).call(this,t)},T=function(e){var t=!!this.grid[e.y][e.x].apple;return t&&(this.grid[e.y][e.x].apple=null,this.grid[e.y][e.x].node.classList.remove("apple"),this.grid[e.y][e.x].node.classList.add("was-apple")),t};n(0);!function(e,t){var n=t.getElementById("arena"),i=t.getElementById("score"),r=24,a=Math.min(800,window.innerHeight-96,document.documentElement.clientHeight-96,window.innerWidth-10,document.documentElement.clientWidth-10),o={};n.style.width="".concat(a,"px"),n.style.height="".concat(a,"px"),n.style.marginBottom="calc(100vh - ".concat(a,"px - 64px)"),t.documentElement.setAttribute("style","--grid-items: ".concat(r));for(var s=b.RIGHT,c=0,h=0;h<r;h++){o[h]={};for(var d=0;d<r;d++){var u=t.createElement("div");u.id="grid-".concat(h,"-").concat(d),u.style.width="calc(100% / ".concat(r,")"),u.style.height="calc(100% / ".concat(r,")"),u.style.top="calc((100% / ".concat(r,") * ").concat(h,")"),u.style.left="calc((100% / ".concat(r,") * ").concat(d,")"),u.classList.add("grid"),n.appendChild(u),o[h][d]={node:u,snake:null,head:null,apple:null,eaten:null}}}var f=new P({x:r/2,y:r/2},o,r),y=3,p=1,g=500;function m(e,t){return Math.round(Math.random()*(t-e)+e)}function w(){for(var e=n.querySelectorAll(".apple").length;e<y;){var t={x:m(0,r-1),y:m(0,r-1)},i=!!o[t.y][t.x].apple,a=f.doesIntersect(t);i||a||(o[t.y][t.x].apple=!0,o[t.y][t.x].node.classList.add("apple"),e++)}}function x(){return g/p}localStorage.getItem("highScore")||localStorage.setItem("highScore",0),t.addEventListener("keydown",(function(e){switch(e.key.toLowerCase()){case"arrowup":case"w":s=b.UP;break;case"arrowright":case"d":s=b.RIGHT;break;case"arrowdown":case"s":s=b.DOWN;break;case"arrowleft":case"a":s=b.LEFT}}));var k=performance.now();function S(e){c+=Math.round(e),i.innerHTML="Current score: ".concat(c,". Previous high score: ").concat(localStorage.getItem("highScore")),k=performance.now()}var E=new l,L=E.add({fn:function(){switch(f.go(s)){case v.SELF:parseInt(localStorage.getItem("highScore"),10)<c&&localStorage.setItem("highScore",c),alert("Game over... :("),E.clear();break;case v.APPLE:p+=.2,f.promote(),E.update(L,x()),w(),S(10+Math.floor(c/100));break;default:f.length>=r&&performance.now()-k>10*x()&&S(1)}},frequency:x()});w()}(window,document)}]);