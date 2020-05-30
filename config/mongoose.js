//require the library
const mongoose = require('mongoose');

//connect to the database(contact_list_db is a database name)
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection in db(to check it successfull or not)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'Db is not connected'));

//up and running then print the message
db.once('open',function(){
   console.log('Successfully connected to db');
});

