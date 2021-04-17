import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Libros from "./libros";
import Clientes from "./clientes";
import Registros from "./registros";

function Admin() {
    return (
        <div className='mt-5'>
            <h2 align={'center'}>Administración</h2>
                <Router>
                    <div align={'center'} className='form-group bg-dark mt-5'>
                        <form className='form-group'>
                            <Link className='btn btn-dark mt-auto' to='/admin/libros'>Libros</Link>
                            <Link className='btn btn-dark mt-auto' to='/admin/clientes'>Pedidos</Link>
                            <Link className='btn btn-dark mt-auto' to='/admin/registros'>Proveedores</Link>
                        </form>
                    </div>
                    <Switch>
                        <Route path='/admin/libros' component={Libros}></Route>
                        <Route path='/admin/clientes' component={Clientes}></Route>
                        <Route path='/admin/registros' component={Registros}></Route>
                    </Switch>
                </Router>
        </div>
    )
}

export default Admin;