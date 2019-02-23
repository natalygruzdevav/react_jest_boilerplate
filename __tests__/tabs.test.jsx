import React from 'react';
import { mount } from 'enzyme';

import App from '../src/components/App';

describe('Tabs', () => {
  it('render', () => {
    const wrapper = mount(<App />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('click tab', () => {
    const wrapper = mount(<App />);
    wrapper
      .find('[data-test="tab-item"]')
      .at(4)
      .simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });
});
