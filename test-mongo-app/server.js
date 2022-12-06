const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const User = require("./src/User.model");
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 8080;

app.get("/users", async(req, res) => {
    const users = await User.find();

    res.json(users);
});

app.get("/user", async(req, res) => {
    const user = new User({ username: "username", email: "email", age: 25 });

    await user.save().then(() => console.log("User created"));

    res.send("User created \n");
});

app.post("/user-create", async(req, res) => {

    const user = new User({ username: req.body.username, email: req.body.email, age: req.body.age });

    await user.save().then(() => console.log("User created"));

    res.send("User created \n");
});

app.delete("/", async(req, res) => {
    await User.deleteMany().then(() => console.log('All Data successfully deleted'));
    res.send("Users deleted \n");
});

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);

    connectDb().then(() => {
        console.log("MongoDb connected");
    });
});