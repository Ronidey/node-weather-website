const form = document.querySelector("form");
const userInput = document.getElementById("userInput");
const msg1 = document.getElementById("message-1");
const msg2 = document.getElementById("message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = userInput.value;

  msg1.textContent = "Loading...";
  msg2.textContent = "";

  fetch(`http://localhost:8080/weather?address=${location}`)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      msg1.textContent = data.error
    }else {
      msg1.textContent = data.location;
      msg2.textContent = data.forecast;
    }
  })
  .catch(err => console.log(err))
})