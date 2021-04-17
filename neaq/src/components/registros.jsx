import React, {useEffect, useState} from "react";
import {store} from "../dataBase";

const Registros = () => {
    const [proveedor, setProveedor] = useState('')

    useEffect(() => {
        const getProveedor = async () => {
            const {docs} = await store.collection('proveedores').get()
            const listaProveedores = docs.map(item => ({id:item.id, ...item.data()}))
            setProveedor(listaProveedores)
        }
        getProveedor()
    },[])



    return (
        <div>
            <h2 className={'mt-5 ml-5'}>Pagos pendientes a proveedores</h2>
            <div className='col ml-5 mr-5' style={{
                width: '100vh',
            }}>
                <table className='table table-hover mt-5'>
                    <thead style={{background: '#000000', color:'white'}}>
                    <tr>
                        <th>Proveedor</th>
                        <th>Monto total</th>
                        <th>Fecha límite</th>
                    </tr>
                    </thead>
                    {
                        proveedor.length !== 0 ?
                            (
                                proveedor.map(item => (
                                    <tbody key={item.id}>
                                    <tr>
                                        <td>{item.editorial}</td>
                                        <td>${item.pago}</td>
                                        <td>{item.fecha}</td>
                                    </tr>
                                    </tbody>
                                ))
                            )
                            :
                            (
                                <tbody><tr><td>No hay pagos pendientes</td></tr></tbody>
                            )
                    }
                </table>

            </div>
        </div>
    )
}

export default Registros