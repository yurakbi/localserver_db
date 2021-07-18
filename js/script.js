window.addEventListener("DOMContentLoaded", () => {
    
    function req () {
        // GET запит 
        // const request = new XMLHttpRequest();
        // request.open("GET", "http://localhost:3000/people");
        // request.setRequestHeader("Content-type", "application/json; charser=utf-8");
        // request.send();
        // request.addEventListener("load", function () {
        //     if(request.status == 200) {
        //         let data = JSON.parse(request.response);
        //         console.log(data);
        //         createCards(data);
                
                
        //     }
        // });
        getResource("http://localhost:3000/people")
            .then(data => createCards(data.data))
            .catch(err => console.error(err));
        this.remove();
    }

    document.querySelector('button').addEventListener("click", req, {"once": true});

    // async function getResource(url) {
    //     const res = await fetch(`${url}`);

    //     if (!res.ok){
    //         throw new Error (`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();

    // }

    async function getResource(url) {
        const res = await axios(`${url}`);

        if (res.status !== 200){
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res;

    }

    // виводимо картки на сторінку за датопомогою бази даних
    function createCards(response){
        response.forEach(item => {
            let card = document.createElement('div');
            // додаєм клас 
            card.classList.add('card');

            // умова для іконки статі
            let icon;
            if(item.sex === "male") {
                icon = "icons/mars.png";
            } else {
                icon = "icons/female.png";
            }


            // додаємо елемент на сторінку
            card.innerHTML = ` 
                <img src = "${item.photo}" alt = "photo">
                <div class="name">${item.name} ${item.surname}</div>    
                <div class="sex">
                    <img src=${icon} alt="sex">
                </div>
                <div class="age"> ${item.age}</div>
            `;

            document.querySelector('.app').appendChild(card);
        });
    }
});