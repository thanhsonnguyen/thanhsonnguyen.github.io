const container = document.querySelector(".container");

const showGraphs = () => {
  document.querySelector('#searchBtn').addEventListener("click", function () {
    serial_no = document.getElementById('serial_no_input').value

    // fetch("../generated_html_files/" + serial_no + ".html" /*, options */ )
    //   .then((response) => response.text())
    //   .then((html) => {
    //     // document.getElementById("container").innerHTML = html
    //     document.querySelector(".container").innerHTML = html
    //   })
    //   .catch((error) => {
    //     console.warn(error)
    //   })
    $('.container').load("../../public/generated_html_files/" + serial_no + ".html",function( response, status, xhr ){
      if(status == "error"){
        alert('Incorrect Serial!')
      }
    })
    // main_iframe = document.getElementById('chartloader')
    // main_iframe.src = "../../public/generated_html_files/" + serial_no + ".html"
    // console.log("../../public/generated_html_files/" + serial_no + ".html")
    // $('.container').hide()
    // $('#chartloader').show()
  })
}


document.addEventListener("DOMContentLoaded", showGraphs);

/* if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/public/service-worker.js")
      .then(res => {
        console.log("service worker registered")
      })
      .catch(err => console.log("service worker not registered", err));
  });
} */

/* if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/public/service-worker.js')
      .then((registration) => {
          const data = {
              type: 'CACHE_URLS',
              payload: [
                  location.href,
                  ...performance.getEntriesByType('resource').map((r) => r.name)
              ]
          };
          // registration.installing.postMessage(data);
          window.postMessage(data)
          console.log("service worker registered")
      })
      .catch((err) => console.log('SW registration FAIL:', err));
} */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/public/service-worker-workbox.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
      });
  });
}