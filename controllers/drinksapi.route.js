const express = require('express');
const router = express.Router();
const drinkRepo = require('../utils/drinks.repository');

// Routes similaires à celles du prof
router.get('/list', drinkListAction);
router.post('/create', drinkCreateAction);
//router.get('/show/:gameId', gameShowAction);
router.get('/del/:drinkId', drinkDelAction);
router.post('/update/:drinkId', drinkUpdateAction);

async function drinkListAction(request, response) {
    try {
        var drinks = await drinkRepo.getAllDrinks();
        response.send(JSON.stringify(drinks));
    } catch (err) {
        console.error("Error retrieving drinks:", err);
        response.status(500).send("Server error while retrieving drinks.");
    }
}

async function drinkCreateAction(request, response) {
    try {
        var drinkId = await drinkRepo.addOneDrink();
        var numRows = await drinkRepo.editOneDrink(
            drinkId,
            request.body.name_drink,
            request.body.price_production_drink,
            request.body.price_selling_drink,
            request.body.ingredient_drink,
            request.body.quantity_drink
        );
        let result = { id_drink: drinkId, rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error when creating drink :", err);
        response.status(500).send("Server error during drink creation.");
    }
}

async function drinkDelAction(request, response) {
    try {
        var numRows = await drinkRepo.delOneDrink(request.params.drinkId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error when deleting drink :", err);
        response.status(500).send("Server error when deleting drink.");
    }
}

async function drinkUpdateAction(request, response) {
    try {
        var drinkId = request.params.drinkId;
        if (drinkId === "0") {
            drinkId = await drinkRepo.addOneDrink();
        }
        var numRows = await drinkRepo.editOneDrink(
            drinkId,
            request.body.name_drink,
            request.body.price_production_drink,
            request.body.price_selling_drink,
            request.body.ingredient_drink,
            request.body.quantity_drink
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error updating drink :", err);
        response.status(500).send("Server error when updating the drink.");
    }
}

module.exports = router;