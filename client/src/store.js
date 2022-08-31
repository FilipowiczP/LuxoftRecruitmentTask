import { createStore } from "redux";

const initialState = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
  ]

const boardMap = (state = initialState , action) =>{
  switch (action.type) {
    case 'START_GAME':
      return action.payload;
    default:
      return state;
  }
}

export const store = createStore(boardMap) 