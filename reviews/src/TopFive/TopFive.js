import React from 'react';
import './TopFive.scss';
import ReviewItem from './ReviewItem';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext, connectDropTarget } from 'react-dnd'

class TopFive extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        list: [],
        isDragging: null,
        isTarget: null
      }
    }

    onDrag = (event, review) => {
      event.preventDefault()
      // console.log(review)
      this.setState({
        isDragging: review
      })
    }

    onDragOver = (event, review) => {
      event.preventDefault()
      // console.log('YAAAAAAAAAAAAAAAAAAA')
      // console.log(review)
    }

    onDrop = (event, review) => {
      event.preventDefault()
      // this.setState({
      //   isTarget: review
      // })

      if (this.state.isDragging.id != review.id) {
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
            body: data
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log('Successfully posted!')
            console.log(data)
            // window.location.reload()
          });
        
      }
    }

    componentDidMount() {
      this.setState( {
        list: [...this.props.reviews]
      })
    }

    makeReviews(reviews) {
      // console.log(reviews)
      //grab only the reviews that have a top five numerical rating, then sort by score from low to high
      let filteredItems = reviews.filter(review => {
        return review.topfive && review.topfive > 0
      }).sort( (a,b) => {
        return (parseInt(a.topfive) - parseInt(b.topfive))
      })

      //create the list items for display
      const reviewItems = filteredItems.map((review, index) => 
          <ReviewItem onDrag={ (event) => this.onDrag(event, review)}
                       onDragOver={ (event) => this.onDragOver(event, review)}
                       onDrop={ (event) => this.onDrop(event, review)}
                      review={review} index={index} key={review.id} />
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