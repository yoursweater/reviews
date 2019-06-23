import React from 'react';
import './TopFive.scss';
import ReviewItem from './ReviewItem';

class TopFive extends React.Component {

    makeReviews(reviews) {
      // grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.topfive && review.topfive > 0
      }).sort((a, b) => {
        return (parseInt(a.topfive) - parseInt(b.topfive))
      })

      // create the list items for display
      const reviewItems = filteredItems.map((review, index) => {
        return (
          <ReviewItem 
            review={review} 
            index={index} 
            key={review.id} 
          />
        )
      })
      return reviewItems
    }
  
    render() {
      const reviewItems = this.makeReviews(this.props.reviews)

      return (
        <div>
          <h3 className='topfive-title'>Top Restaurants</h3>
          <ul>
            {reviewItems}
          </ul>
        </div>
      )
    }
  
}

export default TopFive;
