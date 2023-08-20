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
/* harmony import */ var _routes_notes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/notes */ "./app/routes/notes.ts");
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
    var notes = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!notes) {
        res.status(500);
        return res.send("Server error!");
    }
    return res.json({
        notes: notes,
    });
});
router.put("/", function (req, res) {
    var token = req.token;
    var note = req.body.note;
    if (!note) {
        res.status(400);
        return res.send("Bad Request!");
    }
    var notes = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!notes) {
        res.status(500);
        return res.send("Server error!");
    }
    var newId = uuidv4();
    notes[newId] = __assign({ id: newId }, note);
    Object(_db__WEBPACK_IMPORTED_MODULE_1__["storeData"])(token, notes);
    return res.json({ id: newId });
});
router.patch("/:id", function (req, res) {
    var token = req.token;
    var note = req.body.note;
    var id = req.params.id;
    if (!note) {
        res.status(400);
        return res.send("Bad Request!");
    }
    var notes = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!notes) {
        res.status(500);
        return res.send("Server error!");
    }
    notes[id] = note;
    Object(_db__WEBPACK_IMPORTED_MODULE_1__["storeData"])(token, notes);
    return res.send();
});
router.delete("/:id", function (req, res) {
    var token = req.token;
    var id = req.params.id;
    var notes = Object(_db__WEBPACK_IMPORTED_MODULE_1__["getData"])(token);
    if (!notes) {
        res.status(500);
        return res.send("Server error!");
    }
    delete notes[id];
    Object(_db__WEBPACK_IMPORTED_MODULE_1__["storeData"])(token, notes);
    return res.send();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RiLnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvbWlkZGxld2FyZS9hdXRoLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvZGF0YS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcm91dGVzL2xvZ2luLnRzIiwid2VicGFjazovLy8uL2FwcC9yb3V0ZXMvbm90ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3JvdXRlcy9yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImVtYWlsLXZhbGlkYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dWlkL3Y0XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyx3QkFBUyxDQUFDLENBQUM7QUFFbEMsSUFBSSxRQUFRLEdBQVEsRUFBRSxDQUFDO0FBQ3ZCLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQztBQUViLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxLQUFhO0lBQzVDLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFSyxJQUFNLFlBQVksR0FBRyxVQUFDLEtBQWEsRUFBRSxRQUFnQjtJQUMxRCxJQUFNLGFBQWEsR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUMvQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFDaEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLGFBQWE7S0FDckIsQ0FBQztJQUNGLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDNUIsQ0FBQyxDQUFDO0FBRUssSUFBTSxlQUFlLEdBQUcsVUFDN0IsS0FBYSxFQUNiLFFBQWdCO0lBRWhCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM1QixPQUFPO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsNEJBQTRCO1NBQ3BDLENBQUM7S0FDSDtTQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ25FLE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSztTQUM3QixDQUFDO0tBQ0g7U0FBTTtRQUNMLE9BQU87WUFDTCxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxtQkFBbUI7U0FDM0IsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDO0FBRUssSUFBTSxXQUFXLEdBQUcsVUFBQyxLQUFhO0lBQ3ZDLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFSyxJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQWE7SUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN2QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRUssSUFBTSxTQUFTLEdBQUcsVUFBQyxLQUFhLEVBQUUsSUFBUztJQUNoRCxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLENBQUMsQ0FBQztBQUVLLElBQU0sT0FBTyxHQUFHO0lBQ3JCLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDM0RGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtRDtBQUNuRCxJQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLHdCQUFTLENBQUMsQ0FBQztBQUNuQyxJQUFNLFVBQVUsR0FBRyxtQkFBTyxDQUFDLGdDQUFhLENBQUMsQ0FBQztBQUMxQyxJQUFNLElBQUksR0FBRyxtQkFBTyxDQUFDLGtCQUFNLENBQUMsQ0FBQztBQUNEO0FBQzVCLElBQU0sWUFBWSxHQUFHLG1CQUFPLENBQUMsb0NBQWUsQ0FBQyxDQUFDO0FBRUw7QUFDTTtBQUNSO0FBQ0U7QUFDVjtBQUUvQix3QkFBd0I7QUFDeEIsSUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyw2Q0FBTSxFQUFFLENBQUMsQ0FBQztBQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUV4QixPQUFPO0FBQ1AsSUFBTSxXQUFXLEdBQUc7SUFDbEIsTUFBTSxFQUFFLEdBQUc7SUFDWCxpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0lBQzdELGNBQWMsRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7Q0FDbEQsQ0FBQztBQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFFM0IsZUFBZTtBQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLHdEQUFjLENBQUMsQ0FBQztBQUNyQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxxREFBVyxDQUFDLENBQUM7QUFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQyxHQUFRLEVBQUUsR0FBUTtJQUNuQyxtREFBTyxFQUFFLENBQUM7SUFDVixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQztBQUVILG1CQUFtQjtBQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLCtEQUFjLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxvREFBVSxDQUFDLENBQUM7QUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUscURBQVcsQ0FBQyxDQUFDO0FBRS9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQzFDLGNBQWM7QUFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM5Q0g7QUFBQTtBQUFBO0FBQUE7QUFBdUQ7QUFDakI7QUFFL0IsSUFBTSxjQUFjLEdBQUcsVUFBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLElBQVM7SUFDMUQsSUFBTSxVQUFVLEdBQUcsNERBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsSUFBTSxLQUFLLEdBQUcsMkRBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0IsT0FBTztLQUNSO0lBRUQsSUFBSSx1REFBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDZjtTQUFNO1FBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEMsT0FBTztLQUNSO0FBQ0gsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEJGO0FBQUE7QUFBQTtBQUFBO0FBQWlDO0FBRVU7QUFFM0MsSUFBTSxNQUFNLEdBQUcsc0RBQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDM0MsSUFBTSxLQUFLLEdBQUksR0FBcUIsQ0FBQyxLQUFLLENBQUM7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixxREFBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQixPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDMUMsSUFBTSxLQUFLLEdBQUksR0FBcUIsQ0FBQyxLQUFLLENBQUM7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixJQUFNLElBQUksR0FBRyxtREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNsQztJQUNELEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDbEQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRVkscUVBQU0sRUFBQzs7Ozs7Ozs7Ozs7OztBQzNCdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpQztBQUVPO0FBQ3VCO0FBRS9ELElBQU0sTUFBTSxHQUFHLHNEQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsSUFBTSxVQUFVLEdBQUcsNERBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUNsRDtJQUNELElBQU0sV0FBVyxHQUFHLGlFQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QixJQUFNLEtBQUssR0FBRywyREFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNqQixPQUFPLEdBQUc7YUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFHLEtBQWlDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUM5RDtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRyxLQUE0QixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDN0U7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVZLHFFQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ1c7QUFFVTtBQUUzQyxJQUFNLE1BQU0sR0FBRyxtQkFBTyxDQUFDLHdCQUFTLENBQUMsQ0FBQztBQUNsQyxJQUFNLE1BQU0sR0FBRyxzREFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYTtJQUMxQyxJQUFNLEtBQUssR0FBSSxHQUFxQixDQUFDLEtBQUssQ0FBQztJQUMzQyxJQUFNLEtBQUssR0FBRyxtREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNsQztJQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztRQUNkLEtBQUs7S0FDTixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDMUMsSUFBTSxLQUFLLEdBQUksR0FBcUIsQ0FBQyxLQUFLLENBQUM7SUFDM0MsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsSUFBTSxLQUFLLEdBQUcsbURBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDbEM7SUFDRCxJQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUN2QixLQUFLLENBQUMsS0FBSyxDQUFDLGNBQUssRUFBRSxFQUFFLEtBQUssSUFBSyxJQUFJLENBQUUsQ0FBQztJQUN0QyxxREFBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDL0MsSUFBTSxLQUFLLEdBQUksR0FBcUIsQ0FBQyxLQUFLLENBQUM7SUFDM0MsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDM0IsSUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDekIsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsSUFBTSxLQUFLLEdBQUcsbURBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDbEM7SUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLHFEQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYTtJQUNoRCxJQUFNLEtBQUssR0FBSSxHQUFxQixDQUFDLEtBQUssQ0FBQztJQUMzQyxJQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUN6QixJQUFNLEtBQUssR0FBRyxtREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNsQztJQUNELE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCLHFEQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBRVkscUVBQU0sRUFBQzs7Ozs7Ozs7Ozs7OztBQ3BFdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpQztBQUVzQjtBQUNNO0FBQzdELElBQU0sTUFBTSxHQUFHLHNEQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEIsSUFBTSxVQUFVLEdBQUcsNERBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzFDLE9BQU87S0FDUjtJQUNELElBQU0sV0FBVyxHQUFHLGlFQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDakMsT0FBTztLQUNSO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QixJQUFJLDREQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN2QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBQzVDO1NBQU07UUFDTCx3REFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbkI7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVZLHFFQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUMvQnRCO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTSxTQUFTLEdBQUcsbUJBQU8sQ0FBQyx3Q0FBaUIsQ0FBQyxDQUFDO0FBSXRDLElBQU0sYUFBYSxHQUFHLFVBQUMsT0FBWTtJQUN4QyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDM0MsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDO0tBQzlCO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDO0FBRUssSUFBTSxZQUFZLEdBQUcsVUFBQyxVQUFrQjtJQUM3QyxpQkFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUFuRCxDQUFtRCxDQUFDO0FBRS9DLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxLQUFhO0lBQzlDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDOUIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sRUFBRSxLQUFLLFNBQUUsUUFBUSxZQUFFLENBQUM7QUFDN0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUMzQkYsd0M7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgQXV0aFJlc3BvbnNlIH0gZnJvbSBcIi4vYXV0aC9hdXRoXCI7XG5jb25zdCB1dWlkdjQgPSByZXF1aXJlKFwidXVpZC92NFwiKTtcblxubGV0IHVzZXJEYXRhOiBhbnkgPSB7fTtcbmxldCBzdG9yZTogYW55ID0ge307XG5cbmV4cG9ydCBjb25zdCBpc1VzZXJSZWdpc3RlcmVkID0gKGVtYWlsOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHVzZXJEYXRhLmhhc093blByb3BlcnR5KGVtYWlsKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlclVzZXIgPSAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBuZXdBY2Vzc1Rva2VuID0gdXVpZHY0KCk7XG4gIHVzZXJEYXRhW2VtYWlsXSA9IHtcbiAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgdG9rZW46IG5ld0FjZXNzVG9rZW4sXG4gIH07XG4gIHN0b3JlW25ld0FjZXNzVG9rZW5dID0ge307XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VG9rZW5Gb3JVc2VyID0gKFxuICBlbWFpbDogc3RyaW5nLFxuICBwYXNzd29yZDogc3RyaW5nXG4pOiBBdXRoUmVzcG9uc2UgPT4ge1xuICBpZiAoIWlzVXNlclJlZ2lzdGVyZWQoZW1haWwpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IFwiSW52YWxpZCBlbWFpbCEgUmVnaXN0ZXJlZD9cIixcbiAgICB9O1xuICB9IGVsc2UgaWYgKHVzZXJEYXRhW2VtYWlsXSAmJiB1c2VyRGF0YVtlbWFpbF0ucGFzc3dvcmQgPT09IHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICB0b2tlbjogdXNlckRhdGFbZW1haWxdLnRva2VuLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IFwiSW52YWxpZCBwYXNzd29yZCFcIixcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdG9rZW5FeGlzdHMgPSAodG9rZW46IHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RvcmUuaGFzT3duUHJvcGVydHkodG9rZW4pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERhdGEgPSAodG9rZW46IHN0cmluZykgPT4ge1xuICBpZiAoIXRva2VuRXhpc3RzKHRva2VuKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBzdG9yZVt0b2tlbl07XG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcmVEYXRhID0gKHRva2VuOiBzdHJpbmcsIGRhdGE6IGFueSkgPT4ge1xuICBzdG9yZVt0b2tlbl0gPSBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyREIgPSAoKSA9PiB7XG4gIHVzZXJEYXRhID0ge307XG4gIHN0b3JlID0ge307XG59O1xuIiwiaW1wb3J0IHsgYXV0aE1pZGRsZXdhcmUgfSBmcm9tIFwiLi9taWRkbGV3YXJlL2F1dGhcIjtcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5jb25zdCBjb3JzID0gcmVxdWlyZShcImNvcnNcIik7XG5pbXBvcnQgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcbmNvbnN0IGNvb2tpZVBhcnNlciA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpO1xuXG5pbXBvcnQgbG9naW5Sb3V0ZXIgZnJvbSBcIi4vcm91dGVzL2xvZ2luXCI7XG5pbXBvcnQgcmVnaXN0ZXJSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL3JlZ2lzdGVyXCI7XG5pbXBvcnQgZGF0YVJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvZGF0YVwiO1xuaW1wb3J0IG5vdGVzUm91dGVyIGZyb20gXCIuL3JvdXRlcy9ub3Rlc1wiO1xuaW1wb3J0IHsgY2xlYXJEQiB9IGZyb20gXCIuL2RiXCI7XG5cbi8vIENyZWF0ZSBhbiBleHByZXNzIGFwcFxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShoZWxtZXQoKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbih7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuXG4vLyBDT1JTXG5jb25zdCBjb3JzT3B0aW9ucyA9IHtcbiAgb3JpZ2luOiBcIipcIixcbiAgcHJlZmxpZ2h0Q29udGludWU6IGZhbHNlLFxuICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgbWV0aG9kczogW1wiT1BUSU9OU1wiLCBcIkdFVFwiLCBcIlBVVFwiLCBcIlBPU1RcIiwgXCJQQVRDSFwiLCBcIkRFTEVURVwiXSxcbiAgYWxsb3dlZEhlYWRlcnM6IFtcIkNvbnRlbnQtVHlwZVwiLCBcIkF1dGhvcml6YXRpb25cIl0sXG59O1xuYXBwLnVzZShjb3JzKGNvcnNPcHRpb25zKSk7XG5cbi8vcHVibGljIHJvdXRlc1xuYXBwLnVzZShcIi9yZWdpc3RlclwiLCByZWdpc3RlclJvdXRlcik7XG5hcHAudXNlKFwiL2xvZ2luXCIsIGxvZ2luUm91dGVyKTtcbmFwcC5kZWxldGUoXCIvZGJcIiwgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xuICBjbGVhckRCKCk7XG4gIHJlcy5zZW5kKCk7XG59KTtcblxuLy8gcHJvdGVjdGVkIHJvdXRlc1xuYXBwLnVzZShhdXRoTWlkZGxld2FyZSk7XG5hcHAudXNlKFwiL2RhdGFcIiwgZGF0YVJvdXRlcik7XG5hcHAudXNlKFwiL25vdGVzXCIsIG5vdGVzUm91dGVyKTtcblxuYXBwLnNldChcInBvcnRcIiwgcHJvY2Vzcy5lbnYuUE9SVCB8fCA5MDAwKTtcbi8vU3RhcnQgU2VydmVyXG5hcHAubGlzdGVuKGFwcC5nZXQoXCJwb3J0XCIpLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKFwiTm9kZSBhcHAgaXMgcnVubmluZyBvbiBwb3J0XCIsIGFwcC5nZXQoXCJwb3J0XCIpKTtcbn0pO1xuIiwiaW1wb3J0IHsgZXh0cmFjdFRva2VuLCBnZXRBdXRoSGVhZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyB0b2tlbkV4aXN0cyB9IGZyb20gXCIuLy4uL2RiXCI7XG5cbmV4cG9ydCBjb25zdCBhdXRoTWlkZGxld2FyZSA9IChyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IGFueSkgPT4ge1xuICBjb25zdCBhdXRoSGVhZGVyID0gZ2V0QXV0aEhlYWRlcihyZXEuaGVhZGVycyk7XG4gIGNvbnN0IHRva2VuID0gZXh0cmFjdFRva2VuKGF1dGhIZWFkZXIpO1xuICBpZiAoIXRva2VuKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJlcy5zZW5kKFwiSW52YWxpZCBUb2tlbiFcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRva2VuRXhpc3RzKHRva2VuKSkge1xuICAgIHJlcS50b2tlbiA9IHRva2VuO1xuICAgIHJldHVybiBuZXh0KCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpO1xuICAgIHJlcy5zZW5kKFwiTm90IGF1dGhvcml6ZWQhIFJlZ2lzdGVyZWQ/XCIpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBzdG9yZURhdGEsIGdldERhdGEgfSBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCB7IEN1c3RvbVJlcXVlc3QgfSBmcm9tIFwiLi4vbW9kZWwvQ3VzdG9tUmVxdWVzdFwiO1xuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KFwiL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc29sZS5sb2codG9rZW4pO1xuICBjb25zb2xlLmxvZyhyZXEuYm9keSk7XG4gIHN0b3JlRGF0YSh0b2tlbiwgcmVxLmJvZHkpO1xuICByZXMuc3RhdHVzKDIwMCk7XG4gIHJldHVybiByZXMuc2VuZCgpO1xufSk7XG5cbnJvdXRlci5nZXQoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICBjb25zb2xlLmxvZyh0b2tlbik7XG4gIGNvbnN0IGRhdGEgPSBnZXREYXRhKHRva2VuKTtcbiAgaWYgKCFkYXRhKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbiAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gIHJldHVybiByZXMuanNvbihkYXRhKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgZ2V0VG9rZW5Gb3JVc2VyIH0gZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBleHRyYWN0Q3JlZGVudGlhbHMsIGdldEF1dGhIZWFkZXIgfSBmcm9tIFwiLi8uLi91dGlsc1wiO1xuaW1wb3J0IHsgRmFpbGVkQXV0aFJlc3BvbnNlLCBTdWNjZXNzZnVsbEF1dGhSZXNwb25zZSB9IGZyb20gXCIuLi9hdXRoL2F1dGhcIjtcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zb2xlLmxvZyhcImxvZ2luXCIpO1xuICBjb25zdCBhdXRoSGVhZGVyID0gZ2V0QXV0aEhlYWRlcihyZXEuaGVhZGVycyk7XG4gIGNvbnNvbGUubG9nKGF1dGhIZWFkZXIpO1xuICBpZiAoIWF1dGhIZWFkZXIpIHtcbiAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiSW52YWxpZCBBdXRob3JpemF0aW9uIGhlYWRlciFcIik7XG4gIH1cbiAgY29uc3QgY3JlZGVudGlhbHMgPSBleHRyYWN0Q3JlZGVudGlhbHMoYXV0aEhlYWRlcik7XG4gIGNvbnNvbGUubG9nKGNyZWRlbnRpYWxzKTtcbiAgaWYgKCFjcmVkZW50aWFscykge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJJbnZhbGlkIEF1dGhvcml6YXRpb24gaGVhZGVyIVwiKTtcbiAgfVxuICBjb25zb2xlLmxvZyhjcmVkZW50aWFscyk7XG4gIGNvbnN0IGVudHJ5ID0gZ2V0VG9rZW5Gb3JVc2VyKGNyZWRlbnRpYWxzLmVtYWlsLCBjcmVkZW50aWFscy5wYXNzd29yZCk7XG4gIGlmIChlbnRyeS5zdWNjZXNzKSB7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7IHRva2VuOiAoZW50cnkgYXMgU3VjY2Vzc2Z1bGxBdXRoUmVzcG9uc2UpLnRva2VuIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IGVycm9yOiAoZW50cnkgYXMgRmFpbGVkQXV0aFJlc3BvbnNlKS5lcnJvciB9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBzdG9yZURhdGEsIGdldERhdGEgfSBmcm9tIFwiLi4vZGJcIjtcbmltcG9ydCB7IEN1c3RvbVJlcXVlc3QgfSBmcm9tIFwiLi4vbW9kZWwvQ3VzdG9tUmVxdWVzdFwiO1xuY29uc3QgdXVpZHY0ID0gcmVxdWlyZShcInV1aWQvdjRcIik7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLmdldChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICBjb25zdCB0b2tlbiA9IChyZXEgYXMgQ3VzdG9tUmVxdWVzdCkudG9rZW47XG4gIGNvbnN0IG5vdGVzID0gZ2V0RGF0YSh0b2tlbik7XG4gIGlmICghbm90ZXMpIHtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxuICByZXR1cm4gcmVzLmpzb24oe1xuICAgIG5vdGVzLFxuICB9KTtcbn0pO1xuXG5yb3V0ZXIucHV0KFwiL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc3Qgbm90ZSA9IHJlcS5ib2R5Lm5vdGU7XG4gIGlmICghbm90ZSkge1xuICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJCYWQgUmVxdWVzdCFcIik7XG4gIH1cbiAgY29uc3Qgbm90ZXMgPSBnZXREYXRhKHRva2VuKTtcbiAgaWYgKCFub3Rlcykge1xuICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICByZXR1cm4gcmVzLnNlbmQoXCJTZXJ2ZXIgZXJyb3IhXCIpO1xuICB9XG4gIGNvbnN0IG5ld0lkID0gdXVpZHY0KCk7XG4gIG5vdGVzW25ld0lkXSA9IHsgaWQ6IG5ld0lkLCAuLi5ub3RlIH07XG4gIHN0b3JlRGF0YSh0b2tlbiwgbm90ZXMpO1xuICByZXR1cm4gcmVzLmpzb24oeyBpZDogbmV3SWQgfSk7XG59KTtcblxucm91dGVyLnBhdGNoKFwiLzppZFwiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gKHJlcSBhcyBDdXN0b21SZXF1ZXN0KS50b2tlbjtcbiAgY29uc3Qgbm90ZSA9IHJlcS5ib2R5Lm5vdGU7XG4gIGNvbnN0IGlkID0gcmVxLnBhcmFtcy5pZDtcbiAgaWYgKCFub3RlKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIkJhZCBSZXF1ZXN0IVwiKTtcbiAgfVxuICBjb25zdCBub3RlcyA9IGdldERhdGEodG9rZW4pO1xuICBpZiAoIW5vdGVzKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApO1xuICAgIHJldHVybiByZXMuc2VuZChcIlNlcnZlciBlcnJvciFcIik7XG4gIH1cbiAgbm90ZXNbaWRdID0gbm90ZTtcbiAgc3RvcmVEYXRhKHRva2VuLCBub3Rlcyk7XG4gIHJldHVybiByZXMuc2VuZCgpO1xufSk7XG5cbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgdG9rZW4gPSAocmVxIGFzIEN1c3RvbVJlcXVlc3QpLnRva2VuO1xuICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XG4gIGNvbnN0IG5vdGVzID0gZ2V0RGF0YSh0b2tlbik7XG4gIGlmICghbm90ZXMpIHtcbiAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiU2VydmVyIGVycm9yIVwiKTtcbiAgfVxuICBkZWxldGUgbm90ZXNbaWRdO1xuICBzdG9yZURhdGEodG9rZW4sIG5vdGVzKTtcbiAgcmV0dXJuIHJlcy5zZW5kKCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGlzVXNlclJlZ2lzdGVyZWQsIHJlZ2lzdGVyVXNlciB9IGZyb20gXCIuLi9kYlwiO1xuaW1wb3J0IHsgZXh0cmFjdENyZWRlbnRpYWxzLCBnZXRBdXRoSGVhZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgY29uc29sZS5sb2coXCJyZWdpc3RlclwiKTtcbiAgY29uc3QgYXV0aEhlYWRlciA9IGdldEF1dGhIZWFkZXIocmVxLmhlYWRlcnMpO1xuICBpZiAoIWF1dGhIZWFkZXIpIHtcbiAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgcmVzLnNlbmQoXCJJbnZhbGlkIEF1dGhvcml6YXRpb24gaGVhZGVyIVwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY3JlZGVudGlhbHMgPSBleHRyYWN0Q3JlZGVudGlhbHMoYXV0aEhlYWRlcik7XG4gIGlmICghY3JlZGVudGlhbHMpIHtcbiAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgcmVzLnNlbmQoXCJJbnZhbGlkIENyZWRlbnRpYWxzIVwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc29sZS5sb2coY3JlZGVudGlhbHMpO1xuICBpZiAoaXNVc2VyUmVnaXN0ZXJlZChjcmVkZW50aWFscy5lbWFpbCkpIHtcbiAgICByZXMuc3RhdHVzKDQwMCk7XG4gICAgcmV0dXJuIHJlcy5zZW5kKFwiRW1haWwgaXMgYWxyZWFkeSB0YWtlbiFcIik7XG4gIH0gZWxzZSB7XG4gICAgcmVnaXN0ZXJVc2VyKGNyZWRlbnRpYWxzLmVtYWlsLCBjcmVkZW50aWFscy5wYXNzd29yZCk7XG4gICAgcmVzLnN0YXR1cygyMDApO1xuICAgIHJldHVybiByZXMuc2VuZCgpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiY29uc3QgdmFsaWRhdG9yID0gcmVxdWlyZShcImVtYWlsLXZhbGlkYXRvclwiKTtcblxuaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tIFwiLi9tb2RlbC9DcmVkZW50aWFsc1wiO1xuXG5leHBvcnQgY29uc3QgZ2V0QXV0aEhlYWRlciA9IChoZWFkZXJzOiBhbnkpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgaWYgKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoXCJhdXRob3JpemF0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGhlYWRlcnMuYXV0aG9yaXphdGlvbjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUb2tlbiA9IChhdXRoSGVhZGVyOiBzdHJpbmcpID0+XG4gIGF1dGhIZWFkZXIgPyBhdXRoSGVhZGVyLnJlcGxhY2UoXCJCZWFyZXIgXCIsIFwiXCIpIDogXCJcIjtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDcmVkZW50aWFscyA9ICh0b2tlbjogc3RyaW5nKTogQ3JlZGVudGlhbHMgfCBudWxsID0+IHtcbiAgdG9rZW4gPSB0b2tlbi5yZXBsYWNlKFwiQmFzaWMgXCIsIFwiXCIpO1xuICBjb25zdCBpdGVtcyA9IHRva2VuLnNwbGl0KFwiOlwiKTtcbiAgaWYgKGl0ZW1zLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGVtYWlsID0gaXRlbXNbMF07XG4gIGNvbnN0IHBhc3N3b3JkID0gaXRlbXNbMV07XG4gIGlmICghdmFsaWRhdG9yLnZhbGlkYXRlKGVtYWlsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7IGVtYWlsLCBwYXNzd29yZCB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbWFpbC12YWxpZGF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZC92NFwiKTsiXSwic291cmNlUm9vdCI6IiJ9