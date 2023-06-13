const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
let instance = null 

async function getDBinst() {
    if (instance) return instance
    const dabase = await open({
        filename: 'dabase.sqlite3',
        //filename: ::memory::
        driver: sqlite3.Database
    })
    // const dabase = await open(dbs)
    await dabase.exec(`
    create table if not exists films (
        id int primary key autoincrement,
        title text not null,
        source text not null,
        description text,
        thumb text);
    `)
    instance = dabase
    return dabase
}

module.exports = { getDBinst }