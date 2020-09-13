import React, { Component } from 'react'
// import logo from './logo.svg';
import WallOfShame from './WallOfShame/WallOfShame'
import ReviewList from './ReviewList/ReviewList'
import TopFive from './TopFive/TopFive'
import MayTopFive from './TopFive/MayTopFive'
import PostReview from './PostReview/PostReview'
import './App.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DraggableFive from './DraggableFive/DraggableFive'

function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleSubmit = () => {
    if (text === 'branwen') {
      setOpen(false);
    }
    console.log('my text: ', text)
    setText('')
  };

  const handleClose = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter password to continue.</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {/* Please enter the password. */}
          </DialogContentText>
          <TextField
            autoFocus
            value={text}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      dantop: [],
      maytop: [],
    }
  }

  componentDidMount() {
    this.fetchNewData()
  }

  setListItems = (listItems) => {
    this.setState({listItems})
  }

  fetchNewData = () => {
    fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/reviews', {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          reviews: data.Items,
        })
        fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/danget', {
          method: 'GET',
          mode: 'cors',
        })
          .then(res => res.json())
          .then(data => {

            let listItems = []
            let order = data.Items.filter(item => item.id === 'tableorder')[0].name.split(',').map((rev, idx) => ({
                id: `item-${idx}`,
                content: rev
            }))
            listItems = order

            this.setState({
              dantop: data.Items,
              listItems
            })
            fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/mayget', {
              method: 'GET',
              mode: 'cors',
            })
              .then(res => res.json())
              .then(data => {
                this.setState(
                  {
                    maytop: data.Items,
                  },
                  () => console.log(this.state),
                )
              })
          })
      })
  }

  render() {
    return (
      <div className="App">
        <FormDialog />
        <div id="main">
          <h1 className="app-header">Dan and May's Restaurant Reviews</h1>
          <div className="app-container">
            <div className="inner-app-container">
              <div className="left-section">
                <TopFive fetchNewData={this.fetchNewData} reviews={this.state.reviews} dantop={this.state.dantop} />
                <DraggableFive fetchNewData={this.fetchNewData} reviews={this.state.reviews} dantop={this.state.dantop} listItems={this.state.listItems} setListItems={this.setListItems} />
                {/* <MayTopFive
                  fetchNewData={this.fetchNewData}
                  reviews={this.state.reviews}
                  dantop={this.state.dantop}
                  maytop={this.state.maytop}
                /> */}
                {/* <WallOfShame reviews={this.state.reviews} /> */}
              </div>
              <div className="right-section">
                <ReviewList
                  fetchNewData={this.fetchNewData}
                  reviews={this.state.reviews}
                  dantop={this.state.dantop}
                  maytop={this.state.maytop}
                  listItems={this.state.listItems}
                />
              </div>
            </div>
            <div className="post-container">
              <PostReview fetchNewData={this.fetchNewData} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
