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

/***/ "./app/db.ts":
/*!*******************!*\
  !*** ./app/db.ts ***!
  \*******************/
/*! exports provided: isUserRegistered, registerUser, getTokenForUser, tokenExists, getData, storeData, clearDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUserRegistered", function() { return isUserRegistered; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerUser", function() { return registerUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTokenForUser", function() { return getTokenForUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenExists", function() { return tokenExists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeData", function() { return storeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearDB", function() { return clearDB; });
var uuidv4 = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
var userData = {};
var store = {};
var isUserRegistered = function (email) {
    return userData.hasOwnProperty(email);
};
var registerUser = function (email, password) {
    var newAcessToken = uuidv4();
    userData[email] = {
        password: password,
        token: newAcessToken,
    };
    store[newAcessToken] = {};
};
var getTokenForUser = function (email, password) {
    if (!isUserRegistered(email)) {
        return {
            success: false,
            error: "Invalid email! Registered?",
        };
    }
    else if (userData[email] && userData[email].password === password) {
        return {
            success: true,
            token: userData[email].token,
        };
    }
    else {
        return {
            success: false,
            error: "Invalid password!",
        };
    }
};
var tokenExists = function (token) {
    return store.hasOwnProperty(token);
};
var getData = function (token) {
    if (!tokenExists(token)) {
        return null;
    }
    return store[token];
};
var storeData = function (token, data) {
    store[token] = data;
};
var clearDB = function () {
    userData = {};
    store = {};
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
/* harmony import */ var _routes_todo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/todo */ "./app/routes/todo.ts");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./db */ "./app/db.ts");

var express = __webpack_require__(/*! express */ "express");
var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
var cors = __webpack_require__(/*! cors */ "cors");

var cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");





// Create an express app
var app = express();
app.use(helmet__WEBPACK_IMPORTED_MODULE_1___default()());
app.use(bodyParser.json({ extended: true }));
// CORS
var corsOptions = {
    origin: ["http://localhost:4200"],
    preflightContinue: false,
    credentials: true,
    methods: ["OPTIONS", "GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(cookieParser());
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
app.use("/todo", _routes_todo__WEBPACK_IMPORTED_MODULE_5__["default"]);
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
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../db */ "./app/db.ts");

var authMiddleware = function (req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        res.status(400);
        res.send("Invalid Token!");
        return;
    }
    if (Object(_db__WEBPACK_IMPORTED_MODULE_0__["tokenExists"])(token)) {
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
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db.ts");


var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post("/", function (req, res) {
    var token = req.token;
    console.log(token);
    console.log(req.body);
    Object(_db__WEBPACK_IMPORTED_MODULE_1__["storeData"])(token, req.body);
    res.status(200);
    return res.send();
});
router.get("/", function (req, res) {
    var token = req.token;
    console.log(token);
    var data = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!data) {
        res.status(500);
        return res.send("Server error!");
    }
    res.setHeader("Content-Type", "application/json");
    return res.json(data);
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
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils */ "./app/utils.ts");



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post("/", function (req, res) {
    console.log("login");
    var authHeader = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getAuthHeader"])(req.headers);
    console.log(authHeader);
    if (!authHeader) {
        res.status(400);
        return res.send("Invalid Authorization header!");
    }
    var credentials = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["extractCredentials"])(authHeader);
    console.log(credentials);
    if (!credentials) {
        res.status(400);
        return res.send("Invalid Authorization header!");
    }
    console.log(credentials);
    var entry = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getTokenForUser"])(credentials.email, credentials.password);
    if (entry.success) {
        return res
            .status(200)
            .cookie("token", entry.token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        })
            .send();
    }
    else {
        return res.status(401).send({ error: entry.error });
    }
});
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
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./app/utils.ts");



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post("/", function (req, res) {
    console.log("register");
    var authHeader = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getAuthHeader"])(req.headers);
    if (!authHeader) {
        res.status(400);
        res.send("Invalid Authorization header!");
        return;
    }
    var credentials = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["extractCredentials"])(authHeader);
    if (!credentials) {
        res.status(400);
        res.send("Invalid Credentials!");
        return;
    }
    console.log(credentials);
    if (Object(_db__WEBPACK_IMPORTED_MODULE_1__["isUserRegistered"])(credentials.email)) {
        res.status(400);
        return res.send("Email is already taken!");
    }
    else {
        Object(_db__WEBPACK_IMPORTED_MODULE_1__["registerUser"])(credentials.email, credentials.password);
        res.status(200);
        return res.send();
    }
});
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./app/routes/todo.ts":
/*!****************************!*\
  !*** ./app/routes/todo.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db */ "./app/db.ts");
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


