const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kheyre:kheyre123@cluster0.styxogk.mongodb.net/ExpTrackerApp?retryWrites=true&w=majority", {}, (err) => {
    if(!err)  console.log('connected');
    else{
        console.log(err)
    }
})