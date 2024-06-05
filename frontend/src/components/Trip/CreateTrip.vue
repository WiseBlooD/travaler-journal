<template>
  <div>
    <h2>Create Trip</h2>
    <form @submit.prevent="createTrip">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="description" required></textarea>
      </div>
      <div>
        <label for="startDate">Start Date:</label>
        <input type="date" v-model="startDate" required>
      </div>
      <div>
        <label for="endDate">End Date:</label>
        <input type="date" v-model="endDate" required>
      </div>
      <button type="submit">Create Trip</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      startDate: '',
      endDate: ''
    };
  },
  methods: {
    async createTrip() {
      try {
        const response = await axios.post('http://localhost:3000/api/trips', {
          title: this.title,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate
        }, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        console.log('Trip created successfully', response.data);
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    }
  }
};
</script>
