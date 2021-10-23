
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

//setting up the cors config
app.use(cors({
    origin: 'https://crud-mysql2021.herokuapp.com'
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

// Get
app.get('/', (req, res) => {
    res.send("WELCOME :)")
})

// Get "students"
app.get('/students', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from students', (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Get "students" by id
app.get('/students/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from students WHERE id = ?', [req.params.id], (err, rows) => {
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

        connection.query('DELETE from students WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Student with ID: ${[req.params.id]} has been removed.`)
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

        connection.query('INSERT INTO  students SET ?', params, (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`New student added.`)
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

        const {id, names} = req.body

        connection.query('UPDATE students SET names = ? WHERE id = ?', [names, id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Modified student: ${names}.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})




// Get "teachers"
app.get('/teachers', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from teachers', (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Get "teachers" by id
app.get('/teachers/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from teachers WHERE id = ?', [req.params.id], (err, rows) => {
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

        connection.query('DELETE from teachers WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Teacher with ID: ${[req.params.id]} has been removed.`)
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

        connection.query('INSERT INTO  teachers SET ?', params, (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`New teacher added.`)
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

        const {id, names} = req.body

        connection.query('UPDATE teachers SET names = ? WHERE id = ?', [names, id], (err, rows) => {
            connection.release() //return the connection to pool

            if(!err) {
                res.send(`Modified teacher: ${names}.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


// Listen on enviroment port port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))
