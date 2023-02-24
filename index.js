const express = require('express');
const ejs = require('ejs');
const Transaction = require('./models/transactions');

// app intialize 
const app = express();

// port 
let port = 5000;

/* setting engine */
app.set('view engine', 'ejs')
app.engine('ejs', ejs.renderFile)


// db
require('./db/db');




app.use(express.urlencoded({extended: true}));
app.use(express.json());


// public diretory

app.use(express.static('./public'))


app.get('/', async (req, res) => {
    const transaactions =  await Transaction.find({}).sort({createdAt: -1}).limit(5)


    let income_count = await Transaction.aggregate([
        {
            $match:{
                type: "1"
            }
        },
        {
            $group:{
                _id: null,
                income: {$sum: '$amount'}
            }
        }
    ])


    let expense_count = await Transaction.aggregate([
        {
            $match:{
                type: "2"
            }
        },
        {
            $group:{
                _id: null,
                expense: {$sum: '$amount'}
            }
        }
    ])


    //console.log('transaactions', transaactions)
    res.render('index', {
        transaactions,
        income_count,
        expense_count
    });
})

app.post('/add_new_transaction', async(req, res) => {
    try {
        //console.log(req.body);

        let obj = {
            titel: req.body.title,
            amount: req.body.amount,
            type: req.body.type,

        }
        //console.log(obj)

        // insertion 

        if(req.body.op === 'I'){
            new Transaction(obj).save().then((success) => {
                res.redirect('/')
            }).catch((err) => {
                console.log(err);
            })
        }else{
            // update 
            let current_transaction = await Transaction.findOne({_id: req.body.id})
            current_transaction.amount = req.body.amount,
            current_transaction.type = req.body.type,
            current_transaction.titel= req.body.title

            current_transaction.save().then(success=>{
                res.redirect('/')
            }).catch(err=>{
                console.log('err', err)
            })

        }
    } catch (error) {
        console.log(error)
    }
})




app.listen(port)