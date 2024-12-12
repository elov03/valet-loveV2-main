const express = require('express');
const router = express.Router();
const gameRepo = require('../utils/games.repository');

// Routes similaires à celles du prof
router.get('/list', gameListAction);
router.post('/create', gameCreateAction);
//router.get('/show/:gameId', gameShowAction);
router.get('/del/:gameId', gameDelAction);
router.post('/update/:gameId', gameUpdateAction);

async function gameListAction(request, response) {
    try {
        var games = await gameRepo.getAllGames();
        response.send(JSON.stringify(games));
    } catch (err) {
        console.error("Error retrieving games:", err);
        response.status(500).send("Server error while retrieving games.");
    }
}

async function gameCreateAction(request, response) {
    try {
        var gameId = await gameRepo.addOneGame();
        var numRows = await gameRepo.editOneGame(
            gameId,
            request.body.name_game,
            request.body.price_game,
            request.body.time_game,
            request.body.nb_people_min_game,
            request.body.nb_people_max_game,
            request.body.state_game
        );
        let result = { id_game: gameId, rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error when creating game :", err);
        response.status(500).send("Server error during game creation.");
    }
}

async function gameDelAction(request, response) {
    try {
        var numRows = await gameRepo.delOneGame(request.params.gameId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error when deleting game :", err);
        response.status(500).send("Server error when deleting game.");
    }
}

async function gameUpdateAction(request, response) {
    try {
        var gameId = request.params.gameId;
        if (gameId === "0") {
            gameId = await gameRepo.addOneGame();
        }
        var numRows = await gameRepo.editOneGame(
            gameId,
            request.body.name_game,
            request.body.price_game,
            request.body.time_game,
            request.body.nb_people_min_game,
            request.body.nb_people_max_game,
            request.body.state_game
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error updating game :", err);
        response.status(500).send("Server error when updating the game.");
    }
}

module.exports = router;