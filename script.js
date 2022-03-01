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

const testObj = new toDo("title1", "prio1", true, "detailsHere", "12-24-2022");
console.log(testObj);

testObj.toDoComplete();
console.log(testObj);

/*
list of project array, global???
need projectObject 

function to add project()
	event listener for green add button
	popup for user to enter project name
	

projectArray = [proj1, proj2, proj3]

function to add a todo to a project()
	
*/
