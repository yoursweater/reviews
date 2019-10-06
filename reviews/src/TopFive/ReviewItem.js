import React from 'react';


class ReviewItem extends React.Component {

    removeTop = (id) => {
      let deleteId = {
        id: id
      }
      deleteId = JSON.stringify(deleteId)
      fetch('https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/dandelete', {
        method: 'DELETE',
        mode: 'cors',
        body: deleteId
      }).then(()=>{
        this.props.fetchNewData()
      })
    }
     
    
    render() {
        console.log(this.props)

        return (
            <React.Fragment>
            <li onClick={() => this.removeTop(this.props.review.id)} className='topfive-list'>
               <div className='topfive-item-container'>
                   <div className='topfive-item-ranking'>
                       {this.props.index + 1}
                       
                   </div>
                   <div className='topfive-item-name'>
                       {this.props.review.name}
                   </div>
               </div>
            </li>
            </React.Fragment>
        )
    }
}

export default ReviewItem;