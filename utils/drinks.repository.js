const pool = require(__dirname + "/db.include.js");

module.exports = {
    getBlankDrink() {
        return {
            id_drink: 0,
            name_drink: "Default Game",
            price_production_drink: 0,
            price_selling_drink: 0,
            ingredient_drink: "Default Ingredient",
            quantity_drink: 0,
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
    },
    
    async getOneDrink(drinkId) {
        try {
            let sql = "SELECT * FROM drink WHERE id_drink = ?";
            const [rows, fields] = await pool.execute(sql, [drinkId]);
            console.log("SINGLE DRINK FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async delOneDrink(drinkId) {
        try {
            let sql = "DELETE FROM Drink WHERE id_drink = ?";
            const [okPacket, fields] = await pool.execute(sql, [drinkId]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addOneDrink() {
        try {
            let sql = "INSERT INTO Drink (name_drink, price_production_drink, price_selling_drink, ingredient_drink, quantity_drink) VALUES \
                                         ('Default Name', 0, 0, 'Default Ingredient', 0)";
            const [okPacket, fields] = await pool.execute(sql);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneDrink(drinkId, name, price_production, price_selling, ingredient, quantity, ) {
        try {
            let sql = "UPDATE Drink SET name_drink=?, price_production_drink=?, price_selling_drink=?, ingredient_drink=?, quantity_drink=? WHERE id_drink=?";
            const [okPacket, fields] = await pool.execute(sql, [name, price_production, price_selling, ingredient, quantity, drinkId]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};