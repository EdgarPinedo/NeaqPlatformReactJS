import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Libros from "./libros";
import Clientes from "./clientes";
import Registros from "./registros";

function Admin() {
    return (
        <div className='mt-5'>
            <h2 align={'center'}>Administración</h2>
            <div className='container mt-5'>
                <Router>
                    <div align={'center'} className='form-group bg-dark'>
                        <form className='form-group mr-auto'>
                            <Link className='btn btn-dark mt-auto' to='/admin/libros'>Libros</Link>
                            <Link className='btn btn-dark mt-auto' to='/admin/clientes'>Clientes</Link>
                            <Link className='btn btn-dark mt-auto' to='/admin/registros'>Registros</Link>
                        </form>
                    </div>
                    <Switch>
                        <Route path='/admin/libros' component={Libros}></Route>
                        <Route path='/admin/clientes' component={Clientes}></Route>
                        <Route path='/admin/registros' component={Registros}></Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default Admin;