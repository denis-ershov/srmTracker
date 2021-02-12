// проверяем существования префикса.
window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;
// НЕ ИСПОЛЬЗУЙТЕ "var indexedDB = ..." вне функции.
// также могут отличаться и window.IDB* objects: Transaction, KeyRange и тд
window.IDBTransaction =
  window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction;
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla никогда не создавала префиксов для объектов, поэтому window.mozIDB* не требуется проверять)

if (!window.indexedDB) {
  window.alert(
    "Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны"
  );
}

function addSeries() {
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

    // Открываем базу данных Series
    var requestdb = window.indexedDB.open("Series");

    // Это событие появилось только в самых новых браузерах
    requestdb.onupgradeneeded = function (event) {
      var db = event.target.result;

      // Создаем хранилище объектов для этой базы данных
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

      var requestdb = series.add(serial); // (3)

      requestdb.onsuccess = function (event) {
        // (4)
        console.log("Сериал добавлен в хранилище", requestdb.result);
      };
      tx.oncomplete = function(event) {
        db.close();
    };

      requestdb.onerror = function (event) {
        // ConstraintError возникает при попытке добавить объект с ключом, который уже существует
        if (requestdb.error.name == "ConstraintError") {
          console.log("Сериал с таким id уже существует"); // обрабатываем ошибку
          event.preventDefault(); // предотвращаем отмену транзакции
          // ...можно попробовать использовать другой ключ...
        } else {
          // неизвестная ошибка
          // транзакция будет отменена
          requestdb.abort();
        }
      };

      tx.onabort = function () {
        console.log("Ошибка", tx.error);
      };
    };
  };
}
