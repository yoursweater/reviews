import React from 'react';
import './MayTopFive.scss';

class TopFive extends React.Component {

    makeReviews(reviews) {

      //grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.maytopfive
      }).sort((a, b) => {
        return a.maytopfive - b.maytopfive
      })

      //create the list items for display
      const reviewItems = filteredItems.map((review) => 
         <li className='maytopfive-list' key={review.id}>
            <div className='maytopfive-item-container'>
                <div className='maytopfive-item-ranking'>
                    {review.maytopfive}
                </div>
                <div className='maytopfive-item-name'>
                    {review.name}
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
              <h3 className='maytopfive-title'>May's Top Five</h3>
              <ul>
                 {reviewItems}
              </ul>
          </div>
        )
    }
  
  }

  export default TopFive;