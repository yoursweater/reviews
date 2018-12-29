import React from 'react';

class TopFive extends React.Component {
    // constructor(props) {
    //   super(props)
    // }
  
    render() {
      const reviews = this.props.reviews
      const reviewItems = reviews.map((review) => 
        <li key={review.id}>{review.name} - {review.stars}</li>
      )
  
      return (
        <div>
          <h3>Top Five</h3>
          <ul>
            {reviewItems}
          </ul>
        </div>
      )
    }
  
  }

  export default TopFive;