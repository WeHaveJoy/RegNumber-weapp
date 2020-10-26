module.exports = function Registration(){
    
async function insertReg(reg) {
    var insertR = await pool.query('insert into Registrations(RegNumber) values($1)', [reg, 1]);
    return insertR.row;
}

async function insertTown(town){
    var insertT = await pool.query('insert into Towns(Town, Startswith) values($1, $2)', [town, 1]);
    return insertT.row;
}




return{
    insertReg,
    insertTown
}
}