import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css";

class TableItem extends Component {
  state = {
    editMode: false,
    done: true,
    item: {
      name: "",
      description: "",
      dueDate: new Date()
    }
  };

  componentDidMount = () => {
    let item = this.props.item;
    item.dueDate = new Date(item.dueDate);
    this.setState({ item: item });
    if (this.props.editMode) {
      this.switchToEditMode({});
    }
  };

  switchToEditMode = item => {
    this.setState({ editMode: true, item });
  };

  save = () => {
    this.setState({ editMode: false });
    this.props.saveItem(this.state.item, this.props.isNewItem);
  };

  handleOnChange = ({ currentTarget: input }) => {
    const item = { ...this.state.item };
    item[input.name] = input.value;
    this.setState({ item });
  };

  render() {
    const { item, done, editMode } = this.state;
    const { handleDeleteItem } = this.props;

    return (
      <tr>
        <td>{item.id}</td>
        <td>
          <input
            type="checkbox"
            value={done}
            onClick={e => this.setState(state => ({ done: !state.done }))}
          />
        </td>
        <td>
          {editMode ? (
            <input onChange={this.handleOnChange} name="name" value={item.name}></input>
          ) : (
            item.name
          )}
        </td>
        <td>
          {editMode ? (
            <input
              onChange={this.handleOnChange}
              name="description"
              value={item.description}
            ></input>
          ) : (
            item.description
          )}
        </td>
        <td>
          {editMode ? (
            <DatePicker
              onChange={date => {
                let item = this.state.item;
                item.dueDate = date;
                this.setState(item);
              }}
              name="dueDate"
              selected={item.dueDate}
              dateFormat="yyyy-MM-dd"
            />
          ) : (
            item.dueDate.toISOString().slice(0, 10)
          )}
        </td>
        <td id="action-buttons">
          {editMode ? (
            <button className="btn btn-warning" onClick={this.save}>
              Save
            </button>
          ) : (
            <button className="btn btn-success" onClick={() => this.switchToEditMode(item)}>
              Edit
            </button>
          )}
          <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableItem;
