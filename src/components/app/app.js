import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "John Smith",
          salary: 0,
          increase: false,
          rise: false,
          id: 1
        },
        { name: "Snitch Man", salary: 245, increase: false, rise: true, id: 2 },
        {
          name: "Binance Magnate",
          salary: 5255,
          increase: true,
          rise: false,
          id: 3
        }
      ],
      term: "",
      filter: "all"
    };
    this.maxId = this.state.data.length;
    this.addItem = this.addItem.bind(this);
  }

  deleteItem = id => {
    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)
      };
    });
  };

  addItem = (e, name, salary) => {
    e.preventDefault();
    if (name.length >= 3 && salary) {
      const newEmployee = {
        name,
        salary,
        increase: false,
        id: this.maxId + 1
      };
      this.setState(({ data }) => {
        const newArr = data.slice();
        newArr.push(newEmployee);
        this.maxId += 1;
        return { data: newArr };
      });
    } else {
      return;
    }
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      })
    }));
  };

  getEmployeesOnIncrease = data => {
    let i = 0;
    data = this.state.data;
    data.forEach(item => {
      if (item.increase === true) {
        i++;
      }
    });
    return i;
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = term => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter(item => item.rise);
      case "moreThen1000":
        return items.filter(item => item.salary >= 1000);
      default:
        return items;
    }
  };

  onFilterSelect = filter => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className='app'>
        <AppInfo data={data} getEmployeesCounter={this.state.data.length} />

        <div className='search-panel'>
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          ></AppFilter>
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />

        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
