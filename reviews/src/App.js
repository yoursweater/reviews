import React, { Component } from 'react';
// import logo from './logo.svg';
import WallOfShame from './WallOfShame/WallOfShame';
import ReviewList from './ReviewList/ReviewList';
import TopFive from './TopFive/TopFive';
import MayTopFive from './MayTopFive/MayTopFive';
import PostReview from './PostReview/PostReview';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      dantop: []
    }
  }

  componentDidMount() {
    this.fetchNewData()
  }

  fetchNewData = () => {
    fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/reviews', {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          reviews: data.Items
        })
        fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/danget', {
          method: 'GET',
          mode: 'cors'
        }).then(res => res.json())
          .then(data => {
            this.setState({
              dantop: data.Items
            }, () => console.log(this.state))
          })
      })
  }

  render() {
    return (
      <div className="App">
          <div id='main'>
            <h1 className='app-header'>Dan and May's Restaurant Reviews</h1>
            <div className='app-container'>
              <div className='inner-app-container'>
                <div className='left-section'>
                  <TopFive fetchNewData={this.fetchNewData} reviews={this.state.reviews} dantop={this.state.dantop} />
                  {/* <MayTopFive fetchNewData={this.fetchNewData} reviews={this.state.reviews} />
                  <WallOfShame reviews={this.state.reviews} /> */}
                </div>
                <div className='right-section'>
                  <ReviewList fetchNewData={this.fetchNewData} reviews={this.state.reviews} />
                </div>
              </div>
              <div className='post-container'>
                <PostReview fetchNewData={this.fetchNewData} />
              </div>
            </div>
          </div>
      </div>
    );
  }
}


export default App;
