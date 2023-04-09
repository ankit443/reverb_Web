import User from "../models/User.js";

//reading from Here
export const getUser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}


export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); //because we may use multiple API calls for the database

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );
        res.status(200).json(formattedFriends);
    }

    catch (err) {
        res.status(404).json({ message: err.message });

    }
};

//updating 
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id); //taking the current User
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }

        else {
            user.friends.push(friendId);
            friend.friends.push(id);

        }

        await user.save();
        await friend.save(); //updating both our lists and set them formatted

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); //because we may use multiple API calls for the database

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );

        res.status(200).json(formattedFriends);

    }

    catch {
        res.status(404).json({ message: err.message })
    }
}
