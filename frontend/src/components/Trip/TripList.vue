<template>
  <div>
    <h2>My Trips</h2>
    <ul>
      <li v-for="trip in trips" :key="trip.id">
        <h3>{{ trip.title }}</h3>
        <p>{{ trip.description }}</p>
        <p>{{ trip.startDate }} - {{ trip.endDate }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      trips: []
    };
  },
  created() {
    this.fetchTrips();
  },
  methods: {
    async fetchTrips() {
      try {
        const response = await axios.get('http://localhost:3000/api/trips', {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.trips = response.data;
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    }
  }
};
</script>
