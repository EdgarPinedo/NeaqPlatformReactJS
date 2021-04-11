import React, {useEffect, useState} from 'react'
import {store} from "../dataBase";
import Product from "./product";

export default function Mostrador(props) {
    const [libros, setLibros] = useState('')

    useEffect(() => {
        const getLibros = async () => {
            const {docs} = await store.collection('libros').get()
            const listaLibros = docs.map(item => ({id:item.id, ...item.data()}))
            setLibros(listaLibros)
        }
        getLibros()
    },[])


    return (
        <main style={{
            width: '125vh',
            margin: '20px',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div className='row'>
                {
                    libros ?
                        (
                            libros.map(item => (
                                <Product key={item.id} item={item}
                                         className='align center'>
                                </Product>
                            ))
                        )
                        :
                        (<span>No hay Libros</span>)
                }
            </div>
        </main>
    )
}