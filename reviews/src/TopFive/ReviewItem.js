import React from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
    beginDrag(props) {
        return props.review
    },
    endDrag(props, monitor, component) {
        return props.handleDrop(props.index)
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

class ReviewItem extends React.Component {
    
    render() {
        const {isDragging, connectDragSource, review} = this.props

        return connectDragSource(
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

export default DragSource('review', itemSource, collect)(ReviewItem);