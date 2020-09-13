import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Icon} from '@material-ui/core'
import {v4 as uuidv4} from 'uuid'


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  borderRadius: '8px',
  boxShadow: '3px 2px 5px 2px rgba(94, 93, 94, 0.37)',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  margin: 20
});

class DraggableFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }


  onDragEnd(result, props) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.listItems,
      result.source.index,
      result.destination.index
    );

    console.log('REORDERED ITEMS: ', items)
    props.setListItems(items, props.isDan)

    const nonEmptyItems = items.filter(item => item.content !== "")

    let newOrderString = ''
    nonEmptyItems.forEach(item => {
        newOrderString += item.content + ','
    })
    console.log(newOrderString)
    newOrderString = newOrderString.slice(0, newOrderString.length - 1)
    console.log('edited!')

    let url = 'https://syrky3ilk6.execute-api.us-east-1.amazonaws.com/prod/editorder'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            id: props.isDan ? 'tableorder' : 'maytableorder',
            order: newOrderString,
            table: 'dantable'
        })
    }).then(()=>{
        this.props.fetchNewData()
    })

  }

  removeListItem = (itemName, props) => {
    console.log(itemName)
    console.log(props)

    const nonEmptyItems = props.listItems.filter(item => item.content !== "")
    const removedItems = nonEmptyItems.filter(item => item.content !== itemName)
    props.setListItems(removedItems, props.isDan)

    let newOrderString = ''
    removedItems.forEach(item => {
        newOrderString += item.content + ','
    })
    console.log(newOrderString)
    newOrderString = newOrderString.slice(0, newOrderString.length - 1)
    console.log('edited!')

    let url = 'https://syrky3ilk6.execute-api.us-east-1.amazonaws.com/prod/editorder'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            id: props.isDan ? 'tableorder' : 'maytableorder',
            order: newOrderString,
            table: 'dantable'
        })
    }).then(()=>{
        this.props.fetchNewData()
    })
  }


  render() {
      
    return (
      <React.Fragment>
        <h3 className='topfive-title'>{this.props.isDan ? "Dan's" : "May's"} Top Restaurants</h3>
        <DragDropContext onDragEnd={e => this.onDragEnd(e, this.props)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.listItems && this.props.listItems.map((item, index) => (
                  <Draggable key={uuidv4()} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <span style={{paddingRight: 10, fontWeight: 800, color: 'rgb(0, 112, 26)'}}>{index + 1}.</span>{item.content}
                        <span style={{float: 'right'}}><HighlightOffIcon onClick={e => this.removeListItem(item.content, this.props)} /></span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      </DragDropContext>
      </React.Fragment>
    );
  }
}


export default DraggableFive