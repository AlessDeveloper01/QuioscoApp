
import { useRouter } from 'next/router'

const pasos = [
    { paso: 1, nombre: 'Menu', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/resumen' },
    { paso: 3, nombre: 'Detalles y Total', url: '/total' },
]

const Pasos = () => {

  const router = useRouter();

  const calcularProgreso = () => {
    let valor;
    if (router.pathname === '/') valor = 2;
    if (router.pathname === '/resumen') valor = 50;
    if (router.pathname === '/total') valor = 100;
    return valor;
  }

  return (
    <>
          <div className="flex justify-between mb-5">
              {
                  pasos.map(paso => (
                      <button
                          key={paso.paso}
                          onClick={() => {
                            router.push(paso.url);
                          }}
                            className="text-2xl font-bold"
                      >
                          {paso.nombre}
                      </button>
                  ))
              }
      </div> 
      
      <div className='bg-gray-100 mb-10'>
        <div className='rounded bg-amber-500 text-xs leading-none h-2 text-center text-wrap'
          style={{
            width: `${calcularProgreso()}%`
          }}
        ></div>
      </div>
    </>
  )
}

export default Pasos
