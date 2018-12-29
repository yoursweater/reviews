import React from 'react';
import './PostReview.scss';

class PostReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            stars: '',
            topfive: '',
            description: '',
            cuisine: '',
            price: '',
            location: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
          });
      }
    
      handleSubmit(event) {
        let data = JSON.stringify(this.state)
        console.log(data)
        fetch('https://bmuorcwtq3.execute-api.us-east-1.amazonaws.com/dev/reviews', {
            method: 'post',
            body: data
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log('Successfully posted!')
            console.log(data)
          });
        event.preventDefault();
      }
    
      render() {
        return (
          <form className='submit-form' onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            </label>
                <br />
            <label>
              Stars:
              <input type="number" name="stars" value={this.state.stars} onChange={this.handleChange} />
            </label>
                 <br />
            <label>
              Top Five? (leave blank if not a top five restaurant):
              <input type="number" name="topfive" value={this.state.topfive} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Cuisine:
              <input type="text" name="cuisine" value={this.state.cuisine} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Price:
              <input type="number" name="price" value={this.state.price} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Location:
              <input type="text" name="location" value={this.state.location} onChange={this.handleChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default PostReview;