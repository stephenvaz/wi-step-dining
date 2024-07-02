import db from "../database/db.js";

class AuthModel {
    constructor () {}

    async register (username, password, email) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO Users (username, password, email) VALUES (?, ?, ?)`;
            db.query(
                query,
                [username, password, email],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }

    async userByUsername (email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Users WHERE username = ?`;
            db.query(
                query,
                [email],
                (err, result) => {
                    if (err) {
                        reject(err);
                    };
                    if (result.length > 0) {
                        resolve(result[0]);
                    }
                    resolve(null);
                }
            );
        });
    }
}

export default AuthModel;