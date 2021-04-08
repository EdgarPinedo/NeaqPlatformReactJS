import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Libros from "./libros";
import Clientes from "./clientes";

function Admin() {
    return (
        <div className='mt-5'>
            <h2 align={'center'}>Administración</h2>
            <div className='container mt-5'>
                <Router>
                    <Switch>
                        <Route exact path='/admin' component={Libros}></Route>
                        <Route path='/clientes' component={Clientes}></Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default Admin;