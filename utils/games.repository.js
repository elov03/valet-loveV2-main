const pool = require(__dirname + "/db.include.js");

module.exports = {
    getBlankGame() {
        return {
            id_game: 0,
            name_game: "Default Game",
            price_game: 0,
            time_game: "00:00:00",
            nb_people_min_game: 2,
            nb_people_max_game: 4,
            state_game: "Available",
            id_bar:1
        };
    },

    async getAllGames() {
        try {
            let sql = "SELECT * FROM Games";
            const [rows, fields] = await pool.execute(sql);
            console.log("GAMES FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getOneGame(gameId) {
        try {
            let sql = "SELECT * FROM Games WHERE id_game = ?";
            const [rows, fields] = await pool.execute(sql, [gameeId]);
            console.log("SINGLE GAMES FETCHED: " + rows.length);
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

    async addOneGame(id_bar) {
        try {
            let sql = "INSERT INTO Games (id_bar, name_game, price_game, time_game, nb_people_min_game, nb_people_max_game, state_game) VALUES (?,'Deafault name', 0, 0, 0, 0, 'Default')";
            const [okPacket, fields] = await pool.execute(sql, [id_bar]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneGame(gameId, id_bar, name, price, time, nb_people_min, nb_people_max, state) {
        try {
            let sql = "UPDATE Game SET id_bar=?, name_game=?, price_game=?, time_game=?, nb_people_min_game=?, nb_people_max_game=?, state_game=? WHERE id_game=?";
            const [okPacket, fields] = await pool.execute(sql, [id_bar, name, price, time, nb_people_min, nb_people_max, state, gameId]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};

