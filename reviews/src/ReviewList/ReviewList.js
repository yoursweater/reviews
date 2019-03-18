import React from 'react';
import './ReviewList.scss';
import ReviewFilter from './ReviewFilter/ReviewFilter';

class ReviewList extends React.Component {

  state = {
    filter: null
  }

  makePricing(price) {
      let priceString = ""
      for (let i = 0; i < price; i++) {
        priceString = priceString + "$"
      }
      return priceString
  }

  makeStars(stars) {
    let starString = ""
    for (let i = 0; i < stars; i++) {
      starString = starString + String.fromCharCode(9733)
    }
    return starString
  }

  executeFilter = (star) => {
    console.log(star)
    this.setState({
      filter: star
    })
  }

  deleteEntry(id) {
    console.log('deleting!')
    let deleteId = {
      id: id
    }
    deleteId = JSON.stringify(deleteId)
    console.log(deleteId)
    fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/reviews', {
      method: 'DELETE',
      mode: 'cors',
      body: deleteId
    }).then(()=>{
      this.props.fetchNewData()
      // window.location.reload()
    })
  }

  makeReviews(reviews) {
    console.log(reviews)

    //sort the reviews by number of stars
    let filteredItems = reviews.sort((a, b) => {
      return b.stars - a.stars
    })

    if (this.state.filter != null) {
      console.log('running')
      filteredItems = filteredItems.filter( review => {
        console.log(review)
        console.log(this.state.filter)
        return review.stars == (this.state.filter + 1).toString()
      })
    }
    console.log(filteredItems)

    // let priceString = this.makePricing(reviews.price)

    //create the list items for display
    const reviewItems = filteredItems.map((review) => 
       <li className='reviewlist-list' key={review.id}>
          <div className='reviewlist-item-container'>
              <div className='reviewlist-item-name'>
                  <h4 className='reviewlist-name'>{review.name}</h4>
              </div>
              <div className='reviewlist-item-info'>
                  <p className='side-info'>{review.cuisine}</p>
                  <p className='side-info'>{this.makePricing.call(this, review.price)}</p>
              </div>
              <div className='reviewlist-item-description'>
                  <p>{review.description}</p>
              </div>
              <div className='reviewlist-item-stars'>
                  <span className='delete-btn' onClick={()=>this.deleteEntry(review.id)}>X</span>
                  {this.makeStars.call(this, review.stars)}
                  <span className="stars-label">{review.stars} star{review.stars > 1 ? 's' : null}</span>
              </div>
          </div>
       </li>
    )
    return reviewItems
  }

  
    render() {
  
      const reviewItems = this.makeReviews(this.props.reviews)

      return (
        <div>
          <h3 className='reviewlist-title'>Review List</h3>
          <ReviewFilter executeFilter={this.executeFilter} />
          <ul>
            {reviewItems}
          </ul>
        </div>
      )
    }
  
  }

  export default ReviewList;