import axios from "./axiosInstance";
import { dataURLtoBlob, generateRandomString } from '../utils/utils';

export const authenticate = async (username, password) => {
    const response = await axios.post(`/login`, { username, password });
    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`/logout`);
    return response.data;
};

export const reauthenticate = async (token) => {
    const response = await axios.post(`/reauthenticate`, { token });
    return response.data;
};

export const register = async (user) => {
    const response = await axios.post(`/register`, user);
    return response.data;
};

export const activateAccount = async (activationCode) => {
    const response = await axios.post(`/activate`, { activationCode });
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await axios.post(`/forgot-password`, { email });
    return response.data;
};

export const newPassword = async (data) => {
    const response = await axios.post(`/new-password`, data);
    return response.data;
};

export const checkForgotToken = (id) => {
    return axios.post(`/check-forgot-token`, {token: id});
};

export const getCards = async () => {
    const response = await axios.get(`/cards`, {});
    return response.data;
}

export const deleteCard = async (cardId) => {
    const response = await axios.delete(`/cards/${cardId}`);
    return response.data;
}

export async function getCard(cardId) {
    const response = await axios.get(`/cards/${cardId}`);
    return response.data;
}

// export const addCard = async (cardData) => {
//     const response = await axios.post(`/cards`, cardData);
//     return response.data;
// }

export const addCard = async (cardData) => {
    const formData = new FormData();

    Object.entries(cardData).forEach(([key, value]) => {
        if (key === 'avatarDataUrl' && value) {
            const randomStr = generateRandomString();
            formData.append('avatar', dataURLtoBlob(value), `image-${randomStr}.jpg`);
        } else {
            formData.append(key, value);
        }
    });

    const response = await axios.post(`/cards`, formData);
    return response.data;
};

export const editCard = async (cardId, cardData) => {

    const formData = new FormData();

    Object.entries(cardData).forEach(([key, value]) => {
        if (key === 'avatarDataUrl' && value) {
            const randomStr = generateRandomString();
            formData.append('avatar', dataURLtoBlob(value), `image-${randomStr}.jpg`);
        } else {
            formData.append(key, value);
        }
    });

    const response = await axios.post(`/cards/edit-card/${cardId}`, formData);
    return response.data;
}
