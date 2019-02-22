import React from 'react';
import { DragSource } from 'react-dnd';


class ReviewItem extends React.Component {
    
    render() {
        const {isDragging, connectDragSource, review} = this.props
        console.log(this.props)

        return (
            <li className='topfive-list' key={this.props.review.id}>
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