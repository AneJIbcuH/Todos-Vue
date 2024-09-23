<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";
import { FilterByState } from "../models/models";

const { deleteTodo, openCloseModal } = useStore();
const {
  todos,
  filterByTitle,
  filterByDescription,
  filterByState,
  changedTodo,
} = storeToRefs(useStore());

const filteredTodos = computed(() =>
todos.value
    .filter(
      (tod) =>
        tod.title.toLowerCase().includes(filterByTitle.value.toLowerCase()) &&
        tod.description.toLowerCase().includes(filterByDescription.value.toLowerCase())
    )
    .filter((tod) => {
      switch (filterByState.value) {
        case FilterByState.done:
          return tod.state;
        case FilterByState.queue:
          return !tod.state;
        case FilterByState.all:
          return tod;
        default:
          return "all";
      }
    })
);
</script>

<template>
  <div
    className="row"
    v-for="(todo, index) in filteredTodos"
    :key="todo.id"
    @click="
      () => {
        changedTodo = todo;
        openCloseModal();
      }
    "
  >
    <div className="col-1">{{ index + 1 }}</div>
    <div className="col-2">{{ todo.title }}</div>
    <div className="col-3">{{ todo.description }}</div>
    <div className="center col-5">
      <div :className="todo.state ? 'true' : 'false'"></div>
    </div>
    <div className="col-6 center">
      <div
        className="icon"
        @click="
          (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }
        "
      >
        &#10006;
      </div>
    </div>
  </div>
</template>

<style scoped></style>
