
document.addEventListener("DOMContentLoaded", function() { //vänt för att saker ska lada ig?
    const form = document.querySelector(".login-form");

    const input_forms = document.querySelectorAll(".nput");
    console.log(input_forms[0]);
    var wrong_password_c = 0;
    
    console.log(form.elements[0].value);

    form.addEventListener("submit", (e)=> {
        e.preventDefault();
        
        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: form.elements[0].value, //username
              password: form.elements[1].value  //password
            }),
          }).then(response => response.json())
            .then(data => {
              console.log(data);
              if (data.isValidated) {
                console.log("redirect");
                  window.location.href="/private";
              } else {
                for (let i = 0; i<input_forms.length; i++) {

                  input_forms[i].style = "border-color: darkred";
                }
              }
            })
        
    console.log(form);
    })

  function login_action() {
    switch(wrong_password_c) {
      case 1: 
        const img = document.querySelector(".login-action");
        img.classList.add("login.")

        break;
    }
  }
});