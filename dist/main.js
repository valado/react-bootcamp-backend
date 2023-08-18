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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./app/utils.ts");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../db */ "./app/db.ts");


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
            .json({ token: entry.token });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RiLnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvbWlkZGxld2FyZS9hdXRoLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcm91dGVzL2xvZ2luLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JvdXRlcy90b2RvLnRzIiwid2VicGFjazovLy8uL2FwcC91dGlscy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZW1haWwtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWQvdjRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFB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L0IsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN0QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM5QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFLEtBQUssU0FBRSxRQUFRLFlBQUUsQ0FBQztBQUM3QixDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQzNCRix3Qzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBBdXRoUmVzcG9uc2UgfSBmcm9tIFwiLi9hdXRoL2F1dGhcIjtcbmNvbnN0IHV1aWR2NCA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpO1xuXG5sZXQgdXNlckRhdGE6IGFueSA9IHt9O1xubGV0IHN0b3JlOiBhbnkgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGlzVXNlclJlZ2lzdGVyZWQgPSAoZW1haWw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdXNlckRhdGEuaGFzT3duUHJvcGVydHkoZW1haWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyVXNlciA9IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IG5ld0FjZXNzVG9rZW4gPSB1dWlkdjQoKTtcbiAgdXNlckRhdGFbZW1haWxdID0ge1xuICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICB0b2tlbjogbmV3QWNlc3NUb2tlbixcbiAgfTtcbiAgc3RvcmVbbmV3QWNlc3NUb2tlbl0gPSB7fTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRUb2tlbkZvclVzZXIgPSAoXG4gIGVtYWlsOiBzdHJpbmcsXG4gIHBhc3N3b3JkOiBzdHJpbmdcbik6IEF1dGhSZXNwb25zZSA9PiB7XG4gIGlmICghaXNVc2VyUmVnaXN0ZXJlZChlbWFpbCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogXCJJbnZhbGlkIGVtYWlsISBSZWdpc3RlcmVkP1wiLFxuICAgIH07XG4gIH0gZWxzZSBpZiAodXNlckRhdGFbZW1haWxdICYmIHVzZXJEYXRhW2VtYWlsXS5wYXNzd29yZCA9PT0gcGFzc3dvcmQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHRva2VuOiB1c2VyRGF0YVtlbWFpbF0udG9rZW4sXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogXCJJbnZhbGlkIHBhc3N3b3JkIVwiLFxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b2tlbkV4aXN0cyA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdG9yZS5oYXNPd25Qcm9wZXJ0eSh0b2tlbik7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RGF0YSA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gIGlmICghdG9rZW5FeGlzdHModG9rZW4pKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHN0b3JlW3Rva2VuXTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdG9yZURhdGEgPSAodG9rZW46IHN0cmluZywgZGF0YTogYW55KSA9PiB7XG4gIHN0b3JlW3Rva2VuXSA9IGRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJEQiA9ICgpID0+IHtcbiAgdXNlckRhdGEgPSB7fTtcbiAgc3RvcmUgPSB7fTtcbn07XG4iLCJpbXBvcnQgeyBhdXRoTWlkZGxld2FyZSB9IGZyb20gXCIuL21pZGRsZXdhcmUvYXV0aFwiO1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcbmNvbnN0IGNvcnMgPSByZXF1aXJlKFwiY29yc1wiKTtcbmltcG9ydCBoZWxtZXQgZnJvbSBcImhlbG1ldFwiO1xuY29uc3QgY29va2llUGFyc2VyID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7XG5cbmltcG9ydCBsb2dpblJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvbG9naW5cIjtcbmltcG9ydCByZWdpc3RlclJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvcmVnaXN0ZXJcIjtcbmltcG9ydCBkYXRhUm91dGVyIGZyb20gXCIuL3JvdXRlcy9kYXRhXCI7XG5pbXBvcnQgdG9kb1JvdXRlciBmcm9tIFwiLi9yb3V0ZXMvdG9kb1wiO1xuaW1wb3J0IHsgY2xlYXJEQiB9IGZyb20gXCIuL2RiXCI7XG5cbi8vIENyZWF0ZSBhbiBleHByZXNzIGFwcFxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShoZWxtZXQoKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuXG4vLyBDT1JTXG5jb25zdCBjb3JzT3B0aW9ucyA9IHtcbiAgb3JpZ2luOiBcIipcIixcbiAgcHJlZmxpZ2h0Q29udGludWU6IGZhbHNlLFxuICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgbWV0aG9kczogW1wiT1BUSU9OU1wiLCBcIkdFVFwiLCBcIlBVVFwiLCBcIlBPU1RcIiwgXCJQQVRDSFwiLCBcIkRFTEVURVwiXSxcbiAgYWxsb3dlZEhlYWRlcnM6IFtcIkNvbnRlbnQtVHlwZVwiLCBcIkF1dGhvcml6YXRpb25cIl0sXG59O1xuYXBwLnVzZShjb3JzKGNvcnNPcHRpb25zKSk7XG5cbi8vcHVibGljIHJvdXRlc1xuYXBwLnVzZShcIi9yZWdpc3RlclwiLCByZWdpc3RlclJvdXRlcik7XG5hcHAudXNlKFwiL2xvZ2luXCIsIGxvZ2luUm91dGVyKTtcbmFwcC5kZWxldGUoXCIvZGJcIiwgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xuICBjbGVhckRCKCk7XG4gIHJlcy5zZW5kKCk7XG59KTtcblxuLy8gcHJvdGVjdGVkIHJvdXRlc1xuYXBwLnVzZShhdXRoTWlkZGxld2FyZSk7XG5hcHAudXNlKFwiL2RhdGFcIiwgZGF0YVJvdXRlcik7XG5hcHAudXNlKFwiL3RvZG9cIiwgdG9kb1JvdXRlcik7XG5cbmFwcC5zZXQoXCJwb3J0XCIsIHByb2Nlc3MuZW52LlBPUlQgfHwgOTAwMCk7XG4vL1N0YXJ0IFNlcnZlclxuYXBwLmxpc3RlbihhcHAuZ2V0KFwicG9ydFwiKSwgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZyhcIk5vZGUgYXBwIGlzIHJ1bm5pbmcgb24gcG9ydFwiLCBhcHAuZ2V0KFwicG9ydFwiKSk7XG59KTtcbiIsImltcG9ydCB7IGV4dHJhY3RUb2tlbiwgZ2V0QXV0aEhlYWRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgdG9rZW5FeGlzdHMgfSBmcm9tIFwiLi8uLi9kYlwiO1xuXG5leHBvcnQgY29uc3QgYXV0aE1pZGRsZXdhcmUgPSAocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiBhbnkpID0+IHtcbiAgY29uc3QgYXV0aEhlYWRlciA9IGdldEF1dGhIZWFkZXIocmVxLmhlYWRlcnMpO1xuICBjb25zdCB0b2tlbiA9IGV4dHJhY3RUb2tlbihhdXRoSGVhZGVyKTtcbiAgaWYgKCF0b2tlbikge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXMuc2VuZChcIkludmFsaWQgVG9rZW4hXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0b2tlbkV4aXN0cyh0b2tlbikpIHtcbiAgICByZXEudG9rZW4gPSB0b2tlbjtcbiAgICByZXR1cm4gbmV4dCgpO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDAxKTtcbiAgICByZXMuc2VuZChcIk5vdCBhdXRob3JpemVkISBSZWdpc3RlcmVkP1wiKTtcbiAgICByZXR1cm47XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgc3RvcmVEYXRhLCBnZXREYXRhIH0gZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0IH0gZnJvbSBcIi4uL21vZGVsL0N1c3RvbVJlcXVlc3RcIjtcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgY29uc29sZS5sb2cocmVxLmJvZHkpO1xuICBzdG9yZURhdGEodG9rZW4sIHJlcS5ib2R5KTtcbiAgcmVzLnN0YXR1cygyMDApO1xuICByZXR1cm4gcmVzLnNlbmQoKTtcbn0pO1xuXG5yb3V0ZXIuZ2V0KFwiL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc29sZS5sb2codG9rZW4pO1xuICBjb25zdCBkYXRhID0gZ2V0RGF0YSh0b2tlbik7XG4gIGlmICghZGF0YSkge1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG4gIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICByZXR1cm4gcmVzLmpzb24oZGF0YSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGdldFRva2VuRm9yVXNlciB9IGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IHsgZXh0cmFjdENyZWRlbnRpYWxzLCBnZXRBdXRoSGVhZGVyIH0gZnJvbSBcIi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7IEZhaWxlZEF1dGhSZXNwb25zZSwgU3VjY2Vzc2Z1bGxBdXRoUmVzcG9uc2UgfSBmcm9tIFwiLi4vYXV0aC9hdXRoXCI7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc29sZS5sb2coXCJsb2dpblwiKTtcbiAgY29uc3QgYXV0aEhlYWRlciA9IGdldEF1dGhIZWFkZXIocmVxLmhlYWRlcnMpO1xuICBjb25zb2xlLmxvZyhhdXRoSGVhZGVyKTtcbiAgaWYgKCFhdXRoSGVhZGVyKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIkludmFsaWQgQXV0aG9yaXphdGlvbiBoZWFkZXIhXCIpO1xuICB9XG4gIGNvbnN0IGNyZWRlbnRpYWxzID0gZXh0cmFjdENyZWRlbnRpYWxzKGF1dGhIZWFkZXIpO1xuICBjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG4gIGlmICghY3JlZGVudGlhbHMpIHtcbiAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiSW52YWxpZCBBdXRob3JpemF0aW9uIGhlYWRlciFcIik7XG4gIH1cbiAgY29uc29sZS5sb2coY3JlZGVudGlhbHMpO1xuICBjb25zdCBlbnRyeSA9IGdldFRva2VuRm9yVXNlcihjcmVkZW50aWFscy5lbWFpbCwgY3JlZGVudGlhbHMucGFzc3dvcmQpO1xuICBpZiAoZW50cnkuc3VjY2Vzcykge1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyB0b2tlbjogKGVudHJ5IGFzIFN1Y2Nlc3NmdWxsQXV0aFJlc3BvbnNlKS50b2tlbiB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLnNlbmQoeyBlcnJvcjogKGVudHJ5IGFzIEZhaWxlZEF1dGhSZXNwb25zZSkuZXJyb3IgfSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgaXNVc2VyUmVnaXN0ZXJlZCwgcmVnaXN0ZXJVc2VyIH0gZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBleHRyYWN0Q3JlZGVudGlhbHMsIGdldEF1dGhIZWFkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyXCIpO1xuICBjb25zdCBhdXRoSGVhZGVyID0gZ2V0QXV0aEhlYWRlcihyZXEuaGVhZGVycyk7XG4gIGlmICghYXV0aEhlYWRlcikge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXMuc2VuZChcIkludmFsaWQgQXV0aG9yaXphdGlvbiBoZWFkZXIhXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBjcmVkZW50aWFscyA9IGV4dHJhY3RDcmVkZW50aWFscyhhdXRoSGVhZGVyKTtcbiAgaWYgKCFjcmVkZW50aWFscykge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXMuc2VuZChcIkludmFsaWQgQ3JlZGVudGlhbHMhXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG4gIGlmIChpc1VzZXJSZWdpc3RlcmVkKGNyZWRlbnRpYWxzLmVtYWlsKSkge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJFbWFpbCBpcyBhbHJlYWR5IHRha2VuIVwiKTtcbiAgfSBlbHNlIHtcbiAgICByZWdpc3RlclVzZXIoY3JlZGVudGlhbHMuZW1haWwsIGNyZWRlbnRpYWxzLnBhc3N3b3JkKTtcbiAgICByZXMuc3RhdHVzKDIwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgc3RvcmVEYXRhLCBnZXREYXRhIH0gZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0IH0gZnJvbSBcIi4uL21vZGVsL0N1c3RvbVJlcXVlc3RcIjtcbmNvbnN0IHV1aWR2NCA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5nZXQoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICBjb25zdCB0b2RvcyA9IGdldERhdGEodG9rZW4pO1xuICBpZiAoIXRvZG9zKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbiAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICB0b2RvcyxcbiAgfSk7XG59KTtcblxucm91dGVyLnB1dChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGNvbnN0IHRvZG8gPSByZXEuYm9keS50b2RvO1xuICBpZiAoIXRvZG8pIHtcbiAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiQmFkIFJlcXVlc3QhXCIpO1xuICB9XG4gIGNvbnN0IHRvZG9zID0gZ2V0RGF0YSh0b2tlbik7XG4gIGlmICghdG9kb3MpIHtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxuICBjb25zdCBuZXdJZCA9IHV1aWR2NCgpO1xuICB0b2Rvc1tuZXdJZF0gPSB7IGlkOiBuZXdJZCwgLi4udG9kbyB9O1xuICBzdG9yZURhdGEodG9rZW4sIHRvZG9zKTtcbiAgcmV0dXJuIHJlcy5qc29uKHsgaWQ6IG5ld0lkIH0pO1xufSk7XG5cbnJvdXRlci5wYXRjaChcIi86aWRcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGNvbnN0IHRvZG8gPSByZXEuYm9keS50b2RvO1xuICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XG4gIGlmICghdG9kbykge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJCYWQgUmVxdWVzdCFcIik7XG4gIH1cbiAgY29uc3QgdG9kb3MgPSBnZXREYXRhKHRva2VuKTtcbiAgaWYgKCF0b2Rvcykge1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG4gIHRvZG9zW2lkXSA9IHRvZG87XG4gIHN0b3JlRGF0YSh0b2tlbiwgdG9kb3MpO1xuICByZXR1cm4gcmVzLnNlbmQoKTtcbn0pO1xuXG5yb3V0ZXIuZGVsZXRlKFwiLzppZFwiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc3QgaWQgPSByZXEucGFyYW1zLmlkO1xuICBjb25zdCB0b2RvcyA9IGdldERhdGEodG9rZW4pO1xuICBpZiAoIXRvZG9zKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbiAgZGVsZXRlIHRvZG9zW2lkXTtcbiAgc3RvcmVEYXRhKHRva2VuLCB0b2Rvcyk7XG4gIHJldHVybiByZXMuc2VuZCgpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImNvbnN0IHZhbGlkYXRvciA9IHJlcXVpcmUoXCJlbWFpbC12YWxpZGF0b3JcIik7XG5cbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSBcIi4vbW9kZWwvQ3JlZGVudGlhbHNcIjtcblxuZXhwb3J0IGNvbnN0IGdldEF1dGhIZWFkZXIgPSAoaGVhZGVyczogYW55KTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KFwiYXV0aG9yaXphdGlvblwiKSkge1xuICAgIHJldHVybiBoZWFkZXJzLmF1dGhvcml6YXRpb247XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VG9rZW4gPSAoYXV0aEhlYWRlcjogc3RyaW5nKSA9PlxuICBhdXRoSGVhZGVyID8gYXV0aEhlYWRlci5yZXBsYWNlKFwiQmVhcmVyIFwiLCBcIlwiKSA6IFwiXCI7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q3JlZGVudGlhbHMgPSAodG9rZW46IHN0cmluZyk6IENyZWRlbnRpYWxzIHwgbnVsbCA9PiB7XG4gIHRva2VuID0gdG9rZW4ucmVwbGFjZShcIkJhc2ljIFwiLCBcIlwiKTtcbiAgY29uc3QgaXRlbXMgPSB0b2tlbi5zcGxpdChcIjpcIik7XG4gIGlmIChpdGVtcy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBlbWFpbCA9IGl0ZW1zWzBdO1xuICBjb25zdCBwYXNzd29yZCA9IGl0ZW1zWzFdO1xuICBpZiAoIXZhbGlkYXRvci52YWxpZGF0ZShlbWFpbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4geyBlbWFpbCwgcGFzc3dvcmQgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZW1haWwtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWQvdjRcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==