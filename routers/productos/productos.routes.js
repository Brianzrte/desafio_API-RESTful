const express = require('express');
const { productos } = require('../../data/data');
const generarID = require('../../util/util');

const router = express.Router();

//ruta raiz


router.get('/', (req, res) => {
    
    if(productos) {
        res.json(productos);
    } else {
        res.status(404).json({
            error: 'No hay productos'
        });
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(producto => producto.id == id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const { nombre, precio, thumbnail } = req.body;
    if (nombre && precio && thumbnail) {
        const producto = {
            id: generarID(),
            nombre,
            precio,
            thumbnail
        };
        productos.push(producto);
        res.json(producto);
    } else {
        res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, thumbnail } = req.body;
    if (nombre && precio && thumbnail) {
        const producto = productos.find(producto => producto.id == id);
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
    const producto = productos.find(producto => producto.id == id);
    if (producto) {
        const index = productos.indexOf(producto);
        productos.splice(index, 1);
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;