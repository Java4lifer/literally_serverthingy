const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/write", (req, res) => {
    const { file, text } = req.query
    fs.writeFileSync(file, text)
    //write?file=chirno&text=baka
    res.send(`O arquivo '${file}' foi criado com o seguinte conteudo: '${text}'`) 
  })

app.use("/read", (req, res) => {
    const { file } = req.query
    if(fs.existsSync(file)) {
        res.send(`Lendo o arquivo: ${file} <br><br>'${fs.readFileSync(file)}'`)
    }
    else {res.send(`Arquivo '${file}' não existe ou não foi encontrado.`)}
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