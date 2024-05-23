const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModels");

module.exports = {
    signup: async (req, res) => {
        try {
            console.log(req.body)
            const { email, fullname, password } = req.body;
            const userExists = await User.findOne({ email })
            if (userExists) {
                return res.render("signup", { error: "Email already exists!" })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                fullname,
                password: hashedPassword
            });

            const savedUser = await newUser.save();
            const token = jwt.sign({ userId: savedUser._id }, 'mySuperSecret', { expiresIn: '24h' });
            res.cookie('token', token, { httpOnly: true });
             res.redirect("/")
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error!");
        }
    },


    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            console.log(req.body)
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).render("login", { error: "Invalid email or password" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).render("login", { error: "Invalid email or password" });
            }
            const token = jwt.sign({ userId: user._id }, 'mySuperSecret', { expiresIn: '24h' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect("/");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error!");
        }
    },
    logout : async (req, res) => {
        res.clearCookie('token');
        res.redirect('/');
    }
};
