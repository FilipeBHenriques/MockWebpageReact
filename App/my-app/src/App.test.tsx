import React from 'react';
import { render, screen , fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// App.test.tsx


test('profile picture is centered in the header', () => {
  render(<App />); // Render the component

  // Get the profile image element
  const profilePic = screen.getByAltText('Profile');

  // Check if it has the correct CSS styles
  const style = window.getComputedStyle(profilePic);
  
  // Assert that the profile picture is horizontally and vertically centered
  expect(style.display).toBe('flex');
  expect(style.alignItems).toBe('center');
  expect(style.justifyContent).toBe('center');
});

test('dropdown menu opens and closes when clicked', () => {
  render(<App />); // Render the component

  // Get the dropdown button element
  const dropdownButton = screen.getByText('▼'); 

  // Initially, the dropdown content should not be visible
  let dropdownContent = screen.queryByText('Settings');
  expect(dropdownContent).not.toBeInTheDocument(); // Ensure dropdown content is not shown initially

  // Click the dropdown button to open the menu
  fireEvent.click(dropdownButton);

  // Now, the dropdown content should be visible
  dropdownContent = screen.getByText('Settings');
  expect(dropdownContent).toBeInTheDocument(); // Ensure dropdown content is visible after click

  // Click the dropdown button again to close the menu
  fireEvent.click(dropdownButton);

  // Ensure the dropdown content is no longer visible
  dropdownContent = screen.queryByText('Settings');
  expect(dropdownContent).not.toBeInTheDocument(); // Ensure dropdown content is not shown after second click
});