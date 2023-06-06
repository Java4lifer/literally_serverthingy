const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/write", (req, res) => {
    const { file, text } = req.query
    fs.writeFileSync(file, text)
    //write?file=chirno&text=baka
    res.send(text) 
  })

app.use("/read", (req) => {
    const { file } = req.query
    fs.readFileSync(req.query.file)
})

app.use("/delete", (req) => {
    const { file } = req.query
    fs.rmFileSync(file, texto)
    
})

app.use("/patch", (req) => {
    const {file, text} = req.query
    fs.appendFileSync(file, text)

})

app.listen(3000, () => console.log("Servidor roda."))

//write, read, delete and update