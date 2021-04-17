import React, {useState} from 'react'
import './inicio.css'
import Carrito from './carrito'
import Mostrador from "./mostrador";

const Inicio = () => {
    const [carrito, setCarrito] = useState([])

    const onAdd = (product) => {
        const exist = carrito.find(x=> x.id === product.id)
        if(exist){
            if(exist.qty < product.cantidad)
                setCarrito(carrito.map(x=> x.id === product.id ? {...exist, qty: exist.qty +1} : x))
        } else{
            setCarrito([...carrito, {...product, qty: 1}])
        }
    }

    const onRemove = (product) => {
        const exist = carrito.find((x) => x.id === product.id)
        if(exist.qty === 1) {
            setCarrito(carrito.filter((x) => x.id !== product.id))
        } else {
            setCarrito(carrito.map(x=> x.id === product.id ? {...exist, qty: exist.qty -1} : x))
        }
    }

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
                    <Mostrador onAdd={onAdd}></Mostrador>
                    <Carrito onAdd={onAdd} onRemove={onRemove} carrito={carrito}></Carrito>
                </div>
            </div>
        </div>
    )
}

export default Inicio