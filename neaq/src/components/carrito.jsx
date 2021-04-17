import React from 'react'
import {useHistory} from "react-router-dom"

let lista = []

export default function Carrito(props) {
    const {carrito, onAdd, onRemove} = props
    const history = useHistory()
    const irCompra = () => {
        lista = carrito
        history.push('/compra')
    }

    const itemPrecio = carrito.reduce((a,c) => a + c.precio * c.qty, 0)
    const taxPrecio = itemPrecio * 0.16;
    const envioPrecio = itemPrecio > 2000 ? 0 : 50
    const totalPrecio = itemPrecio + taxPrecio + envioPrecio

    return(
        <div className='mt-5 container' style={{
            width: '60vh',
            margin: '20px',
            textAlign: 'center'
        }}>
            <h2 style={{
                color: 'white',
                textAlign:'center',
                background: 'rgba(0,0,0,0.8)',
                width: '54.9vh',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                marginBottom: '0vh',
                paddingBottom: '1.5vh'
            }}>Carrito de compras</h2>

            <table style={{
                width: '55vh',
                color: 'white',
                background: 'rgba(0,0,0,0.8)',
                textAlign: 'center'
            }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    {carrito.map((item) => (
                        <tbody key={item.id}>
                            <tr>
                                <td>{item.nombre}</td>
                                <td>{item.precio}</td>
                                <td>{item.qty}</td>
                                <td>
                                    <button onClick={()=>onAdd(item)} style={{
                                        color:'white',
                                        background: 'rgb(0,0,0)',
                                        borderRadius: '5px',
                                        borderColor: '#585858',
                                        padding: '1px 8px',
                                        margin: '10px'
                                    }}>+</button>
                                    <button onClick={()=>onRemove(item)} style={{
                                        color:'white',
                                        background: 'rgb(0,0,0)',
                                        borderRadius: '5px',
                                        borderColor: '#585858',
                                        padding: '1px 10px',
                                    }}>-</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
            </table>
            {carrito.length !== 0 && (
                <div className='container' style={{
                    width: '54.9vh',
                    color: 'white',
                    background: 'rgba(0,0,0,0.8)',
                    marginLeft: '0vh',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px'
                }}>
                    <div className='row'>
                        <div style={{width: '30vh', marginTop: '5vh', marginLeft:'6vh', textAlign:'right'}}>Libros</div>
                        <div style={{marginTop: '5vh', width: '12.5vh', textAlign: 'right'}}>${itemPrecio}</div>
                    </div>
                    <div className='row'>
                        <div style={{width: '30vh', marginLeft:'6vh', textAlign:'right'}}>Taxes</div>
                        <div style={{width: '12.5vh', textAlign: 'right'}}>${taxPrecio}</div>
                    </div>
                    <div className='row'>
                        <div style={{width: '30vh', marginLeft:'6vh', textAlign:'right'}}>Envio</div>
                        <div style={{width: '12.5vh', textAlign: 'right'}}>${envioPrecio}</div>
                    </div>
                    <div className='row'>
                        <div style={{width: '30vh', marginLeft:'6vh', fontSize: '20px', textAlign:'right'}}><strong>Total</strong></div>
                        <div style={{width: '12.5vh', textAlign: 'right', fontSize: '20px', marginBottom: '2vh'}}>
                            <strong>${totalPrecio}</strong>
                        </div>
                    </div>
                        <button style={{
                            fontSize: 15,
                            color: 'white',
                            background: '#000000',
                            borderRadius: '20px',
                            borderColor: '#585858',
                            padding: '7px 7px',
                            margin: '1.2rem'
                        }} onClick={irCompra}>
                            Realizar compra
                        </button>
                </div>
                )
            }
        </div>
    )
}

export {lista}