import { Schema, Model, model } from 'mongoose';

/*
Brand
Store
Number
Store
Name
Ownership
Type
Street
Address
City
State/Province
Country
Postcode
Phone Number
Timezone
Longitude
Latitude










* */

interface IStore {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    phone: string;
    email: string;
}

interface StoreMethods {
    distance:(lat: number, lon: number) => number;
}

type StoreModel = Model<IStore, {}, StoreMethods>
const StoreSchema: Schema = new Schema<IStore, StoreModel, StoreMethods>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});

StoreSchema.method('distance', function(this: IStore, lat: number, lon: number):number{
    const R: number = 6371; // Radio de la Tierra en kilómetros
    const dLat: number = ((lat - this.latitude) * Math.PI) / 180;
    const dLon: number = ((lon - this.longitude) * Math.PI) / 180;
    const a: number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((this.latitude * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
})

const Store: StoreModel = model<IStore, StoreModel>('Store', StoreSchema);

export default Store;