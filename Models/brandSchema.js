import mongoose from 'mongoose';
 
const brandSchema = new mongoose.Schema({
  nombre: {
    type:      String,
    required:  true,  
    unique:    true,
    maxlength: 50,
    minlength: 2,
  }, 

});
 
const Brand = mongoose.model('Brand', brandSchema);
 
export default Brand;