import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(3000, err => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Server listen on port 3000`)
    }
})