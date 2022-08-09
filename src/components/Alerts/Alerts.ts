enum AlertTypes {
  Success = "success",
  Error = "danger",
}

type Alert = {
  type: AlertTypes;
  text: string;
  id: string;
};
interface IAlerts {
  addAlert({ text, type }: { text: string; type: AlertTypes }): void;
}
class Alerts implements IAlerts {
  private alerts: Alert[] = [];
  private container;
  constructor(container: HTMLDivElement | null) {
    this.container = container;
  }
  addAlert({ text, type }: { text: string; type: AlertTypes }): void {
    const id = String(Date.now() * Math.floor(Math.random() * 10));
    const alert: Alert = { type, text, id };
    this.alerts.push(alert);
    this.render();
    setTimeout(() => {
      this.alerts = this.alerts.filter((a) => a.id !== id);
      if (this.container) {
        this.container.innerHTML = "";
      }
      this.render();
    }, 1000);
  }

  private createAlertElement(text: string, type: AlertTypes): HTMLDivElement {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.innerHTML = text;
    return div;
  }

  private render(): void {
    this.alerts.forEach((alert) => {
      const newItem = this.createAlertElement(alert.text, alert.type);
      this.container?.appendChild(newItem);
    });
  }
}

const alertsContainer: HTMLDivElement | null =
  document.querySelector(".alert-list");
const alerts = new Alerts(alertsContainer);

export default alerts;
export { AlertTypes };
