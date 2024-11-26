import { Schema, Model, model } from 'mongoose';

interface IStore {
    brand: string
    storeNumber: string
    storeName: string
    ownershipType: string
    city: string
    state: string
    country: string
    postcode: string
    address: string;
    phone: string;
    email: string;
    timezone: string
    latitude: number;
    longitude: number;
}

interface StoreMethods {
    distance:(lat: number, lon: number) => number;
}

type StoreModel = Model<IStore, {}, StoreMethods>
const StoreSchema: Schema = new Schema<IStore, StoreModel, StoreMethods>({
    brand: { type: String, required: true },
    storeNumber: { type: String, required: true },
    storeName: { type: String, required: true },
    ownershipType: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postcode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    timezone: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
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