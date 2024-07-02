import db from "../database/db.js";

class DiningModel {
    constructor () {}

    async create (name, address, phone_no, website, open_time, close_time) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO Restaurants (name, address, phone_no, website, open_time, close_time) VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(
                query,
                [name, address, phone_no, website, open_time, close_time],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }
    async addBookings (restaurant_id, bookings) {
        return new Promise((resolve, reject) => {
            // const query = `
            //     INSERT INTO Slots (restaurant_id, start_time, end_time) 
            //     VALUES (?)
            // `;
            const data = bookings.map(booking => [
                restaurant_id,
                `'${booking.start_time.slice(0, 19).replace('T', ' ')}'`,
                `'${booking.end_time.slice(0, 19).replace('T', ' ')}'`,
            ])
            let query = `INSERT INTO Slots (restaurant_id, start_time, end_time) VALUES `;
            for (let i = 0; i < bookings.length; i++) {
                query += `(${data[i][0]}, ${data[i][1].toString()}, ${data[i][2].toString()})${i === bookings.length - 1 ? ';' : ','}`;
            }
           
            // console.log(query);
            db.query(
                query,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }

    async searchByName (name) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    r.id AS place_id,
                    r.name, r.address, r.phone_no, r.website, r.open_time, r.close_time,
                    s.start_time, s.end_time
                FROM 
                Restaurants as r
                JOIN Slots as s
                ON r.id = s.restaurant_id
                WHERE r.name LIKE '%${name}%'; 
            `;
            db.query(
                query,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }
}

export default DiningModel;