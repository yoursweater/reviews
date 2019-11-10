import React from 'react'
import './PostReview.scss'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Select from '@material-ui/core/Select'
var FontAwesome = require('react-fontawesome')

class PostReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      stars: '',
      topfive: '0',
      maytopfive: '0',
      wallofshame: '0',
      description: '',
      cuisine: '',
      price: '',
      location: '',
    }
  }

  handleChange = event => {
    const target = event.target
    console.log(target)
    const name = target.name

    this.setState({
      [name]: event.target.value,
    })
  }

  handleSubmit = event => {
    let self = this
    let data = JSON.stringify(this.state)
    this.setState({
      name: '',
      stars: '',
      topfive: '0',
      maytopfive: '0',
      wallofshame: '0',
      description: '',
      cuisine: '',
      price: '',
      location: '',
    })

    fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/reviews', {
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
        // window.location.reload()
        self.props.fetchNewData()
      })
    event.preventDefault()
  }

  render() {
    return (
      <div className="post-container">
        <h3 className="post-title">Submit a Review</h3>
        <form className="submit-form" onSubmit={this.handleSubmit}>
          <div className="left-post">
            <TextField
              label="Name"
              type="text"
              name="name"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
            />
            <br />
            <NativeSelect
              variant="outlined"
              fullWidth
              value={this.state.stars}
              onChange={this.handleChange}
              inputProps={{
                name: 'stars',
                id: 'stars-select',
              }}
            >
              <option value={1}>1 star</option>
              <option value={1.5}>1.5 stars</option>
              <option value={2}>2 stars</option>
              <option value={2.5}>2.5 stars</option>
              <option value={3}>3 stars</option>
              <option value={3.5}>3.5 stars</option>
              <option value={4}>4 stars</option>
              <option value={4.5}>4.5 stars</option>
              <option value={5}>5 stars</option>
            </NativeSelect>
            <br />

            <TextField
              label="Description"
              type="text"
              name="description"
              fullWidth
              value={this.state.description}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
            />
            <br />
            <TextField
              label="Cuisine"
              type="text"
              name="cuisine"
              fullWidth
              value={this.state.cuisine}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
            />
            <br />

            <NativeSelect
              variant="outlined"
              fullWidth
              value={this.state.price}
              onChange={this.handleChange}
              inputProps={{
                name: 'price',
                id: 'age-native-label-placeholder',
              }}
            >
              <option value={1}>$</option>
              <option value={2}>$$</option>
              <option value={3}>$$$</option>
              <option value={4}>$$$$</option>
            </NativeSelect>
            <br />
            <TextField
              label="Location"
              type="text"
              name="location"
              fullWidth
              value={this.state.location}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
            />
            <br />
            <div className="submit-btn">
              <Button type="submit" value="Submit" label="Submit" variant="outlined" color="primary">
                Submit
              </Button>
            </div>
          </div>
          <div className="right-post"></div>
        </form>
      </div>
    )
  }
}

export default PostReview
