import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Coffees from './Coffees/Coffees'
import Coffee from './Coffee/Coffee'

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Coffees}/>
            <Route exact path="/coffees/:slug" component={Coffee}/>
        </Switch>
    )
}

export default App