var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/utils.ts
var validator = require("email-validator");
var getAuthHeader = (headers) => {
  if (headers.hasOwnProperty("authorization")) {
    return headers.authorization;
  } else {
    return null;
  }
};
var extractToken = (authHeader) => authHeader ? authHeader.replace("Bearer ", "") : "";
var extractCredentials = (token) => {
  token = token.replace("Basic ", "");
  const items = token.split(":");
  if (items.length !== 2) {
    return null;
  }
  const email = items[0];
  const password = items[1];
  if (!validator.validate(email)) {
    return null;
  }
  return { email, password };
};

// src/db/kv.ts
var import_uuidv4 = require("uuidv4");
var import_kv = require("@vercel/kv");
var TTL = 12 * 60 * 60;
var redisOptions = {
  ex: TTL
};
var redisOptionsNoOverwrite = {
  ex: TTL,
  nx: true
};
var registerUser = (email, password) => {
  const newAcessToken = (0, import_uuidv4.uuid)();
  return Promise.all([
    storeData(
      email,
      {
        password,
        token: newAcessToken
      },
      { overwrite: false }
    ),
    storeData(newAcessToken, {}, { overwrite: false })
  ]).then(() => Promise.resolve());
};
var getTokenForUser = (email, password) => getData(email).then((data) => {
  if (!data) {
    return {
      success: false,
      error: "Invalid email! Registered?"
    };
  } else if (data.password === password) {
    return {
      success: true,
      token: data.token
    };
  } else {
    return {
      success: false,
      error: "Invalid password!"
    };
  }
});
var tokenExists = (token) => getData(token).then((data) => !!data);
var isUserRegistered = (email) => getData(email).then((data) => !!data);
var getData = (token) => {
  console.log("# getData");
  return new Promise((resolve) => {
    try {
      import_kv.kv.get(token).then((data) => {
        console.log(data);
        if (!data) {
          resolve(null);
        }
        resolve(data);
      });
    } catch (err) {
      console.error(err);
      resolve(null);
    }
  });
};
var storeData = (key, data, options = {
  overwrite: true
}) => {
  console.log("# storeData");
  console.log(data);
  return import_kv.kv.set(
    key,
    JSON.stringify(data),
    options.overwrite ? redisOptions : redisOptionsNoOverwrite
  ).then((res) => {
    console.log(res);
    return Promise.resolve();
  });
};
var kvDb = {
  registerUser,
  getTokenForUser,
  tokenExists,
  isUserRegistered,
  getData,
  storeData
};

// src/db/db.ts
var import_uuidv42 = require("uuidv4");
var userData = {};
var store = {};
var registerUser2 = (email, password) => {
  const newAcessToken = (0, import_uuidv42.uuid)();
  userData[email] = {
    password,
    token: newAcessToken
  };
  store[newAcessToken] = {};
  return Promise.resolve();
};
var getTokenForUser2 = (email, password) => {
  return new Promise((resolve) => {
    if (!isUserRegistered2(email)) {
      resolve({
        success: false,
        error: "Invalid email! Registered?"
      });
    } else if (userData[email] && userData[email].password === password) {
      resolve({
        success: true,
        token: userData[email].token
      });
    } else {
      resolve({
        success: false,
        error: "Invalid password!"
      });
    }
  });
};
var tokenExists2 = (token) => {
  return Promise.resolve(!!store[token]);
};
var getData2 = (token) => {
  return new Promise((resolve) => {
    if (!tokenExists2(token)) {
      resolve(null);
    }
    return resolve(store[token]);
  });
};
var storeData2 = (token, data) => {
  store[token] = data;
  return Promise.resolve();
};
var isUserRegistered2 = (email) => {
  return Promise.resolve(!!userData[email]);
};
var mockDb = {
  registerUser: registerUser2,
  getTokenForUser: getTokenForUser2,
  isUserRegistered: isUserRegistered2,
  tokenExists: tokenExists2,
  getData: getData2,
  storeData: storeData2
};

// src/db/index.ts
var production = process.env.NODE_ENV === "production";
var db = production ? kvDb : mockDb;
var db_default = db;

// src/middleware/auth.ts
var authMiddleware = async (req, res, next) => {
  const authHeader = getAuthHeader(req.headers);
  const token = extractToken(authHeader);
  if (!token) {
    res.status(400);
    res.send("Invalid Token!");
    return;
  }
  try {
    const tokenExists3 = await db_default.tokenExists(token);
    if (tokenExists3) {
      req.token = token;
      return next();
    } else {
      res.status(401);
      res.send("Not authorized! Registered?");
      return;
    }
  } catch (e) {
    res.status(500);
    res.send("Internal Server Error!");
    return;
  }
};

