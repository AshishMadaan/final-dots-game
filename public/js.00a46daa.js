// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// A Singleton pattern to init and store the state of the game
var GameStore = /*#__PURE__*/function () {
  function GameStore() {
    _classCallCheck(this, GameStore);

    var $slider = document.getElementById("speedControl");

    if (!GameStore.instance) {
      this.state = {
        currentSpeed: $slider.value,
        score: 0,
        isPlaying: false,
        timerInterval: null
      };
      GameStore.instance = this;
    }

    return GameStore.instance;
  }

  _createClass(GameStore, [{
    key: "setState",
    value: function setState(prop, value) {
      this.state[prop] = value;
    }
  }, {
    key: "getState",
    value: function getState(prop) {
      return this.state[prop];
    }
  }]);

  return GameStore;
}();

var instance = new GameStore();
Object.freeze(instance);
var _default = instance;
exports.default = _default;
},{}],"js/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSliderHTML = exports.updateScoreDOM = exports.updateScore = exports.toggleStartBtn = exports.resetGameBoard = exports.removeDot = exports.removeAllDots = exports.pauseDots = exports.getPosition = exports.getAnimationTime = exports.generateRandomNumber = exports.displayElement = exports.addPointToScore = void 0;

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateRandomNumber = function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

exports.generateRandomNumber = generateRandomNumber;

var updateScoreDOM = function updateScoreDOM(newScore) {
  var $currentScore = document.getElementById("currentScore");
  $currentScore.innerHTML = newScore;
};

exports.updateScoreDOM = updateScoreDOM;

var updateSliderHTML = function updateSliderHTML(newValue) {
  var $currentSpeed = document.getElementById("currentSpeed");
  $currentSpeed.innerHTML = "".concat(newValue);
};

exports.updateSliderHTML = updateSliderHTML;

var updateScore = function updateScore(state, scoreToAdd) {
  var $currentScore = document.getElementById("currentScore");
  state.score += +scoreToAdd;
  $currentScore.innerHTML = state.score;
};

exports.updateScore = updateScore;

var toggleStartBtn = function toggleStartBtn(isPlaying) {
  var $startBtn = document.getElementById("startBtn");
  $startBtn.innerHTML = isPlaying ? "Pause" : "Start";
}; // Dots methods


exports.toggleStartBtn = toggleStartBtn;

var removeDot = function removeDot(dot) {
  dot.removeEventListener("animationend", removeDot);
  dot.parentNode.removeChild(dot);
};

exports.removeDot = removeDot;

var getPosition = function getPosition(dotSize) {
  var maxWidth = document.querySelector(".game__board").clientWidth;
  var leftPosition = generateRandomNumber(0, maxWidth - dotSize);
  return leftPosition;
};

exports.getPosition = getPosition;

var getAnimationTime = function getAnimationTime(fallRate) {
  var windowHeight = window.innerHeight;
  return windowHeight / fallRate;
};

exports.getAnimationTime = getAnimationTime;

var addPointToScore = function addPointToScore(state, dot) {
  if (state.isPlaying) {
    updateScore(state, dot.dataset.value);
    removeDot(dot);
  }
};

exports.addPointToScore = addPointToScore;

var resetGameBoard = function resetGameBoard(gameInterval, gameInitialState) {
  gameInitialState.score = 0;
  gameInitialState.isPlaying = false;
  gameInitialState.currentSpeed = 50;
  updateScoreDOM(0);
  updateSliderHTML(gameInitialState.currentSpeed);
  toggleStartBtn(false);
  document.getElementById("currentSpeed").value = gameInitialState.currentSpeed;
  document.querySelector(".timer").classList.remove("show");
  document.getElementById("speedControl").value = gameInitialState.currentSpeed;
  clearInterval(gameInterval);
  clearInterval(_state.default.getState("timerInterval"));
  resetDropDown(document.querySelectorAll("#changeMode option")); // Remove all dots from dom

  removeAllDots();
};

exports.resetGameBoard = resetGameBoard;

var resetDropDown = function resetDropDown(element) {
  for (var i = 0; i < element.length; i++) {
    element[i].selected = element[i].defaultSelected;
  }
};

