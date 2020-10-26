module.exports = function Registration() {

    async function checkReg(cReg) {
        var regCheck = await pool.query('select name from greeting_t where name= $1', [cReg]);
        return regCheck;
    }

    async function insertReg(reg) {
        var insertR = await pool.query('insert into Registrations(RegNum, startswith) values($1, $2)', [reg, 1]);
        return insertR.row;
    }

    async function insertTown(town) {
        var insertT = await pool.query('insert into Towns(Town, RegNum) values($1, $2)', [town, RegNum, 1]);
        return insertT.row;
    }


    return {
        insertReg,
        insertTown,
        checkReg

    }
}