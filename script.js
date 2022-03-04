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

const removeNewProjectPopup = () => {
  addProjectPopup.classList.remove("active");
};

const confirmAddProject = () => {
  if (addProjectForm.value != "") {
    const newProject = new project(addProjectForm.value);
    newProject.addProject();
    let newProjectTitle = document.createElement("h4");
    newProjectTitle.addEventListener("click", (e) => displayProject(e));
    newProjectTitle.textContent = addProjectForm.value;
    projectList.appendChild(newProjectTitle);
    removeNewProjectPopup();
    addProjectForm.value = "";
  }
};

const renderTodoCard = (e) => {
  let divProjectDetails = document.createElement("div");
  divProjectDetails.classList.add("project-details");
  divTodoCard.appendChild(divProjectDetails);

  let currentProjectTitle = document.createElement("h4");
  currentProjectTitle.textContent = e.target.textContent;
  divProjectDetails.appendChild(currentProjectTitle);

  let divEditProjectButtons = document.createElement("div");
  divProjectDetails.appendChild(divEditProjectButtons);

  let editPencilButton = document.createElement("img");
  editPencilButton.classList.add("pencil");
  editPencilButton.src = "/images/pencil.png";
  divEditProjectButtons.appendChild(editPencilButton);

  const someEventHandler = (e, currentProjectTitle) => {
    editProjectTitle(e, currentProjectTitle);
  };

  editPencilButton.addEventListener(
    "click",
    someEventHandler.bind(e, currentProjectTitle)
  );

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

  let editPencilButton = document.createElement("img");
  editPencilButton.classList.add("pencil");
  editPencilButton.src = "/images/pencil.png";
  dualButtonDiv.appendChild(editPencilButton);

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

const editProjectTitle = (e, currentProjectTitle) => {
  console.log(e);
  console.log(currentProjectTitle.target);
  e.setAttribute("contenteditable", "true");
  e.click();
};

const displayProject = (e) => {
  clearTodoCard();
  renderTodoCard(e);
};

const clearProjectList = () => {
  projectList.textContent = "";
};

const clearTodoCard = () => {
  divTodoCard.textContent = "";
};
