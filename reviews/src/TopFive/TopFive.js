import React from 'react';
import './TopFive.scss';
import ReviewItem from './ReviewItem';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class TopFive extends React.Component {

    moveItem = (id) => {
      console.log(id)
    }

    makeReviews(reviews) {
      console.log(reviews)
      //grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.topfive && review.topfive > 0
      })

      //create the list items for display
      const reviewItems = filteredItems.map((review, index) => 
          <ReviewItem review={review} index={index} />
      )
      return reviewItems
    }
  
    render() {
        const reviewItems = this.makeReviews(this.props.reviews)

        return (
          <div>
              <h3 className='topfive-title'>Dan's Top Five</h3>
              <ul>
                 {reviewItems}
              </ul>
          </div>
        )
    }
  
  }

  export default TopFive;