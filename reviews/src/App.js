import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }

  componentDidMount() {

    fetch('https://bmuorcwtq3.execute-api.us-east-1.amazonaws.com/dev/reviews', {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.Items)
      this.setState({
        reviews: data.Items
      })
    })

  }

  render() {
    return (
      <div className="App">
        <div id='main'>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}


class ReviewList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const reviews = this.props.reviews
    const reviewItems = reviews.map((review) => 
      <li key={review.id}>{review.name}  - {review.stars}</li>
    )

    return (
      <div>
        <p>this loaded</p>
        <ul>
          {reviewItems}
        </ul>
      </div>
    )
  }

}

export default App;
