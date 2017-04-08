'use strict'
// Creando un modelo User.

// importamos dependencias requeridas.
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// dependencias para encriptar contraseña en nodejs.
const bcrypt = require('bcrypt-nodejs')
// dependencias crypto para las imagenes del avatar.
const crypto = require('crypto')

// se crea esquema para nuevo usuario.
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    displayName: String,
    avatar: String,
    password: {
        type: String,
        select: false
    },
    signupDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: Date
})

// se crea una función previa antes de guardar en base de datos, para encriptar password.
UserSchema.pre('save', (next) => {

    // se crea funcion "user" para pasar todos los datos del esquema
    let user = this

    // si el usuario no ha modificado su password, pasa al siguiente Middleware.
    if (!user.isModified('password')) return next()

    // se genera un "Salt" para el password.
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        // se hace un "hash" con el "Salt" que se genero anteriormente.
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            // si no hay error se pasa el password con el "hash" creado anteriormente.
            user.password = hash
            next()
        })
    })
})

// se genera la funcionalidad de avatar con funcionalidad de mongoose via URL.
UserSchema.methods.gravatar = function() {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
