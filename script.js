let projectArray = [];
let projectList = document.querySelector(".project-list");

let divTodoCard = document.querySelector(".todo-card");

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

const removeNewProjectPopup = () => {
  addProjectPopup.classList.remove("active");
};

const confirmAddProject = () => {
  if (addProjectForm.value != "") {
    const newProject = new project(addProjectForm.value);
    projectArray.push(newProject);
    removeNewProjectPopup();
    addProjectForm.value = "";
    displayProjectTitles();
  }
};

const renderTodoCard = (e) => {
  let divProjectDetails = document.createElement("div");
  divProjectDetails.classList.add("project-details");
  divTodoCard.appendChild(divProjectDetails);

  let currentProjectTitle = document.createElement("input");
  currentProjectTitle.value = `${e.target.textContent}`;
  divProjectDetails.appendChild(currentProjectTitle);
  currentProjectTitle.addEventListener("change", projectTitleUpdate);

  let divEditProjectButtons = document.createElement("div");
  divProjectDetails.appendChild(divEditProjectButtons);

  let addTodoButton = document.createElement("i");
  addTodoButton.classList.add("fas", "fa-plus-circle", "fa-md");
  divEditProjectButtons.appendChild(addTodoButton);
};

const renderTodoTask = (e) => {
  let divTodoTask = document.createElement("div");
  divTodoTask.classList.add("todo");
  divTodoCard.appendChild(divTodoTask);

  let divTop = document.createElement("div");
  divTop.classList.add("top");
  divTodoTask.appendChild(divTop);

  let divTodoTitle = document.createElement("div");
  divTodoTitle.classList.add("todo-title");
  divTop.appendChild(divTodoTitle);

  let todoTitle = document.createElement("p");
  todoTitle.textContent = e.value; //title of task from input field when creating a todo
  divTodoTitle.appendChild(todoTitle);

  let completeCheck = document.createElement("i");
  completeCheck.classList.add("fa-solid", "fa-square-check", "fa-kmd");
  divTodoTitle.appendChild(completeCheck);

  let dualButtonDiv = document.createElement("div");
  dualButtonDiv.classList.add("dual-btn");
  divTop.appendChild(dualButtonDiv);

  let trashButton = document.createElement("img");
  editPencilButton.classList.add("trash");
  editPencilButton.src = "/images/bin.png";
  dualButtonDiv.appendChild(trashButton);

  let divBottom = document.createElement("div");
  divBottom.classList.add("bottom");
  divTodoTask.appendChild(divBottom);

  let priorityButton = document.createElement("button");
  priorityButton.classList.add("btn", "btn-priority");
  divBottom.appendChild(priorityButton);

  let todoDetails = document.createElement("p");
  todoDetails.textContent = e.value; //details of task from input field when creating a todo
  divBottom.appendChild(todoDetails);

  let todoDate = document.createElement("p");
  todoDate.textContent = e.value; //title of task from input field when creating a todo
  divBottom.appendChild(todoDate);
};

const displayProjectTitles = () => {
  clearProjectList();
  projectArray.forEach((project) => {
    let newProjectTitle = document.createElement("h4");
    newProjectTitle.addEventListener("click", (e) => displayProject(e));
    newProjectTitle.textContent = project.title;
    projectList.appendChild(newProjectTitle);
  });
};

const displayProject = (project) => {
  clearTodoCard();
  renderTodoCard(project);
  console.log(project);
  console.log(project.target);
};

const clearProjectList = () => {
  projectList.textContent = "";
};

const clearTodoCard = () => {
  divTodoCard.textContent = "";
};

const projectTitleUpdate = (e) => {
  console.log(e.target.value);
  console.log(projectArray);
};
