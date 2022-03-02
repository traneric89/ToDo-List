let projectArray = [];
let projectList = document.querySelector(".project-list");

//Add project popup varaibles and buttons
let addProjectBtn = document.getElementById("add-project");
let addProjectPopup = document.querySelector(".add-project-popup");
let addProjectForm = document.querySelector(".input-add-project-popup");
let confirmAddProjectBtn = document.querySelector(".button-add-project-popup");
let cancelProjectBtn = document.querySelector(".button-cancel-project-popup");

//Event Listeners
addProjectBtn.addEventListener("click", () => addNewProjectPopup());
confirmAddProjectBtn.addEventListener("click", () => confirmAddProject());
cancelProjectBtn.addEventListener("click", () => removeNewProjectPopup());

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

const addNewProjectPopup = () => {
  addProjectPopup.classList.add("active");
};

const confirmAddProject = () => {
  if (addProjectForm.value != "") {
    const newProject = new project(addProjectForm.value);
    let newProjectTitle = document.createElement("h4");
    newProjectTitle.textContent = addProjectForm.value;
    projectList.appendChild(newProjectTitle);
  }
};

const removeNewProjectPopup = () => {
  addProjectPopup.classList.remove("active");
};

const renderProjects = () => {
  projectList.textContent = "";
};

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
