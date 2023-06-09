const express = require("express");
require("dotenv").config();
const cors = require("cors");
const multer = require('multer')
const path = require('path')

const ApiError = require("./helpers/ApiError");
const sequelize = require('./utils/database');
const allowCors = require("./middlerware/allowCors");
const {setCurrentUser} = require('./middlerware/current-user')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(allowCors)
app.use(multer().none())
app.use(setCurrentUser);


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
const postRoutes = require('./routes/post.routes');
const reviewRoutes = require('./routes/review.routes')
const boardingRoutes = require('./routes/boarding.routes')
app.use(authRoutes)
app.use(userRoutes)
app.use(postRoutes)
app.use(reviewRoutes)
app.use(boardingRoutes)

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
// models
const UserRole = require("./models/user-role");
const Role = require("./models/role");
const User = require("./models/user");
const Breed = require('./models/breed')
const Dog = require('./models/dog')
const Hosting = require("./models/hosting");
const Review = require("./models/review");
const Post = require('./models/post');
const Point = require("./models/point");
const ReviewComments = require("./models/review-comment");

User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

Breed.hasMany(Dog)

User.hasMany(Dog)
Dog.belongsTo(User)

Hosting.belongsTo(User, {as: 'hostedUser', foreignKey: 'hosted_user_id'})
Hosting.belongsTo(User, {as: 'hostingUser', foreignKey: 'host_user_id'})
User.hasMany(Hosting)


Review.belongsTo(User, {as: 'reviewUser', foreignKey: 'source_id'})
Review.belongsTo(User, {as: 'reviewedUser', foreignKey: 'target_id'})
User.hasMany(Review, {as: 'reviews', foreignKey: 'target_id'})

// User.hasOne(Point)
// Point.belongsTo(User)

User.hasMany(Post)
Post.belongsTo(User)
User.hasOne(Point)
Point.belongsTo(User)

// Post.hasMany(Review)
// Post.belongsTo(User)
// Post.hasOne(User)

Review.hasMany(ReviewComments, {foreignKey: 'review_id'})
ReviewComments.belongsTo(Review, {as: 'comments', foreignKey: 'review_id', targetKey: 'id'}) //
User.hasMany(ReviewComments, {foreignKey: 'user_id'})
ReviewComments.belongsTo(User, {as: 'review_comments', foreignKey: 'user_id', targetKey: 'id' })

// sequelize.sync({force: true}).then(result => {
sequelize.sync(). then(result => {
  console.log('SYNCED')
  app.listen(8080, () => {
    console.log(`Server is running at`);
  });
}).catch(err => console.log(err)) 
