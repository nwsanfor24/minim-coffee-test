import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Coffee from './Coffee'

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

    const grid = coffees.map( item => {
        return (
            <Coffee 
                key={item.attributes.name}
                attributes={item.attributes}
            />
        )
    })

    return (
        <div className="home">
            <div className="header">
                <h1>CoffeeReviews</h1>
                <div className="subheader">Honest, unbiased coffee reviews.</div>
            </div>
            <div className="grid">
                <ul>{grid}</ul>
            </div>
        </div>
    )
}

export default Coffees