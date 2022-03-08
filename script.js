let projectArray = [];
let projectList = document.querySelector(".project-list");
let divTodoCard = document.querySelector(".todo-card");

//Add project popup varaibles and buttons
let addProjectBtn = document.getElementById("add-project");
let addProjectPopup = document.querySelector(".add-project-popup");
let addProjectForm = document.querySelector(".input-add-project-popup");
let confirmAddProjectBtn = document.getElementById("button-add-project-popup");
let cancelProjectBtn = document.getElementById("button-cancel-project-popup");
//Event listeners for add project popup
addProjectBtn.addEventListener("click", () => addNewProjectPopup());
confirmAddProjectBtn.addEventListener("click", () => confirmAddProject());
cancelProjectBtn.addEventListener("click", () => removeNewProjectPopup());

// Add task variables and buttons
let todoContainer = document.querySelector(".container");
let formContainer = document.querySelector(".form-container");
let inputTask = document.getElementById("task-name");
let inputDetails = document.getElementById("task-details");
let inputDate = document.getElementById("task-date");
let inputPrio = document.getElementById("task-priority");
let addTaskBtn = document.getElementById("button-add-todo");
let cancelTaskBtn = document.getElementById("button-cancel-todo");

class project {
  constructor(title, toDos = []) {
    this.title = title;
    this.toDos = toDos;
  }
}

class toDo {
  constructor(title, details, date, prio, complete) {
    this.title = title;
    this.details = details;
    this.date = date;
    this.prio = prio;
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

const renderTodoCard = (titleOfProject) => {
  let divProjectDetails = document.createElement("div");
  divProjectDetails.classList.add("project-details");
  divTodoCard.appendChild(divProjectDetails);

  let currentProjectTitle = document.createElement("input");
  currentProjectTitle.value = titleOfProject;
  divProjectDetails.appendChild(currentProjectTitle);

  currentProjectTitle.addEventListener("change", (e) =>
    projectTitleUpdate(titleOfProject, e)
  );
  currentProjectTitle.addEventListener("change", (e) => displayProject(e));

  let divEditProjectButtons = document.createElement("div");
  divProjectDetails.appendChild(divEditProjectButtons);

  let addTodoButton = document.createElement("i");
  addTodoButton.classList.add("fas", "fa-plus-circle", "fa-md");
  addTodoButton.addEventListener("click", () =>
    displayAddTaskForm(titleOfProject)
  );
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

const confirmAddTask = (currentProject) => {
  if (inputTask.value != "" && inputDetails.value != "") {
    const newTask = new toDo(
      inputTask.value,
      inputDetails.value,
      inputDate.value,
      inputPrio.value,
      true
    );
    console.log(projectArray);
    let index = indexOfProjectTitle(currentProject);
    projectArray[index].toDos = newTask;
    todoContainer.style.opacity = "1";
    formContainer.style.display = "none";
    todoContainer.style.pointerEvents = "auto";
    inputTask.value = "";
    inputDetails.value = "";
    console.log(projectArray);
  }
};

const cancelAddTask = (currentProject) => {
  todoContainer.style.opacity = "1";
  formContainer.style.display = "none";
  todoContainer.style.pointerEvents = "auto";
  inputTask.value = "";
  inputDetails.value = "";
};

const displayAddTaskForm = (currentProject) => {
  todoContainer.style.opacity = "0.5";
  formContainer.style.display = "block";
  todoContainer.style.pointerEvents = "none";

  addTaskBtn.addEventListener("click", () => confirmAddTask(currentProject));
  cancelTaskBtn.addEventListener("click", () => cancelAddTask(currentProject));
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
  if (project.target.textContent != "") {
    renderTodoCard(project.target.textContent);
  } else {
    renderTodoCard(project.target.value);
  }
};

const clearProjectList = () => {
  projectList.textContent = "";
};

const clearTodoCard = () => {
  divTodoCard.textContent = "";
};

const projectTitleUpdate = (oldProjectTitle, updatedTitle) => {
  let indexOfProject = indexOfProjectTitle(oldProjectTitle);
  projectArray[indexOfProject].title = updatedTitle.target.value;
  displayProjectTitles();
};

const indexOfProjectTitle = (currentProject) => {
  let index;
  projectArray.forEach((project) => {
    if (project.title == currentProject) {
      index = projectArray.indexOf(project);
    }
  });
  return index;
};
