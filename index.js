'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/iukones/:name', (req, res) => {
//   res.send({ mensaje: `Hola ${req.params.name}!` })
// })

// peticion tipo GET a product
app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    if(!products) return res.status(404).send({ message: `El producto no existe`})

    res.status(200).send({ products })
  })  
})
// peticion tipo GET especifica al elemento productId
app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
    if(!product) return res.status(404).send({ message: `El producto no existe`})

    res.status(200).send({ product })
  })
})

// peticion tipo POST a product
app.post('/api/product', (req, res) => {
  // console.log(req.body)
  // res.status(200).send({ message: 'El producto se ha recibido' })
  console.log('POST /api/product')
  console.log(req.body)

let product = new Product()
product.name = req.body.name
product.picture = req.body.picture
product.price = req.body.price
product.category = req.body.category
product.description = req.body.description

product.save((err, productStored) => {
  if(err) res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })

  res.status(200).send({ product: productStored })
})
})

// peticion tipo PUT a product para actualizar
app.put('/api/product/:productId', (req, res) => {

})

// peticion tipo DELETE a product en base de datos.
app.delete('/api/product/:productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/data/db/shop', (err, res) => {
  if(err) {
    return console.log( `Error al conectar a la base de datos: ${err}` )
  }
  console.log('Conexión establecida a la base de datos...')
  app.listen(port, () => {
      console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
