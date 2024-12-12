const express = require('express');
const router = express.Router();
const drinkRepo = require('../utils/drinks.repository');

// Routes similaires à celles du prof
router.get('/list', drinkListAction);
//router.post('/create', gameCreateAction);
//router.get('/show/:gameId', gameShowAction);
//router.get('/del/:gameId', gameDelAction);
//router.post('/update/:gameId', gameUpdateAction);

async function drinkListAction(request, response) {
    try {
        var drinks = await drinkRepo.getAllDrinks();
        response.send(JSON.stringify(drinks));
    } catch (err) {
        console.error("Error retrieving drinks:", err);
        response.status(500).send("Server error while retrieving drinks.");
    }
}

module.exports = router;