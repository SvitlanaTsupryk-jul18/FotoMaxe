'use strict';

(function () {

    // invocation
    burger();
    getData();

    ///burger-menu

    function burger() {
        let menu = document.querySelector(".mob-menu");
        let openbtn = document.querySelector(".js-burger-open");
        let closebtn = document.querySelector(".js-burger-close");

        openbtn.addEventListener("click", show);
        closebtn.addEventListener("click", hide);

        function show() {
            this.classList.remove("burger--visibility");
            menu.style.transform = ("translate(0)");
        }

        function hide() {
            openbtn.classList.add("burger--visibility");
            menu.style.transform = ("translate(500%)");
        }
    }

    //get data from JSON

    function getData() {
        let request = new XMLHttpRequest();
        request.open('GET', 'get-dates.json', true);
        request.send();
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText).data;
                addinTable(Object.values(data));
                loadMore(Object.values(data));
                //console.log(Object.values(data));
            } else {
                throw new Error(`Something went wrong ${request.status}`);
            }
        };
        request.onerror = function () {
            alert("error"); // There was a connection error of some sort
        };
    }

    // make table

    function addinTable(dataArr, page = 0) {
        let table = document.querySelector('table');
        let tbody = table.querySelector('tbody');

        for (let i = 0 + page * 10; i < 10 + page * 10; i++) {
            tbody.insertAdjacentHTML("beforeend", `<tr><td>${i+1}</td><td> ${dataArr[i].name}</td><td><img src="${dataArr[i].image}"></td><td>${dataArr[i].country}</td><td>${dataArr[i].city}</td><td>${dataArr[i].date}</td></tr>`);
        }
        table.appendChild(tbody);
    }

    //load more in table

    function loadMore(dataArr) {
        let buttonMore = document.querySelector(".btn");
        let page = 1;
        buttonMore.addEventListener("click", function () {
            addinTable(dataArr, page);
            page++;
            console.log(page);
        });
    }


})();

function postData() {

    let request = new XMLHttpRequest();
    var data = {};
    data.firstname = "John";
    data.lastname = "Snow";
    var json = JSON.stringify(data);
    request.open('PUT', 'get-dates.json');
    request.setRequestHeader('Content-Type', 'application/json', true);
    request.onload = function () {
        if (request.status === 200 && request.responseText !== newName) {
            alert('Something went wrong.  Name is now ' + request.responseText);
        } else if (request.status !== 200) {
            alert('Request failed.  Returned status of ' + request.status);
        }
    };
    request.send(json);
}
postData();
deleteRow();

function deleteRow() {
    // Delete a user
    var url = "get-dates.json";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "get-dates.json", true);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
}
// function param(object) {
//     var encodedString = '';
//     for (var prop in object) {
//         if (object.hasOwnProperty(prop)) {
//             if (encodedString.length > 0) {
//                 encodedString += '&';
//             }
//             encodedString += encodeURI(prop + '=' + object[prop]);
//         }
//     }
//     return encodedString;
// }