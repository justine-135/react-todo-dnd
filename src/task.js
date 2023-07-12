import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  &:hover {
    transform: translateY(-5px);
  }
  transition: 150ms ease-in-out;
`;

const TaskContent = styled.p`
  color: #000000ce;
  font-weight: 500;
  margin: 0;
  width: 80%;
  word-wrap: break-word;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Svg = styled.svg``;

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = this.props.state;

    // Binding this keyword
    // this.deleteTask = this.deleteTask.bind(this);
  }

  // deleteTask = (task) => {
  //   const oldTasks = this.state.tasks;
  //   const oldColumns = this.state.columns;
  //   const tasksArr = Object.values(oldTasks);
  //   const columnsArr = Object.values(oldColumns);

  //   const removeTask = tasksArr.filter((item) => {
  //     return item.id != task;
  //   });

  //   let newColumn = columnsArr.filter((col) => {
  //     const ids = col.taskIds;
  //     let removedId = ids.filter((id) => {
  //       return id != task;
  //     });
  //     col.taskIds = removedId;
  //     return col.taskIds;
  //   });

  //   let newTasks = Object.assign({}, removeTask);

  //   const newState = {
  //     ...this.state,
  //     tasks: newTasks,
  //     column: {
  //       ...this.state.column,
  //       "column-1": {
  //         ...this.state.columns["column-1"],
  //         taskIds: newColumn["0"].taskIds,
  //       },
  //       "column-2": {
  //         ...this.state.columns["column-2"],
  //         taskIds: newColumn["1"].taskIds,
  //       },
  //       "column-3": {
  //         ...this.state.columns["column-3"],
  //         taskIds: newColumn["2"].taskIds,
  //       },
  //     },
  //   };
  //   // const newState = {
  //   //   ...this.state,
  //   //   tasks: newTasks,
  //   //   column: {
  //   //     ...this.state.column,
  //   //     "column-1": {
  //   //       ...this.state.columns["column-1"],
  //   //       taskIds: newColumn["0"].taskIds,
  //   //     },
  //   //     "column-2": {
  //   //       ...this.state.columns["column-2"],
  //   //       taskIds: newColumn["1"].taskIds,
  //   //     },
  //   //     "column-3": {
  //   //       ...this.state.columns["column-3"],
  //   //       taskIds: newColumn["2"].taskIds,
  //   //     },
  //   //   },
  //   // };

  //   console.log(columnsArr);

  //   const array = [2, 5, 9];

  //   // const index = array.indexOf(5);
  //   // if (index > -1) {
  //   //   // only splice array when item is found
  //   //   array.splice(index, 1); // 2nd parameter means remove one item only
  //   // }

  //   // const index = columnsArr.indexOf(String(task));
  //   // if (index > -1) {
  //   //   // only splice array when item is found
  //   //   columnsArr.splice(index, 1); // 2nd parameter means remove one item only
  //   // }

  //   // array = [2, 9]
  //   // console.log(columnsArr);
  // };

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <TaskContent>{this.props.task.content}</TaskContent>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="bi bi-grip-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </Svg>
            {/* <Button> */}
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                class="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
              </svg> */}
            {/* </Button> */}
          </Container>
        )}
      </Draggable>
    );
  }
}
