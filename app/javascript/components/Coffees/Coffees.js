import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Coffee from './Coffee'
import styled from 'styled-components'

const Home = styled.div`
    text-align: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`

const Header = styled.div`
    padding: 100px 100px 10px 100px;

    h1 {
        font-size: 42px;
    }
`

const Subheader = styled.div`
    font-weight: 300;
    font-size: 26px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    width: 100%;
    padding: 20px;
`


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
        <Home>
            <Header>
                <h1>CoffeeReviews</h1>
                <Subheader>Honest, unbiased coffee reviews.</Subheader>
            </Header>
            <Grid>
                {grid}
            </Grid>
        </Home>
    )
}

export default Coffees