import * as api from "../../api/api";
import {
    cardError,
    cardDeleteRequest,
    cardDeleteSuccess,
    cardsListRequest,
    cardsSuccess, cardAddSuccess, cardAddRequest, cardEditRequest, cardEditSuccess
} from "../reducers/cardsSlice";

// TO DO to take into account the case with error
export const fetchCards = () => async (dispatch) => {
    try {
        await dispatch(cardsListRequest());
        const cards = await api.getCards();
        await dispatch(cardsSuccess({ cards: cards.data}));
    } catch (error) {
        console.log('>>> error', error);
    }
};

export const deleteCard = (cardId) => async (dispatch) => {
    try {
        await dispatch(cardDeleteRequest(cardId));
        await api.deleteCard(cardId);
        await dispatch(cardDeleteSuccess(cardId));
    } catch (error) {
        await dispatch(cardError({cardId: cardId, errorMessage: error.message}));
    }
}

export const addCard = (cardData) => async (dispatch) => {
    try {
        await dispatch(cardAddRequest(cardData));
        const response = await api.addCard(cardData);
        await dispatch(cardAddSuccess(response.data.card));
    } catch (error) {
        await dispatch(cardError({errorMessage: error.message}));
    }
}

export const editCard = (cardData) => async (dispatch) => {
    try {
        await dispatch(cardEditRequest(cardData));
        const response = await api.editCard(cardData.id, cardData);
        await dispatch(cardEditSuccess(response.data.card));
    } catch (error) {
        await dispatch(cardError({errorMessage: error.message}));
    }
}