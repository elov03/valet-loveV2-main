const express = require('express');
const router = express.Router();
const employeeRepo = require('../utils/employees.repository');

// routes
router.get('/list', employeeListAction);
router.post('/create', employeeCreateAction);
router.get('/show/:employeeId', employeeShowAction);
router.get('/del/:employeeId', employeeDelAction);
router.post('/update/:employeeId', employeeUpdateAction);


//retrieve the list of all employees
async function employeeListAction(request, response) {
    try {
        var employees = await employeeRepo.getAllEmployees();
        response.send(JSON.stringify(employees));
    } catch (err) {
        console.error("Error when retrieving employees :", err);
        response.status(500).send("Server error when retrieving employees.");
    }
}

//create a new employee in the database
async function employeeCreateAction(request, response) {
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
        console.error("Error when creating employee :", err);
        response.status(500).send("Server error during employee creation.");
    }
}


//Retrieves and returns an employee.
async function employeeShowAction(request, response) {
    try {
        var oneEmployee = await employeeRepo.getOneEmployee(request.params.employeeId);
        response.send(JSON.stringify(oneEmployee));
    } catch (err) {
        console.error("Employee recovery error :", err);
        response.status(500).send("Server error during employee recovery.");
    }
}

//Deletes an employee by user ID.
async function employeeDelAction(request, response) {
    try {
        var numRows = await employeeRepo.delOneEmployee(request.params.employeeId);
        let result = { rowsDeleted: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error when deleting employee :", err);
        response.status(500).send("Server error when deleting employee.");
    }
}

//Create or update employee.
async function employeeUpdateAction(request, response) {
    try {
        var employeeId = request.params.employeeId;
        if (employeeId === "0") {
            employeeId = await employeeRepo.addOneEmployee(request.body.id_bar);
        }
        var numRows = await employeeRepo.editOneEmployee(
            employeeId,
            request.body.id_bar,
            request.body.name_employee,
            request.body.age_employee,
            request.body.gender_employee,
            request.body.post_employee,
            request.body.salary_employee
        );
        let result = { rowsUpdated: numRows };
        response.send(JSON.stringify(result));
    } catch (err) {
        console.error("Error updating employee :", err);
        response.status(500).send("Server error when updating the employee.");
    }
}

module.exports = router;







