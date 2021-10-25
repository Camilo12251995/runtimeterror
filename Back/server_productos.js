const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');

MongoClient.connect('mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('prueba-producto')
    const productosCollection = db.collection('productos')

    app.use(cors({origin: true}));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/get_productos', async(req, res) => {
      await productosCollection.find().toArray()
        .then(results => {
       //   res.render('index.ejs', { productos: results })
          res.json({productos: results})
        })
        .catch(error => console.error(error))

      // ...
    })
    app.post('/post_productos', async(req, res) => {
      await productosCollection.insertOne(req.body)
        .then(result => {
          res.redirect('admin_productos')
        })
        .catch(error => console.error(error))
    })
    //app.set('view engine', 'ejs')

    app.listen(3001, function () {
      console.log('listening on 3001')
    })

  })

  .catch(error => console.error(error))







