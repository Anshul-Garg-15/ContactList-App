const express = require('express');
const port = 8001;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./model/contact');
const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var ContactList = [
    {
        name:"Anshul Garg",
        phone: 1236547624
    },
    {
        name:"Anshul Garg",
        phone: 1236547624
    },
    {
        name:"Anshul Garg",
        phone: 1236547624
    }
]
// app.get('/',function(req,res){

//     return res.render('home',{
//         title:'My First App',
//         Contact_List:ContactList
//     });
    

// });

//to fetch data from database 
app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log("error");
            return;
        }

        return res.render('home',{
            title:'My First Contact List App',
            Contact_List:contacts
        });
       


    });

     

});


app.get('/practise',function(req,res){

    return res.render('practice',{title:'Playing with EJS'});

});

// to update data in mongoDB 

app.post('/createlist',function(req,res){

    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error');
            return;
        }
        console.log('**',newContact);
        return res.redirect('/');
    });
});
 //To render form data on home page
// app.post('/createlist',function(req,res){
//     ContactList.push({
//         name:req.body.name,
//         phone:req.body.phone
//     });
    // or
    // ContactList.push(req.body);
//     return res.redirect('/');
// });
//to redirect page or render data on practice.ejs
// app.post('/createlist',function(req,res){
//     return res.redirect('/practise');
// });
//for using params(doesnt show data in the url)
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);
//     let phone = req.params.phone;
// });

//for using query(shows data in the url) to delete the contact
// app.get('/delete-contact',function(req,res){
//     console.log(req.query);
//     let phone = req.query.phone;
//     let contactIndex = ContactList.findIndex(contact => contact.phone==phone)

//     if(contactIndex!=-1){
//         ContactList.splice(contactIndex,1);
//     }
//     return res.redirect('/');
// });

// delete data from database 
app.get('/delete-contact/:id',function(req,res){
    // get the id of contact
    let id = req.params.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error");
        }

        return res.redirect("/");
    });
});

app.listen(port,function(err){

    if(err){
        console.log('Error',err);
        return;
    }
    console.log('My First App is running on port',port);
});