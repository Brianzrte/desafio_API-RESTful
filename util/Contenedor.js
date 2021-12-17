const { productos } = require('../data/data');
const  generarID  = require('./util');
class Contenedor {

    constructor(){
       this.productos = productos;
    }

    save(obj){
        if (!obj) {
            return false;
        }
        const nuevoRegistro = { ...obj, id : generarID() };
        this.productos.push(nuevoRegistro);
        return nuevoRegistro.id;
    }

    getAll(){
        return this.productos;
    }

    getById(id){
        if(!id) return false;
        const producto = this.productos.find(producto => producto.id == id);
        if (producto) {
            return producto;
        } else {
            return false;
        }
    }

    deleteById(id){
        if(!id) return false;
        const producto = this.productos.find(producto => producto.id == id);
        if (producto) {
            const index = this.productos.indexOf(producto);
            this.productos.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Contenedor;