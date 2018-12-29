import React from 'react';
import './TopFive.scss';

class TopFive extends React.Component {

    makeReviews(reviews) {

      //grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.topfive
      }).sort((a, b) => {
        return a.topfive - b.topfive
      })

      //create the list items for display
      const reviewItems = filteredItems.map((review) => 
         <li className='topfive-list' key={review.id}>
            <div className='topfive-item-container'>
                <div className='topfive-item-ranking'>
                    {review.topfive}
                </div>
                <div className='topfive-item-name'>
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
              <h3 className='topfive-title'>Top Five</h3>
              <ul>
                 {reviewItems}
              </ul>
          </div>
        )
    }
  
  }

  export default TopFive;