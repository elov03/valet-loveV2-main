const express = require('express');
const router = express.Router();
const gameRepo = require('../utils/bar_games.repository.js');

// Définition des routes
router.get('/list', bar_gameListAction);
router.delete('/remove/:bar_gameId', bar_gameDeleteAction);
//router.post('/create/', bar_gameCreateAction);  
router.patch('/update/:bar_gameId', bar_gameUpdateAction);


async function bar_gameListAction(request, response) {
    try {
        var games = await gameRepo.getAllBarGames();
        response.send(JSON.stringify(games));
    } catch (err) {
        console.error("Erreur lors de la récupération des employés :", err);
        response.status(500).send("Erreur serveur lors de la récupération des employés.");
    }
}


// Route pour supprimer un jeu
async function bar_gameDeleteAction(request, response) {
    try {
        const gameId = request.params.gameId;  
        const barId = request.params.barId;
        console.log(`Tentative de suppression du jeu avec l'ID : ${gameId}`);
        const numRows = await gameRepo.delOneGame(gameId, barId)
        //const numRows = await gameRepo.deleteGame(gameId); 
        console.log(`Jeu supprimé. Nombre de lignes affectées : ${numRows}`);

        if (numRows === 0) {
            return response.status(404).send("Jeu non trouvé ou déjà supprimé.");
        }

        response.status(200).send(`Jeu avec l'ID ${gameId} supprimé avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la suppression du jeu : ", err);
        response.status(500).send('Erreur lors de la suppression du jeu.');
    }
}

// Route pour créer un jeu
/*
async function bar_gameCreateAction(request, response) {
    try {
        var employeeId = await employeeRepo.addOneEmployee(request.body.id_bar);
        var numRows = await employeeRepo.editOneEmployee(
            employeeId,
            request.body.id_bar,
            request.body.name_employee,
            request.body.age_employee,
            request.body.gender_employee,
            request.body.post_employee,
            request.body.salary_employee
        );
        let result = { id_employee: employeeId, rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Erreur lors de la création de l'employé :", err);
        response.status(500).send("Erreur serveur lors de la création de l'employé.");
    }
}*/

async function bar_gameUpdateAction(req, res) {
    try {
        const gameId = req.params.gameId;
        const updateData = req.body;     

        console.log(`Tentative de mise à jour du jeu avec l'ID : ${gameId}`);
        console.log("Données à mettre à jour : ", updateData);

        // Appel au dépôt pour mettre à jour le jeu
        const numRows = await gameRepo.updateGame(gameId, updateData);

        if (numRows === 0) {
            return res.status(404).send("Jeu non trouvé ou aucune donnée mise à jour.");
        }

        res.status(200).send(`Jeu avec l'ID ${gameId} mis à jour avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du jeu : ", err);
        res.status(500).send('Erreur lors de la mise à jour du jeu.');
    }
}

module.exports = router;