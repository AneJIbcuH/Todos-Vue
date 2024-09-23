<script setup lang="ts">
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { FilterByState } from "../models/models";

const { filterByState } = storeToRefs(useStore());

const activeBtn = ref(3);
</script>

<template>
  <div className="filter">
    Фильтровать по:
    <button
      :className="activeBtn == 1 ? 'active' : ''"
      @click="
        () => {
          activeBtn = 1;
          filterByState = FilterByState.queue;
        }
      "
    >
      Не выполненным
    </button>
    <button
      :className="activeBtn == 2 ? 'active' : ''"
      @click="
        () => {
          activeBtn = 2;
          filterByState = FilterByState.done;
        }
      "
    >
      Выполненным
    </button>
    <button
      :className="activeBtn == 3 ? 'active' : ''"
      @click="
        () => {
          activeBtn = 3;
          filterByState = FilterByState.all;
        }
      "
    >
      Без фильтра
    </button>
  </div>
</template>

<style scoped>
.filter {
  position: fixed;
  bottom: 15px;
  height: 30px;
  background: rgb(255, 255, 255);

  button {
    margin-left: 10px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    height: 35px;
  }

  button:hover {
    box-shadow: 1px 1px 20px 1px rgb(147, 174, 147);
  }

  .active {
    background: rgb(255, 202, 103);
  }
}
</style>
