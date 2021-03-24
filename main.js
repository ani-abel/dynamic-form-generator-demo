import { v4 as uuidv4 } from "uuid";
import './style.css'

export const buildFormInput = (parentElementRef, inputType, placeholder) => {
  const inputId = uuidv4();
  const input = `
  <div class="form-control"> 
    <label for="${inputId}">${placeholder}</label>
    <input id="${inputId}" type="${inputType}" placeholder="${placeholder}" />
  </div>`;
  parentElementRef.innerHTML += input;
  return;
};

export const buildDetailedInput = (parentElementRef, inputStructure) => {
  const inputId = uuidv4();
  const { type, placeholder, defaultData, maxlength } = inputStructure;
  const input = `
  <div class="form-control"> 
    <label for="${inputId}">${placeholder}</label>
    <input id=${inputId} type="${type}" max="${maxlength}" placeholder="${placeholder}" value="${defaultData}" />
  </div>
  `;
  parentElementRef.innerHTML += input;
  return;
}

const formEl = document.querySelector("#test-form");
const previewTextarea = document.querySelector("#json-sample");
const clickFormPreview = document.querySelector("#reload-form-preview");

/**
* Sample json
*/
const sampleJson = {
  name: "text",
  age: "number",
  password: "password",
  collective: { //Array
    length: 4,
    type: "string"
  },
  email: "email",
  date: "date",
  color: "color",
  usernameCredentials: {
    type: "text",
    placeholder: "detail",
    defaultData: "123",
    maxlength: 10
  },
  loginCredentials: {
    type: "password",
    placeholder: "detail49",
    defaultData: "123",
    maxlength: 10
  }
};

previewTextarea.innerHTML = JSON.stringify(sampleJson);

const loadDynamicForm = (sampleJson) => {
  formEl.innerHTML = ``;
  for (const key of Object.keys(sampleJson)) {
    if (typeof sampleJson[key] !== 'object') {
      buildFormInput(formEl, sampleJson[key], key);
    } else {
      if (sampleJson[key]?.length) { //Array data
        for (let index = 0; index < sampleJson[key]?.length; index++) {
          buildFormInput(formEl, sampleJson[key].type, `${key}${index + 1}`)
        }
      } else { // More detailed Form input
        buildDetailedInput(formEl, sampleJson[key]);
      }
    }
  }
};

loadDynamicForm(sampleJson);

clickFormPreview.addEventListener("click", (e) => {
  e.preventDefault();
  const sampleJson = previewTextarea.value;
  loadDynamicForm(JSON.parse(sampleJson));
});
