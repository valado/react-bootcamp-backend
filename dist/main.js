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


var authMiddleware = function (req, res, next) {
    var authHeader = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getAuthHeader"])(req.headers);
    var token = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["extractToken"])(authHeader);
    if (!token) {
        res.status(400);
        res.send("Invalid Token!");
        return;
    }
    if (Object(_db__WEBPACK_IMPORTED_MODULE_1__["tokenExists"])(token)) {
        req.token = token;
        return next();
    }
    else {
        res.status(401);
        res.send("Not authorized! Registered?");
        return;
    }
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RiL2RiLnRzIiwid2VicGFjazovLy8uL2FwcC9kYi9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvZGIva3YudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LnRzIiwid2VicGFjazovLy8uL2FwcC9taWRkbGV3YXJlL2F1dGgudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JvdXRlcy9kYXRhLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JvdXRlcy9ub3Rlcy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcm91dGVzL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL2FwcC91dGlscy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAdmVyY2VsL2t2XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImVtYWlsLXZhbGlkYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dWlkL3Y0XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxr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Q0FBQyxFQUFFO1FBQzNDLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUM5QjtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQztBQUVLLElBQU0sWUFBWSxHQUFHLFVBQUMsVUFBa0I7SUFDN0MsaUJBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFBbkQsQ0FBbUQsQ0FBQztBQUUvQyxJQUFNLGtCQUFrQixHQUFHLFVBQUMsS0FBYTtJQUM5QyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUUsS0FBSyxTQUFFLFFBQVEsWUFBRSxDQUFDO0FBQzdCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM0JGLHVDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLDBDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEF1dGhSZXNwb25zZSB9IGZyb20gXCIuLi9hdXRoL2F1dGhcIjtcbmltcG9ydCB7IERiQWRhcHRlciB9IGZyb20gXCIuL0RiQWRhcHRlclwiO1xuY29uc3QgdXVpZHY0ID0gcmVxdWlyZShcInV1aWQvdjRcIik7XG5cbmxldCB1c2VyRGF0YTogYW55ID0ge307XG5sZXQgc3RvcmU6IGFueSA9IHt9O1xuXG5jb25zdCByZWdpc3RlclVzZXIgPSAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBuZXdBY2Vzc1Rva2VuID0gdXVpZHY0KCk7XG4gIHVzZXJEYXRhW2VtYWlsXSA9IHtcbiAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgdG9rZW46IG5ld0FjZXNzVG9rZW4sXG4gIH07XG4gIHN0b3JlW25ld0FjZXNzVG9rZW5dID0ge307XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cbmNvbnN0IGdldFRva2VuRm9yVXNlciA9IChcbiAgZW1haWw6IHN0cmluZyxcbiAgcGFzc3dvcmQ6IHN0cmluZ1xuKTogUHJvbWlzZTxBdXRoUmVzcG9uc2U+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgaWYgKCFpc1VzZXJSZWdpc3RlcmVkKGVtYWlsKSkge1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogXCJJbnZhbGlkIGVtYWlsISBSZWdpc3RlcmVkP1wiLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh1c2VyRGF0YVtlbWFpbF0gJiYgdXNlckRhdGFbZW1haWxdLnBhc3N3b3JkID09PSBwYXNzd29yZCkge1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHRva2VuOiB1c2VyRGF0YVtlbWFpbF0udG9rZW4sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogXCJJbnZhbGlkIHBhc3N3b3JkIVwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHRva2VuRXhpc3RzID0gKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdG9yZS5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpO1xufTtcblxuY29uc3QgZ2V0RGF0YSA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGlmICghdG9rZW5FeGlzdHModG9rZW4pKSB7XG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzb2x2ZShzdG9yZVt0b2tlbl0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHN0b3JlRGF0YSA9ICh0b2tlbjogc3RyaW5nLCBkYXRhOiBhbnkpID0+IHtcbiAgc3RvcmVbdG9rZW5dID0gZGF0YTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuY29uc3QgaXNVc2VyUmVnaXN0ZXJlZCA9IChlbWFpbDogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB1c2VyRGF0YS5oYXNPd25Qcm9wZXJ0eShlbWFpbCk7XG59O1xuXG5leHBvcnQgY29uc3QgbW9ja0RiOiBEYkFkYXB0ZXIgPSB7XG4gIHJlZ2lzdGVyVXNlcixcbiAgZ2V0VG9rZW5Gb3JVc2VyLFxuICBpc1VzZXJSZWdpc3RlcmVkLFxuICB0b2tlbkV4aXN0cyxcbiAgZ2V0RGF0YSxcbiAgc3RvcmVEYXRhLFxufTtcbiIsImltcG9ydCB7IGt2RGIgfSBmcm9tIFwiLi9rdlwiO1xuaW1wb3J0IHsgbW9ja0RiIH0gZnJvbSBcIi4vZGJcIjtcbmltcG9ydCB7IERiQWRhcHRlciB9IGZyb20gXCIuL0RiQWRhcHRlclwiO1xuXG5jb25zdCBwcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xuXG5jb25zdCBkYjogRGJBZGFwdGVyID0gcHJvZHVjdGlvbiA/IGt2RGIgOiBtb2NrRGI7XG5leHBvcnQgZGVmYXVsdCBkYjtcbiIsImltcG9ydCB7IEF1dGhSZXNwb25zZSB9IGZyb20gXCIuLi9hdXRoL2F1dGhcIjtcbmNvbnN0IHV1aWR2NCA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpO1xuaW1wb3J0IHsga3YgfSBmcm9tIFwiQHZlcmNlbC9rdlwiO1xuaW1wb3J0IHsgRGJBZGFwdGVyLCBTdG9yZU9wdGlvbnMgfSBmcm9tIFwiLi9EYkFkYXB0ZXJcIjtcblxuY29uc3QgVFRMID0gMjQgKiA2MCAqIDYwOyAvLyAyNCBob3Vyc1xuY29uc3QgcmVkaXNPcHRpb25zID0ge1xuICBleDogVFRMLFxufTtcbmNvbnN0IHJlZGlzT3B0aW9uc05vT3ZlcndyaXRlID0ge1xuICBleDogVFRMLFxuICBueDogdHJ1ZSxcbn07XG5cbmNvbnN0IHJlZ2lzdGVyVXNlciA9IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IG5ld0FjZXNzVG9rZW4gPSB1dWlkdjQoKTtcbiAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICBzdG9yZURhdGEoXG4gICAgICBlbWFpbCxcbiAgICAgIHtcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB0b2tlbjogbmV3QWNlc3NUb2tlbixcbiAgICAgIH0sXG4gICAgICB7IG92ZXJ3cml0ZTogZmFsc2UgfVxuICAgICksXG4gICAgc3RvcmVEYXRhKG5ld0FjZXNzVG9rZW4sIHt9LCB7IG92ZXJ3cml0ZTogZmFsc2UgfSksXG4gIF0pLnRoZW4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCkpO1xufTtcblxuY29uc3QgZ2V0VG9rZW5Gb3JVc2VyID0gKFxuICBlbWFpbDogc3RyaW5nLFxuICBwYXNzd29yZDogc3RyaW5nXG4pOiBQcm9taXNlPEF1dGhSZXNwb25zZT4gPT5cbiAgZ2V0Q3JlZGVudGlhbHM0VXNlcihlbWFpbCkudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwiSW52YWxpZCBlbWFpbCEgUmVnaXN0ZXJlZD9cIixcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChkYXRhLnBhc3N3b3JkID09PSBwYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgdG9rZW46IGRhdGEudG9rZW4sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwiSW52YWxpZCBwYXNzd29yZCFcIixcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuY29uc3QgdG9rZW5FeGlzdHMgPSAodG9rZW46IHN0cmluZykgPT4gZ2V0RGF0YSh0b2tlbikudGhlbigoZGF0YSkgPT4gISFkYXRhKTtcblxuY29uc3QgaXNVc2VyUmVnaXN0ZXJlZCA9IChlbWFpbDogc3RyaW5nKSA9PlxuICBnZXREYXRhKGVtYWlsKS50aGVuKChkYXRhKSA9PiAhIWRhdGEpO1xuXG5jb25zdCBnZXREYXRhID0gKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGt2LmdldCh0b2tlbikudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGRhdGEpKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHN0b3JlRGF0YSA9IChcbiAga2V5OiBzdHJpbmcsXG4gIGRhdGE6IGFueSxcbiAgb3B0aW9ucyA9IHtcbiAgICBvdmVyd3JpdGU6IHRydWUsXG4gIH1cbik6IFByb21pc2U8dm9pZD4gPT5cbiAga3ZcbiAgICAuc2V0KFxuICAgICAga2V5LFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBvcHRpb25zLm92ZXJ3cml0ZSA/IHJlZGlzT3B0aW9ucyA6IHJlZGlzT3B0aW9uc05vT3ZlcndyaXRlXG4gICAgKVxuICAgIC50aGVuKCgpID0+IFByb21pc2UucmVzb2x2ZSgpKTtcblxuY29uc3QgZ2V0Q3JlZGVudGlhbHM0VXNlciA9IChlbWFpbDogc3RyaW5nKSA9PiBnZXREYXRhKGVtYWlsKTtcblxuZXhwb3J0IGNvbnN0IGt2RGI6IERiQWRhcHRlciA9IHtcbiAgcmVnaXN0ZXJVc2VyLFxuICBnZXRUb2tlbkZvclVzZXIsXG4gIHRva2VuRXhpc3RzLFxuICBpc1VzZXJSZWdpc3RlcmVkLFxuICBnZXREYXRhLFxuICBzdG9yZURhdGEsXG59O1xuIiwiaW1wb3J0IHsgYXV0aE1pZGRsZXdhcmUgfSBmcm9tIFwiLi9taWRkbGV3YXJlL2F1dGhcIjtcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5jb25zdCBjb3JzID0gcmVxdWlyZShcImNvcnNcIik7XG5pbXBvcnQgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcbmNvbnN0IGNvb2tpZVBhcnNlciA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpO1xuXG5pbXBvcnQgbG9naW5Sb3V0ZXIgZnJvbSBcIi4vcm91dGVzL2xvZ2luXCI7XG5pbXBvcnQgcmVnaXN0ZXJSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL3JlZ2lzdGVyXCI7XG5pbXBvcnQgZGF0YVJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvZGF0YVwiO1xuaW1wb3J0IG5vdGVzUm91dGVyIGZyb20gXCIuL3JvdXRlcy9ub3Rlc1wiO1xuaW1wb3J0IHsgY2xlYXJEQiB9IGZyb20gXCIuL2RiXCI7XG5cbi8vIENyZWF0ZSBhbiBleHByZXNzIGFwcFxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShoZWxtZXQoKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuXG4vLyBDT1JTXG5jb25zdCBjb3JzT3B0aW9ucyA9IHtcbiAgb3JpZ2luOiBcIipcIixcbiAgcHJlZmxpZ2h0Q29udGludWU6IGZhbHNlLFxuICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgbWV0aG9kczogW1wiT1BUSU9OU1wiLCBcIkdFVFwiLCBcIlBVVFwiLCBcIlBPU1RcIiwgXCJQQVRDSFwiLCBcIkRFTEVURVwiXSxcbiAgYWxsb3dlZEhlYWRlcnM6IFtcIkNvbnRlbnQtVHlwZVwiLCBcIkF1dGhvcml6YXRpb25cIl0sXG59O1xuYXBwLnVzZShjb3JzKGNvcnNPcHRpb25zKSk7XG5cbi8vcHVibGljIHJvdXRlc1xuYXBwLnVzZShcIi9yZWdpc3RlclwiLCByZWdpc3RlclJvdXRlcik7XG5hcHAudXNlKFwiL2xvZ2luXCIsIGxvZ2luUm91dGVyKTtcbmFwcC5kZWxldGUoXCIvZGJcIiwgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xuICBjbGVhckRCKCk7XG4gIHJlcy5zZW5kKCk7XG59KTtcblxuLy8gcHJvdGVjdGVkIHJvdXRlc1xuYXBwLnVzZShhdXRoTWlkZGxld2FyZSk7XG5hcHAudXNlKFwiL2RhdGFcIiwgZGF0YVJvdXRlcik7XG5hcHAudXNlKFwiL25vdGVzXCIsIG5vdGVzUm91dGVyKTtcblxuYXBwLnNldChcInBvcnRcIiwgcHJvY2Vzcy5lbnYuUE9SVCB8fCA5MDAwKTtcbi8vU3RhcnQgU2VydmVyXG5hcHAubGlzdGVuKGFwcC5nZXQoXCJwb3J0XCIpLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKFwiTm9kZSBhcHAgaXMgcnVubmluZyBvbiBwb3J0XCIsIGFwcC5nZXQoXCJwb3J0XCIpKTtcbn0pO1xuIiwiaW1wb3J0IHsgZXh0cmFjdFRva2VuLCBnZXRBdXRoSGVhZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyB0b2tlbkV4aXN0cyB9IGZyb20gXCIuLy4uL2RiXCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoTWlkZGxld2FyZSA9IChyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IGFueSkgPT4ge1xuICBjb25zdCBhdXRoSGVhZGVyID0gZ2V0QXV0aEhlYWRlcihyZXEuaGVhZGVycyk7XG4gIGNvbnN0IHRva2VuID0gZXh0cmFjdFRva2VuKGF1dGhIZWFkZXIpO1xuICBpZiAoIXRva2VuKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJlcy5zZW5kKFwiSW52YWxpZCBUb2tlbiFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRva2VuRXhpc3RzKHRva2VuKSkge1xuICAgIHJlcS50b2tlbiA9IHRva2VuO1xuICAgIHJldHVybiBuZXh0KCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpO1xuICAgIHJlcy5zZW5kKFwiTm90IGF1dGhvcml6ZWQhIFJlZ2lzdGVyZWQ/XCIpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0IH0gZnJvbSBcIi4uL21vZGVsL0N1c3RvbVJlcXVlc3RcIjtcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgY29uc29sZS5sb2cocmVxLmJvZHkpO1xuICBkYi5zdG9yZURhdGEodG9rZW4sIHJlcS5ib2R5KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZCgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gICAgfSk7XG59KTtcblxucm91dGVyLmdldChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGRiLmdldERhdGEodG9rZW4pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLmpzb24oZGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgICB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGRiIGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IHsgZXh0cmFjdENyZWRlbnRpYWxzLCBnZXRBdXRoSGVhZGVyIH0gZnJvbSBcIi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7IEZhaWxlZEF1dGhSZXNwb25zZSwgU3VjY2Vzc2Z1bGxBdXRoUmVzcG9uc2UgfSBmcm9tIFwiLi4vYXV0aC9hdXRoXCI7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoXCIvXCIsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gZ2V0QXV0aEhlYWRlcihyZXEuaGVhZGVycyk7XG4gICAgaWYgKCFhdXRoSGVhZGVyKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoXCJJbnZhbGlkIEF1dGhvcml6YXRpb24gaGVhZGVyIVwiKTtcbiAgICB9XG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSBleHRyYWN0Q3JlZGVudGlhbHMoYXV0aEhlYWRlcik7XG4gICAgaWYgKCFjcmVkZW50aWFscykge1xuICAgICAgcmVzLnN0YXR1cyg0MDApO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kKFwiSW52YWxpZCBBdXRob3JpemF0aW9uIGhlYWRlciFcIik7XG4gICAgfVxuICAgIGNvbnN0IGVudHJ5ID0gYXdhaXQgZGIuZ2V0VG9rZW5Gb3JVc2VyKFxuICAgICAgY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICBjcmVkZW50aWFscy5wYXNzd29yZFxuICAgICk7XG4gICAgaWYgKGVudHJ5LnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgdG9rZW46IChlbnRyeSBhcyBTdWNjZXNzZnVsbEF1dGhSZXNwb25zZSkudG9rZW4gfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyg0MDEpXG4gICAgICAgIC5zZW5kKHsgZXJyb3I6IChlbnRyeSBhcyBGYWlsZWRBdXRoUmVzcG9uc2UpLmVycm9yIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBkYiBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCB7IEN1c3RvbVJlcXVlc3QgfSBmcm9tIFwiLi4vbW9kZWwvQ3VzdG9tUmVxdWVzdFwiO1xuY29uc3QgdXVpZHY0ID0gcmVxdWlyZShcInV1aWQvdjRcIik7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLmdldChcIi9cIiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgICBjb25zdCBub3RlcyA9IGF3YWl0IGRiLmdldERhdGEodG9rZW4pO1xuXG4gICAgaWYgKCFub3Rlcykge1xuICAgICAgcmVzLnN0YXR1cyg1MDApO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgIG5vdGVzLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbn0pO1xuXG5yb3V0ZXIucHV0KFwiL1wiLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICAgIGNvbnN0IG5vdGUgPSByZXEuYm9keS5ub3RlO1xuICAgIGlmICghbm90ZSkge1xuICAgICAgcmVzLnN0YXR1cyg0MDApO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kKFwiQmFkIFJlcXVlc3QhXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vdGVzID0gYXdhaXQgZGIuZ2V0RGF0YSh0b2tlbik7XG4gICAgaWYgKCFub3Rlcykge1xuICAgICAgcmVzLnN0YXR1cyg1MDApO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgICB9XG4gICAgY29uc3QgbmV3SWQgPSB1dWlkdjQoKTtcbiAgICBub3Rlc1tuZXdJZF0gPSB7IGlkOiBuZXdJZCwgLi4ubm90ZSB9O1xuICAgIGF3YWl0IGRiLnN0b3JlRGF0YSh0b2tlbiwgbm90ZXMpO1xuICAgIHJldHVybiByZXMuanNvbih7IGlkOiBuZXdJZCB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG59KTtcblxucm91dGVyLnBhdGNoKFwiLzppZFwiLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICAgIGNvbnN0IG5vdGUgPSByZXEuYm9keS5ub3RlO1xuICAgIGNvbnN0IGlkID0gcmVxLnBhcmFtcy5pZDtcbiAgICBpZiAoIW5vdGUpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIkJhZCBSZXF1ZXN0IVwiKTtcbiAgICB9XG4gICAgY29uc3Qgbm90ZXMgPSBhd2FpdCBkYi5nZXREYXRhKHRva2VuKTtcbiAgICBpZiAoIW5vdGVzKSB7XG4gICAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICAgIH1cbiAgICBub3Rlc1tpZF0gPSBub3RlO1xuICAgIGF3YWl0IGRiLnN0b3JlRGF0YSh0b2tlbiwgbm90ZXMpO1xuICAgIHJldHVybiByZXMuc2VuZCgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbn0pO1xuXG5yb3V0ZXIuZGVsZXRlKFwiLzppZFwiLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICAgIGNvbnN0IGlkID0gcmVxLnBhcmFtcy5pZDtcbiAgICBjb25zdCBub3RlcyA9IGF3YWl0IGRiLmdldERhdGEodG9rZW4pO1xuICAgIGlmICghbm90ZXMpIHtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gICAgfVxuICAgIGRlbGV0ZSBub3Rlc1tpZF07XG4gICAgYXdhaXQgZGIuc3RvcmVEYXRhKHRva2VuLCBub3Rlcyk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBleHRyYWN0Q3JlZGVudGlhbHMsIGdldEF1dGhIZWFkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBnZXRBdXRoSGVhZGVyKHJlcS5oZWFkZXJzKTtcbiAgICBpZiAoIWF1dGhIZWFkZXIpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICAgIHJlcy5zZW5kKFwiSW52YWxpZCBBdXRob3JpemF0aW9uIGhlYWRlciFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gZXh0cmFjdENyZWRlbnRpYWxzKGF1dGhIZWFkZXIpO1xuICAgIGlmICghY3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICAgIHJlcy5zZW5kKFwiSW52YWxpZCBDcmVkZW50aWFscyFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlckV4aXN0cyA9IGF3YWl0IGRiLmlzVXNlclJlZ2lzdGVyZWQoY3JlZGVudGlhbHMuZW1haWwpO1xuXG4gICAgaWYgKHVzZXJFeGlzdHMpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZChcIkVtYWlsIGlzIGFscmVhZHkgdGFrZW4hXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBkYi5yZWdpc3RlclVzZXIoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3N3b3JkKTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKTtcbiAgICAgIHJldHVybiByZXMuc2VuZCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiY29uc3QgdmFsaWRhdG9yID0gcmVxdWlyZShcImVtYWlsLXZhbGlkYXRvclwiKTtcblxuaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tIFwiLi9tb2RlbC9DcmVkZW50aWFsc1wiO1xuXG5leHBvcnQgY29uc3QgZ2V0QXV0aEhlYWRlciA9IChoZWFkZXJzOiBhbnkpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgaWYgKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoXCJhdXRob3JpemF0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGhlYWRlcnMuYXV0aG9yaXphdGlvbjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUb2tlbiA9IChhdXRoSGVhZGVyOiBzdHJpbmcpID0+XG4gIGF1dGhIZWFkZXIgPyBhdXRoSGVhZGVyLnJlcGxhY2UoXCJCZWFyZXIgXCIsIFwiXCIpIDogXCJcIjtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDcmVkZW50aWFscyA9ICh0b2tlbjogc3RyaW5nKTogQ3JlZGVudGlhbHMgfCBudWxsID0+IHtcbiAgdG9rZW4gPSB0b2tlbi5yZXBsYWNlKFwiQmFzaWMgXCIsIFwiXCIpO1xuICBjb25zdCBpdGVtcyA9IHRva2VuLnNwbGl0KFwiOlwiKTtcbiAgaWYgKGl0ZW1zLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGVtYWlsID0gaXRlbXNbMF07XG4gIGNvbnN0IHBhc3N3b3JkID0gaXRlbXNbMV07XG4gIGlmICghdmFsaWRhdG9yLnZhbGlkYXRlKGVtYWlsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7IGVtYWlsLCBwYXNzd29yZCB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkB2ZXJjZWwva3ZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVtYWlsLXZhbGlkYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=