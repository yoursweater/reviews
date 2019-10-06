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

      let sorted = reviews.sort((a, b) => {
        return Number(a.rank) - Number(b.rank)
      })

      // create the list items for display
      const reviewItems = sorted.map((review, index) => {
        return (
          <ReviewItem
            reviewList={this.props.reviews} 
            review={review} 
            index={index} 
            key={review.name}
            table={'dan'}
            fetchNewData={this.props.fetchNewData}
          />
        )
      })
      return reviewItems
    }
  
    render() {
      const reviewItems = this.makeReviews(this.props.dantop)

      return (
        <div>
          <h3 className='topfive-title'>Dan's Top Restaurants</h3>
          <ul ref={this.dragulaDecorator} >
            {reviewItems}
          </ul>
        </div>
      )
    }
  
}

export default TopFive;
