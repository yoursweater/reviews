import React from 'react';
import './WallOfShame.scss';

class WallOfShame extends React.Component {

    makeReviews(reviews) {

      //grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.wallofshame
      }).sort((a, b) => {
        return a.wallofshame - b.wallofshame
      })

      //create the list items for display
      const reviewItems = filteredItems.map((review) => 
         <li className='wallofshame-list' key={review.id}>
            <div className='wallofshame-item-container'>
                <div className='wallofshame-item-ranking'>
                    {review.wallofshame}
                </div>
                <div className='wallofshame-item-name'>
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
              <h3 className='wallofshame-title'>Dan's Top Five</h3>
              <ul>
                 {reviewItems}
              </ul>
          </div>
        )
    }
  
  }

  export default WallOfShame;