const express = require("express")
const fs = require("fs")
const { getDBinst } = require("./database")
// destrutores
// let x = ["hi", "hoi", "nein"]
// let {, , german} = x
// german = nein

const app = express()

async function filmEX(title) {
    const db = await getDBinst()
    const result = await db.run(
        `select * from films where titulo = ?`, [title]
    )
    if(result.length > 0) {
        return true;
    }
    else {
        return  false
    }
}

app.use(express.static(__dirname + '/public'))

app.use("/write", async (req, res) => {
    const { title, source, description, thumb } = req.query
    const db = await getDBinst()
    const result = await db.run(
        `insert into films(title, source, description, thumb) values(?,?,?,?)`, 
        [title, source, description, thumb]
        )
    res.send(result) 
  })

app.use("/read", async (req, res) => {
    const { title } = req.query
    const db = await getDBinst()
    const result = await db.run(
        `select * from films where title is ?`,
        [title]
    )
    res.send(result)
})

app.use("/delete", async (req, res) => {
    const { title } = req.query
    const db = await getDBinst()
    const result = await db.run(
        `delete from films where titulo = ?`,
        [title]
    )
    res.send(`Filme deletado.`)
})

app.use("/patch", async (req, res) => {
    const { title, source, description, thumb } = req.query
    const db = await getDBinst()
    const result = await db.run(
        `update films
        set source = ?;
            description = ?;
            thumb = ?
        where title = ?`,
        [title],
    )
    res.send(result)
})

const port = 3000
app.listen(port, () => console.log(`Servidor rodando de boa na porta: ${port}.`))

//write, read, delete and update