import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import DashboardPage from '../../components/DashboardPage'

test('should render DashboardPage correctly', () => {
    const wrapper = shallow(<DashboardPage />)
    expect(toJSON(wrapper)).toMatchSnapshot()
})