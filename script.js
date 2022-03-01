let projectArray = [];
let projectList = document.getElementById("project-list");

//buttons
let addProjectBtn = document.getElementById("add-project");

addProjectBtn.addEventListener("click", () =>
  console.log("add project button clicked!!!!")
);

class project {
  constructor(title, toDos = []) {
    this.title = title;
    this.toDos = toDos;
  }
  addProject() {
    projectArray.push(this.title);
  }
}

class toDo {
  constructor(title, prio, complete, details, date) {
    this.title = title;
    this.prio = prio;
    this.details = details;
    this.date = date;
    this.complete = complete;
  }
  toDoComplete() {
    this.complete = !this.complete;
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

// const newToDo = new toDo(
//   "todotitle",
//   "prio111",
//   true,
//   "detailsHere",
//   "12-24-2022"
// );
// const newToDo1 = new toDo(
//   "todotitleasdasdasd",
//   "prio111asdasdasdasdasd",
//   false,
//   "detailsHereasdasdasdasd",
//   "1-1-1-1"
// );

// const newProject = new project("projectTitle");
// console.table(newProject);

// newProject.toDos.push(newToDo);
// console.table(newProject);

// newProject.toDos.push(newToDo1);
// console.table(newProject);
