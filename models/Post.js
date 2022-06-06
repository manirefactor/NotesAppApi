const mongoose=require('mongoose');
const NotesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    dec:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    year:{type:Number,
        required:true},
    hour:{type:Number,
        required:true},
    min:{type:Number,
        required:true}
});

module.exports=mongoose.model('note',NotesSchema);