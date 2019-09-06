const mongoose = require('mongoose');
let express= require('express');
let User = require('./models/user');
let Car =require('./models/car');
let app =express();

let url = "mongodb://localhost:27017/week6lecture2";

mongoose.connect(url,function(err){
   if (err) console.log(err);
   else{
       console.log("Successfully Connected");
       let user = new User({
           name: "Ben",
           age: 18,
           address: "Melbourne"
       });

       user.save(function(err){
           if (err) console.log(err);
           else{
               console.log("User is saved");
           }
       });
   };

});

//Top 2 result
app.get('/getusers', function(req,res){
    User.find().limit(2).exec(function(err,data){
       res.send(data);
    });
});

app.get('/adduser/:name/:age/:address/:maker/:year', function(req,res){
    let theName = req.params.name;
    let theAge = req.params.age;
    let theAddress = req.params.address;
    let theMaker = req.params.maker;
    let theYear = parseInt(req.params.year);

    let user = new User({
        name: theName,
        age: theAge,
        address: theAddress
    });

    user.save(function(err){
        if (err) console.log(err);
        else{
            console.log("User is saved");
            let car = new Car({
                maker: theMaker,
                year: theYear,
                user: user._id
            });

            car.save(function(err){
                if (err) console.log(err);
                else{console.log("Car successfully saved")};
            })
        }
    });
    res.redirect('/getusers');

})

app.get('/getcars', function(req,res){
    Car.find().populate('user').exec(function(err,data){
        res.send(data);
    });
});



app.listen(8080);





// const Author = require('./models/author');
// const Book = require('./models/book');

// mongoose.connect('mongodb://localhost:27017/libDB', function (err) {
//     if (err) {
//         console.log('Error in Mongoose connection');
//         throw err;
//     }
//     console.log('Successfully connected');
//     let author1 = new Author({
//         _id: new mongoose.Types.ObjectId(),
//         name: {
//             firstName: 'Tim',
//             lastName: 'John'
//         },
//         age: 80
//     });
//     author1.save(function (err) {
//         if (err) throw err;
//         console.log('Author successfully Added to DB');
//         var book1 = new Book({
//             _id: new mongoose.Types.ObjectId(),
//             title: 'FIT2095 Book',
//             author: author1._id,
//             isbn: '123456',
//         });
//         book1.save(function (err) {
//             if (err) throw err;
//             console.log('Book1 successfully Added to DB');
//         });
//         var book2 = new Book({
//             _id: new mongoose.Types.ObjectId(),
//             title: 'MEAN Stack with FIT2095',
//             author: author1._id
//         });
//         book2.save(function (err) {
//             if (err) throw err;
//             console.log('Book2 successfully add to DB');
//         });
//     });
// });