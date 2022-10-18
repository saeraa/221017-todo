const completed = document.querySelector("#completed");
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const error = document.querySelector("#error");

const todoArray = [];

let completedNumber = 0;

function updateCompleted() {
	completedNumber = 0;
	todoArray.forEach((todo) => {
		todo.completed ? completedNumber++ : null;
	});

	completed.textContent = `${completedNumber} completed`;
}

form.addEventListener("submit", addTodo);

function addTodo(e) {
	e.preventDefault();
	if (input.value <= 0) {
		error.style.display = "block";
		setTimeout(function () {
			error.style.display = "none";
		}, 2000);
		return;
	} else {
		error.style.display = "none";
	}
	const newTodo = {
		todo: input.value,
		completed: false
	};
	todoArray.push(newTodo);
	createNewElement(newTodo, todoArray.length - 1);
	form.reset();
}

function createNewElement(todo, index) {
	const li = document.createElement("li");
	li.textContent = todo.todo;
	ul.appendChild(li);
	li.addEventListener("click", (e) => {
		e.stopPropagation();
		console.log("hi");
		li.classList.toggle("complete");

		if (li.classList.contains("complete") && todoArray[index]) {
			todoArray[index].completed = true;
			updateCompleted();
		} else if (todoArray[index]) {
			todoArray[index].completed = false;
			updateCompleted();
		}
	});
	const btn = document.createElement("button");
	btn.textContent = "🗑️";
	btn.classList.add("delete");
	btn.addEventListener("click", () => {
		li.remove();
		delete todoArray[index];
		updateCompleted();
		console.log(todoArray);
	});
	li.insertAdjacentElement("beforeend", btn);
}
