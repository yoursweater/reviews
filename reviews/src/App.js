import React, { Component } from 'react';
// import logo from './logo.svg';
import ReviewList from './ReviewList/ReviewList';
import TopFive from './TopFive/TopFive';
import MayTopFive from './MayTopFive/MayTopFive';
import PostReview from './PostReview/PostReview';
import './App.scss';
import WallOfShame from './WallOfShame/WallOfShame';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }

  componentDidMount() {

    fetch('https://n28a4s7dc1.execute-api.us-east-1.amazonaws.com/dev/reviews', {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      // let cleanData = JSON.parse(data.body)
      // console.log(cleanData.Items)
      console.log(data)
      this.setState({
        reviews: data.Items
      })
    })

  }

  render() {
    return (
      <div className="App">
        <div id='main'>
          <h1 className='app-header'>Dan and May's Restaurant Reviews</h1>
            <div className='app-container'>
                <div className='left-section'>
                   <TopFive reviews={this.state.reviews} />
                   <MayTopFive reviews={this.state.reviews} />
                   <WallOfShame reviews={this.state.reviews} />
                   
                   <PostReview />
                </div>
                <div className='right-section'>
                   <ReviewList reviews={this.state.reviews} />
                </div>
            </div>
        </div>
      </div>
    );
  }
}


export default App;
