import React from 'react'
import Inicio from './components/inicio'
import Admin from './components/admin'
import Login from './components/login'
import Menu from './components/menu'
import Compra from './components/compra'
import Pedidos from "./components/pedidos";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    return (
        <div className='body'>
            <Router>
                <Menu></Menu>
                <Switch>
                    <Route exact path='/' component={Inicio}></Route>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/compra' component={Compra}></Route>
                    <Route path='/pedidos' component={Pedidos}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;