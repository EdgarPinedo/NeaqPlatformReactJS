import React, {useState} from 'react'
import {auth} from '../dataBase'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const historial = useHistory()
    const[email,setEmail] = useState('')
    const[pass,setPass] = useState('')
    const[msgerror, setMsgError] = useState(null)

    const RegistrarUsuario = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,pass)
            .then(r => {
                historial.push('/')
            })
            .catch(e => {
                if(e.code === 'auth/invalid-email'){
                    setMsgError('Email inválido')
                }
                if(e.code === 'auth/weak-password'){
                    setMsgError('La contraseña debe tener 6 caracteres o más')
                }
            })
    }

    const LoginUsuario = () => {
        auth.signInWithEmailAndPassword(email,pass)
            .then((r) => {
                historial.push('/')
            })
            .catch((err) => {
                if(err.code === 'auth/wrong-password'){
                    setMsgError('Contraseña incorrecta')
                }
            })
    }

    return (
        <div className='row mt-5'>
            <div className='col'></div>
            <div className='col'>
                <form onSubmit={RegistrarUsuario} className='form-group'>
                    <input
                        onChange={(e)=>{setEmail(e.target.value)}}
                        className='form-control'
                        placeholder='Introduce el Email'
                        type="email" />
                    <input
                        onChange={(e)=>{setPass(e.target.value)}}
                        className='form-control mt-4'
                        placeholder='Introduce la contraseña'
                        type="password" />
                    <input
                        className='btn btn-dark btn-block mt-4'
                        value='Registrar Usuario'
                        type="submit"/>
                    <button
                        onClick={LoginUsuario}
                        className='btn btn-dark btn-block'>
                        Iniciar sesión
                    </button>
                </form>
                {
                    msgerror !== null ?
                        (
                            <div className='alert alert-danger mt-3'>
                                {msgerror}
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                }
            </div>
            <div className='col'></div>
        </div>
    )
}

export default Login