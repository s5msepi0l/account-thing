
document.addEventListener("DOMContentLoaded", function() { //vänt för att saker ska lada ig?
    const form = this.querySelector(".login-form");
    console.log(form.elements[0].value);

    form.addEventListener("submit", (e)=> {
        e.preventDefault();
        
        fetch('http://127.0.0.1:1234/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: form.elements[0].value, //username
              password: form.elements[1].value  //password
            }),
          }).then(response => response.json())
            .then(data => console.log(data))
        
    console.log(form);
})});