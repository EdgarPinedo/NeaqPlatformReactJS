import React, {useEffect, useState} from "react";
import {store} from "../dataBase";

const Clientes = () => {
    const [pedidos, setPedidos] = useState('')

    useEffect(() => {
        const getPedidos = async () => {
            const {docs} = await store.collection('compras').get()
            const listaPedidos = docs.map(item => ({id:item.id, ...item.data()}))
            setPedidos(listaPedidos)
        }
        getPedidos()
    },[])


    return (
        <div>
            <h2 className={'mt-5 ml-5'}>Pedidos</h2>
            <div className='col ml-5 mr-5' style={{
                width: '100vh',
            }}>
                <table className='table table-hover mt-5'>
                    <thead style={{background: '#000000', color:'white'}}>
                        <tr>
                            <th>Cliente</th>
                            <th>Estado</th>
                            <th>Fecha de entrega</th>
                            <th>Paquetería</th>
                            <th>Productos</th>
                        </tr>
                    </thead>
                    {
                        pedidos.length !== 0 ?
                            (
                                pedidos.map(item => (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>{item.comprador}</td>
                                            <td>{item.status}</td>
                                            <td>{item.fecha}</td>
                                            <td>{item.paqueteria}</td>
                                            {
                                                item.productos.map(item2 => (
                                                    <tr key={item2.id}>
                                                        <td style={{width:'20vh'}}>{item2.nombre}</td>
                                                        <td>{item2.qty}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tr>
                                    </tbody>
                                ))
                            )
                            :
                            (
                                <tbody><tr><td>No hay pedidos</td></tr></tbody>
                            )
                    }
                </table>

            </div>
        </div>
    )
}

export default Clientes