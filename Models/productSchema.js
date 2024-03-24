import mongoose from 'mongoose';
 
const productSchema = new mongoose.Schema({ 
    nombre: {
        type:     String,
        required: true
    },
    Brand: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Brand',
        required: true,  
    }, 
    Stock: {
        type:     Number,
        required: true,
    },
    price: {
        type:     Number,
        required: true,
    },
    special_price: {
        type:     Number,
        required: true,
    }
});
 
const Product = mongoose.model('Product', productSchema);
 
export default Product;