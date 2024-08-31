const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const assert = require("node:assert");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  const user = {
    username: "stbs",
    name: "mohammed",
    password: "1234",
  };

  await User.deleteMany({});

  const saltRound = 10;
  user.passwordHash = await bcrypt.hash(user.password, saltRound);
  delete user.password;
  const newUser = new User(user);
  await newUser.save();
});

test("valid login", async () => {
  await api
    .post("/api/login")
    .send({ username: "stbs", password: "1234" })
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("invalid login", async () => {
  await api
    .post("/api/login")
    .send({ username: "stbs", password: "1252534" })
    .expect(401)
    .expect("Content-Type", /application\/json/);
});
after(async () => {
  await mongoose.connection.close();
});
