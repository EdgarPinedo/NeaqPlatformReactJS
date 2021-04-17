import React, {useEffect, useState} from 'react'
import {galery, store} from "../dataBase";

export default function Product(props) {
    const {item, onAdd} = props;
    const [url, setUrl] = useState('')

    if (item.url === '') {
        const getImages = async () => {
            setUrl(await galery.ref(`images/${item.nombre}`).getDownloadURL())
        }
        getImages()
        const Libro = {
            nombre:item.nombre,
            precio:item.precio,
            cantidad:item.cantidad,
            url:url
        }
        const updateLibro = async () => {
            try {
                await store.collection('libros').doc(item.id).set(Libro)
            }catch(e){}
        }
        updateLibro()
    }

    return(
        <div className='col' style={{
            background: 'rgba(0,0,0,0.8)',
            textAlign:"center",
            padding: "30px 30px",
            maxHeight: "340px",
            maxWidth: "250px",
            minHeight: "340px",
            minWidth: "250px",
            margin: '0.8rem',
            borderRadius: "1.0rem"
        }}>
            {
                item.url === '' ?
                    (
                        <div style={{minHeight:'8rem', display: 'flex', flexDirection: 'col',}}>
                            <img className='small' src={url} alt={item.nombre}></img>
                        </div>
                    )
                    :
                    (
                        <div style={{minHeight:'8rem'}}>
                            <img className='small' src={item.url} alt={item.nombre}></img>
                        </div>
                    )
            }
            <h3 style={{paddingTop: "15px", fontSize: 20, color:'white'}}>{item.nombre}</h3>
            <h3 style={{fontSize: 16, color:'white'}}>${item.precio} pesos</h3>
            {
                item.cantidad !== '0' ?
                    (
                        <h3 style={{fontSize: 15, color:'white'}}>Quedan solo {item.cantidad}!</h3>
                    )
                    :
                    (<h3 style={{fontSize: 15, color:'white'}}>No hay existencias!</h3>)
            }
            {
                item.cantidad !== '0' ?
                    (
                        <div>
                            <button style={{
                                fontSize: 15,
                                color: 'white',
                                background: '#000000',
                                borderRadius: '20px',
                                borderColor: '#585858',
                                padding: '7px 7px',
                                margin: '1.2rem'
                            }}
                                    onClick={() => onAdd(item)}>
                                Agregar al carrito
                            </button>
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
            }
        </div>
    )
}