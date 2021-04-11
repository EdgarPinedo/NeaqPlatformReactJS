import React from 'react'
import './inicio.css'
import Carrito from './carrito'
import Mostrador from "./mostrador";

const Inicio = () => {

    return (
        <div className='row'
        style={{
            backgroundImage: 'url(https://images2.alphacoders.com/261/thumb-1920-26102.jpg)',
            backgroundAttachment: "fixed",
            minHeight: '94.19vh',
            display: 'flex',
            flexDirection: 'row',
            margin: 0
        }}>
            <div className='col'>
                <h1 className='mt-3' style={{color:'white'}}>Bienvenido</h1>
                <div className='row'>
                    <Mostrador></Mostrador>
                    <Carrito></Carrito>
                </div>
            </div>
        </div>
    )
}

export default Inicio