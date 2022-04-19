import React from 'react';
import { shallow } from 'enzyme';
import App from "../App";


describe("MyComponent", () => {
  it("should render the App component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
