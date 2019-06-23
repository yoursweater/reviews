import React from 'react';


class ReviewItem extends React.Component {
    
    render() {

        return (
            <li className='topfive-list'>
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