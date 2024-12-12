const pool = require(__dirname + "/db.include.js");

module.exports = {
    getBlankGame() {
        return {
            id_drink: 0,
            name_drink: "Default Game",
            price_production_drink: 0,
            price_selling_drink: 0,
            ingredient_drink: "Default Ingredient",
            quantity_drink: 0,
        };
    },

    async getAllGames() {
        try {
            let sql = "SELECT * FROM Games";
            const [rows, fields] = await pool.execute(sql);
            console.log("DRINK FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    
    async getOneGame(gameId) {
        try {
            let sql = "SELECT * FROM Games WHERE id_game = ?";
            const [rows, fields] = await pool.execute(sql, [gameId]);
            console.log("SINGLE GAME FETCHED: " + rows.length);
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

    async delOneGame(gameId) {
        try {
            let sql = "DELETE FROM Games WHERE id_game = ?";
            const [okPacket, fields] = await pool.execute(sql, [gameId]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addOneGame() {
        try {
            let sql = "INSERT INTO Games (name_game, price_game, time_game, nb_people_min_game, nb_people_max_game, state_game) VALUES \
                                         ('Default Name', 0, '00.00.00', 0, 1000, 'New')";
            const [okPacket, fields] = await pool.execute(sql);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneGame(gameId, name, price, time, nb_people_min, nb_people_max, state, ) {
        try {
            let sql = "UPDATE Games SET name_game=?, price_game=?, time_game=?, nb_people_min_game=?, nb_people_max_game=?, state_game=? WHERE id_game=?";
            const [okPacket, fields] = await pool.execute(sql, [name, price, time, nb_people_min, nb_people_max, state, gameId]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};