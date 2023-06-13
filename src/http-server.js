const express = require("express")
const fs = require("fs")
const { getDBinst } = require("./database")
// destrutores
// let x = ["hi", "hoi", "nein"]
// let {, , german} = x
// german = nein

const app = express()

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
        `search in films(title) values(?)`,
        [title]
    )
    res.send(result)
})

app.use("/delete", (req, res) => {
    const { file } = req.query
    fs.rmSync(file)
    if(fs.existsSync(file)) {
        res.send(`Arquivo '${file}' deletado com sucesso.`)
    }
    else {res.send(`Arquivo '${file}' não existe ou não foi encontrado.`)}
})

app.use("/patch", (req, res) => {
    const {file, text} = req.query
    const textold = fs.readFileSync(file)
    if(fs.existsSync(file)) {
        fs.writeFileSync(file, text, {encoding:'utf8',flag:'w'})
        res.send(`Conteudo do arquivo '${file}' foi alterado de: '${textold}', para: '${text}'`)
    }
    else {res.send(`Arquivo '${file}' não existe ou não foi encontrado.`)}
})
const port = 3000
app.listen(port, () => console.log(`Servidor rodando de boa na porta: ${port}.`))

//write, read, delete and update