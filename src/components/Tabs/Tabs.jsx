import React, { Component } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

class TabsCоmponent extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab data-test="tab-item">Title 1</Tab>
          <Tab data-test="tab-item">Title 2</Tab>
          <Tab data-test="tab-item">Title 3</Tab>
          <Tab data-test="tab-item">Title 4</Tab>
          <Tab data-test="tab-item">Title 5</Tab>
          <Tab data-test="tab-item">Title 6</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 6</h2>
        </TabPanel>
      </Tabs>
    );
  }
}

export default TabsCоmponent;
