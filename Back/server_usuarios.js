const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

MongoClient.connect(
  "mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("prueba-producto");
    const usersCollection = db.collection("users");

    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({ origin: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/get_users", async (req, res) => {
      await usersCollection
        .find()
        .toArray()
        .then((results) => {
          //   res.render('index.ejs', { productos: results })
          res.json({ users: results });
        })
        .catch((error) => console.error(error));

      // ...
    });

    app.post("/post_users", async (req, res) => {
      await usersCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/gestion_usuarios");
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    //crear servidor con el que el browser se conecte
    app.listen(3003, function () {
      console.log("listen on 3003");
    });
  })

  .catch((error) => console.error(error));
