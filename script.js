class toDo {
  constructor(title, prio, complete, details, date) {
    this.title = title;
    this.prio = prio;
    this.details = details;
    this.date = date;
    this.complete = complete;
  }
  toDoComplete() {
    this.complete = !complete;
  }
  updatePrio(newPrio) {
    this.prio = newPrio;
  }
  toDoEdit(title, details, date) {
    this.title = title;
    this.details = details;
    this.date = date;
  }
}
