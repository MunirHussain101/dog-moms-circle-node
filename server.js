const express = require("express");
require("dotenv").config();
const cors = require("cors");
const multer = require('multer')
const path = require('path')

const ApiError = require("./helpers/ApiError");
const sequelize = require('./utils/database');
const allowCors = require("./middlerware/allowCors");

// models
const UserRole = require("./models/user-role");
const Role = require("./models/role");
const User = require("./models/user");
const Breed = require('./models/breed')
const Dog = require('./models/dog')
const Hosting = require("./models/hosting");

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(' ').join('')
    cb(null, new Date().getTime() + '-' + filename);
  }
})
const fileFilter = (req, file, cb) => {
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    return cb(null, false)
  }
}

app.use(express.json());
app.use(cors());
app.use(allowCors)

// app.use(multer({storage: fileStorage, fileFilter}).single('image'))
// const upload = multer({ storage: fileStorage, fileFilter })
// const multipleUpload = upload.fields([{ name: 'user_profile', maxCount: 1}, {name: 'dog_profile', maxCount: 1}])

// multer({ storage: fileStorage, fileFilter }).array('image', 2)
// app.use(multipleUpload)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
// connectDB;

// User.hasMany(UserRole)
// Role.hasMany(UserRole)



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
  console.log('api hit')
  res.status(200).json({dd: "Hello World"});
});

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message: err.message,
      status: err.status,
      error: true,
      data: null,
    });
});
User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

Breed.hasMany(Dog)

User.hasMany(Dog)
Dog.belongsTo(User)

Hosting.belongsTo(User, {as: 'hostedUser', foreignKey: 'hosted_user_id'})
Hosting.belongsTo(User, {as: 'hostingUser', foreignKey: 'host_user_id'})

// sequelize.sync({force: true}).then(result => {
sequelize.sync().then(result => {
  console.log('SYNCED')
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
}).catch(err => console.log(err)) 
