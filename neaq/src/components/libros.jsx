import React, {useEffect, useState} from 'react'
import {galery, store} from '../dataBase'
import {Link} from 'react-router-dom'

const Libros = () => {
    const [edicion, setEdicion] = useState(null)
    const [idLibro, setIdLibro] = useState('')
    const [nombreLib, setNombreLib] = useState('')
    const [precioLib, setPrecioLib] = useState('')
    const [cantidadLib, setCantidadLib] = useState('')
    const [listaLibro, setListaLibros] = useState('')
    const [error, setError] = useState('')
    const [imagen, setImagen] = useState()

    useEffect(() => {
        const getLibros = async () => {
            const {docs} = await store.collection('libros').get()
            const listaLibros = docs.map(item => ({id:item.id, ...item.data()}))
            setListaLibros(listaLibros)
        }
        getLibros()
    },[])

    const setLibros = async (e) => {
        e.preventDefault()
        if(!nombreLib.trim()){
            setError('EL campo "Nombre" esta vacío')
        }else if(!precioLib.trim()) {
            setError('El campo "Precio" esta vacío')
        }else if(!cantidadLib.trim()) {
            setError('El campo "Cantidad" esta vacío')
        }else{
            const libro = {
                nombre:nombreLib,
                precio:precioLib,
                cantidad:cantidadLib
            }
            try{
                await store.collection('libros').add(libro)
                const {docs} = await store.collection('libros').get()
                const listaLibros = docs.map(item => ({id:item.id, ...item.data()}))
                setListaLibros(listaLibros)
            }catch(e){
                console.log(e)
            }
            const name1 = nombreLib
            setNombreLib('')
            setPrecioLib('')
            setCantidadLib('')
            try{
                await galery.ref().child(`images/${name1}`).put(imagen)
            }catch(e){}
        }
    }

    const ObtenerImagen = (e) => {
        setImagen(e.target.files[0])
    }

    const BorrarLibro = async (id,nombre) => {
        try{
            await store.collection('libros').doc(id).delete()
            const {docs} = await store.collection('libros').get()
            const listaLibros = docs.map(item => ({id:item.id, ...item.data()}))
            setListaLibros(listaLibros)
            await galery.ref(`images/${nombre}`).delete()
        }catch(e){}
    }

    const Actualizar = async (id) => {
        try {
            const modificar = await store.collection('libros').doc(id).get()
            const {nombre, precio, cantidad} = modificar.data()
            setNombreLib(nombre)
            setPrecioLib(precio)
            setCantidadLib(cantidad)
            setIdLibro(id)
            setEdicion(true)
        }catch(e){}
    }

    const setActualizar = async (e) => {
        e.preventDefault()
        if(!nombreLib.trim()){
            setError('EL campo "Nombre" esta vacío')
        }else if(!precioLib.trim()) {
            setError('El campo "Precio" esta vacío')
        }else if(!cantidadLib.trim()) {
        setError('El campo "Cantidad" esta vacío')
        }
        const libroUpdate = {
            nombre:nombreLib,
            precio:precioLib,
            cantidad:cantidadLib
        }
        try{
            await store.collection('libros').doc(idLibro).set(libroUpdate)
            const {docs} = await store.collection('libros').get()
            const listaLibros = docs.map(item => ({id:item.id, ...item.data()}))
            setListaLibros(listaLibros)
        }catch(e){}
        const name2 = nombreLib
        setNombreLib('')
        setPrecioLib('')
        setCantidadLib('')
        setEdicion(false)
        try
        {
            await galery.ref(`images/${name2}`).delete()
            await galery.ref().child(`images/${name2}`).put(imagen)
        }catch (e){}
    }


    return (
        <div className='mt-5'>
            <div className='container mt-5'>
                <div align={'center'} className='form-group bg-dark'>
                    <form className='form-group mr-auto'>
                        <Link className='btn btn-dark mt-auto' to='/admin'>Libros</Link>
                        <Link className='btn btn-dark mt-auto' to='/clientes'>Clientes</Link>
                        <Link className='btn btn-dark mt-auto'>Registros</Link>
                    </form>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h2 className={'mt-4'}>Libros</h2>
                        <div className='row'>
                            <div className='col position-static'>
                                {
                                    edicion ?
                                        (<h4 className='mt-5'>Actualizar libro</h4>)
                                        :
                                        (<h4 className='mt-5'>Agregar libro</h4>)
                                }
                                <form onSubmit={edicion ? setActualizar : setLibros} className='form-group mr-5'>
                                    <input
                                        value={nombreLib}
                                        onChange={(e) => {setNombreLib(e.target.value)}}
                                        className='form-control mt-3'
                                        placeholder="Introduce el nombre del libro"
                                        type="text"
                                    />
                                    <input
                                        value={precioLib}
                                        onChange={(e) => {setPrecioLib(e.target.value)}}
                                        className='form-control mt-3'
                                        placeholder="Introduce el precio del libro"
                                        type="number"
                                    />
                                    <input
                                        value={cantidadLib}
                                        onChange={(e) => {setCantidadLib(e.target.value)}}
                                        className='form-control mt-3'
                                        placeholder="Introduce la cantidad de copias del libro"
                                        type="number"
                                    />
                                    <div className='content-modal mt-3'>
                                        <header>
                                            <input
                                                type='file'
                                                name='imagen'
                                                onChange={ObtenerImagen}
                                            />
                                        </header>
                                    </div>
                                    {
                                        edicion ?
                                            (
                                                <input
                                                    type='submit'
                                                    value='Actualizar'
                                                    className='btn btn-dark btn-block mt-3'
                                                />
                                            )
                                            :
                                            (
                                                <input
                                                    type='submit'
                                                    value='Agregar'
                                                    className='btn btn-dark btn-block mt-3'
                                                />
                                            )
                                    }
                                </form>
                                {
                                    error ?
                                        (
                                            <div className='alert alert-danger mt-3 mr-5'>
                                                {error}
                                            </div>
                                        )
                                        :
                                        (
                                            <span></span>
                                        )
                                }
                            </div>
                            <div className='col'>
                                <h4 className={'mt-5'}>Lista de libros</h4>
                                <ul className='list-group'>
                                    {
                                        listaLibro.length !== 0 ?
                                            (
                                                listaLibro.map(item => (
                                                    <li className='list-group-item' key={item.id}> {item.nombre} {item.precio} {item.cantidad}
                                                        <button onClick={(id,nombre)=>{BorrarLibro(item.id,item.nombre)}} className='btn btn-dark float-right'>Eliminar</button>
                                                        <button onClick={(id)=>{Actualizar(item.id)}} className='btn btn-dark float-right mr-3'>Actualizar</button>
                                                    </li>
                                                ))
                                            )
                                            :
                                            (
                                                <span>No hay libros que mostrar</span>
                                            )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Libros