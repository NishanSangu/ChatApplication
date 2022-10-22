const User = require("../models/userModels")
const brcypt = require("bcrypt")


const userfunctions = {
    signup: async function(req, res, next)  {
        try {
            // console.log(req.body);
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.json({msg:"Username already used", status: flase})
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "Email already used", ststus: false })
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            email: email, username :username, password:hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user, msg: "User account created Successfully" });
        } catch (ex) {
            next(ex);
        }
    },
    login: async function (req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username })
            if (!user) {
                return res.json({msg:"Incorrect Username or Password!", status: false})
            }
            const isPasswordValid = await brcypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.json({ msg: "Incorrect Password!", status: false });
            }
            delete user.password;
            console.log(user);
            return res.json({ msg: "Successfully logedin!", status: true, user:user });
        } catch(ex) {
            next(ex);
        }
    },
    setAvatar: async function (req, res, next) {
        try {
            const userId = req.params.id;
            const avatarImage = req.body.image;
            const userData = await User.findByIdAndUpdate(userId, {
                isAvatarImageSet: true,
                avatarImage:avatarImage,
            });
            return res.json({isSet:userData.isAvatarImageSet, image:userData.avatarImage})
        } catch(err) {
            next(err)
    }
    }

}

module.exports = userfunctions