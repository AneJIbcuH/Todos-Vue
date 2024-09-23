<script setup lang="ts">
import Head from "./components/Head.vue";
import Nav from "./components/Nav.vue";
import Popup from "./components/Popup.vue";
import Todo from "./components/Todo.vue";
import Filter from "./components/Filter.vue";

</script>

<template>
  <Nav />
  <Popup />
  <div class="table">
    <Head />
    <div class="body">
      <Todo />
    </div>
  </div>
  <Filter/>
</template>

<style scoped></style>
