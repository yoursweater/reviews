import React, { Component } from 'react'
// import logo from './logo.svg';
import ReviewList from './ReviewList/ReviewList'
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
  const [open, setOpen] = React.useState(true);
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

  setListItems = (listItems, isDan) => {
    if (isDan) this.setState({listItems});
    if (!isDan) this.setState({mayItems: listItems})
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

            let mayItems = []
            let orderTwo = data.Items.filter(item => item.id === 'maytableorder')[0].name.split(',').map((rev, idx) => ({
                id: `item-${idx}`,
                content: rev
            }))
            mayItems = orderTwo

            this.setState({
              dantop: data.Items,
              listItems,
              mayItems
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
                {/* DAN - listItems set to default listItems */}
                <DraggableFive isDan={true} fetchNewData={this.fetchNewData} reviews={this.state.reviews} dantop={this.state.dantop} listItems={this.state.listItems} setListItems={this.setListItems} />
                {/* MAY - listItems set to mayItems */}
                <DraggableFive isDan={false} fetchNewData={this.fetchNewData} reviews={this.state.reviews} dantop={this.state.dantop} listItems={this.state.mayItems} setListItems={this.setListItems} />

                {/* <WallOfShame reviews={this.state.reviews} /> */}
              </div>
              <div className="right-section">
                <ReviewList
                  fetchNewData={this.fetchNewData}
                  reviews={this.state.reviews}
                  dantop={this.state.dantop}
                  maytop={this.state.maytop}
                  listItems={this.state.listItems}
                  mayItems={this.state.mayItems}
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
