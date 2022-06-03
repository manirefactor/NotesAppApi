const mongoose=require('mongoose');
const NotesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    nbody:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('note',NotesSchema);