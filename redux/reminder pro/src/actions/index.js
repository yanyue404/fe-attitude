import { ADD_REMINDER, DELETE_REMINDER, CLEAR_MINDER } from '../constans';

export const addReminder = (text, dueDate) => {
  return {
    type: ADD_REMINDER,
    text,
    dueDate
  };
};

export const deleteReminder = id => {
  return {
    type: DELETE_REMINDER,
    id
  };
};

export const clearReminder = () => {
  return {
    type: CLEAR_MINDER
  };
};
