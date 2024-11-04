import express from 'express';
import Store from '../models/Store.js';

const router = express.Router();

// Obtener todos los registros
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener registros por filtro (Ejemplo: nombre o ciudad)
router.get('/search', async (req, res) => {
    const { name, city } = req.query;
    const filter = {};

    if (name) filter.name = new RegExp(name, 'i'); // Búsqueda insensible a mayúsculas/minúsculas
    if (city) filter.city = new RegExp(city, 'i');

    try {
        const stores = await Store.find(filter);
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un registro por ID
router.get('/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;