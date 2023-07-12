import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
// import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  margin-bottom: 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background: #1a1ef5;
  color: white;
  font-size: 1em;
  margin-left: 1em;
  padding: 0.55em 1em;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #000ba8;
  }
  transition: 100ms ease;
`;

const PlusSvg = styled.svg`
  margin-left: 10px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px 1px #7a7a7a4c;
`;

const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  color: #2d65ff;
  margin-right: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 10px 0px;
  width: 100%;
  margin-bottom: 15px;
  box-shadow: 1px 5px 3px 0px #7a7a7a18;
  border-radius: 2px;
`;
const TodoInput = styled.input`
  font-family: Arial, Helvetica, sans-serif;
  padding: 0.45em 1em;
  width: 40%;
  border-radius: 5px;
  border: none;
  box-shadow: inset 1px 1px 1px 1px #2727274b;
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const FooterText = styled.p`
  padding: 10px;
  text-align: center;
  width: 280px;
  color: #808080;
  font-family: Arial, Helvetica, sans-serif;
`;

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AlertText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  color: red;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index, state } = this.props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} state={state} />;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      tasks: {},
      columns: {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: [],
        },
        "column-2": {
          id: "column-2",
          title: "In progress",
          taskIds: [],
        },
        "column-3": {
          id: "column-3",
          title: "Complete",
          taskIds: [],
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ["column-1", "column-2", "column-3"],
      alert: "",
    };

    this.alert = false;

    // Binding this keyword
    this.addTodo = this.addTodo.bind(this);
  }

  lastId = -1;

  todo = "";

  newId = this.lastId + 1;

  setTodo = (e) => {
    this.todo = e.target.value;
  };

  addTodo = () => {
    if (this.todo == "") {
      const newState = {
        ...this.state,
        alert: "Please enter item to the list",
      };
      this.setState(newState);
    } else {
      this.state.alert = "";
      const newState = {
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [this.newId]: {
            id: String(this.newId),
            content: String(this.todo),
          },
        },
        columns: {
          ...this.state.columns,
          "column-1": {
            ...this.state.columns["column-1"],
            taskIds: [
              ...this.state.columns["column-1"].taskIds,
              String(this.newId),
            ],
          },
        },
      };
      this.setState(newState);
      this.newId = this.newId + 1;
    }

    return;
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <StrictMode>
        <Container>
          <Nav>
            <Title>React todo list DnD</Title>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="blue"
              class="bi bi-list-check"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </Nav>
          <AlertContainer>
            <AlertText>{this.state.alert}</AlertText>
          </AlertContainer>
          <MainContainer>
            <ContentContainer>
              <InputContainer>
                <TodoInput
                  type="text"
                  onChange={this.setTodo}
                  placeholder="Enter todo here"
                />
                <Button onClick={this.addTodo}>
                  Add task
                  <PlusSvg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                  </PlusSvg>
                </Button>
              </InputContainer>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable
                  droppableId="all-columns"
                  direction="horizontal"
                  type="column"
                >
                  {(provided) => (
                    <TaskContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId];
                        return (
                          <InnerList
                            key={column.id}
                            column={column}
                            taskMap={this.state.tasks}
                            index={index}
                            state={this.state}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </TaskContainer>
                  )}
                </Droppable>
              </DragDropContext>
            </ContentContainer>
          </MainContainer>
          <Footer>
            <FooterText>
              Built and designed by Justine Upano. All rights reserved. ©
            </FooterText>
          </Footer>
        </Container>
      </StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
