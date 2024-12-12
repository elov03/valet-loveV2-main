const pool = require(__dirname + "\\db.include.js");

module.exports = {
    // Récupère tous les jeux
    async getAllBarDrinks() {
        try {
            const sql = "SELECT * FROM bar_drink";
            console.log("[BAR_DRINKS] Executing SQL query to retrieve staging tables bar_drink...");

            
            console.log("[DB] Checking the connection to the MySQL pool...");
            await pool.getConnection(); // Vérifie que le pool est accessible
            console.log("[DB] Connection to MySQL pool successful.");

            const [rows] = await pool.query(sql); 

            if (!rows || rows.length === 0) {
                console.warn("[BAR_DRINKS] No intermediate drink tables found in the database.");
                return [];
            }

            console.log(`[BAR_DRINKS] ${rows.length} drinks recovered.`);
            return rows;
        } catch (err) {
            console.error("[BAR_DRINKS] Error recovering all drinks:", err.message);
            throw new Error("Error recovering all drinks.");
        }
    },};