import React from 'react';


class ReviewItem extends React.Component {

    removeTop = (id) => {
      let deleteId = {
        id: id
      }
      deleteId = JSON.stringify(deleteId)
      let url = this.props.table === 'dan' ? 'https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/dandelete' : 'https://rw1gy0pc51.execute-api.us-east-1.amazonaws.com/dev/maydelete'
      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: deleteId
      }).then(()=>{
        this.props.fetchNewData()
      })
    }
     
    
    render() {
      let tablecolor = this.props.table === 'dan' ? '#00701a' : '#ff9800'

        return (
            <React.Fragment>
            <li onClick={() => this.removeTop(this.props.review.id)} className='topfive-list'>
               <div className='topfive-item-container'>
                   <div className='topfive-item-ranking' style={{backgroundColor: tablecolor}}>
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