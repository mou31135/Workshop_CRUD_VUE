<template>
<div id="app">
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
    <nav class="my-2 my-md-0 mr-md-3">
      <div class="nav">
        <a class="p-2 text-dark" href="#">
          <router-link to="/">Home</router-link>
        </a>
        <a class="p-2 text-dark" href="#">
          <router-link to="/about">About</router-link>
        </a>
        <a class="p-2 text-dark" href="#">
          <router-link to="/foodList">FoodList</router-link>
        </a>
        <a class="p-2 text-dark" href="#">
          <router-link to="/createfood">Createfood</router-link>
        </a>
      </div>
    </nav>
    <a class="btn btn-outline-primary" href="#">Sign up</a>
  </div>
  <router-view />
</div>
</template>

<script>
import { store } from "./store/";
export default {
  store
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
