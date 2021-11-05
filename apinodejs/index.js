const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const router = express.Router();
const UserSchema = require('./models/User.js')  // Hay que llamar la libreria User de la carpeta modelo

//Generamos la conexión a la base de datos
//Hay que extraer el link de la pagina de mongoDB
//mongodb+srv://admin_misiontic:<password>@misiontic.6htkq.mongodb.net/test

mongoose.connect("mongodb+srv://admin_misiontic:Perihelio1915@misiontic.6htkq.mongodb.net/test")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Depues creamos un servicio web

router.get('/', (req, res) => {
    res.send("Hello World");
});

router.post('/persona/:nombre', (req, res) => {
    res.send("Hello" +req.params.nombre);
});

//Creamos un servicio para treaerer la información de los usuario registrados en la base de datos

router.get('/user', (req, res) => {
    UserSchema.find(function(err, data){ // UserSchema - es elcreado en el archivo User de la carpeta modelo.
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
});

// creamos el servicio que nos permite crear o registrar los usuarios
router.post('/user', (req, res) => { // almacenar usuarios // la variable req es request, la variable que almacena la info, la variable res, es la respuesta.
    let newUser = new UserSchema({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: req.body.password,
    })
 // creamos un servicio en el que nos permite alamacenar la infromación en los usuarios creados.
    newUser.save(function(err, data){ // Guardamos la información 
        if(err){
            console.log(err)
        }else{
        res.send("saved successfully " + newUser)
        }
    });
})


// Configuramos la ejecución de nuestro servidor

app.use(router)
app.listen(port,() => {
    console.log('Listening on '+port)
})


