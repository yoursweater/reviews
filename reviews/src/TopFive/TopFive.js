import React from 'react';
import './TopFive.scss';
// import HTML5Backend from 'react-dnd-html5-backend'
// import { DragDropContext, connectDropTarget } from 'react-dnd'
import ReviewItem from './ReviewItem';

class TopFive extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isDragging: null
    }
  }

  componentDidMount() {
    // this.setState({
    //   list: [...this.props.reviews]
    // })
  }

  onDrag = (event, review) => {
    event.preventDefault()
    // console.log(review)
    this.setState({
      isDragging: review
    })
  }

    onDragOver = (event) => {
      event.preventDefault()
      // console.log('YAAAAAAAAAAAAAAAAAAA')
      // console.log(review)
    }

    onDrop = (event, review) => {
      let self = this
      event.preventDefault()
      // this.setState({
      //   isTarget: review
      // })

      if (this.state.isDragging.id !== review.id) {
        console.log('SWAP')
        console.log(review)
        let swapObj = {
          category: 'topfive',
          draggedRev: this.state.isDragging,
          targetRev: review
        }

        let data = JSON.stringify(swapObj)
        console.log(data)
        fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/reviews', {
          method: 'PUT',
          mode: 'cors',
          body: data
        }).then((response) => {
          return response.json();
        }).then((response) => {
          console.log('Successfully posted!')
          console.log(response)
          self.props.fetchNewData()
          // window.location.reload()
        });
        
      }
    }


    makeReviews(reviews) {
      // console.log(reviews)
      // grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.topfive && review.topfive > 0
      }).sort((a, b) => {
        return (parseInt(a.topfive) - parseInt(b.topfive))
      })

      // ncreate the list items for display
      const reviewItems = filteredItems.map((review, index) => {
        return (
          <ReviewItem 
            onDrag={event => this.onDrag(event, review)}
            onDragOver={event => this.onDragOver(event, review)}
            onDrop={event => this.onDrop(event, review)}
            review={review} 
            index={index} 
            key={review.id} 
          />
        )
      })
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
