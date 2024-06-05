<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.accessToken;
        console.log('Login successful, token received:', token); // Вывод токена в консоль - удалить
        this.$store.commit('setToken', token);
        this.$router.push('/profile');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  }
};
</script>

