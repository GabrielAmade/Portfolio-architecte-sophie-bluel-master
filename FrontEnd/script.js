
//Get request
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
                
                let figcaption = document.createElement("figcaption");
                figcaption.textContent = project.title
                figure.append(figcaption)
    
                gallery.appendChild(figure);

                //Filter function
                filterBar(figure)
                                        
        }
    )               
})               
        .catch(error => console.log(error))


//Filter Buttons

function filterBar(figure){
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
)}
    
  

// Modal

let modal = document.querySelector("#myModal");
let modalContent = document.querySelector(".modal-content");
let modalContentAdd = document.querySelector(".modal-content-2")
let modalHeader = document.querySelector(".modal-header")
let btnModal = document.querySelector("#myBtn");
let closeModal = document.querySelector(".close");
let addPicture = document.querySelector(".add-picture")
let deletePicture = document.querySelector(".delete-picture")
let hrModal = document.querySelector(".modal-hr")


// let figure = function(project) {
//     let figureModal = document.createElement("figure");   
//     figureModal.setAttribute("id", project.id);
//     figureModal.setAttribute('data-category', `${project.categoryId}`);
// }

function figureCreate(modalContent, project){
    let figureModal = document.createElement("figure");   
                figureModal.setAttribute("id", project.id);
                figureModal.setAttribute('data-category', `${project.categoryId}`);
                
                // create picture
                let pictureModal = document.createElement("img");
                pictureModal.src = project.imageUrl;
                pictureModal.setAttribute('alt', `${project.title}`);
                pictureModal.setAttribute('crossorigin', 'anonymous');
                pictureModal.setAttribute("class", "picture-modal");
               
                figureModal.append(pictureModal);

                // create delete button
                let pictureDelete = document.createElement("button");
                pictureDelete.setAttribute("class", "picture-delete")

                //create trash icon
                let iconTrash = document.createElement('i');
                iconTrash.classList.add('fa-regular', 'fa-trash-can');
                pictureDelete.style.position = 'relative';
                pictureDelete.style.zIndex = '1';
                pictureDelete.style.bottom = '105px';
                pictureDelete.style.left = '58px';
                pictureDelete.prepend(iconTrash);
                figureModal.append(pictureDelete);

                // create caption
                let figcaptionModal = document.createElement("figcaption");
                figcaptionModal.textContent = "éditer";
                figcaptionModal.setAttribute("class", "figcaption-modal");
                figureModal.append(figcaptionModal)
               
                modalContent.appendChild(figureModal);

                pictureDelete.addEventListener("click", function(){
                    let getToken = localStorage.getItem('SavedToken');
                    let token = JSON.parse(getToken);
                    let id = this.parentElement.getAttribute("id");
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

                            } else {
                                throw new Error('Erreur');
                            }
                        })

                       .catch(error => {
                            console.error(error);
                        });
                });
}




