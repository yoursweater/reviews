import React from 'react';
import './ReviewFilter.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const options = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five'
];

class ReviewList extends React.Component {
    state = {
      anchorEl: null,
      selectedIndex: 4,
    };
  
    handleClickListItem = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
    
    handleMenuItemClick = (event, index) => {
      this.props.executeFilter(index)
      this.setState({ selectedIndex: index, anchorEl: null });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
  
    render() {
    
      const { anchorEl } = this.state;
  
      return (
        <div className='review-filter'>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Filter by Stars"
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary="Filter by Stars"
                secondary={options[this.state.selectedIndex]}
              />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    }
  }
  
  export default ReviewList