const form = document.querySelector("form");
const btnSubmit = document.querySelector(".btn-fetch");
const error = document.querySelector(".error");
const email = document.querySelector("#email");
const password = document.querySelector("#password");



btnSubmit.addEventListener("click", function(){
console.log("test");
        
            const userId = {
                 email: email.value,
                 password: password.value 
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
                if (res.ok){
                    window.location.href = './index.html'
                   
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

        
   


        