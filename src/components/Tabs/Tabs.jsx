import React, { Component } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import uniqid from 'uniqid';
import Cookies from 'js-cookie';

import 'react-tabs/style/react-tabs.css';

class TabsCоmponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { id: uniqid(), title: 'Title 1', content: 'Any content 1' },
        { id: uniqid(), title: 'Title 2', content: 'Any content 2' },
        { id: uniqid(), title: 'Title 3', content: 'Any content 3' },
        { id: uniqid(), title: 'Title 4', content: 'Any content 4' },
        { id: uniqid(), title: 'Title 5', content: 'Any content 5' },
      ],
      activeIndex: this.getSavedIndex(),
    };
  }

  renderTabLink = () => {
    const { tabs } = this.state;

    return tabs.map(tab => (
      <Tab key={tab.id} data-test="tab-item">
        {tab.title}
        <button
          data-test="remove"
          onClick={() => this.handleClickRemoveTab(tab.id)}
          type="button"
        >
          Remove tab
        </button>
      </Tab>
    ));
  };

  renderTabContent = () => {
    const { tabs } = this.state;

    return tabs.map(tab => (
      <TabPanel key={tab.id}>
        <h2>{tab.content}</h2>
      </TabPanel>
    ));
  };

  handleClickNewTab = () => {
    const { tabs } = this.state;
    this.setState({
      tabs: [
        ...tabs,
        { id: uniqid(), title: 'Title ', content: 'Any content' },
      ],
    });
  };

  handleClickRemoveTab = (id) => {
    this.setState(state => ({
      ...state,
      tabs: state.tabs.filter(tab => tab.id !== id),
    }));
  };

  getSavedIndex = () => {
    const tabIndex = Cookies.get('tabIndex');
    return parseInt(tabIndex, 10);
  };

  setSavedIndex = (index) => {
    const { tabs } = this.state;
    Cookies.set('tabIndex', Math.min(index, tabs.length - 1));
  };

  handleTabSelect = (activeIndex) => {
    this.setState({ activeIndex });
    this.setSavedIndex(activeIndex);
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <div data-test="box">
        <button data-test="add" onClick={this.handleClickNewTab} type="button">
          Add tab
        </button>
        <Tabs
          selectedIndex={activeIndex}
          onSelect={this.handleTabSelect}
        >
          <TabList>{this.renderTabLink()}</TabList>
          {this.renderTabContent()}
        </Tabs>
      </div>
    );
  }
}

export default TabsCоmponent;
