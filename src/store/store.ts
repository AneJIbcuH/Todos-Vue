import { defineStore } from "pinia";
import { ref } from "vue";
import { Todo } from "../models/models";
import { LS_TODOS_KEY } from "../vars/const";

export const useStore = defineStore("todos", () => {
  // модалка
  const isOpenModal = ref<boolean>(false);

  function openCloseModal() {
    isOpenModal.value = !isOpenModal.value;
  }

  // заметки
  const changedTodo = ref<Todo>({
    id:  "",
    title: "",
    description: "",
    state: false,
  })
  const todos = ref<Todo[]>(JSON.parse(localStorage.getItem(LS_TODOS_KEY) ?? '[]'));
  const filterByTitle = ref<string>("");
  const filterByDescription = ref<string>("");
  const filterByState = ref<string>('all')

  function addTodo(tod: Todo) {
    todos.value.push(tod);
    localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos.value))
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter((vis) => vis.id != id);
    localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos.value))
  }

  return {
    isOpenModal,
    openCloseModal,
    todos,
    addTodo,
    deleteTodo,
    filterByTitle,
    filterByDescription,
    filterByState,
    changedTodo
  };
});
