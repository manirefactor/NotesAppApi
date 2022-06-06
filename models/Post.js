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
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    year:{type:String,
        required:true},
    hour:{type:String,
        required:true},
    min:{type:String,
        required:true}
});

module.exports=mongoose.model('note',NotesSchema);