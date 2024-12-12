const express = require('express');
const router = express.Router();
const bardrinkRepo = require('../utils/bar_drinks.repository.js');

// Définition des routes
router.get('/list', bar_drinkListAction);
//router.delete('/remove/:bar_drinkId', bar_drinkDeleteAction);
//router.post('/create/', bar_gameCreateAction);  
//router.patch('/update/:bar_drinkId', bar_drinkUpdateAction);


async function bar_drinkListAction(request, response) {
    try {
        var bardrinks = await bardrinkRepo.getAllBarDrinks();
        response.send(JSON.stringify(bardrinks));
    } catch (err) {
        console.error("Error retrieving drinks :", err);
        response.status(500).send("Server error when collecting drinks.");
    }
}

module.exports = router;