var removeAllDots = function removeAllDots() {
  var dots = document.querySelectorAll(".dot");
  dots.forEach(function (cage) {
    removeDot(cage);
  });
};

exports.removeAllDots = removeAllDots;

var displayElement = function displayElement(element) {
  element.classList.add("show");
};

exports.displayElement = displayElement;

var pauseDots = function pauseDots() {
  var isPlaying = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var $dots = document.querySelectorAll(".dot");
  $dots.forEach(function (dot) {
    dot.style.WebkitAnimationPlayState = isPlaying ? "running" : "paused";

    if (isPlaying) {
      dot.disabled = false;
    } else {
      dot.disabled = true;
    }
  });
};

exports.pauseDots = pauseDots;
},{"./state":"js/state.js"}],"js/dot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDot = void 0;

var _util = require("./util");

// A method to add the dot on the Game board
var addDot = function addDot(state, initialSize) {
  var $gameBoard = document.querySelector(".game__board");
  var randomNum = (0, _util.generateRandomNumber)(0, 10);
  var dotSize = randomNum * 10 + initialSize;
  var dotConfig = {
    size: dotSize,
    value: 10 - randomNum,
    position: (0, _util.getPosition)(dotSize)
  };
  var dotHTML = document.createElement("div");
  dotHTML.classList.add("dot");
  dotHTML.setAttribute("style", "\n    height: ".concat(dotConfig.size, "px;\n    width: ").concat(dotConfig.size, "px;\n    animation: slideDown ").concat((0, _util.getAnimationTime)(state.currentSpeed), "s linear;\n    left: ").concat(dotConfig.position, "px;\n    "));
  dotHTML.setAttribute("data-value", "".concat(dotConfig.value));
  dotHTML.addEventListener("click", function () {
    return (0, _util.addPointToScore)(state, dotHTML);
  });
  dotHTML.addEventListener("animationend", function () {
    return (0, _util.removeDot)(dotHTML);
  });
  $gameBoard.appendChild(dotHTML);
};

exports.addDot = addDot;
},{"./util":"js/util.js"}],"js/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openModal = void 0;

var _util = require("./util");

// A basic modal overlay to which gives winning game information
var openModal = function openModal(gameInterval, state) {
  var modal = document.querySelector(".modal__overlay");
  var $closeModalButton = document.querySelector(".close");
  modal.classList.add("active");
  (0, _util.pauseDots)();
  (0, _util.toggleStartBtn)(false);
  $closeModalButton.addEventListener("click", function () {
    var modal = document.querySelector(".modal__overlay");
    modal.classList.remove("active");
    (0, _util.resetGameBoard)(gameInterval, state);
  });
};

exports.openModal = openModal;
},{"./util":"js/util.js"}],"js/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startTimer = exports.clearTimer = void 0;

var _modal = require("./modal");

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A timer plays if you play game in competition mode
var startTimer = function startTimer(gameInterval, winningConfig) {
  var $currentScore = document.getElementById("currentScore");
  var $timer = document.querySelector(".timer");
  var $clearBtn = document.getElementById("clearBtn");
  var $stopWatch = document.getElementById("stopWatch");
  $timer.classList.add("show");
  var counter = winningConfig.timeLimit;
  var gameTimer = setInterval(function () {
    if (counter <= 0) {
      clearInterval(gameTimer);
      $clearBtn.click();
    }

    $stopWatch.innerHTML = "00:" + zeroPad(counter, 2);
    counter = counter - 1;

    if (counter >= 0 && +$currentScore.innerHTML >= 10) {
      (0, _modal.openModal)(gameInterval, _state.default.state);
      clearInterval(gameTimer);
      $stopWatch.innerHTML = "00:00";
    }
  }, 1000);

  _state.default.setState("timerInterval", gameTimer);

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
};

exports.startTimer = startTimer;

var clearTimer = function clearTimer(timerId) {
  clearInterval(timerId);
};

