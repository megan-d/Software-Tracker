export default (state, action) => {
  switch (action.type) {
    case 'LOAD_USER_PROJECTS_SUCCESS':
      return {
        ...state,
        projects: action.payload,
        isLoading: false,
        errors: null,
      };
    case 'LOAD_PROJECT_SUCCESS':
    case 'UPDATE_PROJECT_SUCCESS':
    case 'ADD_COMMENT_SUCCESS':
      return {
        ...state,
        project: action.payload,
        isLoading: false,
        errors: null,
      };
    case 'CLEAR_PROJECT':
      return {
        ...state,
        project: null,
      };
    case 'CREATE_PROJECT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        errors: null,
      };
    case 'LOAD_USER_PROJECTS_FAILURE':
    case 'CREATE_PROJECT_FAILURE':
    case 'LOAD_PROJECT_FAILURE':
    case 'PROJECT_DELETED':
    case 'ADD_COMMENT_FAILURE':
    case 'UPDATE_PROJECT_FAILURE':
      return {
        ...state,
        project: null,
        isLoading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