// src/main.ts
var import_express5 = __toESM(require("express"));
var import_body_parser = __toESM(require("body-parser"));
var import_cors = __toESM(require("cors"));
var import_helmet = __toESM(require("helmet"));
var import_cookie_parser = __toESM(require("cookie-parser"));

// src/routes/login.ts
var import_express = require("express");
var router = (0, import_express.Router)();
router.post("/", async (req, res) => {
  try {
    const authHeader = getAuthHeader(req.headers);
    if (!authHeader) {
      res.status(400);
      return res.send("Invalid Authorization header!");
    }
    const credentials = extractCredentials(authHeader);
    if (!credentials) {
      res.status(400);
      return res.send("Invalid Authorization header!");
    }
    const entry = await db_default.getTokenForUser(
      credentials.email,
      credentials.password
    );
    if (entry.success) {
      return res.status(200).json({ token: entry.token });
    } else {
      return res.status(401).send({ error: entry.error });
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});
var login_default = router;

// src/routes/register.ts
var import_express2 = require("express");
var router2 = (0, import_express2.Router)();
router2.post("/", async (req, res) => {
  try {
    const authHeader = getAuthHeader(req.headers);
    if (!authHeader) {
      res.status(400);
      res.send("Invalid Authorization header!");
      return;
    }
    const credentials = extractCredentials(authHeader);
    if (!credentials) {
      res.status(400);
      res.send("Invalid Credentials!");
      return;
    }
    const userExists = await db_default.isUserRegistered(credentials.email);
    if (userExists) {
      res.status(400);
      return res.send("Email is already taken!");
    } else {
      await db_default.registerUser(credentials.email, credentials.password);
      res.status(200);
      return res.send();
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});
var register_default = router2;

// src/routes/data.ts
var import_express3 = require("express");
var router3 = (0, import_express3.Router)();
router3.post("/", (req, res) => {
  const token = req.token;
  console.log(token);
  console.log(req.body);
  db_default.storeData(token, req.body).then(() => {
    res.status(200);
    return res.send();
  }).catch((err) => {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  });
});
router3.get("/", (req, res) => {
  const token = req.token;
  db_default.getData(token).then((data) => {
    if (!data) {
      res.status(500);
      return res.send("Server error!");
    }
    return res.json(data);
  }).catch((err) => {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  });
});
var data_default = router3;

// src/routes/notes.ts
var import_express4 = require("express");
var import_uuidv43 = require("uuidv4");
var router4 = (0, import_express4.Router)();
router4.get("/", async (req, res) => {
  try {
    const token = req.token;
    const notes = await db_default.getData(token);
    if (!notes) {
      res.status(500);
      return res.send("Server error!");
    }
    return res.json({
      notes
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});
router4.put("/", async (req, res) => {
  try {
    const token = req.token;
    const note = req.body.note;
    if (!note) {
      res.status(400);
      return res.send("Bad Request!");
    }
    const notes = await db_default.getData(token);
    if (!notes) {
      res.status(500);
      return res.send("Server error!");
    }
    const newId = (0, import_uuidv43.uuid)();
    notes[newId] = { id: newId, ...note };
    await db_default.storeData(token, notes);
    return res.json({ id: newId });
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});
router4.patch("/:id", async (req, res) => {
  try {
    const token = req.token;
    const note = req.body.note;
    const id = req.params.id;
    if (!note) {
      res.status(400);
      return res.send("Bad Request!");
    }
    const notes = await db_default.getData(token);
    if (!notes) {
      res.status(500);
      return res.send("Server error!");
    }
    notes[id] = note;
    await db_default.storeData(token, notes);
    return res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});
router4.delete("/:id", async (req, res) => {
  try {
    const token = req.token;
    const id = req.params.id;
    const notes = await db_default.getData(token);
    if (!notes) {
      res.status(500);
      return res.send("Server error!");
    }
    delete notes[id];
    await db_default.storeData(token, notes);
    return res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});
var notes_default = router4;

// src/main.ts
var app = (0, import_express5.default)();
app.use((0, import_helmet.default)());
app.use(import_body_parser.default.json());
app.use((0, import_cookie_parser.default)());
var corsOptions = {
  origin: "*",
  preflightContinue: false,
  credentials: true,
  methods: ["OPTIONS", "GET", "PUT", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use((0, import_cors.default)(corsOptions));
app.use("/register", register_default);
app.use("/login", login_default);
app.use(authMiddleware);
app.use("/data", data_default);
app.use("/notes", notes_default);
app.set("port", process.env.PORT || 9e3);
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
