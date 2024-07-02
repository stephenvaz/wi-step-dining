import DiningModel from "../models/dining.js";

const diningModel = new DiningModel();

class DiningController {
    constructor() { }

    create = async (req, res) => {
        try {
            const { name, address, phone_no, website, operational_hours } = req.body;
            if (!name || !address || !phone_no || !website || !operational_hours) {
                return res.status(400).json({ message: "Please fill all fields" });
            }
            const { open_time, close_time } = operational_hours;
            if (!open_time || !close_time) {
                return res.status(400).json({ message: "Please provide operational hours" });
            }

            const data = await diningModel.create(name, address, phone_no, website, open_time, close_time);

            const restaurant_id = data.insertId;
            // create bookings
            const { booked_slots } = req.body;
            if (booked_slots.length != 0) {
                const bookings = await diningModel.addBookings(restaurant_id, booked_slots)
            }

            return res.status(201).json({
                "status": `${name} added successfully`,
                "status_code": 201,
                "place_id": restaurant_id
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error creating dining place",
                error: error.message ?? "Error",
                status_code: 500
            });
        }
    }

    seachByName = async (req, res) => {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: "Please provide a search query" });
        }
        try {
            const data = await diningModel.searchByName(name);

            let results = [];
            let places = {};
            data.forEach(row => {
                if (!places[row.place_id]) {
                    places[row.place_id] = {
                        place_id: row.place_id,
                        name: row.name,
                        address: row.address,
                        phone_no: row.phone_no,
                        website: row.website,
                        operational_hours: {
                            open_time: row.open_time,
                            close_time: row.close_time
                        },
                        booked_slots: []
                    }
                }
                places[row.place_id].booked_slots.push({
                    start_time: row.start_time,
                    end_time: row.end_time
                });
            });

            for (let key in places) {
                results.push(places[key]);
            }

            return res.status(200).json({
                "status": "success",
                "status_code": 200,
                "results": results
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error fetching data",
                error: error.message ?? "Error",
                status_code: 500
            });
        }
    }

    availabillity = async (req, res) => {
        const {place_id, start_time, end_time} = req.query;
        if (!place_id || !start_time || !end_time) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        try {
            const data = await diningModel.checkAvailability(place_id, start_time, end_time);
            const restaurant = await diningModel.getDetails(place_id);
            if (data.length === 0) {
                return res.status(200).json({
                    "status_code": 200,
                    "place_id": place_id,
                    "name": restaurant[0].name,
                    "phone_no": restaurant[0].phone_no,
                    "available": true,
                    "next_available_slot": null
                });
            }
            else {
                // console.log(data[0]);
                data[0].end_time = new Date(data[0].end_time).toLocaleString()

                return res.status(200).json({
                    "status_code": 200,
                    "place_id": place_id,
                    "name": restaurant[0].name,
                    "phone_no": restaurant[0].phone_no,
                    "available": false,
                    "next_available_slot": data[0].end_time
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error fetching data",
                error: error.message ?? "Error",
                status_code: 500
            });
        }

    }
}

export default DiningController;