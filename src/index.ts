import "./scss/main.scss";
import TodoList from "./components/Todo/TodoList";
import alerts, { AlertTypes } from "./components/Alerts/Alerts";

const todoListContainer: HTMLUListElement | null =
  document.querySelector(".todo__list");
const todoList = new TodoList(todoListContainer);

const addBtn = document.querySelector(".todo__add-btn");
const form = document.querySelector(".todo__controls");
const todoInput: HTMLInputElement | null =
  document.querySelector(".todo__input");

function addNewTodoItem(e: any): void {
  e.preventDefault();
  const value = todoInput?.value;
  if (!value) {
    alerts.addAlert({ text: "Поле ввода пустое", type: AlertTypes.Error });
    return;
  }
  todoList.addItem(value, "");
  todoInput.value = "";
}

addBtn?.addEventListener("click", addNewTodoItem);
form?.addEventListener("submit", addNewTodoItem);
