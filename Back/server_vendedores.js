const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId 
const cors = require('cors');
const router = require('express').Router();

MongoClient.connect('mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('prueba-producto')
    const productosCollection = db.collection('vendedores')

    app.use(cors({origin: true}));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/get_vendedores', async(req, res) => {
      await productosCollection.find().toArray()
        .then(results => {
       //   res.render('index.ejs', { productos: results })
          res.json({vendedores: results})
        })
        .catch(error => console.error(error))

      // ...
    })
    app.post('/post_vendedores', (req, res) => {
      /* console.log(req) */
      productosCollection.insertOne(req.body)
        .then(res => {
          /* res.redirect('/gestion_vendedores') */
        })
        .catch(error => console.error(error))
    })

    /* app.use('/', router); */

    //app.set('view engine', 'ejs')

    app.put('/put_vendedores', (req, res) => {
      
      productosCollection.findOneAndUpdate(

        /* { _id:  new ObjectID(req.body.idVendedor) }, */
        {idVendedor : req.body.idVendedor},
        {
          $set: {
            nombre: req.body.nombre,
            especialidad: req.body.especialidad,
            numeroCelular: req.body.numeroCelular,
            ingresoDia: req.body.ingresoDia,
            ingresoMes: req.body.ingresoMes,
            ingresoAño: req.body.ingresoAño


        }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        console.log(result)
        if (result.updatedCount === 0) {
          return res.json('No se encontró el registro para modificar')
        }
        res.json('Se modificó el registro')
      })
        .catch(error => console.error(error))
    })


  app.delete('/get_vendedores', (req, res) => {
    productosCollection.deleteOne(
      { idVendedor: req.body.idVendedor  }
    )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No se encontró el registro para borrar')
      }
      res.json('Se eliminó el registro')
    })
    .catch(error => console.error(error))
})

/* app.put('/put_vendedores', async(req, res) => {
  await productosCollection.updateOne(req.body)
    .then(res => {
      res.redirect('gestion_vendedores')
    })
    .catch(error => console.error(error))
}) */


    app.listen(3000, function () {
      console.log('listening on 3000')
    })

  })

  .catch(error => console.error(error))







