let express =require("express");
let app = express();
let mongoose = require("mongoose");

let url = "mongodb://localhost:27017/wDB"
let Warehouse = require('./models/warehouse');
let Item =require('./models/items')


mongoose.connect(url, function(err){
    if (err) throw err;
    console.log("Connected Successfully");
})
app.listen(8080);

app.get('/', function(req,res){
    res.send('Welcome to Week 7');
});

//Create Warehouse
app.get('/addwarehouse/:name/:quantity/:address', function(req,res){
   // let wH = new Warehouse({
   //     _id:new mongoose.Types.ObjectId,
   //     name:req.params.name,
   //     quantity : req.params.quantity,
   //     address:req.params.address
   // })
   // wH.save(function(err){
   //     if (err) throw err;
   //     console.log("Successfully saved to the database");
   // })
   //
   //  res.redirect('/');

    Warehouse.create({
            // _id:new mongoose.Types.ObjectId,
            name:req.params.name,
            quantity : req.params.quantity,
            address:req.params.address
    }),
        function(err){
         if (err) console.log(err.message);
        }
});

//Get Warehouse Details
app.get('/getWarehouseDetails', function(req,res){
    Warehouse.find().exec(function(err,data){
        res.send(data);
    })
});

//Create items

app.get('/additem/:whID/:name/:cost/:quantity', function(req,res){
    Item.create({
        name:req.params.name,
        cost: req.params.cost,
        quantity: req.params.quantity,
        Warehouse: req.params.whID
    },
        function(err){
        if (err) console.log(err.message);
        });


});

app.get('/getItemDetails', function(req,res){
    Item.find().populate('Warehouse').exec(function(err,data){
        if (err) throw err;
        res.send(data);
    })
});