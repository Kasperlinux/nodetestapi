let express = require('express');
let app = express();
let port =  9310;
let cors = require('cors');

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
// let MongoClient = require('mongodb').MongoClient;

// let mongoUrl = "mongodb://127.0.0.1:27017";
let mongoUrl = "mongodb+srv://kd:kd123@cluster0.rob26l9.mongodb.net/?retryWrites=true&w=majority";

let db = null;
const dbName= "kushal";

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hi from express')
})

//Get All Location
app.get('/location',(req,res) => {
    db.collection('location').find().toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })
})


//Get All Restaurant wrt city  query param
app.get('/restaurant/:id',(req,res) => {
    let state_id=Number(req.params.id);
    db.collection('restaurant').find({state_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })
})

//Get All  Mealtype
app.get('/mealtype',(req,res) => {
    db.collection('mealtype').find().toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })
})

//Get Restaurant Deatils
app.get('/details/:restid',(req,res) => {
    let restaurant_id=Number(req.params.restid)
    db.collection('restaurant').find({restaurant_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })
})

//Get All Restaurant
app.get('/restaurants',(req,res) => {
    let query = {}
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);
    if(stateId)
    {
        query={state_id:stateId}
    }else if(mealId)
    {
        query={"mealTypes.mealtype_id":mealId}
    }else {

    }
    db.collection('restaurant').find(query).toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })
})

//listing page data
app.get('/filter/mealId/cuisine',(req,res)=>{
   let mealId = Number(req.params.mealId)
   let query = {"mealTypes.mealtype_id":1,"cuisines.cuisine_id":3}

   db.collection('restaurant').find(query).toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })

})

// // Restaurants wrt meal type and Cuisine
app.get('/filter/:mealId',(req,res)=>{

    let mealID = Number(req.params.mealId)
    let cuisineID = Number(req.query.cuisineId)
    let query = {};

    if(cuisineID){
        query = {
            "mealTypes.mealtype_id":mealID,
            "cuisines.cuisine_id":cuisineID
        }
    }else{
        query = {"mealTypes.mealtype_id":mealID}
    }
    db.collection('restaurant').find(query).toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })
})

//Menu wrt restaurant
app.get('/menu/:id',(req,res) => {
    let restaurant_id=Number(req.params.id)
    db.collection('menu').find({restaurant_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data);
    })
})

// Connect with mongodb
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('Error');
    db = client.db(dbName); //database name
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
    
});

// //Get All Restaurant wrt city param 
// app.get('/restaurant/:id',(req,res) => {
//     let state_id=Number(req.params.id);
//     db.collection('restaurant').find({state_id}).toArray((err,data) => {
//         if(err) throw err;
//         res.send(data);
//     })
// })



