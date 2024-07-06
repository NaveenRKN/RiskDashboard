import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoAction, addOrUploadTodo,deleteTodo } from "./../store/redux/actions/todo";
import CustomeInput from "../components/CustomeInput/CustomeInput";
import PropTypes from "prop-types";

const ToDoList = (props) => {
  const { toDoShow,getDropDownToDo } = props,
    [isValidate, setIsValidate] = useState(false),
    [pageLoading, setPageLoading] = useState(true),
    [toDolist, setTodolist] = useState(null),
    [latestChangedFieldId, setLatestChangedFieldId] = useState(""),
    [fields, setFields] = useState({
      description: "",
    }),
    [inputs, setInputs] = useState([
      {
        id: 0,
        placeholder: "Add To-do",
        name: "description",
        type: "text",
        hasError: false,
        errMessage: "",
      },
    ]),
    { todoData } = useSelector((state) => state.TodoStore),
    dispatch = useDispatch();

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    validateForm("", "", "");
  }, [latestChangedFieldId]);
  useEffect(() => {
    if (todoData) {
      setTodolist(todoData);
      setPageLoading(false);
    }
  }, [todoData]);

  const handleChange = (text, fieldName, id, type) => {
      setFields((currentValue) => ({
        ...currentValue,
        [fieldName]: text,
      }));
      setLatestChangedFieldId(id);
    },
    getList = () => {
      let UserId = localStorage.getItem("userId");
      dispatch(getTodoAction(UserId));
    },
    validateForm = (fieldName, id, type) => {
      const ID = id;
      const newInput = [...inputs];
      if (type === "text") {
        if (fields[fieldName].length === 0 || fields[fieldName] === "") {
          newInput[ID].errMessage = "Please fill the field";
          newInput[ID].hasError = true;
          setIsValidate(true);
        } else if (fields[fieldName].length < 1) {
          newInput[ID].hasError = true;
          newInput[ID].errMessage = "Invalid description";
          setIsValidate(true);
        } else {
          newInput[ID].errMessage = "";
          newInput[ID].hasError = false;
          setIsValidate(false);
        }
      }
      setInputs(newInput);
    },
    onAddPress = () => {
      setPageLoading(true);
      inputs.find((input) => validateForm(input.name, input.id, input.type));
      setTimeout(() => {
        const currentChangedField = inputs.find(
          (input) => input.hasError === true
        );
        currentChangedField?.errMessage?.length > 0
          ? getNotification()
          : submitForm();
      }, 100);
    },
    selectCheck = (e, list) => {
      setPageLoading(true);
      list.isActive = e.target.checked;
      dispatch(addOrUploadTodo(list));
      setTimeout(() => {
        getList();
      }, 1000);
    },
    selectCheckDelete = (e, list) => {
      setPageLoading(true);
      dispatch(deleteTodo(list.id));
      setTimeout(() => {
        getList();
      }, 1000);
    },
    submitForm = () => {
      setTimeout(() => {
        setFieldsClear("description");
        getList(); 
      }, 2000);
      let formData = {
        id: "00000000-0000-0000-0000-000000000000",
        userId:  localStorage.getItem("userId"),
        description: fields.description,
        isActive: false,
        createdDate: new Date(),
        updatedDate: null,
      };
      dispatch(addOrUploadTodo(formData));
      // setIsClick(!isClick);
    },
    setFieldsClear = (fieldName) => {
      setFields((currentValue) => ({
        ...currentValue,
        [fieldName]: "",
      }));
    },
    getNotification = () => {
      setPageLoading(false);
    };    

  return (
    <div>
      <div
        id="right-sidebar"
        className={`settings-panel ${toDoShow ? "open" : ""}`}
      >
        {pageLoading && (
        <div className="fullloader" style={pageLoading ? { zIndex: 1000 } : {}}>
          <div className="risk-loader"></div>
        </div>
      )}
        <div className="row" style={{margin:10 }}>
            <div className="col-md-6">
                TO DO LIST
            </div>
            <div className="col-md-6" style={{textAlign: "right", cursor: "pointer"}}>
            <i className="material-icons"  onClick={getDropDownToDo}   >
              close
            </i>
            </div>
         </div>
        
        <div className="tab-content" id="setting-content">
          <div
            className="tab-pane fade show active scroll-wrapper"
            id="todo-section"
            role="tabpanel"
            aria-labelledby="todo-section"
          >
            <div className="add-items d-flex px-3 mb-0">
              <div className="form w-100">
                <div className="form-group d-flex">
                  {inputs &&
                    inputs.map((value, index) => (
                      <>
                        <div>
                          <CustomeInput
                            value={fields.description}
                            classChange={"border"}
                            onChange={(text) => {
                              handleChange(
                                text.target.value,
                                value.name,
                                value.id,
                                value.type
                              );
                            }}
                            placeholder={value.placeholder}
                           
                          />
                          {value.hasError && (
                            <div
                              style={{
                                color: "red",
                                marginTop: 3,
                                fontSize: 12,
                                paddingBottom: 10,
                              }}
                            >
                              {value.errMessage}
                            </div>
                          )}
                        </div>
                      </>
                    ))}
                  <button
                    type="submit"
                    className="add btn btn-primary todo-list-add-btn"
                    id="add-task"
                    onClick={onAddPress}
                    style={{ height: 40 }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="list-wrapper px-3">
              <ul className="d-flex flex-column-reverse todo-list" >
                {toDolist &&
                  toDolist.map((input, i) => (
                    <>
                      <li className={input.isActive ? "completed" : ""}>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="checkbox"
                              type="checkbox"
                              onClick={(e) => {
                                selectCheck(e, input);
                              }}
                              checked={input.isActive}
                            />
                            {input.description}
                          </label>
                        </div>
                        <i className="material-icons remove ti-close"
                         onClick={(e) => {
                          selectCheckDelete(e, input);
                        }}>close</i>
                      </li>
                    </>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
ToDoList.propTypes = {
  toDoShow: PropTypes.any,
  getDropDownToDo: PropTypes.any,
};
