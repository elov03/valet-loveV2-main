const pool = require(__dirname + "/db.include.js");

module.exports = {
    getBlankEmployee() {
        return {
            id_employee: 0,
            name_employee: "Default Name",
            age_employee: 0,
            gender_employee: "M",
            post_employee: "Default Post",
            salary_employee: 0,
            id_bar: 1
        };
    },

    async getAllEmployees() {
        try {
            let sql = "SELECT * FROM Employee";
            const [rows, fields] = await pool.execute(sql);
            console.log("EMPLOYEES FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getOneEmployee(employeeId) {
        try {
            let sql = "SELECT * FROM Employee WHERE id_employee = ?";
            const [rows, fields] = await pool.execute(sql, [employeeId]);
            console.log("SINGLE EMPLOYEE FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async delOneEmployee(employeeId) {
        try {
            let sql = "DELETE FROM Employee WHERE id_employee = ?";
            const [okPacket, fields] = await pool.execute(sql, [employeeId]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addOneEmployee(id_bar) {
        try {
            let sql = "INSERT INTO Employee (id_bar, name_employee, age_employee, gender_employee, post_employee, salary_employee) VALUES (?, 'Default Name', 0, 'M', 'Default Post', 0)";
            const [okPacket, fields] = await pool.execute(sql, [id_bar]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneEmployee(employeeId, id_bar, name, age, gender, post, salary) {
        try {
            let sql = "UPDATE Employee SET id_bar=?, name_employee=?, age_employee=?, gender_employee=?, post_employee=?, salary_employee=? WHERE id_employee=?";
            const [okPacket, fields] = await pool.execute(sql, [id_bar, name, age, gender, post, salary, employeeId]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } 
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
