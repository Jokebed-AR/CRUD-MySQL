
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

//setting up the cors config
app.use(cors({
    origin: 'https://crud-mysql2021.herokuapp.com/'
}))

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//  MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'slashwebmariadb.cyuazzw9rdsu.us-east-1.rds.amazonaws.com',
    user            : 'nodemysql',
    password        : 'nodemysql',
    database        : 'nodemysql'
});

app.get('/', (req, res) => {
    res.send("WELCOME")
})

// Get "alumnos"
app.get('/students', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from alumnos', (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Get "alumnos" by id
app.get('/students/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from alumnos WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Delete a record
app.delete('/students/del/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE from alumnos WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Alumno con ID: ${[req.params.id]} ha sido eliminado.`)
            } else {
                console.log(err)
            }
        })
    })
})


// Add a record
app.post('/students/add', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO  alumnos SET ?', params, (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Nuevo alumno añadido.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


// update a record
app.put('/students/modify', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const {id, nombres, apellido_1, apellido_2, fecha_nacimiento, direccion, numero_telefonico, nombre_madre, nombre_padre, tipo_de_sangre} = req.body

        connection.query('UPDATE alumnos SET nombres = ? WHERE id = ?', [nombres, id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Alumno: ${nombres} modificado.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})




// Get "profesores"
app.get('/teachers', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from profesores', (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Get "profesores" by id
app.get('/teachers/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from profesores WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Delete a record
app.delete('/teachers/del/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE from profesores WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Profesor con ID: ${[req.params.id]} ha sido eliminado.`)
            } else {
                console.log(err)
            }
        })
    })
})


// Add a record
app.post('/teachers/add', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT INTO  profesores SET ?', params, (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Nuevo profesor añadido.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


// update a record
app.put('/teachers/modify', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const {id, nombres, apellido_1, apellido_2, fecha_nacimiento, direccion, correo_electronico, profesion, idiomas, turno} = req.body

        connection.query('UPDATE profesores SET nombres = ? WHERE id = ?', [nombres, id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Profesor: ${nombres} modificado.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


// Listen on enviroment port port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))
