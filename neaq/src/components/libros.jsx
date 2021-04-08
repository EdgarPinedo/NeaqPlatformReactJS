import React, {useEffect, useState} from 'react'
import {galery, store} from '../dataBase'
import {Link} from 'react-router-dom'

const Libros = () => {

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
        }else{
            const libro = {
                nombre:nombreLib,
                precio:precioLib,
                cantidad:cantidadLib
            }
            try{
                const data = await store.collection('libros').add(libro)
                const {docs} = await store.collection('libros').get()
                const listaLibros = docs.map(item => ({id:item.id, ...item.data()}))
                setListaLibros(listaLibros)
            }catch(e){
                console.log(e)
            }
            setNombreLib('')
            setPrecioLib('')
            setCantidadLib('')
            try{
                const newRef = await galery.ref().child(`images/${nombreLib}`).put(imagen)
            }catch(e){}
        }
    }

    const ObtenerImagen = (e) => {
        setImagen(e.target.files[0])
    }

    const BorrarLibro = async () => {
        try{

        }catch(e){}
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
                    <div className='col ml-5'>
                        <h2 className={'mt-4'}>Libros</h2>
                        <div className='row'>
                            <div className='col'>
                                <h4 className='mt-5'>Agregar libro</h4>
                                <form onSubmit={setLibros} className='form-group mr-5'>
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
                                    <input
                                        type='submit'
                                        value='Agregar'
                                        className='btn btn-dark btn-block mt-3'
                                    />
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
                                                    <li className='list-group-item' key={item.id}>{item.nombre} {item.precio} {item.cantidad}
                                                        <button className='btn btn-dark float-right'>Eliminar</button>
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