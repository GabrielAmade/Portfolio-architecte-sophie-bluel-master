const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-fetch");
const error = document.querySelector(".error");
const email = document.querySelector("#email");
const password = document.querySelector("#password");



btnSubmit.addEventListener("click", function(){

        
            const userId = {
                email: "sophie.bluel@test.tld",
                password: "S0phie" 
                // email: email.value,
                // password: password.value 
            }

            const response = fetch ("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*',
                },
                body: JSON.stringify(userId)
            })
            .then(res => {
                console.log(res);
                if (res.ok){
                    window.location.href = 'http://127.0.0.1:5501/index.html'
                   
                } else {
                    error.textContent = "Erreur dans l’identifiant ou le mot de passe"
                }
                return res.json();
                
            })
            .then(data => {
                let token = data.token
                localStorage.setItem("SavedToken", JSON.stringify(token));    
                          
            })
            
            .catch(err => console.log("erreur"))
            
        })

        
   

