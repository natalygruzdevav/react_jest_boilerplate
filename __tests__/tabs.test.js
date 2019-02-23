import React from 'react';
import { mount, shallow } from 'enzyme';

import Tabs from '../src/components/Tabs';

describe('Tabs', () => {
  it('renders', () => {
    const wrapper = shallow(<Tabs />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render selected tab', () => {
    const wrapper = mount(<Tabs default={4} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('select tab', () => {
    const wrapper = mount(<Tabs />);
    wrapper
      .find('Tab')
      .at(5)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('not react on disabled tab', () => {
    const wrapper = mount(<Tabs />);

    wrapper.find({ disabled: true }).simulate('click');
    expect(wrapper).toMatchSnapshot();

    wrapper
      .find('Tab')
      .at(0)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
