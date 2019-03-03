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


///request on server

//function for changing data 

function postData() {

    let request = new XMLHttpRequest();
    let data = {};
    data.name = "developer";
    data.city = "Wroclav";
    request.open('PUT', 'get-dates.json');
    request.setRequestHeader('Content-Type', "application/json; charset=utf-8", 'Accept: application/json', true);
    request.onload = function () {
        if (request.status === 200 && request.responseText !== newName) {
            alert('Something went wrong.  Name is now ' + request.responseText);
        } else if (request.status !== 200) {
            alert('Request failed.  Returned status of ' + request.status);
        }
    };
    request.send(JSON.stringify(data));
}

//function for deleting

function deleteRow() {
    // Delete a row

    let request = new XMLHttpRequest();
    request.open("DELETE", "get-dates.json", true);
    request.onload = function () {
        let rows = JSON.parse(request.responseText);
        if (request.readyState == 4 && request.status == "200") {
            console.table(rows);
        } else {
            console.error(rows);
        }
    }
    request.send();
}