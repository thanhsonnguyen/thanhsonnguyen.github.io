const container = document.querySelector(".container");

const showGraphs = () => {
  cookie_serial_no = checkCookie()
  if (cookie_serial_no) {
    serial_no = cookie_serial_no
    $('.container').load("../../public/generated_html_files/" + serial_no + ".html", function (response, status, xhr) {
      if (status == "error") {
        alert('Incorrect Serial!')
      }
      setCookie(serial_no)
    })
  } else {
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
      $('.container').load("../../public/generated_html_files/" + serial_no + ".html", function (response, status, xhr) {
        if (status == "error") {
          alert('Incorrect Serial!')
        }
        setCookie(serial_no)
      })
      // main_iframe = document.getElementById('chartloader')
      // main_iframe.src = "../../public/generated_html_files/" + serial_no + ".html"
      // console.log("../../public/generated_html_files/" + serial_no + ".html")
      // $('.container').hide()
      // $('#chartloader').show()
    })
  }
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
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/public/service-worker-workbox.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function setCookie(serial_no) {
  var now = new Date();
  now.setMonth(now.getDate() + 7);
  // cookievalue = escape(document.myform.customer.value) + ";"
  cookievalue = serial_no

  document.cookie = "serial=" + cookievalue;
  document.cookie = "expires=" + now.toUTCString() + ";"
}

function checkCookie() {
  var allcookies = document.cookie
  // Get all the cookies pairs in an array
  cookiearray = allcookies.split(';')

  // Now take key value pair out of this array
  for (var i = 0; i < cookiearray.length; i++) {
    key = cookiearray[i].split('=')[0]
    value = cookiearray[i].split('=')[1]
    //console.log("Key is : " + key + " and Value is : " + value)
    if (key == 'serial') {
      return value
    }
  }
  return null
}

function resetCookie(){
  document.cookie = "serial=" + "null"
  document.location.href="/public/index.html"
}