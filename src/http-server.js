const express = require("express")
const fs = require("fs")
const { getDBinst } = require("./database")
const { debugPort, title } = require("process")
// destrutores
// let x = ["hi", "hoi", "nein"]
// let {, , german} = x
// german = nein

const app = express()
app.use(express.static(__dirname + '/../public'))
app.use(express.json())
//write?title=a&source=a&description=a&thumb=a

app.post("/films", async (req, res) => {
    const { title, source, description, thumb } = req.body
    
    const db = await getDBinst()
    const result = await db.run(
        `insert into films(title, source, description, thumb) values(?,?,?,?)`, 
        [title, source, description, thumb]
        )
    res.json(result) 
  })

app.get("/films", async (req, res) => {
    const { id } = req.query
    const db = await getDBinst()
    if(id){
        const result = await db.get(
            `select * from films where id = ?`,
            id
        )
        res.json(result)
        return
    }
    const result = await db.all(`select * from films`)
    res.send(result)
})

app.delete("/films", async (req, res) => {
    const { id } = req.query
    const db = await getDBinst()
    if(id){
        const result = await db.run(
            `delete from films where id = ?`,
            id
        )
        res.send(`Filme deletado.`)
        }
})

app.put("/films", async (req, res) => {
    const { id } = req.query
    const { title, source, description, thumb } = req.body
    const db = await getDBinst()
    if(id){
        const result = await db.run(
            `update films
            set title = ?,
                source = ?,
                description = ?,
                thumb = ?
            where id = ?`,
            [title, source, description, thumb, id]
        )
        res.json(result)
        }
})

app.patch("/films", async (req, res) => {
    const { id } = req.query
    const reqs = [...Object.values(req.body), id]
    //const alts = Object.keys(req.body).join(", ") + "=?"
    const alts = Object.keys(req.body).map(k => `${k}=?`).join(", ")
    const db = await getDBinst()
    // for(objs in req.body) {
    //     alts.push(`${objs} = ?`)
    // }
    // const altstr = alts.toString()
    //console.log(`${altstr}\n${reqs}`)
    if(id){
        const result = await db.run(
           `update films
            set ${alts}
            where id = ?`,
            reqs
      )
        res.json(reqs)
    }
        // for(var keys in reqs){
        //     console.log(keys) //source, thumb
        //     console.log(reqs[keys]) //Touhou Project 12.8, None
        // }
})

const port = 3000
app.listen(port, () => console.log(`Servidor rodando de boa na porta: ${port}.`))
