/* eslint-disable no-undef */
import React from 'react';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import Search from '.';

const definationsList = [
  {
    meanings: [
      {
        definitions: [
          {
            definition: 'Result 1 defination',
          },
          {
            definition: 'Result 2 defination',
          },
          {
            definition: 'Result 3 defination',
          },
        ],
      },
    ],
  },
];

describe('pages/search', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  test('submit form with empty input', () => {
    render(<Search />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Please enter a valid text to search')).toBeTruthy();
  });

  test('Display list of defination for correct response', async () => {
    (global as any).fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(definationsList),
    }));

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Search here..'), {
      target: {
        value: 'Dog',
      },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Result 3 defination')).toBeTruthy();
    });
  });

  test('Handle when empty response', async () => {
    const errorMessage = "Sorry pal, we couldn't find definitions for the word you were looking for.";
    (global as any).fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      status: 500,
      json: () => Promise.resolve({
        title: errorMessage,
      }),
    }));

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Search here..'), {
      target: {
        value: 'No record',
      },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });
});
