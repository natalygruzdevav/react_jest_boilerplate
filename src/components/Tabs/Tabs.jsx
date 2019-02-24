import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import uniqid from "uniqid";

import "react-tabs/style/react-tabs.css";

class TabsCоmponent extends Component {
  state = {
    tabs: [
      { id: uniqid(), title: "Title 1", content: "Any content 1" },
      { id: uniqid(), title: "Title 2", content: "Any content 2" },
      { id: uniqid(), title: "Title 3", content: "Any content 3" },
      { id: uniqid(), title: "Title 4", content: "Any content 4" },
      { id: uniqid(), title: "Title 5", content: "Any content 5" }
    ]
  };

  renderTabLink = () =>
    this.state.tabs.map(tab => (
      <Tab key={tab.id} data-test='tab-item'>
        {tab.title}
      </Tab>
    ));

  renderTabContent = () =>
    this.state.tabs.map(tab => (
      <TabPanel key={tab.id}>
        <h2>{tab.content}</h2>
        <button data-test="remove" onClick={() => this.handleClickRemoveTab(tab.id)} type='button'>Remove tab</button>
      </TabPanel>
    ));

  handleClickNewTab = () => {
    this.setState({
      tabs: [
        ...this.state.tabs,
        { id: uniqid(), title: "Title ", content: "Any content" }
      ]
    });
  };
  handleClickRemoveTab = (id) => {
    this.setState(state => ({
      ...state,
      tabs: state.tabs.filter(tab => tab.id !== id),
    }));
  };
  render() {
    return (
      <div data-test="box">
        <button data-test="add" onClick={this.handleClickNewTab} type='button'>
          Add tab
        </button>
        <Tabs>
          <TabList>{this.renderTabLink()}</TabList>
          {this.renderTabContent()}
        </Tabs>
      </div>
    );
  }
}

export default TabsCоmponent;
