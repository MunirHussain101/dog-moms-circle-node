const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./app/models");
const ApiError = require("./helpers/ApiError");
// const connectDB = require("./db/databasepg");

const app = express();

const Role = db.role;

db.sequelize.sync();
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });

//     Role.create({
//       id: 2,
//       name: "moderator"
//     });

//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }

// MiddleWare

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(express.json());
app.use(cors());

// connectDB;

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res
      .status(err.status)
      .json({
        message: err.message,
        status: err.status,
        error: true,
        data: null,
      });
  } else {
    res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
        error: true,
        data: null
    })
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