exports.clearTimer = clearTimer;
},{"./modal":"js/modal.js","./state":"js/state.js"}],"js/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.winningConfig = exports.isCompetition = exports.SMALL_VIEWPORT = exports.NEW_DOT_INTERVAL = exports.INITIAL_SLIDER_VALUE = exports.INITIAL_SIZE = void 0;
// Constant configuration
var SMALL_VIEWPORT = 768;
exports.SMALL_VIEWPORT = SMALL_VIEWPORT;
var INITIAL_SIZE = 10;
exports.INITIAL_SIZE = INITIAL_SIZE;
var INITIAL_SLIDER_VALUE = 50;
exports.INITIAL_SLIDER_VALUE = INITIAL_SLIDER_VALUE;
var NEW_DOT_INTERVAL = 1000;
exports.NEW_DOT_INTERVAL = NEW_DOT_INTERVAL;
var isCompetition = false;
exports.isCompetition = isCompetition;
var winningConfig = {
  timeLimit: 10,
  scoreToComplete: 15,
  timerId: null
};
exports.winningConfig = winningConfig;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _util = require("./util");

var _dot = require("./dot");

var _timer = require("./timer");

var _constant = require("./constant");

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Main method to initialize the Gameboard and all its events
var dotsGameInit = function dotsGameInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // DOM Elements
  var $slider = document.getElementById("speedControl");
  var $startButton = document.getElementById("startBtn");
  var $resetButton = document.getElementById("clearBtn");
  var $modeSelectionDD = document.querySelector(".mode__selection");
  var $changeMode = document.getElementById("changeMode"); //Default config of the game and can be overwritten by config passed by user

  var defaultConfig = {
    INITIAL_SIZE: _constant.INITIAL_SIZE,
    INITIAL_SLIDER_VALUE: _constant.INITIAL_SLIDER_VALUE,
    NEW_DOT_INTERVAL: _constant.NEW_DOT_INTERVAL,
    isCompetition: _constant.isCompetition,
    winningConfig: _constant.winningConfig
  }; // Overwritting the default config by user config

  config = _objectSpread(_objectSpread({}, defaultConfig), config);
  var gameInterval; //Default behavior when the game loads initialy

  (0, _util.updateSliderHTML)(_state.default.getState("currentSpeed"));
  (0, _util.updateScoreDOM)(0);

  if (window.innerWidth > _constant.SMALL_VIEWPORT) {
    (0, _util.displayElement)($modeSelectionDD);
  } //Attaching event listener to the elements on the Game board
  // Update currentSpeed when slider is adjusted


  $slider.addEventListener("input", function (event) {
    var value = event.target.value;

    _state.default.setState("currentSpeed", value);

    (0, _util.updateSliderHTML)(value);
  }); // Capture start/pause lick

  $startButton.addEventListener("click", function () {
    var isPlaying = _state.default.getState("isPlaying");

    _state.default.setState("isPlaying", !isPlaying);

    (0, _util.toggleStartBtn)(!isPlaying); // Add a dot to a random spot every second

    if (_state.default.getState("isPlaying")) {
      gameInterval = setInterval(function () {
        return (0, _dot.addDot)(_state.default.state, config.INITIAL_SIZE);
      }, config.NEW_DOT_INTERVAL);

      if (config.isCompetition) {
        (0, _timer.startTimer)(gameInterval, config.winningConfig);
      }
    } else {
      (0, _timer.clearTimer)(gameInterval);
    } // stop the animation for all dots on the screen


    (0, _util.pauseDots)(_state.default.getState("isPlaying"));
  }); // Reset game will reset all the controls

  $resetButton.addEventListener("click", function () {
    (0, _util.resetGameBoard)(gameInterval, _state.default.state);
  }); // This only works for desktop viewport to change the mode of the game

  $changeMode.addEventListener("change", function (event) {
    var value = event.target.value; //resetGameBoard(gameInterval, instance.state);

    config.isCompetition = value === "competition" ? true : false;
  });
}; //Game intializer with the config passed from the user


dotsGameInit({
  isCompetition: false
});
},{"./util":"js/util.js","./dot":"js/dot.js","./timer":"js/timer.js","./constant":"js/constant.js","./state":"js/state.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44105" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map