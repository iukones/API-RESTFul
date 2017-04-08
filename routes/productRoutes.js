'use strict'

const express = require('express')
const productCtrl = require('../controllers/productController')
const api = express.Router()

// app.get('/iukones/:name', (req, res) => {
//   res.send({ mensaje: `Hola ${req.params.name}!` })
// })

// peticion tipo GET a product
api.get('/product', productCtrl.getProducts)
// peticion tipo GET especifica al elemento productId
api.get('/product/:productId', productCtrl.getProduct)
// peticion tipo POST a product
api.post('/product', productCtrl.saveProduct)
// peticion tipo PUT para actualizar productId
api.put('/product/:productId', productCtrl.updateProduct)
// peticion tipo DELETE a product en base de datos.
api.delete('/product/:productId', productCtrl.deleteProduct)

module.exports = api
