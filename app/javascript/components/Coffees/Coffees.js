import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

const Coffees = () => {
    const [coffees, setCoffees] = useState([])

    useEffect(() => {
        // Get all of our coffees from api
        // Update coffees in our state

        axios.get('/api/v1/coffees.json')
        .then( resp => {
            setCoffees(resp.data.data)
        })
        .catch( resp => console.log(resp) )
    }, [coffees.length])

    const list = coffees.map( item => {
        return (
            <li key={item.attributes.name}>{item.attributes.name}</li>
        )
    })

    return (
        <Fragment>
            <div>This is the Coffees#index view for our app</div>
            <ul>{list}</ul>
        </Fragment>
    )
}

export default Coffees