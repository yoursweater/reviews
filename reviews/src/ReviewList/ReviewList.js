import React from 'react'
import './ReviewList.scss'
import ReviewFilter from './ReviewFilter/ReviewFilter'
import { v4 as uuidv4 } from 'uuid'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
var FontAwesome = require('react-fontawesome')

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

  makeStars(stars) {
    let starArr = []
    let halfstar = false
    let starsnum = stars
    if (stars % 1 !== 0) {
      halfstar = true
      starsnum = starsnum - 1
    }
    for (let i = 0; i < starsnum; i++) {
      starArr.push(<FontAwesome key={uuidv4()} className="super-crazy-colors" name="star"  />)
    }
    if (halfstar) {
      starArr.push(<FontAwesome key={uuidv4()} className="super-crazy-colors" name="star-half"  />)
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

  addDan(name, props) {
    const nonEmptyItems = props.listItems.filter(item => item.content !== "")

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
            id: 'tableorder',
            order: newOrderString,
            table: 'dantable'
        })
    }).then(()=>{
        props.fetchNewData()
    })

  }

  addMay(name) {
    let event = {
      name: name,
      rank: this.props.dantop.length + 1,
    }
    event = JSON.stringify(event)
    fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/mayadd', {
      method: 'POST',
      mode: 'cors',
      body: event,
    }).then(() => {
      this.props.fetchNewData()
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
            <div onClick={() => this.addDan(review.name, this.props)} className="reviewlist-item-adddan">
              <p>Add to Dan's Favs</p>
            </div>
            <div onClick={() => this.addMay(review.name)} className="reviewlist-item-addmay">
              <p>Add to May's Favs</p>
            </div>
            <div className="reviewlist-item-stars">
              <span className="delete-btn" onClick={() => this.deleteEntry(review.id)}>
                X
              </span>
              <span>{this.makeStars.call(this, review.stars)}</span>
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
