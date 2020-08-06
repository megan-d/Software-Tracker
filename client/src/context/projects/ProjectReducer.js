export default (state, action) => {
    switch (action.type) {
      case 'LOAD_USER_PROJECTS_SUCCESS':
        return {
          ...state,
          projects: action.payload,
          isLoading: false,
          errors: null
        };
      case 'LOAD_USER_PROJECTS_FAILURE':
        return {
          ...state,
          isLoading: false,
          errors: action.payload
        };
      default:
        return state;
    }
  };
  