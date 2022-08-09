import TodoItem from "./TodoItem";
import { TodoItemType } from "./TodoItem";
import DeletedItems, { IObject } from "./DeletedItems";
import DoneItems from "./DoneItems";

const deletedTodoItemsListContainer: HTMLUListElement | null =
  document.querySelector(".deleted-todo-items__list");
const doneTodoItemsListContainer: HTMLUListElement | null =
  document.querySelector(".done-todo-items__list");
const deletedTodoItems = new DeletedItems(deletedTodoItemsListContainer);
const doneTodoItems = new DoneItems(doneTodoItemsListContainer);

interface ISubject {
  subscribe(subscriber: IObject): void;
  unsubscribe(id: string): void;
  notify(list: TodoItem[]): void;
  subscribers: IObject[];
}

export default class TodoList implements ISubject {
  private container;
  private todoList: TodoItem[] = [];
  subscribers: IObject[] = [];

  constructor(container: HTMLUListElement | null) {
    this.container = container;
  }
  subscribe(subscriber: IObject): void {
    this.subscribers.push(subscriber);
  }
  unsubscribe(id: string): void {
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
  }
  notify(list: TodoItem[]): void {
    this.subscribers.forEach((s) => s.update(list));
  }

  private createItem(
    text: string,
    type: TodoItemType | "",
    id: string
  ): HTMLLIElement {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const wrapDiv = document.createElement("div");
    wrapDiv.classList.add("todo__item-controls");

    const errorIconDiv = document.createElement("div");
    errorIconDiv.className = "todo__item-control todo__item-control--error";
    const errorIcon = document.createElement("i");
    errorIcon.classList.add("fa-solid");
    errorIcon.classList.add("fa-trash");
    errorIconDiv.appendChild(errorIcon);

    const successIconDiv = document.createElement("div");
    successIconDiv.className = "todo__item-control todo__item-control--success";
    const successIcon = document.createElement("i");
    successIcon.classList.add("fa-solid");
    successIcon.classList.add("fa-check");
    successIconDiv.appendChild(successIcon);
    wrapDiv.appendChild(errorIconDiv);
    wrapDiv.appendChild(successIconDiv);
    span.innerHTML = text;

    li.className = `todo__item todo__item--${type}`;
    li.classList.add();
    li.setAttribute("key", id);
    li.appendChild(span);
    li.appendChild(wrapDiv);

    return li;
  }

  private renderNewItem(item: TodoItem): void {
    const newItem = this.createItem(item.text, item.type, item.id);
    this.container?.appendChild(newItem);
    const self = this;
    newItem.addEventListener("click", function (e) {
      self.todoEventHandler(e, this);
    });
  }

  addItem(text: string, type: TodoItemType | ""): void {
    const newItem = new TodoItem(text, type);
    this.subscribe(deletedTodoItems);
    this.subscribe(doneTodoItems);
    this.todoList.push(newItem);
    this.renderNewItem(newItem);
  }

  private deleteItem(todoItemKey: string | null): void {
    this.todoList.forEach((todo) => {
      if (todo.id === todoItemKey) {
        todo.changeType(TodoItemType.Error);
      }
    });
    this.notify(this.todoList);
    this.todoList = this.todoList.filter((item) => item.id !== todoItemKey);
    if (this.container) {
      this.container.innerHTML = "";
    }
    this.todoList.forEach((item) => {
      this.renderNewItem(item);
    });
  }

  private markItemAsDone(todoItemKey: string | null): void {
    this.todoList.forEach((todo) => {
      if (todo.id === todoItemKey) {
        todo.changeType(TodoItemType.Success);
      }
    });
    this.notify(this.todoList);
    this.todoList = this.todoList.filter((item) => item.id !== todoItemKey);
    if (this.container) {
      this.container.innerHTML = "";
    }
    this.todoList.forEach((item) => {
      this.renderNewItem(item);
    });
  }

  private todoEventHandler(e: MouseEvent, ctx: HTMLElement) {
    const element = e.target as HTMLElement;
    const todoItemKey = ctx.getAttribute("key");
    if (
      element.className.includes("error") ||
      element.parentElement?.className.includes("error")
    ) {
      this.deleteItem(todoItemKey);
    } else if (
      element.className.includes("success") ||
      element.parentElement?.className.includes("success")
    ) {
      this.markItemAsDone(todoItemKey);
    }
  }
}
