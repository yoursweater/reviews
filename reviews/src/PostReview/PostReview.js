import React from 'react';
import './PostReview.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class PostReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            stars: '',
            topfive: '0',
            maytopfive: '0',
            wallofshame: '0',
            description: '',
            cuisine: '',
            price: '',
            location: ''
        };
      }
    
      handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
      }
    
      handleSubmit = (event) => {
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
            location: ''
        })

        fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/reviews', {
            method: 'POST',
            mode: 'cors',
            body: data
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log('Successfully posted!')
            console.log(data)
            // window.location.reload()
            self.props.fetchNewData()
          });
        event.preventDefault();
      }

    
      render() {

        return (
          <div className='post-container'>
            <h3 className='post-title'>Submit a Review</h3>
            <form className='submit-form' onSubmit={this.handleSubmit}>
            <div className='left-post'>
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
              <TextField
                  label="Stars"
                  select
                  value={this.state.stars}
                  name="stars"
                  fullWidth
                  onChange={this.handleChange}
                  margin="dense"
                  variant="outlined"
                  className="stars-select"
                  id="stars-select"
                >
                
                    <option key="1" value="1">
                      &#9733;
                    </option>
                    <option key="2" value="2">
                      &#9733;&#9733;
                    </option>
                    <option key="3" value="3">
                      &#9733;&#9733;&#9733;
                    </option>
                    <option key="4" value="4">
                      &#9733;&#9733;&#9733;&#9733;
                    </option>
                    <option key="5" value="5">
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </option>
      
                  </TextField>
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
              <TextField
                  label="Price"
                  select
                  value={this.state.price}
                  name="price"
                  fullWidth
                  onChange={this.handleChange}
                  margin="dense"
                  variant="outlined"

                >
                
                    <option key="1" value="1">
                      $
                    </option>
                    <option key="2" value="2">
                      $$
                    </option>
                    <option key="3" value="3">
                      $$$
                    </option>
                    <option key="4" value="4">
                      $$$$
                    </option>
    
                  </TextField>
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
              <div className='submit-btn'>
                <Button type='submit' value='Submit' label="Submit" variant="outlined" color="primary" >
                  Submit
                </Button>
              </div>
              </div>
              <div className='right-post'>
              {/* <TextField
                  label="Dan's Top Five? (leave alone if false)"
                  type="number"
                  name="topfive"
                  fullWidth
                  value={this.state.topfive}
                  onChange={this.handleChange}
                  margin="dense"
                  variant="outlined"
                />
              <br />
              <TextField
                  label="May's Top Five? (leave alone if false)"
                  type="number"
                  name="maytopfive"
                  fullWidth
                  value={this.state.maytopfive}
                  onChange={this.handleChange}
                  margin="dense"
                  variant="outlined"
                />
              <br />
              <TextField
                  label="Wall of Shame (leave alone if false)"
                  type="number"
                  name="wallofshame"
                  fullWidth
                  value={this.state.wallofshame}
                  onChange={this.handleChange}
                  margin="dense"
                  variant="outlined"
                /> */}
                {/* <br /> */}
              </div>
            </form>
          </div>
        );
      }
}

export default PostReview;