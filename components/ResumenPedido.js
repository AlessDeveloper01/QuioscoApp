import Image from "next/image"
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const ResumenPedido = ({ producto }) => {
    
    const { handleEditarCantidades, handleEliminarProducto } = useQuiosco();
  return (
    <div className='shadow p-5 mb-3 flex gap-10 items-center'>
          <div className='md:w-1/6'>
              <Image
                  width={300}
                  height={400}
                  alt={`Imagen producto ${producto.nombre}`}
                    src={`/assets/img/${producto.imagen}.jpg`}
              />
          </div>
          <div className="md:w-4/6">
              <p className="text-3xl font-bold">{producto.nombre}</p>
              <p className="text-xl font-bold mt-2">Cantidad: {producto.cantidad}</p>
              <p className="text-xl font-bold mt-2 text-amber-500">Precio: {formatearDinero(producto.precio)}</p>
              <p className="text-sm text-gray-900 mt-2">Subtotal: {formatearDinero(producto.precio * producto.cantidad)}</p>
          </div>
          <div>
                <button
                    type="button"
                  className="bg-sky-700 flex px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full text-center mb-4 gap-2"
                  onClick={() => {
                      handleEditarCantidades(producto.id);
                  }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                     Editar
                </button>
                <button
                  type="button"
                  className="bg-red-700 flex px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full text-center gap-2"
                  onClick={() => {
                      handleEliminarProducto(producto.id);
                  }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                  Eliminar
                </button>
          </div>
    </div>
  )
}

export default ResumenPedido
