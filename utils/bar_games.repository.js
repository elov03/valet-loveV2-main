const pool = require(__dirname + "\\db.include.js");

module.exports = {
    // Récupère tous les jeux
    async getAllBarGames() {
        try {
            const sql = "SELECT * FROM bar_games";
            console.log("[BAR_GAMES] Executing SQL query to retrieve staging tables bar_games...");

            // Tester la connexion au pool avant d'exécuter la requête
            console.log("[DB] Checking the connection to the MySQL pool...");
            await pool.getConnection(); // Vérifie que le pool est accessible
            console.log("[DB] Connection to MySQL pool successful.");

            // Exécuter la requête SQL
            const [rows] = await pool.query(sql); // Utilisation de `query` à la place de `execute`

            // Vérifier les résultats
            if (!rows || rows.length === 0) {
                console.warn("[BAR_GAMES] No intermediate game tables found in the database.");
                return [];
            }

            console.log(`[BAR_GAMES] ${rows.length} games recovered.`);
            return rows;
        } catch (err) {
            console.error("[BAR_GAMES] Error recovering all games:", err.message);
            throw new Error("Error recovering all games.");
        }
    }
};