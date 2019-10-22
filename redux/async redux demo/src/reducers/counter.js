const counter = (state = 0, action = {})=> {
  switch (action.type) {
    case "INCREMENT_FULFILLED":
    console.log("action"+action);
    return state + 1;
    case "DECREMENT":
    return state -1;
    default: return state;
  }
}

export default counter;