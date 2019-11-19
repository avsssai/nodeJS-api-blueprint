var express = require("express"),
  mongoose = require("mongoose"),
  dotenv = require("dotenv");

dotenv.config();
//import the routes.
var authRoutes = require("./routes/authRoutes");
var blogRoutes = require('./routes/blogRoutes');

//connect to the database.
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  .then(() => {
    console.log("connected to the database.");
  })
  .catch(err => console.log(err));

var app = express();

app.use(express.json());

app.use("/api", authRoutes);
app.use('/api/blogs',blogRoutes);

app.listen(4000, () => {
  console.log("Listening on port 4000.");
});
