import { users } from "../data/users.js";
import 'dotenv/config';
import jwt from "jsonwebtoken";

export class AuthService {

    constructor() {
        this.users = users;
    }

    login(username, password) {
        const user = this.users.find(
            user => user.username === username &&
                user.password === password
        );
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        return jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
    }
}