import React from 'react'
import Inicio from './components/inicio'
import Admin from './components/admin'
import Login from './components/login'
import Menu from './components/menu'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    return (
        <div className='container w-100'>
            <Router>
                <Menu></Menu>
                <Switch>
                    <Route exact path='/' component={Inicio}></Route>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/login' component={Login}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;