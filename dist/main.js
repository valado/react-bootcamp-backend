/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/db/db.ts":
/*!**********************!*\
  !*** ./app/db/db.ts ***!
  \**********************/
/*! exports provided: mockDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mockDb", function() { return mockDb; });
var uuidv4 = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
var userData = {};
var store = {};
var registerUser = function (email, password) {
    var newAcessToken = uuidv4();
    userData[email] = {
        password: password,
        token: newAcessToken,
    };
    store[newAcessToken] = {};
    return Promise.resolve();
};
var getTokenForUser = function (email, password) {
    return new Promise(function (resolve) {
        if (!isUserRegistered(email)) {
            resolve({
                success: false,
                error: "Invalid email! Registered?",
            });
        }
        else if (userData[email] && userData[email].password === password) {
            resolve({
                success: true,
                token: userData[email].token,
            });
        }
        else {
            resolve({
                success: false,
                error: "Invalid password!",
            });
        }
    });
};
var tokenExists = function (token) {
    return Promise.resolve(store.hasOwnProperty(token));
};
var getData = function (token) {
    return new Promise(function (resolve) {
        if (!tokenExists(token)) {
            resolve(null);
        }
        return resolve(store[token]);
    });
};
var storeData = function (token, data) {
    store[token] = data;
    return Promise.resolve();
};
var isUserRegistered = function (email) {
    return userData.hasOwnProperty(email);
};
var mockDb = {
    registerUser: registerUser,
    getTokenForUser: getTokenForUser,
    isUserRegistered: isUserRegistered,
    tokenExists: tokenExists,
    getData: getData,
    storeData: storeData,
};


/***/ }),

/***/ "./app/db/index.ts":
/*!*************************!*\
  !*** ./app/db/index.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kv */ "./app/db/kv.ts");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ "./app/db/db.ts");


var production = "development" === "production";
var db = production ? _kv__WEBPACK_IMPORTED_MODULE_0__["kvDb"] : _db__WEBPACK_IMPORTED_MODULE_1__["mockDb"];
/* harmony default export */ __webpack_exports__["default"] = (db);


/***/ }),

/***/ "./app/db/kv.ts":
/*!**********************!*\
  !*** ./app/db/kv.ts ***!
  \**********************/
/*! exports provided: kvDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kvDb", function() { return kvDb; });
/* harmony import */ var _vercel_kv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vercel/kv */ "@vercel/kv");
/* harmony import */ var _vercel_kv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vercel_kv__WEBPACK_IMPORTED_MODULE_0__);
var uuidv4 = __webpack_require__(/*! uuid/v4 */ "uuid/v4");

var TTL = 24 * 60 * 60; // 24 hours
var redisOptions = {
    ex: TTL,
};
var redisOptionsNoOverwrite = {
    ex: TTL,
    nx: true,
};
var registerUser = function (email, password) {
    var newAcessToken = uuidv4();
    return Promise.all([
        storeData(email, {
            password: password,
            token: newAcessToken,
        }, { overwrite: false }),
        storeData(newAcessToken, {}, { overwrite: false }),
    ]).then(function () { return Promise.resolve(); });
};
var getTokenForUser = function (email, password) {
    return getCredentials4User(email).then(function (data) {
        if (!data) {
            return {
                success: false,
                error: "Invalid email! Registered?",
            };
        }
        else if (data.password === password) {
            return {
                success: true,
                token: data.token,
            };
        }
        else {
            return {
                success: false,
                error: "Invalid password!",
            };
        }
    });
};
var tokenExists = function (token) { return getData(token).then(function (data) { return !!data; }); };
var isUserRegistered = function (email) {
    return getData(email).then(function (data) { return !!data; });
};
var getData = function (token) {
    return new Promise(function (resolve) {
        try {
            _vercel_kv__WEBPACK_IMPORTED_MODULE_0__["kv"].get(token).then(function (data) {
                if (!data) {
                    resolve(null);
                }
                resolve(JSON.parse(data));
            });
        }
        catch (e) {
            resolve(null);
        }
    });
};
var storeData = function (key, data, options) {
    if (options === void 0) { options = {
        overwrite: true,
    }; }
    return _vercel_kv__WEBPACK_IMPORTED_MODULE_0__["kv"]
        .set(key, JSON.stringify(data), options.overwrite ? redisOptions : redisOptionsNoOverwrite)
        .then(function () { return Promise.resolve(); });
};
var getCredentials4User = function (email) { return getData(email); };
var kvDb = {
    registerUser: registerUser,
    getTokenForUser: getTokenForUser,
    tokenExists: tokenExists,
    isUserRegistered: isUserRegistered,
    getData: getData,
    storeData: storeData,
};


