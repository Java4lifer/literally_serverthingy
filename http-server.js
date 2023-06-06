const expr = require("express")
const fs = require("fs")
const app = expr()

app.use(expr.static(__dirname + '/public'))

app.use("/write", (req, res) => {
    const { file, texto } = req.query
    fs.writeFileSync(file, texto)
    res.send(new Data())
})
app.use("/read", (req) => {
    const {file} = req.query
    fs.readFileSync(req.query.file)
})

app.use("/delete", (req) => {
    const {file, texto} = req.query
    fs.writeFileSync(file, texto)
    
})

app.use("/patch", (req) => {
    const {file, texto} = req.query
    fs.writeFileSync(file, texto)

})

app.listen(3000, () => console.log("Servidor roda."))

//write, read, delete and update