const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose=require('mongoose');
const express = require('express');
const Note=require('./models/Post');

const app = express();
const port=process.env.PORT || 8000;

//Connect to Db 
//mongoose.connect('mongodb://localhost:27017/sampledb',()=>console.log('MongoDb is Connected....!!'));

mongoose.connect('mongodb+srv://manitrak:KvtFpnvCh8VaEHcz@cluster0.sqrev.mongodb.net/?retryWrites=true&w=majority',
()=>console.log('MongoDb is Connected....!!'));

/*mongoose.connect('mongodb+srv://cluster0.sqrev.mongodb.net/?retryWrites=true&w=majority',{
    dbname:'noteappDb',
    user:'manitrak',
    pass:'KvtFpnvCh8VaEHcz'
},()=>console.log('MongoDb is Connected....!!'));*/

console.log(`And the server is at http://localhost:${port}`);

//Middlewares
app.use(express.json());

//Allow origin Access origin 
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

//How to start listening to server
app.listen(port);

//Routes
app.get('/',(req,res)=>{
    res.send('This is Landing Page!');
})

//GET API to get all records
app.get('/gnote',async(req,res)=>{
    try{
        const notes= await Note.find();
        res.json(notes);
    }catch(err){
        res.json({message:err});
    }
});

//To Get Specific Record
app.get('/gnote/:noteId',async(req,res)=>{
    try{
        const note=await Note.findById(req.params.noteId);
        res.json(note);
    }catch(err){
        res.json({message:err});
    }

});
//DELETE API

app.delete('/dnote/:Id',async(req,res)=>{
    try{
        const removedNote=await Note.deleteOne({id:req.params.Id});
        alert('The Note is deleted Successfully 😀');
    }
    catch(err){res.json({message:`Note not found Bro 😢!  ${err}`});}
});


//Post API
app.post('/pnote',async(req,res)=>{
    const NewNote=new Note({
        id:req.body.id,
        title:req.body.title,
        dec:req.body.dec,
        date:req.body.date,
        month:req.body.month,
        year:req.body.year,
        hour:req.body.hour,
        min:req.body.min
    });
    NewNote.save().then(data=>{res.json(data)})
    .catch(err=>{
        res.json({message:`Error bro! ${err}`});
    });
    
    /*const NewNote=new Post({
        title:req.body.title,
        nbody:req.body.nbody
    });
    try{
        const savedNote=await Post.save();
        res.json(savedPost);
    }
    catch(err){
        res.json({message:err});
    }*/
    

});

//Update a Note
app.patch('/upnote/:Id',async(req,res)=>{
    try{
        const updatedNote= await Note.updateOne(
            {id:req.params.Id},
            {$set:{title:req.body.title,
                dec:req.body.dec,
                date:req.body.date,
                month:req.body.month,
                year:req.body.year,
                hour:req.body.hour,
                min:req.body.min}
            },
            
        );
        res.json(updatedNote);
    }
    catch(err){
        res.json({message:err});
    }
});
