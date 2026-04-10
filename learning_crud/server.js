const express = require("express")
const path = require("path")

const app = express()
app.use(express.json())
app.use(express.static(__dirname))
const PORT = 3000

const data = {
    1:"afreen",
    2:"afreen 2"
}

app.get("/", (req,res) => {
    res.status(200).sendFile(path.join(__dirname, "index.html"))
})

app.get("/api/data", (req, res) => {
    res.status(200).json({
        data
    })
})

app.post("/api/data", (req, res) => {
    const value = req.body.value;

    const newKey = Object.keys(data).length + 1;
    data[newKey] = value;

    // console.log("updated data")
    res.status(201).json({ success: true, data });
});


app.listen(PORT, ()=> {
    console.log(`Server has started on http://localhost:${PORT}`)
})