/***/ }),

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _middleware_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./middleware/auth */ "./app/middleware/auth.ts");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/login */ "./app/routes/login.ts");
/* harmony import */ var _routes_register__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/register */ "./app/routes/register.ts");
/* harmony import */ var _routes_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/data */ "./app/routes/data.ts");
/* harmony import */ var _routes_notes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/notes */ "./app/routes/notes.ts");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./db */ "./app/db/index.ts");

var express = __webpack_require__(/*! express */ "express");
var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
var cors = __webpack_require__(/*! cors */ "cors");

var cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");





// Create an express app
var app = express();
app.use(helmet__WEBPACK_IMPORTED_MODULE_1___default()());
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
// CORS
var corsOptions = {
    origin: "*",
    preflightContinue: false,
    credentials: true,
    methods: ["OPTIONS", "GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
//public routes
app.use("/register", _routes_register__WEBPACK_IMPORTED_MODULE_3__["default"]);
app.use("/login", _routes_login__WEBPACK_IMPORTED_MODULE_2__["default"]);
app.delete("/db", function (req, res) {
    Object(_db__WEBPACK_IMPORTED_MODULE_6__["clearDB"])();
    res.send();
});
// protected routes
app.use(_middleware_auth__WEBPACK_IMPORTED_MODULE_0__["authMiddleware"]);
app.use("/data", _routes_data__WEBPACK_IMPORTED_MODULE_4__["default"]);
app.use("/notes", _routes_notes__WEBPACK_IMPORTED_MODULE_5__["default"]);
app.set("port", process.env.PORT || 9000);
//Start Server
app.listen(app.get("port"), function () {
    console.log("Node app is running on port", app.get("port"));
});


/***/ }),

/***/ "./app/middleware/auth.ts":
/*!********************************!*\
  !*** ./app/middleware/auth.ts ***!
  \********************************/
/*! exports provided: authMiddleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authMiddleware", function() { return authMiddleware; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./app/utils.ts");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../db */ "./app/db/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;


