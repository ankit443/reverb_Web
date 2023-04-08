import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


//working on registration of a user
export const register = async (req, res) => {
    try {
        const { //from the front end we have to send an object that has these parameters or arguments 
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);


        const newUser = newUser({

            //we will encrypt the password, we will save it and after we save it, when the user tries to login, we will provide or they will provide the password or a JSON web token
            firstName, 
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

                //201 is the status code here - it means that something has been created. after that to verify if it's the correct status, we'll give the version of JSON so that the front end can recieve the response

        //as a front end engineer, we have to make sure that our team is getting the correct responses


    } catch (err) {

        //500 is the status code for the meaning when something goes wrong
        res.status(500).json({ error: err.message});
        

    }
};


//logging In

export const login = async (req, res) => {
    try{

        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) return res.status(400).json({ msg: "User does not exist. "});
        
        //this will match the credentials
        const isMatch = await bcrypt.comapare(password, user.password);
        
        //working on a few exception handling parts
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user});
        


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

