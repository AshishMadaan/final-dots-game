parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wT1R":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateSliderHTML=exports.updateScoreDOM=exports.updateScore=exports.toggleStartBtn=exports.resetGameBoard=exports.removeDot=exports.removeAllDots=exports.pauseDots=exports.getPosition=exports.getAnimationTime=exports.generateRandomNumber=exports.displayElement=exports.addPointToScore=void 0;var e=function(e,t){return Math.floor(Math.random()*(t-e))+e};exports.generateRandomNumber=e;var t=function(e){document.getElementById("currentScore").innerHTML=e};exports.updateScoreDOM=t;var r=function(e){document.getElementById("currentSpeed").innerHTML="".concat(e)};exports.updateSliderHTML=r;var o=function(e,t){var r=document.getElementById("currentScore");e.score+=+t,r.innerHTML=e.score};exports.updateScore=o;var n=function(e){document.getElementById("startBtn").innerHTML=e?"Pause":"Start"};exports.toggleStartBtn=n;var a=function e(t){t.removeEventListener("animationend",e),t.parentNode.removeChild(t)};exports.removeDot=a;var d=function(t){var r=document.querySelector(".game__board").clientWidth;return e(0,r-t)};exports.getPosition=d;var s=function(e){return window.innerHeight/e};exports.getAnimationTime=s;var i=function(e,t){e.isPlaying&&(o(e,t.dataset.value),a(t))};exports.addPointToScore=i;var u=function(e,o){o.score=0,o.isPlaying=!1,o.currentSpeed=50,t(0),r(o.currentSpeed),n(!1),document.getElementById("currentSpeed").value=o.currentSpeed,document.getElementById("speedControl").value=o.currentSpeed,clearInterval(e),c()};exports.resetGameBoard=u;var c=function(){document.querySelectorAll(".dot").forEach(function(e){a(e)})};exports.removeAllDots=c;var p=function(e){e.classList.add("show")};exports.displayElement=p;var l=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];document.querySelectorAll(".dot").forEach(function(t){t.style.WebkitAnimationPlayState=e?"running":"paused",t.disabled=!e})};exports.pauseDots=l;
},{}],"FKe4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addDot=void 0;var e=require("./util"),t=function(t,n){var i=document.querySelector(".game__board"),o=(0,e.generateRandomNumber)(0,10),a=10*o+n,r={size:a,value:10-o,position:(0,e.getPosition)(a)},d=document.createElement("div");d.classList.add("dot"),d.setAttribute("style","\n    height: ".concat(r.size,"px;\n    width: ").concat(r.size,"px;\n    animation: slideDown ").concat((0,e.getAnimationTime)(t.currentSpeed),"s linear;\n    left: ").concat(r.position,"px;\n    ")),d.setAttribute("data-value","".concat(r.value)),d.addEventListener("click",function(){return(0,e.addPointToScore)(t,d)}),d.addEventListener("animationend",function(){return(0,e.removeDot)(d)}),i.appendChild(d)};exports.addDot=t;
},{"./util":"wT1R"}],"RSqK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.openModal=void 0;var e=require("./util"),o=function(){document.querySelector(".modal__overlay").classList.add("active"),(0,e.pauseDots)(),(0,e.toggleStartBtn)(!1),t()};exports.openModal=o;var t=function(){document.querySelector(".close").addEventListener("click",function(){document.querySelector(".modal__overlay").classList.remove("active"),(0,e.removeAllDots)()})};
},{"./util":"wT1R"}],"yCUT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.startTimer=exports.clearTimer=void 0;var e=require("./modal"),r=function(r){var t=document.getElementById("currentScore"),n=document.querySelector(".timer"),a=document.getElementById("clearBtn"),o=document.getElementById("stopWatch");n.classList.add("show");var c=r.timeLimit,i=setInterval(function(){var r,n;c<=0&&(clearInterval(i),a.click()),o.innerHTML="00:"+(n=2-(r=c).toString().length+1,Array(+(n>0&&n)).join("0")+r),(c-=1)>=0&&+t.innerHTML>=10&&((0,e.openModal)(),clearInterval(i),o.innerHTML="00:00")},1e3)};exports.startTimer=r;var t=function(e){clearInterval(e)};exports.clearTimer=t;
},{"./modal":"RSqK"}],"H0Gq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.winningConfig=exports.isCompetition=exports.SMALL_VIEWPORT=exports.NEW_DOT_INTERVAL=exports.INITIAL_SLIDER_VALUE=exports.INITIAL_SIZE=void 0;var e=768;exports.SMALL_VIEWPORT=e;var o=10;exports.INITIAL_SIZE=o;var t=50;exports.INITIAL_SLIDER_VALUE=t;var r=1e3;exports.NEW_DOT_INTERVAL=r;var I=!1;exports.isCompetition=I;var s={timeLimit:10,scoreToComplete:15};exports.winningConfig=s;
},{}],"ceUA":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=function(){function t(){return e(this,t),t.instance||(this._data={currentSpeed:50,score:0,isPlaying:!1},t.instance=this),t.instance}return n(t,[{key:"setState",value:function(e,t){this._data[e]=t}},{key:"getState",value:function(e){return this._data[e]}}]),t}(),a=new r;Object.freeze(a);var i=a;exports.default=i;
},{}],"QvaY":[function(require,module,exports) {
"use strict";var e=require("./util"),t=require("./dot"),n=require("./timer"),r=require("./constant"),i=o(require("./state"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){u(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};console.log(i.default,"ashish");var a=document.getElementById("speedControl"),u=document.getElementById("startBtn"),l=document.getElementById("clearBtn"),s=document.querySelector(".mode__selection"),d=document.getElementById("changeMode"),g={INITIAL_SIZE:r.INITIAL_SIZE,INITIAL_SLIDER_VALUE:r.INITIAL_SLIDER_VALUE,NEW_DOT_INTERVAL:r.NEW_DOT_INTERVAL,isCompetition:r.isCompetition,winningConfig:r.winningConfig};o=c(c({},g),o);var p,I={currentSpeed:a.value,score:0,isPlaying:!1};(0,e.updateSliderHTML)(I.currentSpeed),(0,e.updateScoreDOM)(0),window.innerWidth>r.SMALL_VIEWPORT&&(0,e.displayElement)(s),a.addEventListener("input",function(t){var n=t.target.value;I.currentSpeed=n,(0,e.updateSliderHTML)(n)}),u.addEventListener("click",function(){var r=I.isPlaying;I.isPlaying=!r,(0,e.toggleStartBtn)(I.isPlaying),I.isPlaying?(p=setInterval(function(){return(0,t.addDot)(I,o.INITIAL_SIZE)},o.NEW_DOT_INTERVAL),o.isCompetition&&(0,n.startTimer)(o.winningConfig)):(0,n.clearTimer)(p),(0,e.pauseDots)(I.isPlaying)}),l.addEventListener("click",function(){(0,e.resetGameBoard)(p,I)}),d.addEventListener("change",function(t){var n=t.target.value;(0,e.resetGameBoard)(p,I),o.isCompetition="competition"===n})};l({isCompetition:!1});
},{"./util":"wT1R","./dot":"FKe4","./timer":"yCUT","./constant":"H0Gq","./state":"ceUA"}]},{},["QvaY"], null)
//# sourceMappingURL=/js.bd074cb8.js.map