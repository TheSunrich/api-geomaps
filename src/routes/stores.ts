import express from 'express';
import {
  addStore,
  listStores,
  listStoresByFilters,
  listStoresById,
  listStoresByRange
} from '../controllers/storeController';

const router = express.Router();



// Obtener todos los registros
router.get('/', listStores);

// Obtener registros por filtro (Ejemplo: nombre o ciudad)
router.get('/search', listStoresByFilters);

// Ruta para obtener las tiendas dentro del rango
router.get('/range', listStoresByRange);

// Obtener un registro por ID
router.get('/:id', listStoresById);

// Agregar un registro
router.post('/', addStore);


export default router;