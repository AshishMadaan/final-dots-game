parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wT1R":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateSliderHTML=exports.updateScoreDOM=exports.updateScore=exports.toggleStartBtn=exports.resetGameBoard=exports.getPosition=exports.getAnimationTime=exports.generateRandomNumber=exports.addPointToScore=void 0;var e=document.querySelector("#currentScore"),t=document.querySelector("#currentSpeed"),r=document.querySelector("#startBtn"),o=function(e,t){return Math.floor(Math.random()*(t-e))+e};exports.generateRandomNumber=o;var n=function(t){return e.innerHTML=t};exports.updateScoreDOM=n;var a=function(e){return r.innerHTML=e?"Pause":"Start"};exports.toggleStartBtn=a;var u=function(e){return t.innerHTML="".concat(e)};exports.updateSliderHTML=u;var c=function(t,r){t.score+=+r,e.innerHTML=t.score};exports.updateScore=c;var i=function e(t){t.removeEventListener("animationend",e),t.parentNode.removeChild(t)},d=function(e){var t=document.querySelector(".game__board").clientWidth;return o(0,t-e)};exports.getPosition=d;var s=function(e,t){return window.innerHeight/(e*t)};exports.getAnimationTime=s;var p=function(e,t){e.isPlaying&&(c(e,t.dataset.value),i(t))};exports.addPointToScore=p;var l=function(e,t){n(0),u(t),a(!1),document.querySelector("#currentSpeed").value=t,document.querySelector("#speedControl").value=t,clearInterval(e),document.querySelectorAll(".dot").forEach(function(e){i(e)})};exports.resetGameBoard=l;
},{}],"FKe4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pauseDots=exports.addDot=void 0;var e=require("./util"),t=function(t,n,o){var i=(0,e.generateRandomNumber)(0,10),a=10*i+n,r={size:a,value:10-i,position:(0,e.getPosition)(a)},d=document.createElement("div");d.classList.add("dot"),d.setAttribute("style","\n    height: ".concat(r.size,"px;\n    width: ").concat(r.size,"px;\n    animation: slideDown ").concat((0,e.getAnimationTime)(t.currentSpeed,o),"s linear;\n    left: ").concat(r.position,"px;\n    ")),d.setAttribute("data-value","".concat(r.value)),d.addEventListener("click",function(){return(0,e.addPointToScore)(t,d)}),d.addEventListener("animationend",function(){return removeDot(d)}),document.querySelector(".game__board").appendChild(d)};exports.addDot=t;var n=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];document.querySelectorAll(".dot").forEach(function(t){t.style.WebkitAnimationPlayState=e?"running":"paused",t.disabled=!e})};exports.pauseDots=n;
},{"./util":"wT1R"}],"yCUT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.startTimer=exports.clearTimer=void 0;var e=function(e){var t=document.querySelector("#currentScore");document.querySelector(".timer").classList.add("active");var r=e.timeLimit,c=setInterval(function(){var e,n;r<=0&&(clearInterval(c),document.querySelector("#clearBtn").click()),document.getElementById("stopWatch").innerHTML="00:"+(n=2-(e=r).toString().length+1,Array(+(n>0&&n)).join("0")+e),(r-=1)>=0&&+t.innerHTML>=10&&(openModal(),clearInterval(c),document.querySelector("#clearBtn").click(),document.getElementById("stopWatch").innerHTML="00:00")},1e3)};exports.startTimer=e;var t=function(e){clearInterval(e)};exports.clearTimer=t;
},{}],"H0Gq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.winningConfig=exports.isCompetition=exports.NEW_DOT_INTERVAL=exports.INITIAL_SLIDER_VALUE=exports.INITIAL_SIZE=exports.INITIAL_RATE=void 0;var e=10;exports.INITIAL_SIZE=e;var o=1;exports.INITIAL_RATE=o;var t=50;exports.INITIAL_SLIDER_VALUE=t;var I=1e3;exports.NEW_DOT_INTERVAL=I;var r=!1;exports.isCompetition=r;var s={timeLimit:10,scoreToComplete:15};exports.winningConfig=s;
},{}],"QvaY":[function(require,module,exports) {
"use strict";var e=require("./util"),t=require("./dot"),i=require("./timer"),n=require("./constant"),r=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},I={INITIAL_SIZE:n.INITIAL_SIZE,INITIAL_RATE:n.INITIAL_RATE,INITIAL_SLIDER_VALUE:n.INITIAL_SLIDER_VALUE,NEW_DOT_INTERVAL:n.NEW_DOT_INTERVAL,isCompetition:n.isCompetition,winningConfig:n.winningConfig};r=Object.assign({},I,r);var o,a=document.querySelector("#speedControl"),u=document.querySelector("#startBtn"),s=document.querySelector("#clearBtn"),c={currentSpeed:a.value,score:0,isPlaying:!1};(0,e.updateSliderHTML)(c.currentSpeed),(0,e.updateScoreDOM)(0),a.addEventListener("input",function(t){var i=t.target.value;c.currentSpeed=i,(0,e.updateSliderHTML)(i)}),u.addEventListener("click",function(){var n=c.isPlaying;c.isPlaying=!n,(0,e.toggleStartBtn)(c.isPlaying),c.isPlaying?(o=setInterval(function(){return(0,t.addDot)(c,r.INITIAL_SIZE,r.INITIAL_RATE)},r.NEW_DOT_INTERVAL),r.isCompetition&&(0,i.startTimer)(r.winningConfig)):(0,i.clearTimer)(o),(0,t.pauseDots)(c.isPlaying)}),s.addEventListener("click",function(){(0,e.resetGameBoard)(o,r.INITIAL_SLIDER_VALUE)})};r({isCompetition:!1});
},{"./util":"wT1R","./dot":"FKe4","./timer":"yCUT","./constant":"H0Gq"}]},{},["QvaY"], null)
//# sourceMappingURL=/js.77873832.js.map