console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    //   console.log(notesObj);
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <hr>
                        <p class="card-text"> ${element.text}</p>
                        <hr>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Remove</button>
                        <button id="${index}"onclick="editNote(this.id)" class="btn btn-success">Edit</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<p class="text-light">nothing to show</>`;
    }
}
//edit note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let updateNote = notesObj[index];
    let editHtml = `
                    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <input type="text" id="updateTitle" value="${updateNote.title}" class="form-control mb-1">
                            <textarea class="form-control" id="updateTxt" rows="3">${updateNote.text}</textarea>
                            <hr>
                            <button id="uppdateBtn" class="btn btn-success">Update</button>
                        </div>
                    </div>`;

    let editNotesElm = document.getElementById("notes");
    editNotesElm.innerHTML = editHtml;

    let uppdateBtn = document.getElementById("uppdateBtn");
    uppdateBtn.addEventListener("click", function (e) {
        let updateTxt = document.getElementById("updateTxt");
        let updateTitle = document.getElementById("updateTitle");
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: updateTitle.value,
            text: updateTxt.value
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        updateTitle.value = "";
        updateTxt.value = "";
        showNotes();

        
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    });
}

// Function to delete a note
function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})