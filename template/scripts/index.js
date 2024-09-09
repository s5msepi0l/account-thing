
document.addEventListener("DOMContentLoaded", function() { //vänt för att saker ska lada ig?
    const popup_win = document.getElementsBy<ClassName("register-window");
    const form = this.querySelector(".login-form");
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
                window.location.href="/private";
              } else {
                wrong_password_c++;

                login_action();
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