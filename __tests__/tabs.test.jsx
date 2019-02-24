import React from 'react';
import { mount } from 'enzyme';
import 'react-log-state';

import App from '../src/components/App';

// eslint-disable-next-line
ReactLogState.logAll();
describe('Tabs', () => {
  it('add tab', () => {
    const wrapper = mount(<App />);
    const tabsCount = wrapper.find('li[data-test="tab-item"]').length;
    const buttonAdd = wrapper.find('button[data-test="add"]');
    buttonAdd.simulate('click');
    const tabsBox = wrapper.find('div[data-test="box"]');
    expect(tabsBox).toContainMatchingElements(
      tabsCount + 1,
      'li[data-test="tab-item"]',
    );
  });

  it('remove tab', () => {
    const wrapper = mount(<App />);
    const tabsCount = wrapper.find('li[data-test="tab-item"]').length;
    const buttonRemove = wrapper.find('button[data-test="remove"]').at(2);
    buttonRemove.simulate('click');
    const tabsBox = wrapper.find('div[data-test="box"]');
    expect(tabsBox).toContainMatchingElements(
      tabsCount - 1,
      'li[data-test="tab-item"]',
    );
  });

  it('change tab', () => {
    const wrapper = mount(<App />);
    const tab = wrapper.find('li[data-test="tab-item"]').at(2);
    tab.simulate('click');
    const tabSelected = wrapper.find('li[data-test="tab-item"]').at(0);
    const tabNotSelected = wrapper.find('li[data-test="tab-item"]').at(2);
    expect(tabSelected).toHaveProp('aria-selected', 'false');
    expect(tabNotSelected).toHaveProp('aria-selected', 'true');;
  });

  test('save active tabs to cookies', () => {
    const cookiesStub = () => {
      const cookie = {};
      return {
        set: (field, value) => { cookie[field] = value; },
        get: field => cookie[field],
      };
    };
    const cookie = cookiesStub();

    const wrapper = mount(<App cookie={cookie} />);
    const tab = wrapper.find('li[data-test="tab-item"]').at(2);
    tab.simulate('click');

    const wrapper2 = mount(<App cookie={cookie} />);
    const tab2 = wrapper2.find('li[data-test="tab-item"]').at(2);
    expect(tab2).toHaveProp('aria-selected', 'true');
  });
});
