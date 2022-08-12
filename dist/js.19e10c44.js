parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wT1R":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateSliderHTML=exports.updateScoreDOM=exports.updateScore=exports.toggleStartBtn=exports.resetGameBoard=exports.pauseDots=exports.getPosition=exports.getAnimationTime=exports.generateRandomNumber=exports.displayElement=exports.addPointToScore=void 0;var e=document.querySelector("#currentScore"),t=document.querySelector("#currentSpeed"),r=document.querySelector("#startBtn"),o=function(e,t){return Math.floor(Math.random()*(t-e))+e};exports.generateRandomNumber=o;var n=function(t){return e.innerHTML=t};exports.updateScoreDOM=n;var a=function(e){return r.innerHTML=e?"Pause":"Start"};exports.toggleStartBtn=a;var u=function(e){return t.innerHTML="".concat(e)};exports.updateSliderHTML=u;var i=function(t,r){t.score+=+r,e.innerHTML=t.score};exports.updateScore=i;var s=function e(t){t.removeEventListener("animationend",e),t.parentNode.removeChild(t)},c=function(e){var t=document.querySelector(".game__board").clientWidth;return o(0,t-e)};exports.getPosition=c;var d=function(e){return window.innerHeight/e};exports.getAnimationTime=d;var l=function(e,t){e.isPlaying&&(i(e,t.dataset.value),s(t))};exports.addPointToScore=l;var p=function(e,t){n(0),u(t),a(!1),document.querySelector("#currentSpeed").value=t,document.querySelector("#speedControl").value=t,clearInterval(e),document.querySelectorAll(".dot").forEach(function(e){s(e)})};exports.resetGameBoard=p;var m=function(e){e.classlist.addClass("show")};exports.displayElement=m;var v=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];document.querySelectorAll(".dot").forEach(function(t){t.style.WebkitAnimationPlayState=e?"running":"paused",t.disabled=!e})};exports.pauseDots=v;
},{}],"FKe4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addDot=void 0;var e=require("./util"),t=function(t,n){var i=(0,e.generateRandomNumber)(0,10),o=10*i+n,a={size:o,value:10-i,position:(0,e.getPosition)(o)},r=document.createElement("div");r.classList.add("dot"),r.setAttribute("style","\n    height: ".concat(a.size,"px;\n    width: ").concat(a.size,"px;\n    animation: slideDown ").concat((0,e.getAnimationTime)(t.currentSpeed),"s linear;\n    left: ").concat(a.position,"px;\n    ")),r.setAttribute("data-value","".concat(a.value)),r.addEventListener("click",function(){return(0,e.addPointToScore)(t,r)}),r.addEventListener("animationend",function(){return(0,e.removeDot)(r)}),document.querySelector(".game__board").appendChild(r)};exports.addDot=t;
},{"./util":"wT1R"}],"RSqK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.openModal=void 0;var e=require("./util"),t=function(){document.querySelector(".modal__overlay").classList.add("active"),(0,e.pauseDots)(),(0,e.toggleStartBtn)(!1),o()};exports.openModal=t;var o=function(){document.querySelector(".close").addEventListener("click",function(){document.querySelector(".modal__overlay").classList.remove("active")})};
},{"./util":"wT1R"}],"yCUT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.startTimer=exports.clearTimer=void 0;var e=require("./modal"),r=function(r){var t=document.getElementById("currentScore"),n=document.querySelector(".timer"),a=document.getElementById("clearBtn"),i=i;n.classList.add("show");var c=r.timeLimit,o=setInterval(function(){var r,n;c<=0&&(clearInterval(o),a.click()),i.innerHTML="00:"+(n=2-(r=c).toString().length+1,Array(+(n>0&&n)).join("0")+r),(c-=1)>=0&&+t.innerHTML>=10&&((0,e.openModal)(),clearInterval(o),a.click(),i.innerHTML="00:00")},1e3)};exports.startTimer=r;var t=function(e){clearInterval(e)};exports.clearTimer=t;
},{"./modal":"RSqK"}],"H0Gq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.winningConfig=exports.isCompetition=exports.TabletWidth=exports.NEW_DOT_INTERVAL=exports.INITIAL_SLIDER_VALUE=exports.INITIAL_SIZE=exports.DesktopWidth=void 0;var e=768;exports.TabletWidth=e;var t=1024;exports.DesktopWidth=t;var o=10;exports.INITIAL_SIZE=o;var r=50;exports.INITIAL_SLIDER_VALUE=r;var s=1e3;exports.NEW_DOT_INTERVAL=s;var i=!1;exports.isCompetition=i;var p={timeLimit:10,scoreToComplete:15};exports.winningConfig=p;
},{}],"QvaY":[function(require,module,exports) {
"use strict";var e=require("./util"),t=require("./dot"),n=require("./timer"),r=require("./constant");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach(function(t){a(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=document.getElementById("speedControl"),c=document.getElementById("startBtn"),u=document.getElementById("clearBtn"),d=document.getElementById("changeMode"),l={INITIAL_SIZE:r.INITIAL_SIZE,INITIAL_SLIDER_VALUE:r.INITIAL_SLIDER_VALUE,NEW_DOT_INTERVAL:r.NEW_DOT_INTERVAL,isCompetition:r.isCompetition,winningConfig:r.winningConfig};i=o(o({},l),i);var s,p={currentSpeed:a.value,score:0,isPlaying:!1};(0,e.updateSliderHTML)(p.currentSpeed),(0,e.updateScoreDOM)(0),window.innerWidth>r.TabletWidth&&window.innerWidth<r.DesktopWidth&&(0,e.displayElement)(d),a.addEventListener("input",function(t){var n=t.target.value;p.currentSpeed=n,(0,e.updateSliderHTML)(n)}),c.addEventListener("click",function(){var r=p.isPlaying;p.isPlaying=!r,(0,e.toggleStartBtn)(p.isPlaying),p.isPlaying?(s=setInterval(function(){return(0,t.addDot)(p,i.INITIAL_SIZE)},i.NEW_DOT_INTERVAL),i.isCompetition&&(0,n.startTimer)(i.winningConfig)):(0,n.clearTimer)(s),(0,t.pauseDots)(p.isPlaying)}),u.addEventListener("click",function(){(0,e.resetGameBoard)(s,i.INITIAL_SLIDER_VALUE)}),d.addEventListener("change",function(e){var t=e.target.value;i.isCompetition="competition"===t})};c({isCompetition:!1});
},{"./util":"wT1R","./dot":"FKe4","./timer":"yCUT","./constant":"H0Gq"}]},{},["QvaY"], null)
//# sourceMappingURL=/js.19e10c44.js.map