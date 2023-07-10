import reducer, { cardAddSuccess, cardDeleteSuccess } from '../../../store/reducers/cardsSlice';
import cardsInitialState from '../../../store/reducers/cardsInitialState';
import { mockCard, mockCard2 } from '../../mockData';
import { successAddCardMessageText, successDeleteCardMessageText } from '../../../constants';

const initialState = {
  list: [],
  loading: true,
  progress: false,
  progressDelete: {},
  error: null,
  success: null,
};

test('should return the cards initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(cardsInitialState)
})

test('should handle a card being added to an empty list', () => {
  const previousState = { ...initialState };

  expect(reducer(previousState, cardAddSuccess(mockCard))).toEqual({
    list: [
      mockCard
    ],
    loading: true,
    progress: false,
    progressDelete: {},
    error: null,
    success: 'The card has been successfully added.',
  })
})

test('should handle a todo being added to an existing list', () => {
  const previousState = {
    ...initialState,
    list: [mockCard],
  };

  expect(reducer(previousState, cardAddSuccess(mockCard2))).toEqual({
    list: [
      mockCard,
      mockCard2
    ],
    loading: true,
    progress: false,
    progressDelete: {},
    error: null,
    success: successAddCardMessageText,
  })
});

test('should handle a todo being deleted from an existing list', () => {
  const previousState = {
    ...initialState,
    list: [mockCard, mockCard2],
  };

  expect(reducer(previousState, cardDeleteSuccess(mockCard2.id))).toEqual({
    list: [
      mockCard
    ],
    loading: true,
    progress: false,
    progressDelete: {
      [mockCard2.id]: false
    },
    error: null,
    success: successDeleteCardMessageText,
  })
});
