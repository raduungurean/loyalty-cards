import { renderWithProviders } from './test-utils';
import DashboardPage from '../pages/DashboardPage';
import { screen, waitFor } from '@testing-library/react';
import {
  mockCardsSuccessResponse,
} from './mockData';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('Dashboard page tests', () => {

  const handlers = [
    rest.get('/cards', async (req, res, ctx) => {
        return res(
          ctx.status(mockCardsSuccessResponse.status),
          ctx.json(mockCardsSuccessResponse.json),
          ctx.delay(150),
        );
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    renderWithProviders(<DashboardPage />);
  });

  test('displays cards', async () => {
    return waitFor(() => {
      expect(screen.getAllByTestId('fidelity-card').length)
        .toEqual(mockCardsSuccessResponse.json.data.length);
    }, { timeout: 300 });
  });
});
