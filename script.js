const inputTag = document.querySelector(".form-control");
const containerTag = document.querySelector(".container");
const taskBox = document.querySelector(".taskContainer");
const button = document.querySelector(".btn");
//<i class="fa-solid fa-xmark"></i>

let data = [];
let countOfTask = 1;
const acceptData = (inputValue) => {
  data.push(inputTag.value.toUpperCase());
  // console.log(data);
  creatingTask(inputValue);
  //windowLocalStorage(inputValue);
};
const creatingTask = (inputValue) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  const textDiv = document.createElement("div");
  textDiv.classList.add("textDiv");

  textDiv.innerText = countOfTask + "." + " " + inputValue;
  countOfTask++;
  taskDiv.append(textDiv);

  //console.log(inputValue);
  const removeDiv = document.createElement("i");
  removeDiv.classList.add("fa-solid", "fa-xmark");
  taskDiv.append(removeDiv);
  taskBox.append(taskDiv);
  inputTag.value = "";
  //taskDiv.classList.add("fall");
  //remove funvtion
  removeDiv.addEventListener("click", () => {
    removeFunction(removeDiv, taskDiv, textDiv);
  });

  // line through function
  textDiv.addEventListener("click", () => {
    const classExit = textDiv.classList.contains("finishedTask");
    if (classExit) {
      textDiv.classList.remove("finishedTask");
    } else {
      textDiv.classList.add("finishedTask");
    }
  });
};

//local storage time

button.addEventListener("click", () => {
  const inputValue = inputTag.value.toUpperCase();

  if (inputValue === "") {
    return alert("The input cannot be blank");
  } else {
    //const inputValue = inputTag.value.toUpperCase();

    acceptData(inputValue);

    localStorage.setItem("data", JSON.stringify(data));
  }
  //enter++;
});

window.addEventListener("load", () => {
  data = JSON.parse(localStorage.getItem("data")) || [];

  data.forEach(function (value) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const textDiv = document.createElement("div");
    textDiv.classList.add("textDiv");

    textDiv.innerText = countOfTask + "." + " " + value.toUpperCase();
    taskDiv.append(textDiv);
    countOfTask++;

    //console.log(inputValue);
    const removeDiv = document.createElement("i");
    removeDiv.classList.add("fa-solid", "fa-xmark");
    taskDiv.append(removeDiv);
    taskBox.append(taskDiv);
    inputTag.value = "";
    removeFunction(removeDiv, taskDiv, textDiv);
    lineThrough(textDiv);
  });
});

/*

/*
(() => {
  data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
})();


button.addEventListener("click", () => {
  // const inputValue = inputTag.value.toUpperCase();
  acceptData();
});
let data = [];

const acceptData = () => {
  data.push({
    text: inputTag.value,
  });
  console.log(data);
  creatingTask();
};
const creatingTask = () => {
  taskBox.innerHTML += `
  <div class="task">
          <div class="textDiv">${data.text}</div>
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>


  `;
};

*/
function removeFunction(remove, taskDiv, textDiv) {
  remove.addEventListener("click", () => {
    const classExit = textDiv.classList.contains("finishedTask");
    if (classExit) {
      taskDiv.classList.add("fall");
      setTimeout(() => {
        taskDiv.remove();
      }, 300);

      const taskIndex = taskDiv.children[0].innerText;
      // console.log(taskDiv.children);
      data.splice(data.indexOf(taskIndex), 1);
      localStorage.setItem("data", JSON.stringify(data));
      //data = JSON.parse(localStorage.getItem("data"));
      //alert("U cannot delet without marking the Line");
    } else {
      //alert("U cannot delet without marking the Line");

      setTimeout(() => {
        document.querySelector(".toastAlert").style.right = "10px";
      }, 100);
      setTimeout(() => {
        document.querySelector(".toastAlert").style.right = "-300px";
      }, 2000);
    }
  });
}

function lineThrough(textDiv) {
  textDiv.addEventListener("click", () => {
    const classExit = textDiv.classList.contains("finishedTask");
    if (classExit) {
      textDiv.classList.remove("finishedTask");
    } else {
      textDiv.classList.add("finishedTask");
    }
  });
}
