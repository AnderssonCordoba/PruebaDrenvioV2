import mongoose from 'mongoose';
 
const clientSchema = new mongoose.Schema({
  nombre: {
    type:     String,
    required: true, 
  },
  identificacion:{
    type:      Number,
    required: true,
    unique:   true
  },
  telefono: {
    type:     String,
    required: true,
    unique:   true
  },
  email: {
    type:     String,
    required: true,
    unique:   true
  },
  specialBrands: [{
    type:    mongoose.Schema.Types.ObjectId,
    ref:     'Brand',
  }],
  Sales: [{
    type:    mongoose.Schema.Types.ObjectId,
    ref:     'Sale',
  }],

});
 
const Client = mongoose.model('Client',clientSchema);
 
export default Client;