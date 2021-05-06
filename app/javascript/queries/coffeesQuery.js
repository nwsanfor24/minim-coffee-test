const coffeesQuery = `
    query Coffees {
        coffees {
            id
            name
            imageUrl
            slug
            averageScore
            reviews {
                id
                title
                description
                score
            }
        }
    }
`

export default coffeesQuery