import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Index from './Index'
import Login from './Login'

function Main(){
    return(
        <Router>
            <Route path='/' exact component={Login}/>
            <Route path='/index' component={Index}/>
        </Router>
    )
}
export default Main