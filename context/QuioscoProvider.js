
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const obtenerCategorias = async () => {
        try {
            const {data} = await axios.get('/api/categorias');
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
        setTotal(nuevoTotal);
    }, [pedido])

    const handleClickCategoria = (id) => {
        const categoriasFilter = categorias.filter(cat => cat.id === id);
        setCategoriaActual(categoriasFilter[0]);
        router.push('/')
    }
    
    const handleSetProducto = (producto) => {
        setProducto(producto);
    }

    const resetearProducto = () => {
        setProducto({});
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        const existe = pedido.some(productoState => productoState.id === producto.id);

        if (existe) {
            const productos = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
            setPedido(productos);
            toast.success('Guardado correctamente');
        } else {
            setPedido([
                ...pedido,
                producto
            ])
            toast.success('Producto agregado al pedido');
        }
    }
    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(productoState => productoState.id === id);
        setProducto(productoActualizar[0]);
        setModal(!modal);
    }

    const handleEliminarProducto = id => {
        const productosPedido = pedido.filter(productoState => productoState.id !== id);
        setPedido(productosPedido);
        toast.error('Producto eliminado del pedido');
    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        if (nombre.trim() === '' || nombre.length < 3) {
            toast.error('El nombre es obligatorio');
            return;
        }
        
        try {
            await axios.post('/api/ordenes', {
                nombre,
                pedido,
                total,
                fecha: Date.now().toString()
            });

            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);
            
            toast.success('Orden colocada correctamente');
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
     }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                producto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                resetearProducto,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                setNombre,
                nombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;