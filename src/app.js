

// asynchronous environment == it allow tasks to executed continue without waiting other tasks to complete
// Importing necessary modules
const mongoose = require("mongoose"); //it is mongodb object model used to work on asynchronous enviroment
const express = require("express"); // it is web application framework for node js used to build web application and apis
const path = require("path"); // used  work on  file and directory paths


//It connects to a MongoDB database named "newfolder" on the localhost(127.0.0.1) at port 27017.
mongoose.connect("mongodb://127.0.0.1:27017/newfolder") // this method return promish like connection successful it return connection successsful anther wise error
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });

// Creating an Express application
const app = express();
const port = 4000; // set the port num 4000

// Configuring static files path
const static_path = path.join(__dirname, "../");
app.use(express.static(static_path));

// create schema for "FD" in mongodb database
const fdSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String,
}); //A schema is a structure that defines the organization, format of  data

// Creating a model FD based on  schema
const FD = mongoose.model("FD", fdSchema);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// define routs to hand post request ("/")
app.post("/", async (req, res) => {
  try {
    //   if request received then Creating a new FD document with data from request body
    const fdMember = new FD({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    });

    // Save the document in database and send successfully atherwise error
    await fdMember.save();
    res.send("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data to the database:", error.message);
    res.status(500).send("Error saving data to the database");
  }
});

// show the result on the browers
app.get("/", (req, res) => {
  res.send("Hello from the chegg");
});

// Starting the Express server on port 40000
app.listen(port, () => {
  console.log(`Server is running at port${port}`);
});



// test> use newfolder
// switched to db newfolder
// newfolder> show collections
// gms
// users
// newfolder> db.gms.find()
// [
//   {
//     _id: ObjectId("654f5c10905a9f70b2fb7bc7"),
//     name: 'Vishal Kumar',
//     age: 33,
//     gender: 'male',
//     locality: 'indian',
//     __v: 0
//   }
// ]