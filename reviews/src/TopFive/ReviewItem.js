import React from 'react';
import { DragSource } from 'react-dnd';


class ReviewItem extends React.Component {
    
    render() {

        return (
            <li draggable
            onDrag={this.props.onDrag}
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            className='topfive-list'>
               <div className='topfive-item-container'>
                   <div className='topfive-item-ranking'>
                       {this.props.index + 1}
                   </div>
                   <div className='topfive-item-name'>
                       {this.props.review.name}
                   </div>
               </div>
            </li>
        )
    }
}

export default ReviewItem;