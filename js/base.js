//import { openDB, deleteDB, wrap, unwrap } from 'https://unpkg.com/idb?module';
import { openDB, deleteDB, wrap, unwrap } from 'idb';
var db;

init();

async function init() {
  db = await idb.openDb('Series', 1, db => {
    db.createObjectStore('series', {keyPath: 'id'});
  });

  list();
}


async function addSeries() {
  let tmdbID = document.querySelector("#id").value;
  var requestURL =
    "https://api.themoviedb.org/3/tv/" +
    tmdbID +
    "?api_key=50dc44cf889efcd7cce1f8cb9fcf6ad5&language=ru-RU";
  //console.log(requestURL);
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    var json = request.response;
    let rusName = json.name;
    let orName = json.original_name;
    let sType = document.querySelector("#type").options[
      document.querySelector("#type").selectedIndex
    ].text;
    let sSeason = json.seasons[0]["name"];
    if (sType == "Сериал") {
      if (json.first_air_date == null) {
        relDate = "Неизвестно";
      } else {
        let relDate = json.first_air_date;
      }
    } else {
      let relDate = json.release_date;
    }
    if (json.status == "In Production") {
      status = "В производстве";
    } else {
      let sStatus = json.status;
    }
let id = tmdbID;
  let tx = db.transaction('series', 'readwrite');

  try {
    tx.objectStore('series').add({id, rusName, orName, sType, sSeason, relDate, sStatus});
    list();
  } catch(err) {
    if (err.name == 'ConstraintError') {
      alert("Такой сериал уже существует");
      addSeries();
    } else {
      throw err;
    }
  }
/*
    var requestdb = window.indexedDB.open("Series");

    requestdb.onupgradeneeded = function (event) {
      var db = event.target.result;

      var objectStore = db.createObjectStore("Series", { keyPath: "id" });
      var tx = db.transaction(["Series"], "readwrite");
      var dbn = event.target.transaction;

      var series = tx.objectStore("Series");

      var serial = {
        id: tmdbID,
        name: rusName,
        original: orName,
        type: sType,
        season: sSeason,
        date: relDate,
        status: sStatus,
      };

      var requestdb = series.add(serial);

      requestdb.onsuccess = function (event) {
        console.log("Сериал добавлен в хранилище", requestdb.result);
      };
      tx.oncomplete = function(event) {
        db.close();
    };

      requestdb.onerror = function (event) {
        if (requestdb.error.name == "ConstraintError") {
          console.log("Сериал с таким id уже существует");
          event.preventDefault();
        } else {
          requestdb.abort();
        }
      };

      tx.onabort = function () {
        console.log("Ошибка", tx.error);
      };
    };*/
  };
}
