import Head from 'next/head'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client';

export default function Home({ categorias }) {

  // useEffect(() => {
  //   const consultarDB = async () => {
  //     const resultado = await fetch('/api/categorias');
  //     const categorias = await resultado.json();
  //     console.log(categorias);
  //    }
  //   consultarDB();
  // }, [])

  console.log(categorias);
  return (
    <h1>Hola Mundo</h1>    
  )
}

export const getServerSideProps = async () => {

  const prisma = new PrismaClient();

  const categorias = await prisma.categoria.findMany();

  return {
    props: {
      categorias
    }
  }
}