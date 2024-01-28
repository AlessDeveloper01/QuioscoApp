import useQuiosco from "../hooks/useQuiosco"
import Layout from "../layout/Layout"
import ResumenPedido from "../components/ResumenPedido"

export default function Resumen() {

    const { pedido } = useQuiosco();

    return (
        <Layout
            pagina="Resumen"
        >
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>

            {
                pedido.length === 0 ? (
                    <h1>No hay elementos en tu pedido</h1>
                ) : (
                    pedido.map(producto => (
                        <ResumenPedido
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )
            }
        </Layout>
    )
}