var authMiddleware = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var authHeader, token, tokenExists, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authHeader = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAuthHeader"])(req.headers);
                token = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["extractToken"])(authHeader);
                if (!token) {
                    res.status(400);
                    res.send("Invalid Token!");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].tokenExists(token)];
            case 2:
                tokenExists = _a.sent();
                if (tokenExists) {
                    req.token = token;
                    return [2 /*return*/, next()];
                }
                else {
                    res.status(401);
                    res.send("Not authorized! Registered?");
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.status(500);
                res.send("Internal Server Error!");
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./app/routes/data.ts":
/*!****************************!*\
  !*** ./app/routes/data.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db/index.ts");


var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post("/", function (req, res) {
    var token = req.token;
    console.log(token);
    console.log(req.body);
    _db__WEBPACK_IMPORTED_MODULE_1__["default"].storeData(token, req.body)
        .then(function () {
        res.status(200);
        return res.send();
    })
        .catch(function (err) {
        console.error(err);
        res.status(500);
        return res.send("Server error!");
    });
});
router.get("/", function (req, res) {
    var token = req.token;
    _db__WEBPACK_IMPORTED_MODULE_1__["default"].getData(token)
        .then(function (data) {
        if (!data) {
            res.status(500);
            return res.send("Server error!");
        }
        return res.json(data);
    })
        .catch(function (err) {
        console.error(err);
        res.status(500);
        return res.send("Server error!");
    });
});
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./app/routes/login.ts":
/*!*****************************!*\
  !*** ./app/routes/login.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils */ "./app/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var authHeader, credentials, entry, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authHeader = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getAuthHeader"])(req.headers);
                if (!authHeader) {
                    res.status(400);
                    return [2 /*return*/, res.send("Invalid Authorization header!")];
                }
                credentials = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["extractCredentials"])(authHeader);
                if (!credentials) {
                    res.status(400);
                    return [2 /*return*/, res.send("Invalid Authorization header!")];
                }
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].getTokenForUser(credentials.email, credentials.password)];
            case 1:
                entry = _a.sent();
                if (entry.success) {
                    return [2 /*return*/, res
                            .status(200)
                            .json({ token: entry.token })];
                }
                else {
                    return [2 /*return*/, res
                            .status(401)
                            .send({ error: entry.error })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500);
                return [2 /*return*/, res.send("Server error!")];
            case 3: return [2 /*return*/];
        }
    });
}); });
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./app/routes/notes.ts":
/*!*****************************!*\
  !*** ./app/routes/notes.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db/index.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;


var uuidv4 = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, notes, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = req.token;
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].getData(token)];
            case 1:
                notes = _a.sent();
                if (!notes) {
                    res.status(500);
                    return [2 /*return*/, res.send("Server error!")];
                }
                return [2 /*return*/, res.json({
                        notes: notes,
                    })];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500);
                return [2 /*return*/, res.send("Server error!")];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, note, notes, newId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                token = req.token;
                note = req.body.note;
                if (!note) {
                    res.status(400);
                    return [2 /*return*/, res.send("Bad Request!")];
                }
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].getData(token)];
            case 1:
                notes = _a.sent();
                if (!notes) {
                    res.status(500);
                    return [2 /*return*/, res.send("Server error!")];
                }
                newId = uuidv4();
                notes[newId] = __assign({ id: newId }, note);
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].storeData(token, notes)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ id: newId })];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500);
                return [2 /*return*/, res.send("Server error!")];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.patch("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, note, id, notes, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                token = req.token;
                note = req.body.note;
                id = req.params.id;
                if (!note) {
                    res.status(400);
                    return [2 /*return*/, res.send("Bad Request!")];
                }
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].getData(token)];
            case 1:
                notes = _a.sent();
                if (!notes) {
                    res.status(500);
                    return [2 /*return*/, res.send("Server error!")];
                }
                notes[id] = note;
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].storeData(token, notes)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send()];
            case 3:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500);
                return [2 /*return*/, res.send("Server error!")];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var token, id, notes, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                token = req.token;
                id = req.params.id;
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].getData(token)];
            case 1:
                notes = _a.sent();
                if (!notes) {
                    res.status(500);
                    return [2 /*return*/, res.send("Server error!")];
                }
                delete notes[id];
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].storeData(token, notes)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send()];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500);
                return [2 /*return*/, res.send("Server error!")];
            case 4: return [2 /*return*/];
        }
    });
}); });
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./app/routes/register.ts":
/*!********************************!*\
  !*** ./app/routes/register.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./app/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var authHeader, credentials, userExists, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                authHeader = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getAuthHeader"])(req.headers);
                if (!authHeader) {
                    res.status(400);
                    res.send("Invalid Authorization header!");
                    return [2 /*return*/];
                }
                credentials = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["extractCredentials"])(authHeader);
                if (!credentials) {
                    res.status(400);
                    res.send("Invalid Credentials!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].isUserRegistered(credentials.email)];
            case 1:
                userExists = _a.sent();
                if (!userExists) return [3 /*break*/, 2];
                res.status(400);
                return [2 /*return*/, res.send("Email is already taken!")];
            case 2: return [4 /*yield*/, _db__WEBPACK_IMPORTED_MODULE_1__["default"].registerUser(credentials.email, credentials.password)];
            case 3:
                _a.sent();
                res.status(200);
                return [2 /*return*/, res.send()];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500);
                return [2 /*return*/, res.send("Server error!")];
            case 6: return [2 /*return*/];
        }
    });
}); });
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./app/utils.ts":
/*!**********************!*\
  !*** ./app/utils.ts ***!
  \**********************/
/*! exports provided: getAuthHeader, extractToken, extractCredentials */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthHeader", function() { return getAuthHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractToken", function() { return extractToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractCredentials", function() { return extractCredentials; });
var validator = __webpack_require__(/*! email-validator */ "email-validator");
var getAuthHeader = function (headers) {
    if (headers.hasOwnProperty("authorization")) {
        return headers.authorization;
    }
    else {
        return null;
    }
};
var extractToken = function (authHeader) {
    return authHeader ? authHeader.replace("Bearer ", "") : "";
};
var extractCredentials = function (token) {
    token = token.replace("Basic ", "");
    var items = token.split(":");
    if (items.length !== 2) {
        return null;
    }
    var email = items[0];
    var password = items[1];
    if (!validator.validate(email)) {
        return null;
    }
    return { email: email, password: password };
};


/***/ }),

