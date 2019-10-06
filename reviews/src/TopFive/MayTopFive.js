import React from 'react';
import './MayTopFive.scss';
import ReviewItem from './ReviewItem';
import Dragula from 'react-dragula';

class MayTopFive extends React.Component {

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
            table={'may'}
            fetchNewData={this.props.fetchNewData}
          />
        )
      })
      return reviewItems
    }
  
    render() {
      const reviewItems = this.makeReviews(this.props.maytop)

      return (
        <div>
          <h3 className='maytopfive-title' style={{color: '#ff9800'}}>May's Top Restaurants</h3>
          <ul ref={this.dragulaDecorator} >
            {reviewItems}
          </ul>
        </div>
      )
    }
  
}

export default MayTopFive;
