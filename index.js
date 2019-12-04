const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

const url = 'mongodb+srv://kolimayurs:29031991@cluster0-onizc.mongodb.net';

app.get('/', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) {
            return res.send(err);
        }
        var dbo = db.db("myDB");
        dbo.collection("Interview").find({}).toArray(function(err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.json({
                    data: result
                })
            }
            db.close();
        });
    });
});
app.post('/add', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) {
            return res.send(err);
        }
        var dbo = db.db("myDB");
        console.log(req.body.question);
        var myobj = { question: req.body.question, answer: req.body.answer };
        dbo.collection("Interview").insertOne(myobj, function(err, result) {
            if (err) {
                return res.send(err);
            }
            console.log("1 document inserted");
            res.send('1 document inserted');
            db.close();
        });
    });
});

app.post('/delete', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) {
            return res.send(err);
        }
        var dbo = db.db("myDB");
        var myobj = { question: req.body.question };
        dbo.collection("Interview").deleteOne(myobj, function(err, result) {
            if (err) {
                return res.send(err);
            }
            console.log("1 document deleted");
            res.send('1 document deleted');
            db.close();
        });
    });
});

app.post('/update', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) {
            return res.send(err);
        }
        var dbo = db.db("myDB");
        var myquery = { question: req.body.oldquestion };
        var newvalues = { $set: { question: req.body.question, answer: req.body.answer } };
        dbo.collection("Interview").updateOne(myquery, newvalues, function(err, result) {
            if (err) {
                return res.send(err);
            }
            console.log("1 document update");
            res.send('1 document update');
            db.close();
        });
    });
});
app.listen(PORT, () => {
    console.log('App listen to ' + PORT + ' Port.');
})