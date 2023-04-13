const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const db = require("./app/models");
const ApiError = require("./helpers/ApiError");
// const connectDB = require("./db/databasepg");
const sequelize = require('./utils/database');
const allowCors = require("./middlerware/allowCors");

const UserRole = require("./models/user-role");
const Role = require("./models/role");
const User = require("./models/user");
const Breed = require('./models/breed')
const Dog = require('./models/dog')
const app = express();
// MiddleWare

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(express.json());
app.use(cors());
app.use(allowCors)
// connectDB;

// User.hasMany(UserRole)
// Role.hasMany(UserRole)
User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

Breed.hasMany(Dog)

User.hasMany(Dog)
Dog.belongsTo(User)


// User.hasMany(UserDogs)
// Dog.hasMany(UserDogs)

// Dog.hasOne(Breed)  
// User.belongsToMany(Role, {through: UserRole})
// Role.belongsToMany(User, {through: UserRole})
// UserRole.belongsTo(User);
// UserRole.belongsTo(Role);
// User.hasMany(UserRole);
// Role.hasMany(UserRole);

// User.hasMany(Role)
// User.belongsToMany(Role, {through: UserRole})
// Role.belongsToMany(User, {through: UserRole})
// routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

app.use(authRoutes)
app.use(userRoutes)

// app.use()
// require("./routes/auth.routes")(app);
// require("./routes/user.routes")(app);

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

// {force: true}
// sequelize.sync({force: true}).then(result => {
sequelize.sync().then(result => {
  console.log('SYNCED')
  console.log(result)
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
}).catch(err => console.log(err)) 
