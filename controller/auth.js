const { db } = require("../models");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        const existUser = await db.Users.findOne({ where: { email } });
        if (existUser) {
            return next(Object.assign(new Error("User already exist!"), { status: 400 }));
        }

        const hashedPass = await bcrypt.hash(password, 10);
        
        if(!hashedPass) {
            return next(Object.assign(new Error("Password not hashed!"), { status: 400 }));
        }
        const createdUser = await db.Users.create({ name, email, phone, password: hashedPass });

        if(!createdUser) {
            return next(Object.assign(new Error("User not created!"), { status: 400 }));
        }

        return res.status(200).json({
            success: true,
            message: "User created successfully!",
            user: createdUser
        });

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existUser = await db.Users.findOne({ where: { email } });
        if (!existUser) {
            return next(Object.assign(new Error("User not found!"), { status: 400 }));
        }

        const isPasswordValid = await bcrypt.compare(password, existUser?.password);
        if(!isPasswordValid) {
            return next(Object.assign(new Error("Password is incorrect!"), { status: 400 }));
        }

        const token = JWT.sign({ userId: existUser.id, user_name: existUser.name }, process.env.SECRET, { expiresIn: "24h" });
        if(!token) {
            return next(Object.assign(new Error("Token not created!"), { status: 400 }));
        }

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            user: existUser,
            token
        });

    } catch (error) {
        next(error);
    }
};