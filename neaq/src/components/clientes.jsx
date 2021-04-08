import React from "react";
import {Link} from "react-router-dom";

const Clientes = () => {





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
                    <div className='col col-8.5 ml-5'>
                        <h2 className={'mt-4'}>Clientes</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clientes