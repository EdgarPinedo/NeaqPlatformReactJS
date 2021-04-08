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
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <u1 className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Inicio</Link>
                    </li>
                    <li>
                        {
                            usuario === "edgarpinedo122@hotmail.com" ?
                                (
                                    <Link className='nav-link' to='/admin'>Admin</Link>
                                )
                                :
                                (
                                    <span></span>
                                )
                        }
                    </li>
                </u1>
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