/***/ "@vercel/kv":
/*!*****************************!*\
  !*** external "@vercel/kv" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@vercel/kv");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "email-validator":
/*!**********************************!*\
  !*** external "email-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("email-validator");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "uuid/v4":
/*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RiL2RiLnRzIiwid2VicGFjazovLy8uL2FwcC9kYi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZGIva3YudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LnRzIiwid2VicGFjazovLy8uL2FwcC9taWRkbGV3YXJlL2F1dGgudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JvdXRlcy9kYXRhLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JvdXRlcy9ub3Rlcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcm91dGVzL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL2FwcC91dGlscy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAdmVyY2VsL2t2XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImVtYWlsLXZhbGlkYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dWlkL3Y0XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxr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QSx3Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBBdXRoUmVzcG9uc2UgfSBmcm9tIFwiLi4vYXV0aC9hdXRoXCI7XG5pbXBvcnQgeyBEYkFkYXB0ZXIgfSBmcm9tIFwiLi9EYkFkYXB0ZXJcIjtcbmNvbnN0IHV1aWR2NCA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpO1xuXG5sZXQgdXNlckRhdGE6IGFueSA9IHt9O1xubGV0IHN0b3JlOiBhbnkgPSB7fTtcblxuY29uc3QgcmVnaXN0ZXJVc2VyID0gKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgbmV3QWNlc3NUb2tlbiA9IHV1aWR2NCgpO1xuICB1c2VyRGF0YVtlbWFpbF0gPSB7XG4gICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgIHRva2VuOiBuZXdBY2Vzc1Rva2VuLFxuICB9O1xuICBzdG9yZVtuZXdBY2Vzc1Rva2VuXSA9IHt9O1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG5jb25zdCBnZXRUb2tlbkZvclVzZXIgPSAoXG4gIGVtYWlsOiBzdHJpbmcsXG4gIHBhc3N3b3JkOiBzdHJpbmdcbik6IFByb21pc2U8QXV0aFJlc3BvbnNlPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGlmICghaXNVc2VyUmVnaXN0ZXJlZChlbWFpbCkpIHtcbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwiSW52YWxpZCBlbWFpbCEgUmVnaXN0ZXJlZD9cIixcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodXNlckRhdGFbZW1haWxdICYmIHVzZXJEYXRhW2VtYWlsXS5wYXNzd29yZCA9PT0gcGFzc3dvcmQpIHtcbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICB0b2tlbjogdXNlckRhdGFbZW1haWxdLnRva2VuLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwiSW52YWxpZCBwYXNzd29yZCFcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCB0b2tlbkV4aXN0cyA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RvcmUuaGFzT3duUHJvcGVydHkodG9rZW4pKTtcbn07XG5cbmNvbnN0IGdldERhdGEgPSAodG9rZW46IHN0cmluZykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBpZiAoIXRva2VuRXhpc3RzKHRva2VuKSkge1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc29sdmUoc3RvcmVbdG9rZW5dKTtcbiAgfSk7XG59O1xuXG5jb25zdCBzdG9yZURhdGEgPSAodG9rZW46IHN0cmluZywgZGF0YTogYW55KSA9PiB7XG4gIHN0b3JlW3Rva2VuXSA9IGRhdGE7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cbmNvbnN0IGlzVXNlclJlZ2lzdGVyZWQgPSAoZW1haWw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdXNlckRhdGEuaGFzT3duUHJvcGVydHkoZW1haWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IG1vY2tEYjogRGJBZGFwdGVyID0ge1xuICByZWdpc3RlclVzZXIsXG4gIGdldFRva2VuRm9yVXNlcixcbiAgaXNVc2VyUmVnaXN0ZXJlZCxcbiAgdG9rZW5FeGlzdHMsXG4gIGdldERhdGEsXG4gIHN0b3JlRGF0YSxcbn07XG4iLCJpbXBvcnQgeyBrdkRiIH0gZnJvbSBcIi4va3ZcIjtcbmltcG9ydCB7IG1vY2tEYiB9IGZyb20gXCIuL2RiXCI7XG5pbXBvcnQgeyBEYkFkYXB0ZXIgfSBmcm9tIFwiLi9EYkFkYXB0ZXJcIjtcblxuY29uc3QgcHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIjtcblxuY29uc3QgZGI6IERiQWRhcHRlciA9IHByb2R1Y3Rpb24gPyBrdkRiIDogbW9ja0RiO1xuZXhwb3J0IGRlZmF1bHQgZGI7XG4iLCJpbXBvcnQgeyBBdXRoUmVzcG9uc2UgfSBmcm9tIFwiLi4vYXV0aC9hdXRoXCI7XG5jb25zdCB1dWlkdjQgPSByZXF1aXJlKFwidXVpZC92NFwiKTtcbmltcG9ydCB7IGt2IH0gZnJvbSBcIkB2ZXJjZWwva3ZcIjtcbmltcG9ydCB7IERiQWRhcHRlciwgU3RvcmVPcHRpb25zIH0gZnJvbSBcIi4vRGJBZGFwdGVyXCI7XG5cbmNvbnN0IFRUTCA9IDI0ICogNjAgKiA2MDsgLy8gMjQgaG91cnNcbmNvbnN0IHJlZGlzT3B0aW9ucyA9IHtcbiAgZXg6IFRUTCxcbn07XG5jb25zdCByZWRpc09wdGlvbnNOb092ZXJ3cml0ZSA9IHtcbiAgZXg6IFRUTCxcbiAgbng6IHRydWUsXG59O1xuXG5jb25zdCByZWdpc3RlclVzZXIgPSAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBuZXdBY2Vzc1Rva2VuID0gdXVpZHY0KCk7XG4gIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgc3RvcmVEYXRhKFxuICAgICAgZW1haWwsXG4gICAgICB7XG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgdG9rZW46IG5ld0FjZXNzVG9rZW4sXG4gICAgICB9LFxuICAgICAgeyBvdmVyd3JpdGU6IGZhbHNlIH1cbiAgICApLFxuICAgIHN0b3JlRGF0YShuZXdBY2Vzc1Rva2VuLCB7fSwgeyBvdmVyd3JpdGU6IGZhbHNlIH0pLFxuICBdKS50aGVuKCgpID0+IFByb21pc2UucmVzb2x2ZSgpKTtcbn07XG5cbmNvbnN0IGdldFRva2VuRm9yVXNlciA9IChcbiAgZW1haWw6IHN0cmluZyxcbiAgcGFzc3dvcmQ6IHN0cmluZ1xuKTogUHJvbWlzZTxBdXRoUmVzcG9uc2U+ID0+XG4gIGdldENyZWRlbnRpYWxzNFVzZXIoZW1haWwpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBcIkludmFsaWQgZW1haWwhIFJlZ2lzdGVyZWQ/XCIsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZGF0YS5wYXNzd29yZCA9PT0gcGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHRva2VuOiBkYXRhLnRva2VuLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBcIkludmFsaWQgcGFzc3dvcmQhXCIsXG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG5cbmNvbnN0IHRva2VuRXhpc3RzID0gKHRva2VuOiBzdHJpbmcpID0+IGdldERhdGEodG9rZW4pLnRoZW4oKGRhdGEpID0+ICEhZGF0YSk7XG5cbmNvbnN0IGlzVXNlclJlZ2lzdGVyZWQgPSAoZW1haWw6IHN0cmluZykgPT5cbiAgZ2V0RGF0YShlbWFpbCkudGhlbigoZGF0YSkgPT4gISFkYXRhKTtcblxuY29uc3QgZ2V0RGF0YSA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBrdi5nZXQodG9rZW4pLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShkYXRhKSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBzdG9yZURhdGEgPSAoXG4gIGtleTogc3RyaW5nLFxuICBkYXRhOiBhbnksXG4gIG9wdGlvbnMgPSB7XG4gICAgb3ZlcndyaXRlOiB0cnVlLFxuICB9XG4pOiBQcm9taXNlPHZvaWQ+ID0+XG4gIGt2XG4gICAgLnNldChcbiAgICAgIGtleSxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgb3B0aW9ucy5vdmVyd3JpdGUgPyByZWRpc09wdGlvbnMgOiByZWRpc09wdGlvbnNOb092ZXJ3cml0ZVxuICAgIClcbiAgICAudGhlbigoKSA9PiBQcm9taXNlLnJlc29sdmUoKSk7XG5cbmNvbnN0IGdldENyZWRlbnRpYWxzNFVzZXIgPSAoZW1haWw6IHN0cmluZykgPT4gZ2V0RGF0YShlbWFpbCk7XG5cbmV4cG9ydCBjb25zdCBrdkRiOiBEYkFkYXB0ZXIgPSB7XG4gIHJlZ2lzdGVyVXNlcixcbiAgZ2V0VG9rZW5Gb3JVc2VyLFxuICB0b2tlbkV4aXN0cyxcbiAgaXNVc2VyUmVnaXN0ZXJlZCxcbiAgZ2V0RGF0YSxcbiAgc3RvcmVEYXRhLFxufTtcbiIsImltcG9ydCB7IGF1dGhNaWRkbGV3YXJlIH0gZnJvbSBcIi4vbWlkZGxld2FyZS9hdXRoXCI7XG5jb25zdCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuY29uc3QgY29ycyA9IHJlcXVpcmUoXCJjb3JzXCIpO1xuaW1wb3J0IGhlbG1ldCBmcm9tIFwiaGVsbWV0XCI7XG5jb25zdCBjb29raWVQYXJzZXIgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTtcblxuaW1wb3J0IGxvZ2luUm91dGVyIGZyb20gXCIuL3JvdXRlcy9sb2dpblwiO1xuaW1wb3J0IHJlZ2lzdGVyUm91dGVyIGZyb20gXCIuL3JvdXRlcy9yZWdpc3RlclwiO1xuaW1wb3J0IGRhdGFSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL2RhdGFcIjtcbmltcG9ydCBub3Rlc1JvdXRlciBmcm9tIFwiLi9yb3V0ZXMvbm90ZXNcIjtcbmltcG9ydCB7IGNsZWFyREIgfSBmcm9tIFwiLi9kYlwiO1xuXG4vLyBDcmVhdGUgYW4gZXhwcmVzcyBhcHBcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoaGVsbWV0KCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcblxuLy8gQ09SU1xuY29uc3QgY29yc09wdGlvbnMgPSB7XG4gIG9yaWdpbjogXCIqXCIsXG4gIHByZWZsaWdodENvbnRpbnVlOiBmYWxzZSxcbiAgY3JlZGVudGlhbHM6IHRydWUsXG4gIG1ldGhvZHM6IFtcIk9QVElPTlNcIiwgXCJHRVRcIiwgXCJQVVRcIiwgXCJQT1NUXCIsIFwiUEFUQ0hcIiwgXCJERUxFVEVcIl0sXG4gIGFsbG93ZWRIZWFkZXJzOiBbXCJDb250ZW50LVR5cGVcIiwgXCJBdXRob3JpemF0aW9uXCJdLFxufTtcbmFwcC51c2UoY29ycyhjb3JzT3B0aW9ucykpO1xuXG4vL3B1YmxpYyByb3V0ZXNcbmFwcC51c2UoXCIvcmVnaXN0ZXJcIiwgcmVnaXN0ZXJSb3V0ZXIpO1xuYXBwLnVzZShcIi9sb2dpblwiLCBsb2dpblJvdXRlcik7XG5hcHAuZGVsZXRlKFwiL2RiXCIsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgY2xlYXJEQigpO1xuICByZXMuc2VuZCgpO1xufSk7XG5cbi8vIHByb3RlY3RlZCByb3V0ZXNcbmFwcC51c2UoYXV0aE1pZGRsZXdhcmUpO1xuYXBwLnVzZShcIi9kYXRhXCIsIGRhdGFSb3V0ZXIpO1xuYXBwLnVzZShcIi9ub3Rlc1wiLCBub3Rlc1JvdXRlcik7XG5cbmFwcC5zZXQoXCJwb3J0XCIsIHByb2Nlc3MuZW52LlBPUlQgfHwgOTAwMCk7XG4vL1N0YXJ0IFNlcnZlclxuYXBwLmxpc3RlbihhcHAuZ2V0KFwicG9ydFwiKSwgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZyhcIk5vZGUgYXBwIGlzIHJ1bm5pbmcgb24gcG9ydFwiLCBhcHAuZ2V0KFwicG9ydFwiKSk7XG59KTtcbiIsImltcG9ydCB7IGV4dHJhY3RUb2tlbiwgZ2V0QXV0aEhlYWRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IGRiIGZyb20gXCIuLy4uL2RiXCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoTWlkZGxld2FyZSA9IGFzeW5jIChyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IGFueSkgPT4ge1xuICBjb25zdCBhdXRoSGVhZGVyID0gZ2V0QXV0aEhlYWRlcihyZXEuaGVhZGVycyk7XG4gIGNvbnN0IHRva2VuID0gZXh0cmFjdFRva2VuKGF1dGhIZWFkZXIpO1xuICBpZiAoIXRva2VuKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJlcy5zZW5kKFwiSW52YWxpZCBUb2tlbiFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbkV4aXN0cyA9IGF3YWl0IGRiLnRva2VuRXhpc3RzKHRva2VuKTtcbiAgICBpZiAodG9rZW5FeGlzdHMpIHtcbiAgICAgIHJlcS50b2tlbiA9IHRva2VuO1xuICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnN0YXR1cyg0MDEpO1xuICAgICAgcmVzLnNlbmQoXCJOb3QgYXV0aG9yaXplZCEgUmVnaXN0ZXJlZD9cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJlcy5zZW5kKFwiSW50ZXJuYWwgU2VydmVyIEVycm9yIVwiKTtcbiAgICByZXR1cm47XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IHsgQ3VzdG9tUmVxdWVzdCB9IGZyb20gXCIuLi9tb2RlbC9DdXN0b21SZXF1ZXN0XCI7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICBjb25zb2xlLmxvZyh0b2tlbik7XG4gIGNvbnNvbGUubG9nKHJlcS5ib2R5KTtcbiAgZGIuc3RvcmVEYXRhKHRva2VuLCByZXEuYm9keSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICAgIH0pO1xufSk7XG5cbnJvdXRlci5nZXQoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICBkYi5nZXREYXRhKHRva2VuKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApO1xuICAgICAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcy5qc29uKGRhdGEpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gICAgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCB7IGV4dHJhY3RDcmVkZW50aWFscywgZ2V0QXV0aEhlYWRlciB9IGZyb20gXCIuLy4uL3V0aWxzXCI7XG5pbXBvcnQgeyBGYWlsZWRBdXRoUmVzcG9uc2UsIFN1Y2Nlc3NmdWxsQXV0aFJlc3BvbnNlIH0gZnJvbSBcIi4uL2F1dGgvYXV0aFwiO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KFwiL1wiLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgYXV0aEhlYWRlciA9IGdldEF1dGhIZWFkZXIocmVxLmhlYWRlcnMpO1xuICAgIGlmICghYXV0aEhlYWRlcikge1xuICAgICAgcmVzLnN0YXR1cyg0MDApO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kKFwiSW52YWxpZCBBdXRob3JpemF0aW9uIGhlYWRlciFcIik7XG4gICAgfVxuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gZXh0cmFjdENyZWRlbnRpYWxzKGF1dGhIZWFkZXIpO1xuICAgIGlmICghY3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIkludmFsaWQgQXV0aG9yaXphdGlvbiBoZWFkZXIhXCIpO1xuICAgIH1cbiAgICBjb25zdCBlbnRyeSA9IGF3YWl0IGRiLmdldFRva2VuRm9yVXNlcihcbiAgICAgIGNyZWRlbnRpYWxzLmVtYWlsLFxuICAgICAgY3JlZGVudGlhbHMucGFzc3dvcmRcbiAgICApO1xuICAgIGlmIChlbnRyeS5zdWNjZXNzKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHRva2VuOiAoZW50cnkgYXMgU3VjY2Vzc2Z1bGxBdXRoUmVzcG9uc2UpLnRva2VuIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDAxKVxuICAgICAgICAuc2VuZCh7IGVycm9yOiAoZW50cnkgYXMgRmFpbGVkQXV0aFJlc3BvbnNlKS5lcnJvciB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0IH0gZnJvbSBcIi4uL21vZGVsL0N1c3RvbVJlcXVlc3RcIjtcbmNvbnN0IHV1aWR2NCA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5nZXQoXCIvXCIsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gICAgY29uc3Qgbm90ZXMgPSBhd2FpdCBkYi5nZXREYXRhKHRva2VuKTtcblxuICAgIGlmICghbm90ZXMpIHtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gICAgfVxuICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICBub3RlcyxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG59KTtcblxucm91dGVyLnB1dChcIi9cIiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgICBjb25zdCBub3RlID0gcmVxLmJvZHkubm90ZTtcbiAgICBpZiAoIW5vdGUpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIkJhZCBSZXF1ZXN0IVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBub3RlcyA9IGF3YWl0IGRiLmdldERhdGEodG9rZW4pO1xuICAgIGlmICghbm90ZXMpIHtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gICAgfVxuICAgIGNvbnN0IG5ld0lkID0gdXVpZHY0KCk7XG4gICAgbm90ZXNbbmV3SWRdID0geyBpZDogbmV3SWQsIC4uLm5vdGUgfTtcbiAgICBhd2FpdCBkYi5zdG9yZURhdGEodG9rZW4sIG5vdGVzKTtcbiAgICByZXR1cm4gcmVzLmpzb24oeyBpZDogbmV3SWQgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxufSk7XG5cbnJvdXRlci5wYXRjaChcIi86aWRcIiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgICBjb25zdCBub3RlID0gcmVxLmJvZHkubm90ZTtcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XG4gICAgaWYgKCFub3RlKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoXCJCYWQgUmVxdWVzdCFcIik7XG4gICAgfVxuICAgIGNvbnN0IG5vdGVzID0gYXdhaXQgZGIuZ2V0RGF0YSh0b2tlbik7XG4gICAgaWYgKCFub3Rlcykge1xuICAgICAgcmVzLnN0YXR1cyg1MDApO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgICB9XG4gICAgbm90ZXNbaWRdID0gbm90ZTtcbiAgICBhd2FpdCBkYi5zdG9yZURhdGEodG9rZW4sIG5vdGVzKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG59KTtcblxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XG4gICAgY29uc3Qgbm90ZXMgPSBhd2FpdCBkYi5nZXREYXRhKHRva2VuKTtcbiAgICBpZiAoIW5vdGVzKSB7XG4gICAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICAgIH1cbiAgICBkZWxldGUgbm90ZXNbaWRdO1xuICAgIGF3YWl0IGRiLnN0b3JlRGF0YSh0b2tlbiwgbm90ZXMpO1xuICAgIHJldHVybiByZXMuc2VuZCgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IHsgZXh0cmFjdENyZWRlbnRpYWxzLCBnZXRBdXRoSGVhZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoXCIvXCIsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gZ2V0QXV0aEhlYWRlcihyZXEuaGVhZGVycyk7XG4gICAgaWYgKCFhdXRoSGVhZGVyKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgICByZXMuc2VuZChcIkludmFsaWQgQXV0aG9yaXphdGlvbiBoZWFkZXIhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjcmVkZW50aWFscyA9IGV4dHJhY3RDcmVkZW50aWFscyhhdXRoSGVhZGVyKTtcbiAgICBpZiAoIWNyZWRlbnRpYWxzKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgICByZXMuc2VuZChcIkludmFsaWQgQ3JlZGVudGlhbHMhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJFeGlzdHMgPSBhd2FpdCBkYi5pc1VzZXJSZWdpc3RlcmVkKGNyZWRlbnRpYWxzLmVtYWlsKTtcblxuICAgIGlmICh1c2VyRXhpc3RzKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoXCJFbWFpbCBpcyBhbHJlYWR5IHRha2VuIVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgZGIucmVnaXN0ZXJVc2VyKGNyZWRlbnRpYWxzLmVtYWlsLCBjcmVkZW50aWFscy5wYXNzd29yZCk7XG4gICAgICByZXMuc3RhdHVzKDIwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImNvbnN0IHZhbGlkYXRvciA9IHJlcXVpcmUoXCJlbWFpbC12YWxpZGF0b3JcIik7XG5cbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSBcIi4vbW9kZWwvQ3JlZGVudGlhbHNcIjtcblxuZXhwb3J0IGNvbnN0IGdldEF1dGhIZWFkZXIgPSAoaGVhZGVyczogYW55KTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KFwiYXV0aG9yaXphdGlvblwiKSkge1xuICAgIHJldHVybiBoZWFkZXJzLmF1dGhvcml6YXRpb247XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VG9rZW4gPSAoYXV0aEhlYWRlcjogc3RyaW5nKSA9PlxuICBhdXRoSGVhZGVyID8gYXV0aEhlYWRlci5yZXBsYWNlKFwiQmVhcmVyIFwiLCBcIlwiKSA6IFwiXCI7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q3JlZGVudGlhbHMgPSAodG9rZW46IHN0cmluZyk6IENyZWRlbnRpYWxzIHwgbnVsbCA9PiB7XG4gIHRva2VuID0gdG9rZW4ucmVwbGFjZShcIkJhc2ljIFwiLCBcIlwiKTtcbiAgY29uc3QgaXRlbXMgPSB0b2tlbi5zcGxpdChcIjpcIik7XG4gIGlmIChpdGVtcy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBlbWFpbCA9IGl0ZW1zWzBdO1xuICBjb25zdCBwYXNzd29yZCA9IGl0ZW1zWzFdO1xuICBpZiAoIXZhbGlkYXRvci52YWxpZGF0ZShlbWFpbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4geyBlbWFpbCwgcGFzc3dvcmQgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAdmVyY2VsL2t2XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbWFpbC12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZC92NFwiKTsiXSwic291cmNlUm9vdCI6IiJ9