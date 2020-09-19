import React from 'react'
import './ReviewList.scss'
import ReviewFilter from './ReviewFilter/ReviewFilter'
import { v4 as uuidv4 } from 'uuid'
// import { FontAwesome } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
// var FontAwesome = require('react-fontawesome')

const updateReview = (event, review, props) => {
  let newReview
  if (event.type === 'changeStars') {
    newReview = {...review}
    if (event.value == 1) {
      newReview.stars = event.value.toString()
    } else {
      newReview.stars = (event.value - 0.5).toString()
    }
  } else if (event.type === 'changeHalfStar') {
    newReview = {...review}
    newReview.stars = event.value.toString()
  }

  let data = JSON.stringify(newReview)

  fetch('https://syrky3ilk6.execute-api.us-east-1.amazonaws.com/dev/reviews', {
    method: 'POST',
    mode: 'cors',
    body: data,
  })
  .then(function(response) {
      return response.json()
  })
  .then(function(data) {
      console.log('Successfully posted!')
      console.log(data)
      props.fetchNewData()
  })
}

class ReviewList extends React.Component {
  state = {
    filter: 4,
  }

  makePricing(price) {
    let priceString = ''
    for (let i = 0; i < price; i++) {
      priceString = priceString + '$'
    }
    return priceString
  }

  makeStars(stars, review, props) {
    let starArr = []
    let halfstar = false
    let starsnum = stars
    let emptyStars = Math.floor(5 - starsnum)
    if (stars % 1 !== 0) {
      halfstar = true
      starsnum = starsnum - 1
    }
    let starIndex = 0
    for (let i = 0; i < starsnum; i++) {
      // starArr.push(<FontAwesomeIcon key={uuidv4()} className="super-crazy-colors" name="star"  />)
      starIndex += 1
      starArr.push(<FontAwesomeIcon style={{cursor: 'pointer'}} onClick={(e) => {updateReview({type: 'changeStars', value: i + 1}, review, props)}} key={uuidv4()} className="super-crazy-colors" data-tag='test' name="star" icon={faStar} />)
    }
    if (halfstar) {
      // starArr.push(<FontAwesomeIcon key={uuidv4()} className="super-crazy-colors" name="star-half"  />)
      starIndex += 1
      starArr.push(<FontAwesomeIcon style={{cursor: 'pointer'}} onClick={(e) => {updateReview({type: 'changeHalfStar', value: starIndex}, review, props)}} key={uuidv4()} className="super-crazy-colors" name="star" icon={faStarHalf}  />)
    }
    for (let i = 0; i < emptyStars; i++) {
      let emptyIndex = starIndex + i + 1
      starArr.push(<FontAwesomeIcon style={{cursor: 'pointer'}} onClick={(e) => {updateReview({type: 'changeStars', value: emptyIndex}, review, props)}}  key={uuidv4()} className="super-crazy-colors" name="star" icon={faStar} color='white' />)
    }
    return starArr
  }

  executeFilter = star => {
    this.setState({
      filter: star,
    })
  }

  deleteEntry(id) {
    let deleteId = {
      id: id,
    }
    deleteId = JSON.stringify(deleteId)
    fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/reviews', {
      method: 'DELETE',
      mode: 'cors',
      body: deleteId,
    }).then(() => {
      this.props.fetchNewData()
    })
  }

  addReview(name, props, user) {
    let nonEmptyItems
    if (user === 'dan') nonEmptyItems = props.listItems.filter(item => item.content !== "");
    if (user === 'may') nonEmptyItems = props.mayItems.filter(item => item.content !== "")

    let newOrderString = ''
    nonEmptyItems.forEach(item => {
        newOrderString += item.content + ','
    })
    newOrderString += name

    let url = 'https://syrky3ilk6.execute-api.us-east-1.amazonaws.com/prod/editorder'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            id: user === 'dan' ? 'tableorder' : 'maytableorder',
            order: newOrderString,
            table: 'dantable'
        })
    }).then(()=>{
        props.fetchNewData()
    })

  }

  addMay(name, props) {
    const nonEmptyItems = props.mayItems.filter(item => item.content !== "")

    let newOrderString = ''
    nonEmptyItems.forEach(item => {
        newOrderString += item.content + ','
    })
    newOrderString += name

    let url = 'https://syrky3ilk6.execute-api.us-east-1.amazonaws.com/prod/editorder'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            id: 'maytableorder',
            order: newOrderString,
            table: 'dantable'
        })
    }).then(()=>{
        props.fetchNewData()
    })
  }

  makeReviews(reviews) {
    //sort the reviews by number of stars
    let filteredItems = reviews.sort((a, b) => {
      return b.stars - a.stars
    })

    if (this.state.filter != null) {
      filteredItems = filteredItems.filter(review => {
        return Number(review.stars) >= this.state.filter + 1 && Number(review.stars) < this.state.filter + 2
      })
    }

    //create the list items for display
    const reviewItems = filteredItems.map(review => {
      return (
        <li key={uuidv4()} className="reviewlist-list" >
          <div className="reviewlist-item-container">
            <div className="reviewlist-item-name">
              <h4 className="reviewlist-name">{review.name}</h4>
            </div>
            <div className="reviewlist-item-info">
              <p className="side-info">{review.cuisine}</p>
              <p className="side-info">{this.makePricing.call(this, review.price)}</p>
            </div>
            <div className="reviewlist-item-description">
              <p>{review.description}</p>
            </div>
            <div onClick={() => this.addReview(review.name, this.props, 'dan')} className="reviewlist-item-adddan">
              <p>Add to Dan's Favs</p>
            </div>
            <div onClick={() => this.addReview(review.name, this.props, 'may')} className="reviewlist-item-addmay">
              <p>Add to May's Favs</p>
            </div>
            <div className="reviewlist-item-stars">
              <span className="delete-btn" onClick={() => this.deleteEntry(review.id)}>
                X
              </span>
              <span>{this.makeStars.call(this, review.stars, review, this.props)}</span>
              <span className="stars-label">
                {review.stars} star{review.stars > 1 ? 's' : null}
              </span>
            </div>
          </div>
        </li>
      )
    })
    return reviewItems
  }

  render() {
    const reviewItems = this.makeReviews(this.props.reviews)

    return (
      <div>
        <h3 className="reviewlist-title">Review List</h3>
        <ReviewFilter executeFilter={this.executeFilter} />
        <ul className="reviewlist-list-holder">{reviewItems}</ul>
      </div>
    )
  }
}

export default ReviewList