btnModal.addEventListener("click", function(){

    modal.style.display = "block";
    modalHeader.innerHTML = "<p>Galerie photo</p>"
    modalContentAdd.style.display = "none";
    addPicture.style.display = "block";
    deletePicture.style.display = "block";
    hrModal.style.display = "block";
    modalContent.style.display = "block";

    if (!modalContent.contains(document.querySelector(".picture-modal"))) {
     
        fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.forEach(project => {
    
                // create figure
                // let figureModal = document.createElement("figure");   
                // figureModal.setAttribute("id", project.id);
                // figureModal.setAttribute('data-category', `${project.categoryId}`);
                
                // // create picture
                // let pictureModal = document.createElement("img");
                // pictureModal.src = project.imageUrl;
                // pictureModal.setAttribute('alt', `${project.title}`);
                // pictureModal.setAttribute('crossorigin', 'anonymous');
                // pictureModal.setAttribute("class", "picture-modal");
               
                // figureModal.append(pictureModal);

                // // create delete button
                // let pictureDelete = document.createElement("button");
                // pictureDelete.setAttribute("class", "picture-delete")

                // //create trash icon
                // let iconTrash = document.createElement('i');
                // iconTrash.classList.add('fa-regular', 'fa-trash-can');
                // pictureDelete.style.position = 'relative';
                // pictureDelete.style.zIndex = '1';
                // pictureDelete.style.bottom = '105px';
                // pictureDelete.style.left = '58px';
                // pictureDelete.prepend(iconTrash);
                // figureModal.append(pictureDelete);

                // // create caption
                // let figcaptionModal = document.createElement("figcaption");
                // figcaptionModal.textContent = "éditer";
                // figcaptionModal.setAttribute("class", "figcaption-modal");
                // figureModal.append(figcaptionModal)
               
                // modalContent.appendChild(figureModal);

                figureCreate(modalContent, project);


               // Delete request
                // pictureDelete.addEventListener("click", function(){
                //     let getToken = localStorage.getItem('SavedToken');
                //     let token = JSON.parse(getToken);
                //     let id = this.parentElement.getAttribute("id");
                //     let urlDelete = `http://localhost:5678/api/works/${id}`;

                //     let optionDelete = {
                //         method: 'DELETE',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Accept': '*/*',
                //             'Authorization': `Bearer ${token}`,
                //         }
                //         };

                //         fetch(urlDelete, optionDelete)
                //         .then(response => {
                //             if (response.ok) {
                                
                //                 let modalFigure = document.querySelector(`figure[id="${id}"]`);
                //                 modalFigure.remove();
                //                 let figure = parent.document.querySelector(`figure[id="${id}"]`);
                //                 figure.remove();

                //             } else {
                //                 throw new Error('Erreur');
                //             }
                //         })

                //        .catch(error => {
                //             console.error(error);
                //         });
                // });


                //Post form

                addPicture.addEventListener("click", function(){    

                    modalContent.style.display = "none";
                    modalContentAdd.style.display = "block";
                    addPicture.style.display = "none";
                    deletePicture.style.display = "none";
                    hrModal.style.display = "none";                  
                    modalHeader.innerHTML = "<p>Ajout photo</p>"
                    
                    if (!modalContentAdd.contains(document.querySelector("form"))) {

                        let form = document.createElement("form");
                        form.setAttribute("action", "#");
                        form.setAttribute("method", "post");
                        form.setAttribute("class", "form-download");

                        let imgForm = document.createElement("div");
                        imgForm.setAttribute("class", "imgForm");
                        
                        // Picture file
                        let inputImage = document.createElement("input");
                        inputImage.setAttribute("type", "file");
                        inputImage.setAttribute("accept", "image/*");
                        inputImage.style.display = "none";

                        let buttonImage = document.createElement("button");
                        buttonImage.innerHTML = "+ Ajouter photo";
                        buttonImage.setAttribute("class", "custom-button");


                        buttonImage.addEventListener("click", function(e){
                            e.preventDefault();
                            inputImage.click();
                        });

                        let iconImage = document.createElement("i");
                        iconImage.setAttribute("class", "fa-regular fa-image custom-icon");
                        let img = document.createElement("img");
                        img.src = iconImage.classList;

                        let textImage = document.createElement("p");
                        textImage.innerHTML = "jpg, png : 4mo max";
                        textImage.setAttribute("class", "custom-text");
                    
                        imgForm.appendChild(inputImage);
                        imgForm.appendChild(buttonImage);
                        imgForm.appendChild(textImage);
                        imgForm.appendChild(iconImage);


                        // Preview image 
                        inputImage.addEventListener("change", function(){
                            let file = this.files[0];
                            let reader = new FileReader();
                            reader.onload = function(e){
                                img.src = e.target.result;
                                img.className = "img-preview";
                                buttonImage.style.display = "none";
                                textImage.style.display = "none";
                                iconImage.style.display = "none";
                            }
                            reader.readAsDataURL(file);
                            imgForm.appendChild(img);
                        });


                        form.appendChild(imgForm);
                        
                        // Name Input
                        let labelName = document.createElement("label");
                        labelName.innerHTML = "Titre";
                        labelName.setAttribute("for", "input-name");
                        form.appendChild(labelName);

                        let inputName = document.createElement("input");
                        inputName.setAttribute("type", "text");
                        inputName.setAttribute("name", "name");
                        inputName.setAttribute("id", "input-name");
                        form.appendChild(inputName);

                        // Select Category
                        let labelCategory = document.createElement("label");
                        labelCategory.innerHTML = "Catégorie";
                        labelCategory.setAttribute("for", "select-category");
                        form.appendChild(labelCategory);

                        let selectCategory = document.createElement("select");
                        selectCategory.setAttribute("name", "category");
                        selectCategory.setAttribute("id", "select-category");
                        form.appendChild(selectCategory);



                        // Select options
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

                        // Submit Btn
                        let inputSubmit = document.createElement("input");
                        inputSubmit.setAttribute("type", "submit");
                        inputSubmit.setAttribute("value", "Valider");
                        inputSubmit.setAttribute("class", "validate-picture validate-picture-background");

                        form.appendChild(inputSubmit);
                        modalContentAdd.appendChild(form);
                        modal.appendChild(modalContentAdd);
                  
                        
                        // Change color of submit btn when inputs complete
                        let inputImageTest = document.querySelector("input[type='file']");
                        let inputNameTest = document.querySelector("input[name='name']");
                        let selectCategoryTest = document.querySelector("select[name='category']");
                        inputImageTest.addEventListener("change", checkInputs);
                        inputNameTest.addEventListener("keyup", checkInputs);
                        selectCategoryTest.addEventListener("change", checkInputs);

                        function checkInputs() {
                            if (inputImageTest.value && inputNameTest.value && (selectCategoryTest.value == "1" || selectCategoryTest.value == "2" || selectCategoryTest.value == "3")) {
                                inputSubmit.classList.remove("validate-picture-background")
                                inputSubmit.style.backgroundColor = "#1D6154";
                            } else {
                                inputSubmit.style.backgroundColor = "#A7A7A7";
                            }
                        }


                        // Post request
                        form.addEventListener("submit", function(event){
                        event.preventDefault();
                        let formData = new FormData();
                        
                        // get file, title and category
                        let fileInput = document.querySelector('input[type=file]');
                        let file = fileInput.files[0];
                        let title = document.querySelector('input[name=name]').value;
                        let category = document.querySelector('select[name=category]').value;

                        // Validate inputs
                        if (!file) {
                            alert("Sélectionnez une image");
                            return;
                        } else if (!title) {
                            alert("Entrez un titre");
                            return;
                        } else if (category == "0") {
                            alert("Sélectionnez une catégorie");
                            return;
                        } 
                        
                        // Get token
                        let getToken = localStorage.getItem('SavedToken');
                        let token = JSON.parse(getToken);
                    
                        // Create formData and add file, title and category
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



                                modalContent.innerHTML = ""; //supprimer tout le contenu de la modal pour faire un fetch au click
                                imgForm.removeChild(img); // delete img
                                buttonImage.style.display = "block";
                                textImage.style.display = "block";
                                iconImage.style.display = "block";
                                inputName.value = "";
                                selectCategory.value = "";                       
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
    
    

// close modal when clicking on X
closeModal.addEventListener("click", function(){
    modal.style.display = "none";
}) 

// Closing modal when clicking outside of it

let btnPictureDelete = document.querySelector(".picture-delete")
window.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest('.modal-content') === modalContent || event.target.closest('.modal-content-2') === modalContentAdd || event.target === btnModal || event.target === btnPictureDelete || event.target === addPicture ) {
      return;
    }
    modal.style.display = "none";

  });


// Display modify buttons and bar when token
const modify1 = document.querySelector(".button-modif-1");
const modify2 = document.querySelector(".button-modif-2");
const modify3 = document.querySelector(".button-modif-3");
const editionBar = document.querySelector(".edition-bar")
const header = document.querySelector("header")

if(localStorage.getItem("SavedToken")){

    modify1.style.display = "block";
    modify2.style.display = "block";
    modify3.style.display = "block";
    editionBar.style.display = "block";
    header.style.marginTop = "70px"
}





// function test(modalContent, project, ismodal)
// Julien Canipel
// 09:47
// test(modalContent, project, true)
// Julien Canipel
// 09:47
// test(modalContent, project, false)