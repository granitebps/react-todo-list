import React, { Component } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";

import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

export default class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };

  componentDidMount() {
    const items = localStorage.getItem("items");
    if (items) {
      this.setState({
        items: JSON.parse(items)
      });
    }
  }

  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };

    const updatedItems = [...this.state.items, newItem];

    this.setState(
      {
        items: updatedItems,
        item: "",
        id: uuid(),
        editItem: false
      },
      () => {
        localStorage.setItem("items", JSON.stringify(this.state.items));
      }
    );
  };

  clearList = () => {
    this.setState(
      {
        items: []
      },
      () => {
        localStorage.setItem("items", this.state.items);
      }
    );
  };

  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    this.setState(
      {
        items: filteredItems
      },
      () => {
        localStorage.setItem("items", this.state.items);
      }
    );
  };

  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);

    this.setState(
      {
        items: filteredItems,
        item: selectedItem.title,
        editItem: true,
        id: id
      },
      () => {
        localStorage.setItem("items", this.state.items);
      }
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h1 className="text-capitalize text-center">To Do App</h1>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/granitebps/react-todo-list"
              className="btn btn-secondary btn-block"
            >
              Github Page
            </a>
          </div>
        </div>
      </div>
    );
  }
}
