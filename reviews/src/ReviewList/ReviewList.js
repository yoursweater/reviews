import React from 'react';
import './ReviewList.scss';

class ReviewList extends React.Component {

  makeReviews(reviews) {

    //sort the reviews by number of stars
    let filteredItems = reviews.sort((a, b) => {
      return a.stars - b.stars
    })

    //create the list items for display
    const reviewItems = filteredItems.map((review) => 
       <li className='reviewlist-list' key={review.id}>
          <div className='reviewlist-item-container'>
              <div className='reviewlist-item-name'>
                  <h4 className='reviewlist-name'>{review.name}</h4>
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