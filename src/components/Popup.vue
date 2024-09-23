<script setup lang="ts">
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";
import { LS_TODOS_KEY } from "../vars/const";

const { openCloseModal, addTodo } = useStore();
const { isOpenModal, changedTodo, todos } = storeToRefs(useStore());

const addNewTodoOrChange = () => {
  // изменяем заметку
  if (changedTodo.value.id) {
    const obj = JSON.parse(JSON.stringify(changedTodo.value));
    todos.value = todos.value.map((tod) => {
      if (tod.id == changedTodo.value.id) {
        return obj;
      }
      return tod;
    });
    localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos.value));
  } else {
    // добавляем новую заметку
    changedTodo.value.id = Date.now().toString();
    const obj = JSON.parse(JSON.stringify(changedTodo.value));
    addTodo(obj);
  }

  clearForm();
};

const clearForm = () => {
  changedTodo.value = {
    id: "",
    title: "",
    description: "",
    state: false,
  };
  openCloseModal();
};
</script>

<template>
  <el-dialog v-model="isOpenModal" width="500" :before-close="clearForm">
    <form action="" className="form" @submit.prevent="addNewTodoOrChange">
      <div className="form-row">
        <div>Название</div>
        <input v-model="changedTodo.title" />
      </div>

      <div className="form-row">
        <div>Описание</div>
        <input v-model="changedTodo.description" />
      </div>

      <div className="form-row" v-show="changedTodo.id">
        <div>Состояние</div>
        <input
          type="checkbox"
          className="checkbox"
          v-model="changedTodo.state"
        />
      </div>

      <button :className="changedTodo.id ? 'save' : 'add'" type="submit">
        {{ changedTodo.id ? "Сохранить" : "Добавить" }}
      </button>
      <button @click="clearForm" type="button">Закрыть</button>
    </form>
  </el-dialog>
</template>

<style scoped>
.form {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;

  button {
    width: 30%;
    margin: 10px;
    height: 30px;
    border-radius: 10px;
    border: none;
    color: white;
    background: gray;
  }

  .add {
    background: #4caf50;
  }

  .save {
    background: rgb(255, 202, 103);
  }
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 10px 0;
  height: 30px;

  input {
    border: none;
    border-bottom: solid 1px rgb(158, 158, 158);
  }

  select {
    width: 49%;
    border: none;
    border-bottom: solid 1px rgb(158, 158, 158);
  }
}

.checkbox {
  margin-right: 45%;
}
</style>
