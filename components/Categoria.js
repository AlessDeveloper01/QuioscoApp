
import Image from 'next/image';
import useQuiosco from '../hooks/useQuiosco';

const Categoria = ({categoria}) => {
  const { nombre, id, icono } = categoria;
  
  const { handleClickCategoria, categoriaActual } = useQuiosco();

    return (
      <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
        <Image
          alt="Imagen icono"
          width={70}
          height={70}
          className='mr-5'
          src={`/assets/img/icono_${icono}.svg`}
        />

        <button
          type='button'
          className='text-2xl font-bold hover:cursor-pointer'
          onClick={() => handleClickCategoria(id)}
        >
          {nombre}
        </button>
      </div>
    )
}

export default Categoria
