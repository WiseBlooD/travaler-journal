<template>
  <div>
    <h1>Welcome to Traveler Journal</h1>
    <Calendar />
  </div>
</template>

<script>
import Calendar from '../components/Calendar/Calendar.vue';

export default {
  name: 'Home',
  components: {
    Calendar
  }
};
</script>
