import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import BookModel from "./Models/Book.js"; // Note the .js extension
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import UserModel from "./Models/User.js";

const app = express();
app.use(cors({
    origin: ["http://localhost:5175"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json("Success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email}).then(user => {
        if(user) {
           bcrypt.compare(password, user.password, (err, response) => {
            if(response) {
             const token = jwt.sign({email: user.email, role: user.role}, "jwt-secret-key", {expiresIn: '1d'})
             res.cookie('token', token)
             return res.json("Success")

            } else {
                return res.json("The password was incorrect")
            }
           })
        } else {
           return res.json("No record found here")
        }
    })
})


app.get("/", (req, res) => {
  BookModel.find()
    .then((books) => res.json(books))
    .catch((err) => res.json(err));
});

app.post("/create", (req, res) => {
  BookModel.create(req.body)
    .then((book) => res.json(book))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  BookModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      review: req.body.review,
      rating: req.body.rating,
    }
  )
    .then((book) => res.json(book))
    .catch((err) => res.json(err));
});

app.delete("/deletebook/:id", (req, res) => {
  const id = req.params.id;
  BookModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
