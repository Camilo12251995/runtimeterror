const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require('cors');

MongoClient.connect(
  "mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)

  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("prueba-producto");
    const ventasCollection = db.collection("ventas");
    
    app.use(cors({origin: true}));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/get_ventas', async(req, res) => {
      await ventasCollection.find().toArray()
        .then(results => {
       //   res.render('index.ejs', { productos: results })
          res.json({ventas: results})
        })
        .catch(error => console.error(error))

      // ...
    })

    app.post('/post_ventas', async(req, res) => {
      await ventasCollection.insertOne(req.body)
        .then(result => {
          res.redirect('admin_ventas')
        })
        .catch(error => console.error(error))
    })

    app.listen(3000, function () {
      console.log('listening on 3000')
    })

  })

  .catch(error => console.error(error))

    
