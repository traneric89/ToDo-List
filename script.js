let projectArray = [];
let indexFocusProject;
let indexFocusTask;
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

//Add task variables and buttons
let todoContainer = document.querySelector(".container");
let formContainer = document.querySelector(".form-container");
let inputTask = document.getElementById("task-name");
let inputDetails = document.getElementById("task-details");
let inputDate = document.getElementById("task-date");
let inputPrio = document.getElementById("task-priority");
let addTaskBtn = document.getElementById("button-add-todo");
let cancelTaskBtn = document.getElementById("button-cancel-todo");
//Event listeners for add task
addTaskBtn.addEventListener("click", () => confirmAddTask());
cancelTaskBtn.addEventListener("click", () => cancelAddTask());

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
}

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

  let trashButton = document.createElement("img");
  trashButton.classList.add("trash");
  trashButton.src = "/images/bin.png";
  divEditProjectButtons.appendChild(trashButton);
  trashButton.addEventListener("click", () => deleteProject());

  let addTodoButton = document.createElement("i");
  addTodoButton.classList.add("fas", "fa-plus-circle", "fa-md");
  addTodoButton.addEventListener("click", () =>
    displayAddTaskForm(titleOfProject)
  );
  divEditProjectButtons.appendChild(addTodoButton);
};

const renderTodoTask = (title, details, date, prio, complete) => {
  let divTodoTask = document.createElement("div");
  divTodoTask.classList.add("todo");
  divTodoCard.appendChild(divTodoTask);

  let divTop = document.createElement("div");
  divTop.classList.add("top");
  divTodoTask.appendChild(divTop);

  let divTodoTitle = document.createElement("div");
  divTodoTitle.classList.add("todo-title");
  divTop.appendChild(divTodoTitle);

  let todoTitle = document.createElement("input");
  todoTitle.value = title;
  todoTitle.classList.add("task-title");
  divTodoTitle.appendChild(todoTitle);
  todoTitle.addEventListener("change", (e) => updateTaskTitle(details, e));

  let dualButtonDiv = document.createElement("div");
  dualButtonDiv.classList.add("dual-btn");
  divTop.appendChild(dualButtonDiv);

  let completeCheck = document.createElement("i");
  completeCheck.classList.add("fa-solid", "fa-square-check", "fa-kmd");
  dualButtonDiv.appendChild(completeCheck);
  if (complete) {
    completeCheck.style.color = "#29c264";
  } else {
    completeCheck.style.color = "lightgrey";
  }
  completeCheck.addEventListener("click", () =>
    updateTaskComplete(title, complete)
  );

  let trashButton = document.createElement("img");
  trashButton.classList.add("trash");
  trashButton.src = "/images/bin.png";
  dualButtonDiv.appendChild(trashButton);
  trashButton.addEventListener("click", () => deleteTask(title));

  let divBottom = document.createElement("div");
  divBottom.classList.add("bottom");
  divTodoTask.appendChild(divBottom);

  let priorityButton = document.createElement("input");
  priorityButton.type = "color";
  priorityButton.value = prio;
  priorityButton.classList.add("prio-input");
  divBottom.appendChild(priorityButton);
  priorityButton.addEventListener("change", (e) =>
    updateTaskPriority(title, e)
  );

  let todoDetails = document.createElement("input");
  todoDetails.value = details;
  todoDetails.classList.add("task-details");
  divBottom.appendChild(todoDetails);
  todoDetails.addEventListener("change", (e) => updateTaskDetails(title, e));

  let todoDate = document.createElement("input");
  todoDate.classList.add("todo-task-date");
  todoDate.type = "date";
  todoDate.min = "2020-01-01";
  todoDate.max = "2030-12-31";
  todoDate.value = date;
  divBottom.appendChild(todoDate);
  todoDate.addEventListener("change", (e) => updateTaskDate(title, e));
};

const addNewProjectPopup = () => {
  addProjectPopup.classList.add("active");
};

