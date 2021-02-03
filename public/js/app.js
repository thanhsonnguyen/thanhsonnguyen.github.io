const container = document.querySelector(".container");

const showGraphs = () => {
  document.querySelector('#searchBtn').addEventListener("click", function () {
    serial_no = document.getElementById('serial_no_input').value

    fetch("../public/generated_html_files/" + serial_no + ".html" /*, options */ )
      .then((response) => response.text())
      .then((html) => {
        // document.getElementById("container").innerHTML = html
        document.querySelector(".container").innerHTML = html
      })
      .catch((error) => {
        console.warn(error)
      })
  })
}


document.addEventListener("DOMContentLoaded", showGraphs);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}