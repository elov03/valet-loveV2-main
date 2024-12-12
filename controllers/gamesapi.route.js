const express = require('express');
const router = express.Router();
const gameRepo = require('../utils/games.repository');

// Routes similaires à celles du prof
router.get('/list', gameListAction);
router.post('/create', gameCreateAction);
router.get('/show/:gameId', gameShowAction);
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
        var gameId = await gameRepo.addOneGame(request.body.id_bar);
        var numRows = await gameRepo.editOneGame(
            gameId,
            request.body.id_bar,
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
        console.error("Erreur lors de la création de l'game :", err);
        response.status(500).send("Erreur serveur lors de la création de l'game.");
    }
}

async function gameShowAction(request, response) {
    try {
        var oneGame = await gameRepo.getOneGame(request.params.gameId);
        response.send(JSON.stringify(oneGame));
    } catch (err) {
        console.error("Erreur lors de la récupération de l'game :", err);
        response.status(500).send("Erreur serveur lors de la récupération de l'game.");
    }
}

async function gameDelAction(request, response) {
    try {
        var numRows = await gameRepo.delOneGame(request.params.gameId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Erreur lors de la suppression de l'game :", err);
        response.status(500).send("Erreur serveur lors de la suppression de l'game.");
    }
}

async function gameUpdateAction(request, response) {
    try {
        var gameId = request.params.gameId;
        if (gameId === "0") {
            gameId = await gameRepo.addOneGame(request.body.id_bar);
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
        console.error("Erreur lors de la mise à jour de l'game :", err);
        response.status(500).send("Erreur serveur lors de la mise à jour de l'game.");
    }
}

module.exports = router;