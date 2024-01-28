import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from '../layout/AdminLayout'
import Orden from '../components/Orden'

export default function Admin() {

    const fetcher = async () => {
        const { data } = await axios.get('/api/ordenes')
        return data.ordenes
    }

    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {
        refreshInterval: 100
    })

    return (
        <AdminLayout
            pagina={'Admin'}
        >
            <h1 className="text-4xl font-black">Panel de Administracion</h1>
            <p className="text-2xl my-10">Administra todas las ordenes y despachalas</p>

            {
                data && data.length ? (
                    data.map(orden => (
                        <Orden
                            key={orden.id}
                            orden={orden}
                        />
                    ))
                ): (
                    <p className="text-2xl">No hay ordenes aun</p>
                )
            }
        </AdminLayout>
    )
 }