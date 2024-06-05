import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

export default createStore({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, token) {
      console.log('Setting token in Vuex Store:', token); // Вывод токена в консоль удалить
      state.token = token;
      localStorage.setItem('token', token); // Сохраняем токен в Local Storage
    },
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
        const token = response.data.accessToken;
        console.log('Received token:', token); // Вывод токена в консоль - удалить
        commit('setToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userResponse = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        commit('setUser', userResponse.data);
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', userData);
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error registering:', error);
        throw error;
      }
    },
    async fetchUser({ commit }) {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching user with token:', token); // Вывод токена в консоль - удалить
        if (token) {
          commit('setToken', token);
          const userResponse = await axios.get('http://localhost:3000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          commit('setUser', userResponse.data);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('logout');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  plugins: [createPersistedState()]
});

