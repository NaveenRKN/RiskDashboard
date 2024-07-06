import * as UserConstants from '../contsants';

const instialState = {
    todoData: null,
    loading: false,
    error: false,
};

const TodoStore = (state = instialState, action) => {
    switch (action.type) {
        case UserConstants.GET_TODO:
            return { ...state, loading: true };
        case UserConstants.GET_TODO_SUCCESS:
            return { ...state, todoData: action.payload, loading: false };
        case UserConstants.GET_TODO_ERROR:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};
export default TodoStore