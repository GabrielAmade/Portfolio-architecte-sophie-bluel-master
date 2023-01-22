// fetch api pour afficher les projets

const url = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");
const filterBtns = document.querySelectorAll(".filter-btn");


    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.forEach(project => {
    
                let figure = document.createElement("figure");
    
                figure.setAttribute("id", project.id);
                figure.setAttribute('data-category', `${project.categoryId}`);
                
                
                let picture = document.createElement("img");
                picture.src = project.imageUrl;
                picture.setAttribute('alt', `${project.title}`);
                picture.setAttribute('crossorigin', 'anonymous');
                figure.append(picture)
                // console.log(figure);
                
                let figcaption = document.createElement("figcaption");
                figcaption.textContent = project.title
                figure.append(figcaption)
                // console.log(figure);
    
                gallery.appendChild(figure);

                
                // Barre pour filtrer les projets 

                filterBtns.forEach(function(btn) {

                    btn.addEventListener("click", (e) => {
                        const btnId = (e.target.dataset.id);
                        //console.log(btnId); //me donne le data-id de mon bouton
                        const figureId = figure.getAttribute("data-category")
                        //console.log(figureId);
                        
                        if(btnId === figureId) {
                            figure.style.display = "block";
                        } else if (btnId === "0"){
                            figure.style.display = "block";
                        } else (
                            figure.style.display = "none"
                        )                                             
                    })                  
                }
            )
                
        }
    )
                
})
                
        .catch(error => console.log(error))
    
                   
// afficher la fenêtre modale

let modal = document.querySelector("#myModal");
let modalContent = document.querySelector(".modal-content");
let modalContentAdd = document.querySelector(".modal-content-2")
let modaleHeader = document.querySelector(".modal-header")
let btn = document.querySelector("#myBtn");
let span = document.querySelector(".close");
let addPicture = document.querySelector(".add-picture")
let deletePicture = document.querySelector(".delete-picture")
let hr = document.querySelector(".modal-hr")

