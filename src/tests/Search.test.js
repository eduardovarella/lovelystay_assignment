import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';

import nock from 'nock';

describe('Search behaves correclty', () => {
  test('Handles empty users search result correctly', async () => {
    
    const searchKey = "searchkeythatreturnsnoresult";

    nock("https://api.github.com")
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get(`/search/users?sort=login&per_page=4&page=1&q=${searchKey}%20in:login`)
      .reply(200, {
        "total_count": 0,
        "incomplete_results": false,
        "items": [
      
        ]
      });


    render(<App />);

    await act(async () => {
      
      // Fill search input
      const searchInputElement = screen.getByTestId("search-key-input");
      await userEvent.type(searchInputElement, searchKey);

      const button = document.querySelector("[data-testid=search-button]");
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      await userEvent.click(button);
    });
    

    await waitFor(() => {
      const emptyResultsElement = screen.getByTestId(`empty-user-list-message`)
      expect(emptyResultsElement).toBeInTheDocument();
    })

  });

  test('Handles non-empty users search result correctly', async () => {
    
    const searchKey = "searchkeythatreturns3result";

    nock("https://api.github.com")
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get(`/search/users?sort=login&per_page=4&page=1&q=${searchKey}%20in:login`)
      .reply(200, {
        "total_count": 3,
        "incomplete_results": false,
        "items": [
          { id: 1, login: "login 1"},
          { id: 2, login: "login 2"},
          { id: 3, login: "login 3"}
        ]
      });


    render(<App />);

    await act(async () => {
      
      // Fill search input
      const searchInputElement = screen.getByTestId("search-key-input");
      await userEvent.type(searchInputElement, searchKey);

      const button = document.querySelector("[data-testid=search-button]");
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      await userEvent.click(button);
    });
    

    await waitFor(() => {
      expect(screen.getByText(`login 1`)).toBeInTheDocument();
      expect(screen.getByText(`login 2`)).toBeInTheDocument();
      expect(screen.getByText(`login 3`)).toBeInTheDocument();
      expect(screen.getByText(`Showing results 1 to 3, of a total of 3 items`)).toBeInTheDocument();
    })

  });
});
