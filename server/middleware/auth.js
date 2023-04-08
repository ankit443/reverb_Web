import jwt from 'jsonwebtoken';
export const verifyToken = async(req, res, next) => {
    try{

        let token = req.header("Authorization"); //from the req from the front-end, we are taking the Autohrization header and that's where the token will be set, and then we can take it from the back end

        if (!token){
            return res.status(403).send("Access Denied");

        }

        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft()

        }


        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); //for the middleware, this is one of the important parts which lets us proceed from one function to the next one

    }

    catch (err) {
        res.status(500).json({ error: err.message})
    }
}