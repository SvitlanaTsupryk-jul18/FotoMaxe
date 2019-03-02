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
                console.log(Object.values(data));
            } else {
                throw new Error(`Something went wrong ${request.status}`);
            }
        };
        request.onerror = function () {
            alert("error"); // There was a connection error of some sort
        };
    }

    // make table

    function addinTable(dataArr) {

        let table = document.querySelector('table');
        let tbody = table.querySelector('tbody');
        // let pageNum = document.querySelector('.pagenumber');

        tbody.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            tbody.insertAdjacentHTML("beforeend", `<tr><td>${i+1}</td><td> ${dataArr[i].name}</td><td><img src="${dataArr[i].image}"></td><td>${dataArr[i].country}</td><td>${dataArr[i].city}</td><td>${dataArr[i].date}</td></tr>`);
        }
        table.appendChild(tbody);
        // pageNum.innerHTML = page + 1;
    }



})();