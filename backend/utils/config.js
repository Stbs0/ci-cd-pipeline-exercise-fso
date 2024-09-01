require("dotenv").config();
let PORT = process.env.PORT;

const MONGODB_URI = process.env.NODE_ENV === 'production'  ? process.env.MONGODB_URI : process.env.TEST_MONGODB_URI;
console.log(process.env.MONGODB_URI)
console.log(process.env.NODE_ENV)
module.exports = {
  MONGODB_URI,
  PORT,
};
