export default (state, action) => {
    switch (action.type) {
      case 'LOAD_USER_SPRINTS_SUCCESS':
        return {
          ...state,
          sprints: action.payload,
          isLoading: false,
          errors: null,
        };
      case 'LOAD_SPRINT_SUCCESS':
      case 'UPDATE_SPRINT_SUCCESS':
        return {
          ...state,
          sprint: action.payload,
          isLoading: false,
          errors: null,
        };
      case 'CREATE_SPRINT_SUCCESS':
        return {
          ...state,
          isLoading: false,
          errors: null,
        };
      case 'CLEAR_SPRINT':
        return {
          ...state,
          sprint: null,
        };
      case 'LOAD_USER_SPRINTS_FAILURE':
      case 'LOAD_SPRINT_FAILURE':
      case 'CREATE_SPRINT_FAILURE':
      case 'SPRINT_DELETED':
      case 'UPDATE_SPRINT_FAILURE':
        return {
          ...state,
          isLoading: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  };
  