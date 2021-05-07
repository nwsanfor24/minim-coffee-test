import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import ReviewForm from "./ReviewForm";
import Review from './Review'
import styled from "styled-components";
import AxiosWrapper from '../../utils/Requests/AxiosWrapper'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Column = styled.div`
  background: #fff; 
  max-width: 50%;
  width: 50%;
  float: left; 
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll; 
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255,255,255,0.5);
  }
`

const Main = styled.div`
  padding-left: 50px;
`;

const Coffee = (props) => {
  const [coffee, setCoffee] = useState({});
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ title: '', description: '', score: 0 });
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const slug = props.match.params.slug;

    AxiosWrapper.get(`/api/v1/coffees/${slug}`)
    .then((resp) => {
      setCoffee(resp.data)
      setReviews(resp.data.included)
      setLoaded(true)
    })
    .catch(data => console.log('Error', data))
  }, []);
    
  // Modify text in review form
  const handleChange = (e) => {
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  // Create a new review
  const handleSubmit = (e) => {
    e.preventDefault()

    const coffee_id = parseInt(coffee.data.id)
    AxiosWrapper.post('/api/v1/reviews', { ...review, coffee_id})
    .then((resp) => {
      setReviews([...reviews, resp.data.data])
      setReview({ title: '', description: '', score: 0})
      setError('')
    })
    .catch(resp => {
      let error
      switch(resp.message) {
        case "Request failed with status code 401":
          error = 'Please log in to leave a review.'
          break
        default:
          error = 'Something went wrong'
      }
      setError(error)
    })
  }

  // Destroy a review
  const handleDestroy = (id, e) => {
    e.preventDefault()

    AxiosWrapper.delete(`/api/v1/reviews/${id}`)
    .then((data) => {
      const included = [...reviews]
      const index = included.findIndex((data) => data.id == id)
      included.splice(index, 1)

      setReviews(included)
    })
    .catch(data => console.log('Error', data))
  }

  // set score
  const setRating = (score, e) => {
    e.preventDefault()  
    setReview({ ...review, score })
  }

  let total, average = 0
  let userReviews

  if (reviews && reviews.length > 0) {
    total = reviews.reduce((total, review) => total + review.attributes.score, 0)
    average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)) : 0
    
    userReviews = reviews.map( (review, index) => {
      return (
        <Review 
          key={index}
          id={review.id}
          attributes={review.attributes}
          handleDestroy={handleDestroy}
        />
      )
    })
  }
  

  return (
    <Wrapper>
      { 
        loaded &&
        <Fragment>
          <Column>
            <Main>
              <Header 
                attributes={coffee.data.attributes}
                reviews={reviews}
                average={average}
              />
              {userReviews}
            </Main>
          </Column>
          <Column>
            <ReviewForm
              name={coffee.data.attributes.name}
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              error={error}
            />
          </Column>
        </Fragment>
      }
    </Wrapper>
  );
};

export default Coffee;