const removeNewProjectPopup = () => {
  addProjectPopup.classList.remove("active");
  addProjectForm.value = "";
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

const displayAddTaskForm = () => {
  todoContainer.style.opacity = "0.5";
  formContainer.style.display = "block";
  todoContainer.style.pointerEvents = "none";
};

const confirmAddTask = () => {
  if (inputTask.value != "" && inputDetails.value != "") {
    const newTask = new toDo(
      inputTask.value,
      inputDetails.value,
      inputDate.value,
      inputPrio.value,
      true
    );
    projectArray[indexFocusProject].toDos.push(newTask);
    renderTodoTask(
      newTask.title,
      newTask.details,
      newTask.date,
      newTask.prio,
      newTask.complete
    );
    todoContainer.style.opacity = "1";
    formContainer.style.display = "none";
    todoContainer.style.pointerEvents = "auto";
    inputTask.value = "";
    inputDetails.value = "";
  }
};

const cancelAddTask = () => {
  todoContainer.style.opacity = "1";
  formContainer.style.display = "none";
  todoContainer.style.pointerEvents = "auto";
  inputTask.value = "";
  inputDetails.value = "";
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
    indexFocusProject = indexOfProjectTitle(project.target.textContent);
    projectArray[indexFocusProject].toDos.forEach((todoTask) => {
      renderTodoTask(
        todoTask.title,
        todoTask.details,
        todoTask.date,
        todoTask.prio,
        todoTask.complete
      );
    });
  } else {
    renderTodoCard(project.target.value);
    indexFocusProject = indexOfProjectTitle(project.target.value);
    projectArray[indexFocusProject].toDos.forEach((todoTask) => {
      renderTodoTask(
        todoTask.title,
        todoTask.details,
        todoTask.date,
        todoTask.prio,
        todoTask.complete
      );
    });
  }
};

const updateTodoCard = (title) => {
  clearTodoCard();
  renderTodoCard(title);
  indexFocusProject = indexOfProjectTitle(title);
  projectArray[indexFocusProject].toDos.forEach((todoTask) => {
    renderTodoTask(
      todoTask.title,
      todoTask.details,
      todoTask.date,
      todoTask.prio,
      todoTask.complete
    );
  });
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

const deleteProject = () => {
  projectArray.splice(indexFocusProject, 1);
  clearTodoCard();
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

const indexOfTask = (taskTitle) => {
  let index;
  projectArray[indexFocusProject].toDos.forEach((todoTask) => {
    if (todoTask.title == taskTitle) {
      index = projectArray[indexFocusProject].toDos.indexOf(todoTask);
    }
  });
  return index;
};

const indexOfTaskForTitleUpdate = (taskDetails) => {
  let index;
  projectArray[indexFocusProject].toDos.forEach((todoTask) => {
    if (todoTask.details == taskDetails) {
      index = projectArray[indexFocusProject].toDos.indexOf(todoTask);
    }
  });
  return index;
};

const updateTaskTitle = (taskDetails, e) => {
  let index = indexOfTaskForTitleUpdate(taskDetails);
  projectArray[indexFocusProject].toDos[index].title = e.target.value;
};

const updateTaskDetails = (taskTitle, e) => {
  let index = indexOfTask(taskTitle);
  projectArray[indexFocusProject].toDos[index].details = e.target.value;
};

const updateTaskDate = (taskTitle, e) => {
  let index = indexOfTask(taskTitle);
  projectArray[indexFocusProject].toDos[index].date = e.target.value;
};

const updateTaskPriority = (taskTitle, e) => {
  let index = indexOfTask(taskTitle);
  projectArray[indexFocusProject].toDos[index].prio = e.target.value;
};

const updateTaskComplete = (taskTitle, completeStatus) => {
  let index = indexOfTask(taskTitle);
  projectArray[indexFocusProject].toDos[index].complete = !completeStatus;
  updateTodoCard(projectArray[indexFocusProject].title);
};

const deleteTask = (taskTitle) => {
  let index = indexOfTask(taskTitle);
  projectArray[indexFocusProject].toDos.splice(index, 1);
  updateTodoCard(projectArray[indexFocusProject].title);
};
