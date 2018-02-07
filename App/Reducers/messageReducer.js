

const messageReducer = (state = [], action) => {
    switch (action.type) {
      case 'NEW_MESSAGE':
        return {
          ...state,
          text: action.text
        };
    
        default:
            return state;
    }
}

export default messageReducer;