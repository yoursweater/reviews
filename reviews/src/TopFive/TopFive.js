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

      // create the list items for display
      const reviewItems = reviews.map((review, index) => {
        return (
          <ReviewItem
            reviewList={this.props.reviews} 
            review={review.name} 
            index={index} 
            key={review.name} 
          />
        )
      })
      return reviewItems
    }
  
    render() {
      const reviewItems = this.makeReviews(this.props.dantop)

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
