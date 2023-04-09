import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";





//configurations 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


//setting Up File Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);

    }
});

const upload = multer({ storage });

//working on the Authorization part, Routes with files
app.post("/auth/register", upload.single("picture"), register); //we could have used the verifyToken here but since users are just registering the accounts here, they don't need to have verified emails or IDs
app.post("/posts", verifyToken, upload.single("picture"), createPost); //createPost is going to be a controller that we will setup



//routes
app.use("/auth", authRoutes); //this will help us set up Routes
app.use("/users", userRoutes);
//handling the final set of Routes - Posts
app.use("/posts", postRoutes);






//setting Up Mongoose
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));


    //the commented out part below will update MongoDB with the fake data in the database

    //add this data only one time
    User.insertMany(users);
    Post.insertMany(posts);


}).catch((error) => console.log(`${error} did not connect`))