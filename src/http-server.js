const express = require("express")
const fs = require("fs")
const { getDBinst } = require("./database")
// destrutores
// let x = ["hi", "hoi", "nein"]
// let {, , german} = x
// german = nein

const app = express()
app.use(express.static(__dirname + '/../public'))
app.use(express.json())
//write?title=a&source=a&description=a&thumb=a

app.use("/write", async (req, res) => {
    const { id } = req.query
    const { title, source, description, thumb } = req.body
    const db = await getDBinst()
    const result = await db.run(
        `insert into films(title, source, description, thumb) values(?,?,?,?)`, 
        [title, source, description, thumb]
        )
    res.send(result) 
  })

app.use("/read", async (req, res) => {
    const { id } = req.query
    const db = await getDBinst()
    if(id){
        const result = await db.get(
            `select * from films where id is ?`,
            [id]
        )
        res.send(result)
    }
})

app.use("/delete", async (req, res) => {
    const { id } = req.query
    const db = await getDBinst()
    if(id){
        const result = await db.run(
            `delete from films where id = ?`,
            [id]
        )
        res.send(`Filme deletado.`)
        }
})

app.use("/patch", async (req, res) => {
    const { id, title, source, description, thumb } = req.query
    const db = await getDBinst()
    if(id){
        const result = await db.run(
            `update films
            set title = ?;
                source = ?;
                description = ?;
                thumb = ?
            where id = ?`,
            [id],
        )
        res.send(result)
        }
})

const port = 3000
app.listen(port, () => console.log(`Servidor rodando de boa na porta: ${port}.`))
