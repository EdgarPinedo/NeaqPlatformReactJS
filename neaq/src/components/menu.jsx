import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {auth} from '../dataBase'

const Menu = () => {
    const historial = useHistory()
    const [usuario, setUsuario] = useState(null)
    useEffect( () => {
        auth.onAuthStateChanged( (user) => {
            if(user){
                setUsuario(user.email)
            }
        })
    },[])

    const CerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/')
    }

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark' style={{background: '#000000'}}>
                <nav className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Neaq</Link>
                    </li>
                    <li>
                        {
                            usuario === "edgarpinedo122@hotmail.com" ?
                                (
                                    <Link className='nav-link' to='/admin/libros'>Admin</Link>
                                )
                                :
                                (
                                    <span></span>
                                )
                        }
                    </li>
                    <li>
                        {
                            usuario !== "edgarpinedo122@hotmail.com" && usuario !== null ?
                                (
                                    <Link className='nav-link' to='/pedidos'>Pedidos</Link>
                                )
                                :
                                (
                                    <span></span>
                                )

                        }
                    </li>
                </nav>
                {
                    !usuario ?
                        (
                            <Link className='btn btn-dark' to='/login'>Login</Link>
                        )
                        :
                        (
                            <span></span>
                        )
                }
                {
                    usuario ?
                        (
                            <button
                                style={{background: '#000000', color: '#ffffff',}}
                                onClick={CerrarSesion}
                                className='btn btn-dark'>
                                Cerrar sesión</button>
                        )
                        :
                        (
                            <span></span>
                        )
                }
            </nav>
        </div>
    )
}

export default Menu
