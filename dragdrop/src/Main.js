import React from 'react';
import './App.css';

class Main extends React.Component {
  state = {
    reviews: {
      'task1': {id: '1', task: 'do somethhing'},
      'task2': {id: '2', task: 'do blah'},
      'task3': {id: '3', task: 'do somasfing'},
      'task4': {id: '4', task: 'do hing'},
    },
    columns: {'column1': {
                id: 'column1',
                title: 'task list',
                taskIds: ['1', '2', '3', '4']
              }
    },
    columnOrder: ['column1']
  }

  renderItems = () => {
    let items = this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId]
      const tasks = column.taskIds.map(taskId => {
        return this.state.reviews[taskId]
      })
      return column.title
    })
    return items
  }

  render() {
    let items = this.renderItems()
    return (
      <div className="App">
        {items}
      </div>
    );
  }
}

export default Main;
