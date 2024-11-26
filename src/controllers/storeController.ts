import { Request, Response } from 'express';
import Store from '../models/store';
import mongoose from "mongoose";

export const listStores = async (req: Request, res: Response): Promise<void> => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const listStoresByFilters = async (req: Request, res: Response): Promise<void> => {
    const {name} = req.query;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        res.status(400)
            .json({message: 'Por favor, proporciona un nombre válido para buscar.'});
        return;
    }

    try {
        const stores = await Store.find({
            name: {$regex: name.trim(), $options: 'i'},
        });

        res.json(stores);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const listStoresById = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400)
                .json({message: 'Invalid ID format'});
            return;
        }

        const store = await Store.findById(id);
        res.json(store);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}

export const addStore = async (req: Request, res: Response): Promise<void> => {
    const {
        brand,
        storeNumber,
        storeName,
        ownershipType,
        city,
        state,
        country,
        postcode,
        address,
        phone,
        email,
        timezone,
        latitude,
        longitude
    } = req.body;

    if (
        !brand ||
        !storeNumber ||
        !storeName ||
        !ownershipType ||
        !city ||
        !state ||
        !country ||
        !postcode ||
        !address ||
        !phone ||
        !email ||
        !timezone ||
        !latitude ||
        !longitude
    ) {
        res.status(400)
            .json({message: 'All fields are required'});
        return;
    }

    try {
        const newStore = new Store({
            brand,
            storeNumber,
            storeName,
            ownershipType,
            city,
            state,
            country,
            postcode,
            address,
            phone,
            email,
            timezone,
            latitude,
            longitude
        });
        const savedStore = await newStore.save();
        res.status(201)
            .json(savedStore);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}


export const listStoresByRange = async (req: Request, res: Response): Promise<void> => {
    const {lat, lon, range} = req.query;

    if (!lat || !lon || !range) {
        res.status(400)
            .json({
                message: "Por favor, proporciona lat, lon y range como parámetros.",
            });
    }

    const latitude: number = parseFloat("" + lat);
    const longitude: number = parseFloat("" + lon);
    const rangeKm: number = parseFloat("" + range);

    console.log(latitude, longitude, rangeKm);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(rangeKm)) {
        res.status(400)
            .json({
                message: "Los valores de lat, lon y range deben ser números válidos.",
            });
    }

    try {
        const stores = await Store.find()
            .exec();
        const storesInRange = stores.filter((store) => {
            const distance = store.distance(latitude, longitude);
            return distance <= rangeKm;
        });
        res.json(storesInRange);
    } catch (error) {
        res.status(500)
            .json({message: error});
    }
}