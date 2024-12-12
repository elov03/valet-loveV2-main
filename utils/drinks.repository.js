const pool = require(__dirname + "/db.include.js");

module.exports = {
    getBlankGame() {
        return {
            id_drink: 0,
            name_drink: "Default Game",
            price_production_drink: 0,
            price_selling_drink: 0,
            ingredient_drink: 2,
            quantity_drink: "Available",
        };
    },

    async getAllDrinks() {
        try {
            let sql = "SELECT * FROM Drink";
            const [rows, fields] = await pool.execute(sql);
            console.log("DRINK FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};