var uuidv4 = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.get("/", function (req, res) {
    var token = req.token;
    var todos = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!todos) {
        res.status(500);
        return res.send("Server error!");
    }
    return res.json({
        todos: todos,
    });
});
router.put("/", function (req, res) {
    var token = req.token;
    var todo = req.body.todo;
    if (!todo) {
        res.status(400);
        return res.send("Bad Request!");
    }
    var todos = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!todos) {
        res.status(500);
        return res.send("Server error!");
    }
    var newId = uuidv4();
    todos[newId] = __assign({ id: newId }, todo);
    Object(_db__WEBPACK_IMPORTED_MODULE_1__["storeData"])(token, todos);
    return res.json({ id: newId });
});
router.patch("/:id", function (req, res) {
    var token = req.token;
    var todo = req.body.todo;
    var id = req.params.id;
    if (!todo) {
        res.status(400);
        return res.send("Bad Request!");
    }
    var todos = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!todos) {
        res.status(500);
        return res.send("Server error!");
    }
    todos[id] = todo;
    Object(_db__WEBPACK_IMPORTED_MODULE_1__["storeData"])(token, todos);
    return res.send();
});
router.delete("/:id", function (req, res) {
    var token = req.token;
    var id = req.params.id;
    var todos = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!todos) {
        res.status(500);
        return res.send("Server error!");
    }
    delete todos[id];
    Object(_db__WEBPACK_IMPORTED_MODULE_1__["storeData"])(token, todos);
    return res.send();
});
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./app/utils.ts":
/*!**********************!*\
  !*** ./app/utils.ts ***!
  \**********************/
