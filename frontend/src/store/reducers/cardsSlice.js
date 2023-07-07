import {createSlice} from '@reduxjs/toolkit';

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        list: [],
        loading: true,
        progress: false,
        progressDelete: {},
        error: null,
        success: null,
    },
    reducers: {
        cardsSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload.cards;
        },
        cardsListRequest: (state, action) => {
            state.loading = true;
            state.list = [];
        },
        cardDeleteRequest: (state, action) => {
            state.progress = true;
            state.progressDelete[action.payload] = true;
        },
        cardDeleteSuccess: (state, action) => {
            state.progress = false;
            state.progressDelete[action.payload] = false;
            state.list = state.list.filter(card => card.id !== action.payload);
            state.success = 'The card has been successfully deleted.'
        },
        cardAddRequest: (state, action) => {
            state.progress = true;
        },
        cardAddSuccess: (state, action) => {
            state.progress = false;
            state.success = 'The card has been successfully added.'
            state.list = state.list.concat([action.payload])
        },
        cardEditRequest: (state, action) => {
            state.progress = true;
        },
        cardEditSuccess: (state, action) => {
            const { id } = action.payload;
            const cardIndex = state.list.findIndex(card => card.id === id);

            if (cardIndex !== -1) {
                state.list[cardIndex] = action.payload;
                state.progress = false;
                state.success = 'The card has been successfully edited.';
            }
        },
        cardError: (state, action) => {
            state.progress = false;
            if (action.payload.cardId) {
                state.progressDelete[action.payload.cardId] = false;
            }
            state.error = `Error processing the card: ${action.payload.errorMessage}`;
        },
        clearError: (state, action) => {
            state.error = null;
        },
        clearSuccess: (state, action) => {
            state.error = null;
            state.success = null;
        },
    },
});

export const {
    cardsSuccess,
    cardsListRequest,
    cardDeleteRequest,
    cardDeleteSuccess,
    cardError,
    clearError,
    clearSuccess,
    cardAddRequest,
    cardAddSuccess,
    cardEditRequest,
    cardEditSuccess
} = cardsSlice.actions;

export default cardsSlice.reducer;
