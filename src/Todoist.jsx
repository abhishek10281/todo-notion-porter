import React from "react";
import AddTodo from "./AddTodo";
import MoreOptions from "./MoreOptions";

const generateUniqueId = () => {
  return Math.floor(Math.random() * 10000);
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      // console.log("in add");
      let newNote = {
        id: generateUniqueId(),
        text: action.text,
        is_completed: false,
        is_editable: false,
        children: []
      };
      return [...state, newNote];

    case "edit":
      // console.log(state);
      return state.map((task) => {
        console.log(task.id, action);
        if (task.id === action.id) {
          return {
            ...task,
            text: action.text,
            is_editable: true
          };
        } else
          return {
            ...task,
            is_editable: false
          };
      });
    case "onblur":
      return state.map((task) => {
        console.log(task.id, action);
        if (task.id === action.id) {
          return {
            ...task,
            is_editable: false
          };
        } else return task;
      });
    case "removesame":
      const textKeys = {};
      state.forEach((task) => {
        console.log(task);
        if (!textKeys[task.text]) {
          textKeys[task.text] = task;
        }
      });
      return Object.values(textKeys).length > 0
        ? Object.values(textKeys)
        : state;

    case "addSubTask":
      return [];

    case "delete":
      return state.filter((task) => task.id !== action.id);

    default:
      return state;
  }
};

const ToDo = () => {
  const [todos, dispatch] = React.useReducer(reducer, []);

  return (
    <>
      <AddTodo
        addTodo={(text) => dispatch({ type: "add", text })}
        removeDuplicate={() => dispatch({ type: "removesame" })}
      />
      <div className="container">
        {todos.map(({ id, text, is_completed, is_editable, children }) => {
          return children.map(
            ({ id, text, is_completed, is_editable, children }) => {
              return (
                <div key={id} className="row my-2">
                  <div className="col">
                    <input type="checkbox" id={id}></input>
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      disabled={!is_editable}
                      id={id}
                      name={id}
                      value={text}
                      onBlur={(e) => {
                        dispatch({
                          type: "onblur",
                          id,
                          is_editable: false
                        });
                      }}
                      onChange={(e) => {
                        let { value } = e.target;
                        console.log(is_editable);
                        if (is_editable)
                          dispatch({
                            type: "edit",
                            id,
                            text: value
                          });
                        else
                          dispatch({
                            type: "add",
                            id,
                            text: value
                          });
                      }}
                    />
                  </div>
                  <MoreOptions
                    className="col"
                    onDeleteTask={(e) => {
                      let { value } = e.target;
                      dispatch({ type: "delete", id, text: value });
                    }}
                    onEditTask={(e) => {
                      let { value } = e.target;
                      dispatch({
                        type: "edit",
                        id,
                        text: value,
                        is_editable: true
                      });
                    }}
                    onAddSubTask={(e) => {}}
                  />
                </div>
              );
            }
          );
        })}
      </div>
    </>
  );
};

export default ToDo;
