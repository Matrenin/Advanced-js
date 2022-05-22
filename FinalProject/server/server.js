const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use("/", express.static("./public"));

app.get("/api/products", (req, res) => {
    fs.readFile("./server/db/products.json", "utf-8", (err, data) => {
        if (err) res.send(JSON.stringify({result: 0, err}));
        else res.send(data);
    });
});

app.get("/api/cart", (req, res) => {
    fs.readFile("./server/db/userCart.json", "utf-8", (err, data) => {
        if (err) res.send(JSON.stringify({result: 0, err}));
        else res.send(data);
    });
});

app.post("/api/cart", (req, res) => {
    fs.readFile("./server/db/userCart.json", "utf-8", (err, data) => {
        if (err) res.send(JSON.stringify({result: 0, err}));
        else {
            let cart = JSON.parse(data);
            cart.contents.push(req.body);
            fs.writeFile("./server/db/userCart.json", JSON.stringify(cart), err => {
                if (err) res.send(JSON.stringify({result: 0, err}));
                else res.send(JSON.stringify({result: 1}));
            });
        }
    });
});

app.put("/api/cart/:id", (req, res) => {
    fs.readFile("./server/db/userCart.json", "utf-8", (err, data) => {
        if (err) res.send(JSON.stringify({result: 0, err}));
        else {
            let cart = JSON.parse(data);
            let find = cart.contents.find(el => el.id === Number(req.params.id));
            find.quantity += req.body.quantity;
            fs.writeFile("./server/db/userCart.json", JSON.stringify(cart), err => {
                if (err) res.send(JSON.stringify({result: 0, err}));
                else res.send(JSON.stringify({result: 1}));
            });
        }
    });
});

app.delete("/api/cart/:id", (req, res) => {
    fs.readFile("./server/db/userCart.json", "utf-8", (err, data) => {
        if (err) res.send(JSON.stringify({result: 0, err}));
        else {
            let cart = JSON.parse(data);
            let find = cart.contents.find(el => el.id === Number(req.params.id));
            cart.contents.splice(cart.contents.indexOf(find), 1);
            fs.writeFile("./server/db/userCart.json", JSON.stringify(cart), err => {
                if (err) res.send(JSON.stringify({result: 0, err}));
                else res.send(JSON.stringify({result: 1}));
            });
        }
    });
});

app.listen(5555, () => {
    console.log("Server started!");
});