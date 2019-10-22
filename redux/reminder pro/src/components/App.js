import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import { addReminder, deleteReminder, clearReminder } from "../actions";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      dueDate: ''
    }
  }
  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  deleteReminder(id) {
    this.props.deleteReminder(id)
  }
  clearReminder() {
    this.props.clearReminder()
  }
  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group mt-2 col-sm-8">
        {reminders.map(reminder => {
          return (<li key={reminder.id} className="list-group-item">
            <div className="list-item">
              <div>{reminder.text}</div>
              <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
            </div>
            <div className="list-item delete-button" onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</div>
          </li>)
        })}
      </ul>
    )
  }
  render() {
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>

        <div className="form-inline  reminder-form">
          <div className="form-group mr-2">
            <input type="text" onChange={(event) => this.setState({ text: event.target.value })} className="form-control mr-2" placeholder="I have to..." />
            <input
              type="datetime-local"
              className="form-control"
              onChange={(event) => this.setState({ dueDate: event.target.value })}
            />
          </div>
          <button type="button" onClick={this.addReminder.bind(this)} className="btn btn-success">Add Reminder</button>
          
        </div>
        {this.renderReminders()}
        <div 
          className="btn btn-danger mt-3"
          onClick={ () => this.clearReminder() }
        >
          Clear Reminders
        </div>
      </div>
    );
  }
}

App.propTypes = {
  reminders: PropTypes.array.isRequired,
  addReminder: PropTypes.func.isRequired,
  deleteReminder: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    reminders: state
  }
}
export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminder })(App);
