import React from 'react';
import { mount } from 'enzyme';
import 'react-log-state';
import nock from 'nock';
import delay from 'delay';

import App from '../src/components/App';

// eslint-disable-next-line
ReactLogState.logAll();
const tab = 'li[data-test="tab-item"]';
const btnAdd = 'button[data-test="add"]';
const tabBox = 'div[data-test="box"]';
const btnRemove = 'button[data-test="remove"]';
const btnRSS = 'button[data-test="add-rss"]';
const inputRSS = 'input[data-test="link-rss"]';

const buildSelectors = wrapper => ({
  tabs: () => wrapper.find(tab),
  btnAdd: () => wrapper.find(btnAdd),
  tabBox: () => wrapper.find(tabBox),
  btnRemove: () => wrapper.find(btnRemove),
  btnRSS: () => wrapper.find(btnRSS),
  inputRSS: () => wrapper.find(inputRSS),
});

describe('Tabs', () => {
  it('add tab', () => {
    const wrapper = mount(<App />);
    const s = buildSelectors(wrapper);
    const tabsCount = s.tabs().length;
    s.btnAdd().simulate('click');
    expect(s.tabBox()).toContainMatchingElements(tabsCount + 1, tab);
  });

  it('remove tab', () => {
    const wrapper = mount(<App />);
    const s = buildSelectors(wrapper);
    const tabsCount = s.tabs().length;
    s.btnRemove()
      .at(2)
      .simulate('click');
    expect(s.tabBox()).toContainMatchingElements(tabsCount - 1, tab);
  });

  it('change tab', () => {
    const wrapper = mount(<App />);
    const s = buildSelectors(wrapper);
    s.tabs().at(2).simulate('click');
    const tabSelected = s.tabs().at(0);
    const tabNotSelected = s.tabs().at(2);
    expect(tabSelected).toHaveProp('aria-selected', 'false');
    expect(tabNotSelected).toHaveProp('aria-selected', 'true');
  });

  test('save active tabs to cookies', () => {
    const cookiesStub = () => {
      const cookie = {};
      return {
        set: (field, value) => {
          cookie[field] = value;
        },
        get: field => cookie[field],
      };
    };
    const cookie = cookiesStub();

    const wrapper = mount(<App cookie={cookie} />);
    const s = buildSelectors(wrapper);
    s.tabs()
      .at(2)
      .simulate('click');

    const wrapper2 = mount(<App cookie={cookie} />);
    const s2 = buildSelectors(wrapper2);

    expect(s2.tabs().at(2)).toHaveProp('aria-selected', 'true');
  });
});

describe('RSS parse', () => {
  test('save tab with rss', async () => {
    const wrapper = mount(<App />);
    const s = buildSelectors(wrapper);

    const CORS_PROXY = 'https://cors.io';
    nock(CORS_PROXY)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/?http://www.example.com')
      .replyWithFile(200, '__fixtures__/rss.xml');
    const tabsCount = s.tabs().length;
    s.inputRSS().simulate('change', {
      target: { value: 'http://www.example.com' },
    });

    expect(s.inputRSS()).toHaveProp('value', 'http://www.example.com');
    s.btnRSS().simulate('click');

    await delay(1000);
    wrapper.update();

    expect(s.tabBox()).toContainMatchingElements(tabsCount + 1, tab);
  });
});
