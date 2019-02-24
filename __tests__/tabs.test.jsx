import React from "react";
import { mount } from "enzyme";

import App from "../src/components/App";

describe("Tabs", () => {
  it("add tab", () => {
    const wrapper = mount(<App />);
    const tabsCount = wrapper.find('li[data-test="tab-item"]').length;
    const buttonAdd = wrapper.find('button[data-test="add"]');
    buttonAdd.simulate("click");
    const tabsBox = wrapper.find('div[data-test="box"]');
    expect(tabsBox).toContainMatchingElements(
      tabsCount + 1,
      'li[data-test="tab-item"]'
    );
  });

  it("remove tab", () => {
    const wrapper = mount(<App />);
    const tabsCount = wrapper.find('li[data-test="tab-item"]').length;
    const buttonRemove = wrapper.find('button[data-test="remove"]');
    buttonRemove.simulate("click");
    const tabsBox = wrapper.find('div[data-test="box"]');
    expect(tabsBox).toContainMatchingElements(
      tabsCount - 1,
      'li[data-test="tab-item"]'
    );
  });

  it("change tab", () => {
    const wrapper = mount(<App />);
    const tabsCount = wrapper.find('li[data-test="tab-item"]').length;
    const buttonRemove = wrapper.find('button[data-test="remove"]');
    buttonRemove.simulate("click");
    const tabsBox = wrapper.find('div[data-test="box"]');
    expect(tabsBox).toContainMatchingElements(
      tabsCount - 1,
      'li[data-test="tab-item"]'
    );
  });
});
