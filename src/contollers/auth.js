import AuthModel from "../models/auth.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const authModel = new AuthModel();

class AuthController {
    constructor () {}

    login = async (req, res) => {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({message: "Please fill all fields"});
        }
        try {
            const user = await authModel.userByUsername(username);
            if (!user) {
                return res.status(404).json({
                    status_code: 404,
                    message: "User not found"});
            }

            const hashedPassword = user.password;
            const isValid = await bcrypt.compare(password, hashedPassword);

            if (!isValid) {
                return res.status(401).json({
                    message: "Incorrect username/password provided. Please retry",
                    status_code: 401
                });
            }

            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '7d'});
            return res.status(200).json({
                "status": "Login successful",
                "status_code": 200,
                "user_id": user.id,
                "access_token": token
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error logging in",
                error: error.message ?? "Error",
                status_code: 500
            });
        }
    }

    register = async (req, res) => {
        const {username, password, email} = req.body;
        try {
            if (!username || !password || !email) {
                return res.status(400).json({message: "Please fill all fields"});
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const data = await authModel.register(username, hashedPassword, email)
            return res.status(201).json({
                "status": "Account successfully created",
                "status_code": 200,
                "user_id": data.insertId
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error creating user",
                error: err.message ?? "Error"
            });
        }

    }
}

export default AuthController;