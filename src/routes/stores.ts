import express from 'express';
import Store from '../models/store';
const router = express.Router();

// Obtener todos los registros
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Obtener registros por filtro (Ejemplo: nombre o ciudad)
router.get('/search', async (req, res) => {
    try {
        const stores = await Store.find(req.query);
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Obtener un registro por ID
router.get('/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        res.json(store);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


export default router;