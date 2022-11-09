const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const session = require("express-session");
const MemoryStore = require("memorystore")(session);

router.get("/", async (req, res) => {
  const member = await mysql.query("memberList");
  console.log(member);
  res.send(member);
});

router.post("/signup", async (req, res) => {
  const user_id = await mysql.query("idList", req.body.id);

  console.log(user_id);
  if (user_id.length > 0) {
    res.json({
      code: "200",
      message: "success!",
      data: user_id,
    });
  } else {
    res.json({
      code: "400",
      message: "false!",
      data: user_id,
    });
  }
});
let hashedPw;
router.post("/insert", async (req, res) => {
  const salt = crypto.randomBytes(64).toString("base64");
  hashedPw = crypto
    .pbkdf2Sync(req.body.param.password, salt, 100000, 64, "sha512")
    .toString("base64");
  console.log(`salt : ${salt} , hashedPW1: ${hashedPw}`);

  const result = await mysql.query("memberInsert", {
    id: req.body.param.id,
    password: hashedPw,
    salt: salt,
  });

  res.json({
    code: "200",
    message: "success!",
    data: result,
  });
});

router.post("/login", async (req, res) => {
  const result = await mysql.query("memberList", req.body.param.id);
  const key =
    result[0] &&
    crypto
      .pbkdf2Sync(req.body.param.password, result[0].salt, 100000, 64, "sha512")
      .toString("base64");

  const token =
    result[0] &&
    jwt.sign({ id: req.body.param.id }, "secret_key", {
      expiresIn: "2m",
      issuer: "uddi",
    });

  console.log(token);
  console.log(result[0]);
  if (key && key === result[0].password) {
    res.json({
      code: "200",
      message: "success!",
      data: token,
    });
  } else if (result[0] == undefined) {
    res.json({
      code: "400",
      message: "존재하지 않는 id",
      data: result,
    });
  } else {
    res.json({
      code: "400",
      message: "password error",
      data: result,
    });
  }
});

router.post("/checkToken", async (req, res) => {
  console.log(req.body);
  let TF;
  let id;
  jwt.verify(req.body.token, "secret_key", (err, res) => {
    if (err) {
      console.log(err);
      TF = true;
    } else {
      console.log(res);
      TF = false;
      id = res.id;
    }
  });
  TF
    ? res.json({
        code: "400",
        message: "false!",
        data: "error",
      })
    : res.json({
        code: "200",
        message: "success!",
        data: id,
      });
});

router.post("/logout", async (req, res) => {
  console.log(req.body);
});

router.put("/update", async (req, res) => {
  const result = await mysql.query("memberUpdate", req.body.param);
  res.send(result);
});

router.delete("/delete", async (req, res) => {
  const result = await mysql.query("memberDelete", req.body.params.id);
  res.send(result);
});

module.exports = router;
