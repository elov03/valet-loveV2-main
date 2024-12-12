const express = require('express');
const router = express.Router();
const gameRepo = require('../utils/bar_games.repository.js');

router.get('/list', bar_gameListAction);


async function bar_gameListAction(request, response) {
    try {
        var games = await gameRepo.getAllBarGames();
        response.send(JSON.stringify(games));
    } catch (err) {
        console.error("Error retrieving employees:", err);
        response.status(500).send("Server error while retrieving employees.");
    }
}

module.exports = router;