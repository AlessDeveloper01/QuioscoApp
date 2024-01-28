import { useState, useEffect } from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const ModalProducto = () => {

  const { producto, handleChangeModal, handleAgregarPedido, resetearProducto, pedido } = useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  // Comprobar si el modal actual esta en el pedido
  const existe = pedido.some(productoState => productoState.id === producto.id);

  useEffect(() => {
    if (existe) {
      const productoEdicion = pedido.find(productoState => productoState.id === producto.id);
      setEdicion(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [producto, pedido])

  return (
    <div className='flex gap-10'>
      <div className='md:w-1/3'>
        <Image
          width={300}
          height={400}
          alt={`Imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>
      <div className='md:w-2/3'>
        <div className="flex justify-end">
          <button
            onClick={() => {
              handleChangeModal();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="text-5xl font-black text-amber-500 mt-5">{formatearDinero(producto.precio)}</p>

        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button
            type="button"
            onClick={() => {
              setCantidad(cantidad + 1);
            }}
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 w-full mt-5 px-5 py-2 text-white uppercase font-bold rounded"
          onClick={() => {
            handleAgregarPedido({ ...producto, cantidad });
            handleChangeModal();
            resetearProducto();
          }}
        >
          { edicion ? 'Editar el producto' : 'Añadir al pedido'}
        </button>
      </div>
    </div>
  )
}

export default ModalProducto
