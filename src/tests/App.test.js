import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App behaves correclty', () => {
  test('Renders initial search page correctly', () => {
    render(<App />);

    // Check if page title is being rendered correctly
    const appTitleElement = screen.getByText(/GITHUB USERS SEARCH APP/i);
    expect(appTitleElement).toBeInTheDocument();

    // Check if input text field is being rendered correctly
    const searchInputElement = screen.getByTestId("search-key-input")
    expect(searchInputElement).toBeInTheDocument();
    expect(searchInputElement.getAttribute("value")).toEqual("");

    // Check if search button is being rendered correctly
    const searchButtonElement = screen.getByTestId("search-button")
    expect(searchButtonElement).toBeInTheDocument();
    expect(searchButtonElement.getAttribute("value")).toEqual("Search");
    
  });
  
})
