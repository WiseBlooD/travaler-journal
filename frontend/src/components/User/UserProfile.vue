<template>
  <div>
    <h2>User Profile</h2>
    <form @submit.prevent="updateProfile">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="user.username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" required>
      </div>
      <button type="submit">Update Profile</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        email: ''
      }
    };
  },
  created() {
    console.log('UserProfile created');
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const token = this.$store.state.token || localStorage.getItem('token');
        console.log('Using token:', token); // Вывод токена в консоль - удалить
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('User data fetched:', response.data);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async updateProfile() {
      try {
        const token = this.$store.state.token || localStorage.getItem('token');
        console.log('Using token:', token); // Вывод токена в консоль - удалить
        if (!token) {
          console.error('No token found');
          return;
        }
        await axios.put('http://localhost:3000/api/user', this.user, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  }
};
</script>

