const persons = [
  {
    name: "Bijay",
    dob: "1995-08-09",
    month: 7,
    age: 26,
  },
  {
    name: "Bijay",
    dob: "2021-02-11",
    month: 2,
    age: 4,
  },
  {
    name: "Demo",
    dob: "1995-03-10",
    month: 2,
    age: 26,
  },
];

const data = JSON.parse(localStorage.getItem("data"));
if (!data) {
  localStorage.setItem("data", JSON.stringify(persons));
}

const months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//! DOM CATCHING
const filterData = document.getElementById("form-input");
const filterDataValue = filterData.value;
const filterInputs = document.querySelectorAll(".filter-inputs");
const filterInputsValue = filterInputs.value;
const form = document.getElementById("formElem"); //*** Input Form */
const formInputs = document.querySelectorAll(".formInputs"); //***Input Form Data */
const monthList = document.querySelectorAll(".months-list");

//! Object Definition
let person = {
  name: "",
  dob: "",
};

let count = 0;
let date = null;

const displayData = (person) => {
  //!!!  Creating DOM ELEMENTS
  //?? Creating Main DIV for Accord
  mainDiv = document.createElement("div");
  mainDiv.id = "accord-div";
  mainDiv.classList.add("accordion-item");

  //?? Creating Element for PersonName
  nameBlock = document.createElement("h6");
  nameBlock.id = "flush-headingOne";
  nameBlock.classList.add("accordion-header");
  nameBlock.textContent = "Name :" + person.name.toLocaleUpperCase();

  //?? Creating Element for DOB
  birthDateBlock = document.createElement("small");
  birthDateBlock.classList.add("accordion-body");
  birthDateBlock.textContent = "DOB :" + person.dob;

  //?? Creating Line after each input
  breakLineBlock = document.createElement("hr");
  mainDiv.append(nameBlock, birthDateBlock, breakLineBlock);
  monthList[person.month].append(mainDiv);
};

//! Pushing to Particular Months
const addPersonDetails = (index) => {
  //? Today Date Refactor
  todayDate = new Date(); //* Defines todays full Date
  todayYear = todayDate.getFullYear(); //* Defines Current Year
  todayMonth = todayDate.getMonth(); //* Defines Current Month

  //! Age calculation
  let age = todayYear - birthYear;

  //!!! Adding to Persons Array

  const data = JSON.parse(localStorage.getItem("data"));
  data.push({
    name: person.name,
    age: age,
    dob: person.dob,
    month: index,
  });

  localStorage.setItem("data", JSON.stringify(data));
};

const onSubmit = (e) => {

  for (x in person) {
    person[x] = formInputs[count].value;
    formInputs[count].value = "";
    count++;
  }
  e.preventDefault();

  //! Date Refactor
  //? Person DOB Date Refactor
  date = new Date(...person.dob.split("-")); //* Split the DOB from FORM
  birthYear = date.getFullYear(); //* Gets the Full Year of DOB *** Used for Age Calculation****
  birthMonth = date.getMonth() - 1; //****Gets the Month of DOB ****** Will be used for Indexing to DOM for particular Month ******/ ** -1 is done to match Indexing ****

  addPersonDetails(birthMonth);

  const data = JSON.parse(localStorage.getItem("data"));
  dataFetch(data);

  count = 0;
};

const dataFetch = (data) => {
  data.forEach((element) => {
    displayData(element);
  });
};

dataFetch(JSON.parse(localStorage.getItem("data")));

//! Input Form Submission Function
form.onsubmit = onSubmit;

const filterDOM = (value) => {
  console.log("Function Active");

  const mainBlock = document.getElementById("mainBlock");

  while (mainBlock.firstChild) {
    mainBlock.removeChild(mainBlock.lastChild);
  }

  //!!!  Creating DOM ELEMENTS
  //?? Creating Main DIV for Accord
  mainDiv = document.createElement("div");
  mainDiv.id = "accord-div";
  mainDiv.classList.add("accordion-item");
  mainBlock.append(mainDiv);
  // mainBlock.classList.toggle('hide-show');

  if (value.length !== 0) {
    console.log("SearchData => ", value);
    for (i = 0; i < value.length; i++) {
      //?? Creating Element for PersonName
      nameBlock = document.createElement("h6");
      nameBlock.id = "flush-headingOne";
      nameBlock.classList.add("accordion-header");
      nameBlock.textContent = "Name :" + value[i].name.toLocaleUpperCase();

      //?? Creating Element for DOB
      birthDateBlock = document.createElement("small");
      birthDateBlock.classList.add("accordion-body");
      birthDateBlock.textContent = "DOB :" + value[i].dob;

      //?? Creating Line after each input
      breakLineBlock = document.createElement("hr");

      mainDiv.append(nameBlock, birthDateBlock, breakLineBlock);
      mainBlock.classList.toggle("hide-show");
    }
    console.log("DOM Creation");
  } else {
    noDataBlock = document.createElement("h4");
    noDataBlock.id = "flush-headingOne";
    noDataBlock.classList.add("accordion-header");
    noDataBlock.textContent = "Sorry, No Data Found";
    mainDiv.append(noDataBlock);
    console.log("No Creation");
  }
};

document.getElementById("form-input").addEventListener("submit", (e) => {
  e.preventDefault();
  let formdata = new FormData(document.getElementById("form-input"));
  searchName = formdata.get("search-name");
  searchAge = formdata.get("search-age");

  const a = persons.filter(
    (x) =>
      x.name.charAt(0).toLowerCase() === searchName.charAt(0).toLowerCase() &&
      x.age > Number(searchAge)
  );

  console.log("Search => ", a);

  filterDOM(a);

  document.getElementById("form-input").reset();

  const toggleBlock = document.getElementById("toggle-div");
});
