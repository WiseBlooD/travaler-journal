import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Journals from '../views/Journals.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import CreateJournal from '../components/Journal/CreateJournal.vue';
import About from '../views/About.vue';
import Trips from '../views/Trips.vue';
import UserProfile from '../components/User/UserProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/journals', component: Journals },
  { path: '/journals/create', component: CreateJournal },
  { path: '/profile', component: UserProfile },
  { path: '/about', component: About },
  { path: '/trips', component: Trips }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
