import React from 'react';
import './TopFive.scss';
import ReviewItem from './ReviewItem';
import Dragula from 'react-dragula';

class TopFive extends React.Component {

  state = {
    topItems: []
  }

    dragulaDecorator = (componentBackingInstance) => {
      if (componentBackingInstance) {
        let options = { 

        };
        Dragula([componentBackingInstance], options);
      }
    };

    makeReviews(reviews) {
      // grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.topfive && review.topfive > 0
      })

      // create the list items for display
      const reviewItems = filteredItems.map((review, index) => {
        return (
          <ReviewItem
            reviewList={this.props.reviews} 
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
          <ul ref={this.dragulaDecorator} >
            {reviewItems}
          </ul>
        </div>
      )
    }
  
}

export default TopFive;
