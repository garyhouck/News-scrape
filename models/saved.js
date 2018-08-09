let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NoteSchema = new Schema({    
    title: String,   
    body: String
  });
  
 
  var Note = mongoose.model("Saved", NoteSchema);  
 
  module.exports = Note;