import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {lista} from './carrito'
import {store} from "../dataBase";

const Compra = () => {
    const email = sessionStorage.getItem('correo')
    const historia = useHistory()
    const [fecha, setFecha] = useState('')
    const [paqueteria, setPaqueteria] = useState('')

    let n =  new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    if(m<10)
        m='0'+ m
    let d = n.getDate()+2;
    if(d<10)
        d='0'+ d
    const date = y + "-" + m + "-" + d;

    const Vendido = async (e) => {
        e.preventDefault()
        const product = {
            comprador: email,
            productos: lista,
            status: 'Enviado',
            fecha: fecha,
            paqueteria: paqueteria
        }
        try{
            await store.collection(`${email}`).add(product)
            await store.collection('compras').add(product)
        }catch (err){}
        historia.push('/')
    }

    return(
        <div style={{
            backgroundImage: 'url(https://www.newsapp.telemundo.com/sites/nbcutelemundo/files/images/article/cover/2018/11/26/persona-cargando-bolsas-de-compras.jpg)',
            backgroundAttachment: "fixed",
            minHeight: '94.19vh',
            display: 'flex',
            flexDirection: 'row',
            margin: 0
        }}>
            <div className='container' style={{
                width: '60vh',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-37.5vh',
                marginLeft: '-30vh',
                textAlign: 'center',
                background: 'rgb(0,0,0,0.5)',
                borderRadius: '5px',
                color: 'white'
            }}>
                <h1>Datos de compra</h1>
                <div>
                    <form onSubmit={Vendido} className='form-group'>
                        <h6 className='mt-4'>Datos Personales</h6>
                        <input style={{
                            borderColor: '#000000',
                            color: 'black'
                        }}
                            className='form-control mt-3'
                            placeholder="Nombre"
                            type="text"
                        />
                        <h6 className='mt-4'>Dirección</h6>
                        <input style={{
                            borderColor: '#000000',
                            color: 'black'
                        }}
                            className='form-control mt-3'
                            placeholder="Ciudad"
                            type="text"
                        />
                        <input style={{
                            borderColor: '#000000',
                            color: 'black'
                        }}
                            className='form-control mt-3'
                            placeholder="Colonia"
                            type="text"
                        />
                        <input style={{
                            borderColor: '#000000',
                            color: 'black'
                        }}
                            className='form-control mt-3'
                            placeholder="Calle"
                            type="text"
                        />
                        <h6 className='mt-4'>Método de facturación</h6>
                        <input style={{
                            borderColor: '#000000',
                            color: 'black'
                        }}
                            className='form-control mt-3'
                            placeholder="Introduce tu tarjeta de credito"
                            type="number"
                        />
                        <input style={{
                            borderColor: '#000000',
                            color: 'black'
                        }}
                            className='form-control mt-3'
                            placeholder="Año de vencimiento"
                            type="number"
                        />
                        <input style={{
                            borderColor: '#000000',
                            color: 'black'
                        }}
                            className='form-control mt-3'
                            placeholder="CVV"
                            type="number"
                        />
                        <h6 className='mt-4'>Envío</h6>
                        <input style={{
                            borderColor: '#000000',
                        }}
                            onChange={(e) => {setFecha(e.target.value)}}
                            className='form-control mt-3'
                            type='date'
                            min={`${date}`}
                        />
                        <select style={{
                            borderColor: '#000000',
                            borderRadius:'5px',
                        }} className='custom-select mt-3' onChange={(e) => {setPaqueteria(e.target.value)}}>
                            <option>DHL</option>
                            <option>Fedex</option>
                            <option>UPS</option>
                        </select>
                        <input className='mt-3' style={{
                            background: '#000000',
                            color: 'white',
                            borderRadius: '15px',
                            padding: '5px 10px'
                        }}
                            value="Realizar compra"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Compra