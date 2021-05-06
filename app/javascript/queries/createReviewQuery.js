const createReviewQuery = (attributes) => `
        mutation {
            createReview(
                title: "${attributes.title}",
                description: "${attributes.description}",
                score: ${attributes.score},
                coffeeId: ${attributes.coffeeId} 
            ) {
                title
                description
                score
                coffeeId
            }
        }
    }
`

export default createReviewQuery