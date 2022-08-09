import TodoItem, { TodoItemType } from "./TodoItem";
interface IObject {
  update(list: TodoItem[]): void;
  id: string;
}
export default class DoneItems implements IObject {
  id: string;
  doneItems: TodoItem[] = [];
  private container;
  constructor(container: HTMLUListElement | null) {
    this.container = container;
    this.id = String(Date.now() * Math.floor(Math.random() * 10));
  }
  update(list: TodoItem[]): void {
    list.forEach((item) => {
      if (item.type === TodoItemType.Success) {
        const existing = this.doneItems.find((i) => i.id === item.id);
        if (!existing) {
          this.doneItems.push(item);
        }
      }
    });
    if (this.container) {
      this.container.innerHTML = "";
    }
    this.doneItems.forEach((item) => {
      if (item.type === TodoItemType.Success) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerHTML = item.text;
        li.className = `todo__item todo__item--${item.type}`;
        li.appendChild(span);
        this.container?.appendChild(li);
      }
    });
  }
}
