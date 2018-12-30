import React from 'react';
import './ReviewList.scss';

class ReviewList extends React.Component {

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

  deleteEntry(id) {
    console.log('deleting!')
    console.log(id)
  }

  makeReviews(reviews) {

    //sort the reviews by number of stars
    let filteredItems = reviews.sort((a, b) => {
      return a.stars - b.stars
    })

    // let priceString = this.makePricing(reviews.price)

    //create the list items for display
    const reviewItems = filteredItems.map((review) => 
       <li className='reviewlist-list' key={review.id}>
          <div className='reviewlist-item-container'>
              <div className='reviewlist-item-name'>
                  <h4 className='reviewlist-name'>{review.name}</h4>
              </div>
              <div className='reviewlist-item-info'>
                  <p>{review.cuisine}</p>
                  <p>{this.makePricing.call(this, review.price)}</p>
              </div>
              <div className='reviewlist-item-description'>
                  <p>{review.description}</p>
              </div>
              <div className='reviewlist-item-stars'>
                  <span className='delete-btn' onClick={this.deleteEntry(review.id)}>X</span>
                  {this.makeStars.call(this, review.stars)}
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
          <h3 className='reviewlist-title'>Full Review List</h3>
          <ul>
            {reviewItems}
          </ul>
        </div>
      )
    }
  
  }

  export default ReviewList;