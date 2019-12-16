// Test away
import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';
import Display from '../display/Display';
import Controls from '../controls/Controls';

test('Display Defaults to unlocked and open', () => {
    const wrapper = rtl.render(<Display />);
    expect(wrapper.getByText(/Unlocked/i)).toBeInTheDocument();
    expect(wrapper.getByText(/Open/i)).toBeInTheDocument();
});

test('Cannot be closed or opened if it is locked', () => {
    const wrapper = rtl.render(<Dashboard />);
    const toggleClosed = wrapper.getByTestId('toggleClosed');
    const toggleLocked = wrapper.getByTestId('toggleLocked');

    rtl.fireEvent.click(toggleClosed);
    expect(wrapper.getByText(/Open Gate/i)).toBeInTheDocument();

    rtl.fireEvent.click(toggleLocked);
    expect(wrapper.getByText(/Unlock Gate/i)).toBeInTheDocument();

    rtl.fireEvent.click(toggleClosed);
    expect(wrapper.getByText(/Open Gate/i)).toBeInTheDocument();

    rtl.fireEvent.click(toggleClosed);
    expect(wrapper.getByText(/Open Gate/i)).toBeInTheDocument();
});

test('Dashboard shows the controls and display', () => {
    const wrapper = rtl.render(<Dashboard />);
    expect(wrapper.getByTestId('displayPanel')).toBeInTheDocument();
    expect(wrapper.getByTestId('controlPanel')).toBeInTheDocument();
});

test('Display Component', () => {
    const wrapper = rtl.render(<Dashboard />);
    const toggleClosed = wrapper.getByTestId('toggleClosed');
    const toggleLocked = wrapper.getByTestId('toggleLocked');
    const lockColor = wrapper.getByTestId('lockColor');
    const closedColor = wrapper.getByTestId('closedColor');

    expect(wrapper.getByText(/Open/i)).toBeInTheDocument();
    expect(wrapper.getByText(/Unlocked/i)).toBeInTheDocument();

    expect(lockColor).toHaveClass('green-led');
    expect(closedColor).toHaveClass('green-led');

    rtl.fireEvent.click(toggleClosed);
    expect(wrapper.getByText(/Closed/i)).toBeInTheDocument();

    rtl.fireEvent.click(toggleLocked);
    expect(wrapper.getByText(/Locked/i)).toBeInTheDocument();

    expect(lockColor).toHaveClass('red-led');
    expect(closedColor).toHaveClass('red-led');

    rtl.fireEvent.click(toggleClosed);
    expect(wrapper.getByText(/Open/i)).toBeInTheDocument();

    rtl.fireEvent.click(toggleLocked);
    expect(wrapper.getByText(/Unlocked/i)).toBeInTheDocument();
});

test('the locked toggle button is disabled if the gate is open', () => {
    const wrapper = rtl.render(<Dashboard />);
    const toggleClosed = wrapper.getByTestId('toggleClosed');
    const toggleLocked = wrapper.getByTestId('toggleLocked');

    expect(wrapper.getByText(/Open/i)).toBeInTheDocument();

    rtl.fireEvent.click(toggleLocked);
    expect(wrapper.getByText(/Lock Gate/i)).toBeInTheDocument();

    rtl.fireEvent.click(toggleLocked);
    expect(wrapper.getByText(/Lock Gate/i)).toBeInTheDocument();
    
});