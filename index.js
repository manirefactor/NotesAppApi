const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose=require('mongoose')
const express = require('express');
const Note=require('./models/Post');

const app = express();
const PORT=8000;

//Connect to Db 
//mongoose.connect('mongodb://localhost:27017/sampledb',()=>console.log('MongoDb is Connected....!!'));

mongoose.connect('mongodb+srv://manitrak:KvtFpnvCh8VaEHcz@cluster0.sqrev.mongodb.net/?retryWrites=true&w=majority',
()=>console.log('MongoDb is Connected....!!'));

/*mongoose.connect('mongodb+srv://cluster0.sqrev.mongodb.net/?retryWrites=true&w=majority',{
    dbname:'noteappDb',
    user:'manitrak',
    pass:'KvtFpnvCh8VaEHcz'
},()=>console.log('MongoDb is Connected....!!'));*/

console.log(`And the server is at http://localhost:${PORT}`);

//Middlewares
app.use(express.json())

//How to start listening to server
app.listen(PORT)

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
        res.json({message:err})
    }

});
//DELETE API

app.delete('/dnote/:noteId',async(req,res)=>{
    try{
        const removedNote=await Note.deleteOne({_id:req.params.noteId});
        res.json(removedNote);
    }
    catch(err){res.json({message:`Note not found Bro!  ${err}`});}
});


//Post API
app.post('/pnote',async(req,res)=>{
    const NewNote=new Note({
        title:req.body.title,
        nbody:req.body.nbody
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
app.patch('/upnote/:noteId',async(req,res)=>{
    try{
        const updatedNote= await Note.updateOne(
            {_id:req.params.noteId},
            {$set:{title:req.body.title,nbody:req.body.nbody}},
            
        );
        res.json(updatedNote);
    }
    catch(err){
        res.json({message:err});
    }
});
