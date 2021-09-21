const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = "mongodb+srv://yoda:force@cluster0.mlnry.mongodb.net/star-wars-quotes?retryWrites=true&w=majority"


MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        quotesCollection = db.collection('quotes')


        app.set('view engine', 'ejs')





        app.listen(3000, function() {
            console.log('listening on 3000')
        })

        app.use(bodyParser.urlencoded({ extended: true }))



        app.get('/', (req, res) => {
            // res.sendFile(__dirname + '/index.html')
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))

            // Note: __dirname is the current directory you're in. Try logging it and see what you get!
            // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
        })


        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })



    })
console.log('May Node be with you')