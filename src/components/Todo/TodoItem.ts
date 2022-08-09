import { IObject } from "./DeletedItems";
import alerts, { AlertTypes } from "../Alerts/Alerts";
enum TodoItemType {
  Success = "success",
  Error = "error",
}

// interface ISubject {
//   subscribe(subscriber: IObject): void;
//   unsubscribe(id: string): void;
//   notify(item: TodoItem): void;
//   subscribers: IObject[];
// }

export default class TodoItem {
  type: TodoItemType | "";
  text: string;
  id: string;
  // subscribers: IObject[] = [];

  constructor(text: string, type: TodoItemType | "") {
    this.type = type;
    this.text = text;
    this.id = String(Date.now() * Math.floor(Math.random() * 10));
  }

  // subscribe(subscriber: IObject): void {
  //   const existing = this.subscribers.find((s) => s.id === subscriber.id);
  //   if (!existing) {
  //     this.subscribers.push(subscriber);
  //   }
  // }
  // unsubscribe(id: string): void {
  //   this.subscribers = this.subscribers.filter((s) => s.id !== id);
  // }
  // notify(item: TodoItem): void {
  //   this.subscribers.forEach((s) => {
  //     s.update(item);
  //   });
  //   if (item.type === TodoItemType.Success) {
  //     alerts.addAlert({ text: "Сделано", type: AlertTypes.Success });
  //   } else {
  //     alerts.addAlert({ text: "Удалено", type: AlertTypes.Error });
  //   }
  // }

  changeType(type: TodoItemType): void {
    this.type = type;
    // this.notify(this);
  }
}
export { TodoItemType };