/*! exports provided: getAuthHeader, extractCredentials */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthHeader", function() { return getAuthHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractCredentials", function() { return extractCredentials; });
var validator = __webpack_require__(/*! email-validator */ "email-validator");
var getAuthHeader = function (headers) {
    console.log(headers);
    if (headers.hasOwnProperty("authorization")) {
        return headers.authorization;
    }
    else {
        return null;
    }
};
var extractCredentials = function (token) {
    token = token.replace("Basic ", "");
    console.log(token);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RiLnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvbWlkZGxld2FyZS9hdXRoLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcm91dGVzL2xvZ2luLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JvdXRlcy90b2RvLnRzIiwid2VicGFjazovLy8uL2FwcC91dGlscy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZW1haWwtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWQvdjRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFB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QUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDOUIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sRUFBRSxLQUFLLFNBQUUsUUFBUSxZQUFFLENBQUM7QUFDN0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUMxQkYsd0M7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgQXV0aFJlc3BvbnNlIH0gZnJvbSBcIi4vYXV0aC9hdXRoXCI7XG5jb25zdCB1dWlkdjQgPSByZXF1aXJlKFwidXVpZC92NFwiKTtcblxubGV0IHVzZXJEYXRhOiBhbnkgPSB7fTtcbmxldCBzdG9yZTogYW55ID0ge307XG5cbmV4cG9ydCBjb25zdCBpc1VzZXJSZWdpc3RlcmVkID0gKGVtYWlsOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHVzZXJEYXRhLmhhc093blByb3BlcnR5KGVtYWlsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlclVzZXIgPSAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBuZXdBY2Vzc1Rva2VuID0gdXVpZHY0KCk7XG4gIHVzZXJEYXRhW2VtYWlsXSA9IHtcbiAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgdG9rZW46IG5ld0FjZXNzVG9rZW4sXG4gIH07XG4gIHN0b3JlW25ld0FjZXNzVG9rZW5dID0ge307XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VG9rZW5Gb3JVc2VyID0gKFxuICBlbWFpbDogc3RyaW5nLFxuICBwYXNzd29yZDogc3RyaW5nXG4pOiBBdXRoUmVzcG9uc2UgPT4ge1xuICBpZiAoIWlzVXNlclJlZ2lzdGVyZWQoZW1haWwpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IFwiSW52YWxpZCBlbWFpbCEgUmVnaXN0ZXJlZD9cIixcbiAgICB9O1xuICB9IGVsc2UgaWYgKHVzZXJEYXRhW2VtYWlsXSAmJiB1c2VyRGF0YVtlbWFpbF0ucGFzc3dvcmQgPT09IHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICB0b2tlbjogdXNlckRhdGFbZW1haWxdLnRva2VuLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IFwiSW52YWxpZCBwYXNzd29yZCFcIixcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdG9rZW5FeGlzdHMgPSAodG9rZW46IHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RvcmUuaGFzT3duUHJvcGVydHkodG9rZW4pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERhdGEgPSAodG9rZW46IHN0cmluZykgPT4ge1xuICBpZiAoIXRva2VuRXhpc3RzKHRva2VuKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBzdG9yZVt0b2tlbl07XG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcmVEYXRhID0gKHRva2VuOiBzdHJpbmcsIGRhdGE6IGFueSkgPT4ge1xuICBzdG9yZVt0b2tlbl0gPSBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyREIgPSAoKSA9PiB7XG4gIHVzZXJEYXRhID0ge307XG4gIHN0b3JlID0ge307XG59O1xuIiwiaW1wb3J0IHsgYXV0aE1pZGRsZXdhcmUgfSBmcm9tIFwiLi9taWRkbGV3YXJlL2F1dGhcIjtcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5jb25zdCBjb3JzID0gcmVxdWlyZShcImNvcnNcIik7XG5pbXBvcnQgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcbmNvbnN0IGNvb2tpZVBhcnNlciA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpO1xuXG5pbXBvcnQgbG9naW5Sb3V0ZXIgZnJvbSBcIi4vcm91dGVzL2xvZ2luXCI7XG5pbXBvcnQgcmVnaXN0ZXJSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL3JlZ2lzdGVyXCI7XG5pbXBvcnQgZGF0YVJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvZGF0YVwiO1xuaW1wb3J0IHRvZG9Sb3V0ZXIgZnJvbSBcIi4vcm91dGVzL3RvZG9cIjtcbmltcG9ydCB7IGNsZWFyREIgfSBmcm9tIFwiLi9kYlwiO1xuXG4vLyBDcmVhdGUgYW4gZXhwcmVzcyBhcHBcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmFwcC51c2UoaGVsbWV0KCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbi8vIENPUlNcbmNvbnN0IGNvcnNPcHRpb25zID0ge1xuICBvcmlnaW46IFtcImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMFwiXSxcbiAgcHJlZmxpZ2h0Q29udGludWU6IGZhbHNlLFxuICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgbWV0aG9kczogW1wiT1BUSU9OU1wiLCBcIkdFVFwiLCBcIlBVVFwiLCBcIlBPU1RcIiwgXCJQQVRDSFwiLCBcIkRFTEVURVwiXSxcbiAgYWxsb3dlZEhlYWRlcnM6IFtcIkNvbnRlbnQtVHlwZVwiLCBcIkF1dGhvcml6YXRpb25cIl0sXG59O1xuYXBwLnVzZShjb3JzKGNvcnNPcHRpb25zKSk7XG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcblxuLy9wdWJsaWMgcm91dGVzXG5hcHAudXNlKFwiL3JlZ2lzdGVyXCIsIHJlZ2lzdGVyUm91dGVyKTtcbmFwcC51c2UoXCIvbG9naW5cIiwgbG9naW5Sb3V0ZXIpO1xuYXBwLmRlbGV0ZShcIi9kYlwiLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XG4gIGNsZWFyREIoKTtcbiAgcmVzLnNlbmQoKTtcbn0pO1xuXG4vLyBwcm90ZWN0ZWQgcm91dGVzXG5hcHAudXNlKGF1dGhNaWRkbGV3YXJlKTtcbmFwcC51c2UoXCIvZGF0YVwiLCBkYXRhUm91dGVyKTtcbmFwcC51c2UoXCIvdG9kb1wiLCB0b2RvUm91dGVyKTtcblxuYXBwLnNldChcInBvcnRcIiwgcHJvY2Vzcy5lbnYuUE9SVCB8fCA5MDAwKTtcbi8vU3RhcnQgU2VydmVyXG5hcHAubGlzdGVuKGFwcC5nZXQoXCJwb3J0XCIpLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKFwiTm9kZSBhcHAgaXMgcnVubmluZyBvbiBwb3J0XCIsIGFwcC5nZXQoXCJwb3J0XCIpKTtcbn0pO1xuIiwiaW1wb3J0IHsgdG9rZW5FeGlzdHMgfSBmcm9tIFwiLi8uLi9kYlwiO1xuXG5leHBvcnQgY29uc3QgYXV0aE1pZGRsZXdhcmUgPSAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcbiAgY29uc3QgdG9rZW4gPSByZXEuY29va2llcy50b2tlbjtcbiAgaWYgKCF0b2tlbikge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXMuc2VuZChcIkludmFsaWQgVG9rZW4hXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0b2tlbkV4aXN0cyh0b2tlbikpIHtcbiAgICByZXEudG9rZW4gPSB0b2tlbjtcbiAgICByZXR1cm4gbmV4dCgpO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDAxKTtcbiAgICByZXMuc2VuZChcIk5vdCBhdXRob3JpemVkISBSZWdpc3RlcmVkP1wiKTtcbiAgICByZXR1cm47XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgc3RvcmVEYXRhLCBnZXREYXRhIH0gZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0IH0gZnJvbSBcIi4uL21vZGVsL0N1c3RvbVJlcXVlc3RcIjtcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgY29uc29sZS5sb2cocmVxLmJvZHkpO1xuICBzdG9yZURhdGEodG9rZW4sIHJlcS5ib2R5KTtcbiAgcmVzLnN0YXR1cygyMDApO1xuICByZXR1cm4gcmVzLnNlbmQoKTtcbn0pO1xuXG5yb3V0ZXIuZ2V0KFwiL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc29sZS5sb2codG9rZW4pO1xuICBjb25zdCBkYXRhID0gZ2V0RGF0YSh0b2tlbik7XG4gIGlmICghZGF0YSkge1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG4gIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICByZXR1cm4gcmVzLmpzb24oZGF0YSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGdldFRva2VuRm9yVXNlciB9IGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IHsgZXh0cmFjdENyZWRlbnRpYWxzLCBnZXRBdXRoSGVhZGVyIH0gZnJvbSBcIi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7IEZhaWxlZEF1dGhSZXNwb25zZSwgU3VjY2Vzc2Z1bGxBdXRoUmVzcG9uc2UgfSBmcm9tIFwiLi4vYXV0aC9hdXRoXCI7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc29sZS5sb2coXCJsb2dpblwiKTtcbiAgY29uc3QgYXV0aEhlYWRlciA9IGdldEF1dGhIZWFkZXIocmVxLmhlYWRlcnMpO1xuICBjb25zb2xlLmxvZyhhdXRoSGVhZGVyKTtcbiAgaWYgKCFhdXRoSGVhZGVyKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIkludmFsaWQgQXV0aG9yaXphdGlvbiBoZWFkZXIhXCIpO1xuICB9XG4gIGNvbnN0IGNyZWRlbnRpYWxzID0gZXh0cmFjdENyZWRlbnRpYWxzKGF1dGhIZWFkZXIpO1xuICBjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG4gIGlmICghY3JlZGVudGlhbHMpIHtcbiAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiSW52YWxpZCBBdXRob3JpemF0aW9uIGhlYWRlciFcIik7XG4gIH1cbiAgY29uc29sZS5sb2coY3JlZGVudGlhbHMpO1xuICBjb25zdCBlbnRyeSA9IGdldFRva2VuRm9yVXNlcihjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzc3dvcmQpO1xuICBpZiAoZW50cnkuc3VjY2Vzcykge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmNvb2tpZShcInRva2VuXCIsIChlbnRyeSBhcyBTdWNjZXNzZnVsbEF1dGhSZXNwb25zZSkudG9rZW4sIHtcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgc2FtZVNpdGU6IFwiTm9uZVwiLFxuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgIH0pXG4gICAgICAuc2VuZCgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAoZW50cnkgYXMgRmFpbGVkQXV0aFJlc3BvbnNlKS5lcnJvciB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBpc1VzZXJSZWdpc3RlcmVkLCByZWdpc3RlclVzZXIgfSBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCB7IGV4dHJhY3RDcmVkZW50aWFscywgZ2V0QXV0aEhlYWRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KFwiL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJcIik7XG4gIGNvbnN0IGF1dGhIZWFkZXIgPSBnZXRBdXRoSGVhZGVyKHJlcS5oZWFkZXJzKTtcbiAgaWYgKCFhdXRoSGVhZGVyKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJlcy5zZW5kKFwiSW52YWxpZCBBdXRob3JpemF0aW9uIGhlYWRlciFcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGNyZWRlbnRpYWxzID0gZXh0cmFjdENyZWRlbnRpYWxzKGF1dGhIZWFkZXIpO1xuICBpZiAoIWNyZWRlbnRpYWxzKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJlcy5zZW5kKFwiSW52YWxpZCBDcmVkZW50aWFscyFcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnNvbGUubG9nKGNyZWRlbnRpYWxzKTtcbiAgaWYgKGlzVXNlclJlZ2lzdGVyZWQoY3JlZGVudGlhbHMuZW1haWwpKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIkVtYWlsIGlzIGFscmVhZHkgdGFrZW4hXCIpO1xuICB9IGVsc2Uge1xuICAgIHJlZ2lzdGVyVXNlcihjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzc3dvcmQpO1xuICAgIHJlcy5zdGF0dXMoMjAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBzdG9yZURhdGEsIGdldERhdGEgfSBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCB7IEN1c3RvbVJlcXVlc3QgfSBmcm9tIFwiLi4vbW9kZWwvQ3VzdG9tUmVxdWVzdFwiO1xuY29uc3QgdXVpZHY0ID0gcmVxdWlyZShcInV1aWQvdjRcIik7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLmdldChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGNvbnN0IHRvZG9zID0gZ2V0RGF0YSh0b2tlbik7XG4gIGlmICghdG9kb3MpIHtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxuICByZXR1cm4gcmVzLmpzb24oe1xuICAgIHRvZG9zLFxuICB9KTtcbn0pO1xuXG5yb3V0ZXIucHV0KFwiL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc3QgdG9kbyA9IHJlcS5ib2R5LnRvZG87XG4gIGlmICghdG9kbykge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJCYWQgUmVxdWVzdCFcIik7XG4gIH1cbiAgY29uc3QgdG9kb3MgPSBnZXREYXRhKHRva2VuKTtcbiAgaWYgKCF0b2Rvcykge1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG4gIGNvbnN0IG5ld0lkID0gdXVpZHY0KCk7XG4gIHRvZG9zW25ld0lkXSA9IHsgaWQ6IG5ld0lkLCAuLi50b2RvIH07XG4gIHN0b3JlRGF0YSh0b2tlbiwgdG9kb3MpO1xuICByZXR1cm4gcmVzLmpzb24oeyBpZDogbmV3SWQgfSk7XG59KTtcblxucm91dGVyLnBhdGNoKFwiLzppZFwiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc3QgdG9kbyA9IHJlcS5ib2R5LnRvZG87XG4gIGNvbnN0IGlkID0gcmVxLnBhcmFtcy5pZDtcbiAgaWYgKCF0b2RvKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIkJhZCBSZXF1ZXN0IVwiKTtcbiAgfVxuICBjb25zdCB0b2RvcyA9IGdldERhdGEodG9rZW4pO1xuICBpZiAoIXRvZG9zKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbiAgdG9kb3NbaWRdID0gdG9kbztcbiAgc3RvcmVEYXRhKHRva2VuLCB0b2Rvcyk7XG4gIHJldHVybiByZXMuc2VuZCgpO1xufSk7XG5cbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XG4gIGNvbnN0IHRvZG9zID0gZ2V0RGF0YSh0b2tlbik7XG4gIGlmICghdG9kb3MpIHtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxuICBkZWxldGUgdG9kb3NbaWRdO1xuICBzdG9yZURhdGEodG9rZW4sIHRvZG9zKTtcbiAgcmV0dXJuIHJlcy5zZW5kKCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiY29uc3QgdmFsaWRhdG9yID0gcmVxdWlyZShcImVtYWlsLXZhbGlkYXRvclwiKTtcblxuaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tIFwiLi9tb2RlbC9DcmVkZW50aWFsc1wiO1xuXG5leHBvcnQgY29uc3QgZ2V0QXV0aEhlYWRlciA9IChoZWFkZXJzOiBhbnkpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgY29uc29sZS5sb2coaGVhZGVycyk7XG4gIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KFwiYXV0aG9yaXphdGlvblwiKSkge1xuICAgIHJldHVybiBoZWFkZXJzLmF1dGhvcml6YXRpb247XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q3JlZGVudGlhbHMgPSAodG9rZW46IHN0cmluZyk6IENyZWRlbnRpYWxzIHwgbnVsbCA9PiB7XG4gIHRva2VuID0gdG9rZW4ucmVwbGFjZShcIkJhc2ljIFwiLCBcIlwiKTtcbiAgY29uc29sZS5sb2codG9rZW4pO1xuICBjb25zdCBpdGVtcyA9IHRva2VuLnNwbGl0KFwiOlwiKTtcbiAgaWYgKGl0ZW1zLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGVtYWlsID0gaXRlbXNbMF07XG4gIGNvbnN0IHBhc3N3b3JkID0gaXRlbXNbMV07XG4gIGlmICghdmFsaWRhdG9yLnZhbGlkYXRlKGVtYWlsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7IGVtYWlsLCBwYXNzd29yZCB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbWFpbC12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZC92NFwiKTsiXSwic291cmNlUm9vdCI6IiJ9