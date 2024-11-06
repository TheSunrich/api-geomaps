import mongoose from 'mongoose';
const { Schema } = mongoose;

const storeSchema = new Schema({
    id: Number,
    name: String, // String is shorthand for {type: String}
    description: String,
    latitude: Number,
    longitude: Number,
    address: String,
    phone: String,
    email: String
});

const Store = mongoose.model('Store', storeSchema);

export default Store;