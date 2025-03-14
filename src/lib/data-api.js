import axios from 'axios';
// const URL = 'http://localhost:8080'
const URL = 'https://rytrapi.fuzzydevs.com'
const api = axios.create({
    baseURL: URL,
    timeout: 5000
});
const openapi = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
});
// Add a request interceptor to check localStorage before each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Optionally redirect to login page or trigger logout
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const authAPI = {
    login: async (email, password) => {
        try {
            const response = await openapi.post('/login', {
                email,
                password
            });
            console.log("Login response:",response.status)
            return response;
        } catch (error) {
            console.log("catched")
            throw error || { message: 'Login failed' };
        }
    },

    register: async (userData) => {
        try {
            const response = await openapi.post('/register', userData);
            return response;
        } catch (error) {
            throw error.response?.data || { message: 'Registration failed' };
        }
    },

    logout: async () => {
        try {
            const response = await openapi.post('/auth/logout');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Logout failed' };
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await openapi.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Password reset request failed' };
        }
    },

    resetPassword: async (token, newPassword) => {
        try {
            const response = await openapi.post('/auth/reset-password', {
                token,
                newPassword
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Password reset failed' };
        }
    }
};

export const userAPI = {
    getProfile: async () => {
        try {
            const response = await api.get('/user/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch profile' };
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/user/profile', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update profile' };
        }
    },

    changePassword: async (currentPassword, newPassword) => {
        try {
            const response = await api.post('/user/change-password', {
                currentPassword,
                newPassword
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to change password' };
        }
    }
};

export const dataAPI = {
    getAllCards: async () => {
        try {
            const response = await api.get('/cards');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch cards' };
        }
    },
    getAllPendingCards: async () => {
        try {
            const response = await api.get('/cards/pending');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch cards' };
        }
    },

    getCardById: async (id) => {
        try {
            const response = await api.get(`/cards/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch card' };
        }
    },

    createCard: async (cardData) => {
        try {
            const response = await api.post('/cards', cardData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create card' };
        }
    },

    updateCard: async (id, cardData) => {
        try {
            const response = await api.put(`/cards/${id}`, cardData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update card' };
        }
    },

    deleteCard: async (id) => {
        try {
            const response = await api.delete(`/cards/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete card' };
        }
    },
    updateCardStatus: async (id, cardData) => {
        try {
            const response = await api.put(`/cards/status/${id}`, cardData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update card' };
        }
    },


    // calls to notes endpoints

    getAllNotes: async (limit) => {
        try {
            if (limit) {
                const response = await api.get(`/notes?limit=${limit}`);
                return response.data;
            }
            const response = await api.get('/notes');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch notes' };
        }
    },

    getNoteById: async (id) => {
        try {
            const response = await api.get(`/notes/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch note' };
        }
    },

    createNote: async (noteData) => {
        try {
            const response = await api.post('/notes', noteData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create note' };
        }
    },

    updateNote: async (id, noteData) => {
        try {
            const response = await api.put(`/notes/${id}`, noteData);
            return response;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update note' };
        }
    },

    deleteNote: async (id) => {
        try {
            const response = await api.delete(`/notes/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete note' };
        }
    },

    // searching
    searchData: async (query) => {
        try {
            const response = await api.get(`/search?q=${query}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to search' };
        }
    }
};