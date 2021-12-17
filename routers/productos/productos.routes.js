const express = require('express');
const Contenedor = require('../../util/Contenedor');

const contenedor = new Contenedor();
const router = express.Router();
//ruta raiz


router.get('/', (req, res) => { 
    if(contenedor.getAll()) {
        res.json(contenedor.getAll());
    } else {
        res.status(404).json({
            error: 'No hay productos'
        });
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if(contenedor.getById(id)) {
        res.json(contenedor.getById(id));
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const { nombre, precio, thumbnail } = req.body;
    if (nombre && precio && thumbnail) {
        const producto = {
            nombre,
            precio,
            thumbnail
        };
        res.json(contenedor.save(producto));
    } else {
        res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, thumbnail } = req.body;
    if (nombre && precio && thumbnail) {
        const producto = contenedor.getById(id);
        if (producto) {
            producto.nombre = nombre;
            producto.precio = precio;
            producto.thumbnail = thumbnail;
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } else {
        res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (contenedor.deleteById(id)) {
        res.json({
            message: 'Producto eliminado'
        });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
    
});

module.exports = router;