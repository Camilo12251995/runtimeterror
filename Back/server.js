const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId
const cors = require('cors');
const router = require('express').Router();
const path = require('path');

MongoClient.connect('mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('prueba-producto')
    const productosCollection = db.collection('vendedores')

    app.use(cors({ origin: true }));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/get_vendedores', async (req, res) => {
      await productosCollection.find().toArray()
        .then(results => {
          //   res.render('index.ejs', { productos: results })
          res.json({ vendedores: results })
        })
        .catch(error => console.error(error))

      // ...
    })
    router.post('/post_vendedores', (req, res) => {
      /* console.log(req) */
      productosCollection.insertOne(req.body)
        .then(res => {
          /* res.redirect('/gestion_vendedores') */
        })
        .catch(error => console.error(error))
    })

    app.use('/', router);

    //app.set('view engine', 'ejs')

    app.put('/put_vendedores', (req, res) => {

      productosCollection.findOneAndUpdate(

        /* { _id:  new ObjectID(req.body.idVendedor) }, */
        { idVendedor: req.body.idVendedor },
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
        { idVendedor: req.body.idVendedor }
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

MongoClient.connect('mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('prueba-producto')
    const productosCollection = db.collection('productos')

    app.use(cors({ origin: true }));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/get_productos', async (req, res) => {
      await productosCollection.find().toArray()
        .then(results => {
          //   res.render('index.ejs', { productos: results })
          res.json({ productos: results })
        })
        .catch(error => console.error(error))

      // ...
    })
    app.post('/post_productos', async (req, res) => {
      await productosCollection.insertOne(req.body)
        .then(result => {
          res.redirect('admin_productos')
        })
        .catch(error => console.error(error))
    })
    //app.set('view engine', 'ejs')


    app.put('/put_productos', (req, res) => {

      productosCollection.findOneAndUpdate(

        /* { _id:  new ObjectID(req.body.idVendedor) }, */
        { id: req.body.id },
        {
          $set: {
            producto: req.body.producto,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            descripcion: req.body.descripcion,



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


    app.delete('/get_productos', (req, res) => {
      productosCollection.deleteOne(
        { id: req.body.id }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No se encontró el registro para borrar')
          }
          res.json('Se eliminó el registro')
        })
        .catch(error => console.error(error))
    })






    app.listen(3001, function () {
      console.log('listening on 3001')
    })

  })

  .catch(error => console.error(error))


MongoClient.connect(
  "mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)

  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("prueba-producto");
    const ventasCollection = db.collection("ventas");

    app.use(cors({ origin: true }));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/get_ventas', async (req, res) => {
      await ventasCollection.find().toArray()
        .then(results => {
          //   res.render('index.ejs', { productos: results })
          res.json({ ventas: results })
        })
        .catch(error => console.error(error))

      // ...
    })

    app.post('/post_ventas', async (req, res) => {
      await ventasCollection.insertOne(req.body)
        .then(result => {
          res.redirect('admin_ventas')
        })
        .catch(error => console.error(error))
    })
    app.delete('/get_ventas', (req, res) => {
      ventasCollection.deleteOne(
        { id_venta: req.body.id_venta }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No se encontró el registro para borrar')
          }
          res.json('Se eliminó el registro')
        })
        .catch(error => console.error(error))
    })

    app.put('/put_ventas', (req, res) => {

      ventasCollection.findOneAndUpdate(

        /* { _id:  new ObjectID(req.body.idVendedor) }, */
        { id_venta: req.body.id_venta },
        {
          $set: {
            id_vendedor: req.body.id_vendedor,
            nombre_cliente: req.body.nombre_cliente,
            fecha_venta_dia: req.body.fecha_venta_dia,
            fecha_venta_mes: req.body.fecha_venta_mes,
            fecha_venta_año: req.body.fecha_venta_año,
            /*  id_venta: req.body.id_venta, */
            producto_1: req.body.producto_1,
            cantidad_1: req.body.cantidad_1,
            valor_total: req.body.valor_total,
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
    app.listen(3002, function () {
      console.log('listening on 3002')
    })







  })

  .catch(error => console.error(error))


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

    app.get('/get_users/:correo', async (req, res) => {
      await usersCollection.findOne(
        {
          correo: req.params.correo
        }
      )
        .then(results => {
          //   res.render('index.ejs', { productos: results })
          res.json({ users: results })
        })
        .catch(error => console.error(error))
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



    app.put('/put_users', (req, res) => {

      usersCollection.findOneAndUpdate(

        /* { _id:  new ObjectID(req.body.idVendedor) }, */
        { id: req.body.id },
        {
          $set: {
            nombre: req.body.nombre,
            correo: req.body.correo,
            rol: req.body.rol,
            estado: req.body.estado,



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


    app.delete('/get_users', (req, res) => {
      usersCollection.deleteOne(
        { id: req.body.id }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No se encontró el registro para borrar')
          }
          res.json('Se eliminó el registro')
        })
        .catch(error => console.error(error))
    })


    //crear servidor con el que el browser se conecte
    app.listen(3003, function () {
      console.log("listening on 3003");
    });
  })

  .catch((error) => console.error(error));


MongoClient.connect('mongodb+srv://Camilin:Camilo2413@cluster0.zboep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('prueba-producto')
    const productosCollection = db.collection('estado_ventas')

    app.use(cors({ origin: true }));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/get_estado_ventas', async (req, res) => {
      await productosCollection.find().toArray()
        .then(results => {
          //   res.render('index.ejs', { productos: results })
          res.json({ estado_ventas: results })
        })
        .catch(error => console.error(error))

      // ...
    })
    app.post('/post_estado_ventas', async (req, res) => {
      await productosCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/estado_ventas')
        })
        .catch(error => console.error(error))
    })
    //app.set('view engine', 'ejs')

    app.listen(3004, function () {
      console.log('listening on 3004')
    })

  })

  .catch(error => console.error(error))

  app.use(express.static(path.join(__dirname, '../Front/build')))

  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'../Front/build', 'index.html'));
  })