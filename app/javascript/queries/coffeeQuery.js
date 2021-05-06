const coffeeQuery = (slug) => `
    query Coffee {
        coffee(slug: "${slug}) {
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

export default coffeeQuery