import React from 'react';
import { DragSource } from 'react-dnd';


class ReviewItem extends React.Component {
    
    render() {
        // const {isDragging, connectDragSource, review} = this.props
        // console.log(this.props)

        return (
            <li draggable
            onDrag={this.props.onDrag}
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            className='maytopfive-list'>
               <div className='maytopfive-item-container'>
                   <div className='maytopfive-item-ranking'>
                       {this.props.index + 1}
                   </div>
                   <div className='maytopfive-item-name'>
                       {this.props.review.name}
                   </div>
               </div>
            </li>
        )
    }
}

export default ReviewItem;