btn.addEventListener("click", function(){

    modal.style.display = "block";
    modaleHeader.innerHTML = "<p>Galerie photo</p>"
    modalContentAdd.style.display = "none";
    addPicture.style.display = "block";
    deletePicture.style.display = "block";
    hr.style.display = "block";
    modalContent.style.display = "block";

     if (!modalContent.contains(document.querySelector(".picture-modal"))) {

       
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.forEach(project => {
    
                let figureModal = document.createElement("figure");
    
                figureModal.setAttribute("id", project.id);

                figureModal.setAttribute('data-category', `${project.categoryId}`);
                             
                let pictureModal = document.createElement("img");
                pictureModal.src = project.imageUrl;
                pictureModal.setAttribute('alt', `${project.title}`);
                pictureModal.setAttribute('crossorigin', 'anonymous');
                pictureModal.setAttribute("class", "picture-modal");
                figureModal.append(pictureModal);

                let pictureDelete = document.createElement("button");
                pictureDelete.setAttribute("class", "picture-delete")

                let icon = document.createElement('i');
                icon.classList.add('fa-regular', 'fa-trash-can');
                pictureDelete.style.position = 'relative';
                pictureDelete.style.zIndex = '1';
                pictureDelete.style.bottom = '105px';
                pictureDelete.style.left = '58px';
                pictureDelete.prepend(icon);

                figureModal.append(pictureDelete);

              
                let figcaptionModal = document.createElement("figcaption");
                figcaptionModal.textContent = "éditer";
                figcaptionModal.setAttribute("class", "figcaption-modal");

                figureModal.append(figcaptionModal)
                // console.log(figure);
    
                modalContent.appendChild(figureModal);





                // DELETE
                pictureDelete.addEventListener("click", function(event){
                    let getToken = localStorage.getItem('SavedToken');
                    let token = JSON.parse(getToken);
                    let id = this.parentElement.getAttribute("id");
                    //let figure = document.getElementsByTagName("figure");
                    let urlDelete = `http://localhost:5678/api/works/${id}`;

                    let optionDelete = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            'Authorization': `Bearer ${token}`,
                        }
                        };

                        fetch(urlDelete, optionDelete)
                        .then(response => {
                            if (response.ok) {
                                
                                let modalFigure = document.querySelector(`figure[id="${id}"]`);
                                modalFigure.remove();
                                let figure = parent.document.querySelector(`figure[id="${id}"]`);

                                figure.remove();

                                // for (let i = 0; i < figure.length; i++) {
                                //     if (figure[i].getAttribute("id") === id) {
                                //         figure[i].remove();
                                //     }
                                // }
                              
                            } else {
                                throw new Error('Erreur');
                            }
                        })
                        
                        .catch(error => {
                            console.error(error);
                        });
                    });


                    //Création du formulaire pour poster une image

                    addPicture.addEventListener("click", function(){    

                        modalContent.style.display = "none";
                        modalContentAdd.style.display = "block";
                        addPicture.style.display = "none";
                        deletePicture.style.display = "none";
                        hr.style.display = "none";
                        modaleHeader.innerHTML = "<p>Ajout photo</p>"
                        
                        if (!modalContentAdd.contains(document.querySelector("form"))) {


                        let form = document.createElement("form");
                        form.setAttribute("action", "#");
                        form.setAttribute("method", "post");
                        form.setAttribute("class", "form-download");

                        let imgDiv = document.createElement("div");
                        imgDiv.setAttribute("class", "imgDiv");
                        
                       // Champ image
                        let inputImage = document.createElement("input");
                        inputImage.setAttribute("type", "file");
                        inputImage.setAttribute("accept", "image/*");
                        inputImage.style.display = "none";

                        let button = document.createElement("button");
                        button.innerHTML = "+ Ajouter photo";
                        button.setAttribute("class", "custom-button");

                        button.addEventListener("click", function(e){
                            e.preventDefault();
                            inputImage.click();
                        });

                        let icon = document.createElement("i");
                        icon.setAttribute("class", "fa-regular fa-image custom-icon");
                        let img = document.createElement("img");
                        img.setAttribute("class", "test")
                        img.src = icon.classList;
                        //img.style.cssText = "width:50px; height:50px;";



                        let text = document.createElement("p");
                        text.innerHTML = "jpg, png : 4mo max";
                        text.setAttribute("class", "custom-text");

                        

                        
                        
                        
                        
                        imgDiv.appendChild(inputImage);
                        imgDiv.appendChild(button);
                        imgDiv.appendChild(text);
                        imgDiv.appendChild(icon);
                        form.appendChild(imgDiv);
                       
                        // Champ nom
                        let labelName = document.createElement("label");
                        labelName.innerHTML = "Titre";
                        labelName.setAttribute("for", "input-name");
                        form.appendChild(labelName);

                        let inputName = document.createElement("input");
                        inputName.setAttribute("type", "text");
                        inputName.setAttribute("name", "name");
                        inputName.setAttribute("id", "input-name");
                        form.appendChild(inputName);

                        // Champ select
                        let labelCategory = document.createElement("label");
                        labelCategory.innerHTML = "Catégorie";
                        labelCategory.setAttribute("for", "select-category");
                        form.appendChild(labelCategory);

                        let selectCategory = document.createElement("select");
                        selectCategory.setAttribute("name", "category");
                        selectCategory.setAttribute("id", "select-category");
                        form.appendChild(selectCategory);

                        // Options pour le select
                        let option1 = document.createElement("option");
                        option1.setAttribute("value", "0");
                        option1.textContent = "";
                        selectCategory.appendChild(option1);

                        let option2 = document.createElement("option");
                        option2.setAttribute("value", "1");
                        option2.textContent = "Objets";
                        selectCategory.appendChild(option2);

                        let option3 = document.createElement("option");
                        option3.setAttribute("value", "2");
                        option3.textContent = "Appartements";
                        selectCategory.appendChild(option3);

                        let option4 = document.createElement("option");
                        option4.setAttribute("value", "3");
                        option4.textContent = "Hotels & restaurants";
                        selectCategory.appendChild(option4);

                       

                        

                        // Bouton Envoyer
                        let inputSubmit = document.createElement("input");
                        inputSubmit.setAttribute("type", "submit");
                        inputSubmit.setAttribute("value", "Valider");
                        inputSubmit.setAttribute("class", "validate-picture");
                        form.appendChild(inputSubmit);

                        modalContentAdd.appendChild(form);
                        modal.appendChild(modalContentAdd);

                        
                        // REQUETE POST

                       form.addEventListener("submit", function(event){
                        event.preventDefault();
                        let formData = new FormData();
                        
                        // récupérer le fichier, titre et catégorie du formulaire
                        let fileInput = document.querySelector('input[type=file]');
                        let file = fileInput.files[0];
                        let title = document.querySelector('input[name=name]').value;
                        let category = document.querySelector('select[name=category]').value;
                      
                        // Valider les inputs
                        if (!file) {
                          alert("Sélectionnez une image");
                          return;
                        }
                        if (!title) {
                          alert("Entrez un titre");
                          return;
                        }
                        if (!category) {
                          alert("Sélectionnez une catégorie");
                          return;
                        }
                      
                        // Récupérer le token
                        let getToken = localStorage.getItem('SavedToken');
                        let token = JSON.parse(getToken);
                  
                        // Création d'un formdata et ajout du fichier, titre et catégorie
                        formData.append('image', file, file.name);
                        formData.append('title', title);
                        formData.append('category', category);
                      
                        
                        let options = {
                          method: "POST",
                          headers: {
                            'Authorization': `Bearer ${token}`
                          },
                          body: formData
                        };
                      
                        // Envoi de la requête au serveur
                        fetch(url, options)
                          .then(response => {
                            if (!response.ok) {
                              throw new Error(response.statusText);
                            }
                            return response.json();
                          })
                          .then(data => {
                            console.log(data);
                            alert("Votre image a été ajoutée avec succès !");
                            //fileInput.value = null;

                            let figureData = document.createElement("figure");  
                            figureData.setAttribute("id", data.id);
                            figureData.setAttribute('data-category', `${data.categoryId}`);
                
                            let pictureData = document.createElement("img");
                            pictureData.src = data.imageUrl;
                            pictureData.setAttribute('alt', `${data.title}`);
                            pictureData.setAttribute('crossorigin', 'anonymous');
                            figureData.append(pictureData)

                            let figcaptionData = document.createElement("figcaption");
                            figcaptionData.textContent = data.title
                            figureData.append(figcaptionData)

                            gallery.append(figureData);

                            modalContent.innerHTML = "";
                            
                            
                            
                          })
                          
                          .catch(err => {
                            console.log(err);
                            alert("Erreur: " + err);
                          });
                      });
                        
                        }
                    })
                            
            })          
        })
    }       
}) 
    
    

// Fermer la modale en appuyant sur la croix
span.addEventListener("click", function(){
    modal.style.display = "none";

}) 




// Fermez la modale lorsque l'utilisateur clique en dehors de celle-ci

let btnPictureDelete = document.querySelector(".picture-delete")
window.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest('.modal-content') === modalContent || event.target.closest('.modal-content-2') === modalContentAdd || event.target === btn || event.target === btnPictureDelete || event.target === addPicture ) {
      return;
    }
    modal.style.display = "none";

  });

  





