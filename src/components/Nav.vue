<script setup lang="ts">
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";

const { openCloseModal } = useStore();
const { todos, filterByTitle, filterByDescription } = storeToRefs(useStore());
</script>

<template>
  <div className="nav">
    <input placeholder="Поиск по названию" v-model="filterByTitle" />
    <input placeholder="Поиск по описанию" v-model="filterByDescription" />
    <button className="add" @click="openCloseModal">Добавить</button>
    <div>
      Заметки
      <br />
      <span className="all">{{
        todos.filter((tod) => tod.state == true).length
      }}</span>
      /{{ " " }}
      <span className="online">{{
        todos.filter((tod) => tod.state == false).length
      }}</span>
    </div>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  height: 50px;
  align-items: center;
  gap: 10px;

  img {
    width: 100px;
  }

  input {
    height: 30px;
    border-radius: 10px;
    text-align: center;
    border: solid 1px rgb(199, 199, 199);
  }

  button {
    width: 150px;
    height: 33px;
    border-radius: 10px;
    border: none;
    color: white;
    background: #4caf50;
  }

  div {
    text-align: end;
    margin-left: auto;
  }

  .all {
    color: #80bb00;
  }

  .online {
    color: #ec5937;
  }
}
</style>
