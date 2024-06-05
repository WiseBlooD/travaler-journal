<template>
  <div>
    <vue-cal
        :events="events"
        @cell-click="onCellClick"
        @event-click="onEventClick"
    ></vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'Calendar',
  components: { VueCal },
  data() {
    return {
      events: [
        {
          start: new Date(),
          end: new Date(),
          title: 'Test Event'
        }
      ]
    };
  },
  methods: {
    onCellClick(event) {
      console.log('Cell clicked:', event);
      // добавить логику для создания новых событий
    },
    onEventClick(event) {
      console.log('Event clicked:', event);
      // добавить логику для отоброжения деталей
    }
  }
};
</script>

<style scoped>
</style>
