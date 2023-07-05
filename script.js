var checkbox1 = document.getElementById('checkbox-1');
var checkbox2 = document.getElementById('checkbox-2');
var checkbox3 = document.getElementById('checkbox-3');
var radiobtn1 = document.getElementById('radiobtn1');
var radiobtn2 = document.getElementById('radiobtn2');
var enroll = document.getElementById('enroll');
var inputGender,skills;
var userData = [];
var card = document.getElementById('studentCard');
var heading = document.getElementById('heading');
var skill = "";

function clearAllInput(event){
    var allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => input.value = '');
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = false;
    radiobtn1.checked = true;
    radiobtn2.checked = false;
}

function getGender(){
    if(radiobtn1.checked == true){
        inputGender = "Male";
    }
    else{
        inputGender = "Female";
    }
}

function getSkills(){
    var inputSkills = [];
    skill = "";
    if(checkbox1.checked){
        inputSkills.push("HTML");
    }
    if(checkbox2.checked){
        inputSkills.push("CSS");
    }
    if(checkbox3.checked){
        inputSkills.push("Java");
    }
    inputSkills.forEach(myFunction);
    function myFunction(item){
        skill += item + " ";
    };
}

/*-----------------------------------------------Enrollment of student----------------------*/

/*-----------------------------------declaring of variable for user input--------------------*/
var inputName = document.getElementById('name');
var inputEmail = document.getElementById('email');
var inputWebsite = document.getElementById('website');
var inputImageLink = document.getElementById('image_link');

enroll.onclick = function(e){
    e.preventDefault();
    getGender();
    getSkills();
    enrollData();
    getDataFromLocal();
    clearAllInput();
}

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}

/*-----------------------------------------------Adding Data to Local-------------------------*/
function enrollData(){
    userData.push({
        name : inputName.value,
        email : inputEmail.value,
        website : inputWebsite.value,
        gender : inputGender,
        skills : skill,
        imageLink : (inputImageLink.value == undefined || inputImageLink.value == "")? "/images/profile.png":inputImageLink.value
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
}

const getDataFromLocal = ()=>{
    card.innerHTML = " ";
    userData.forEach((data)=>{
        document.getElementById("upperHeading").classList.remove('d-none');
        card.classList.remove('d-none');
        card.classList.add('d-flex');
        heading.classList.remove('d-none');
        heading.classList.add('d-flex');
        card.innerHTML += `
        <div id = "studentCard" class="row g-0 h-100">
            <div class="col-8 card-body d-block flex-column justify-content-start px-1 py-2 smallfont border-lg">
              <div>${data.name} </div>
              <div>${data.email} </div>
              <a href="${data.website}" target="_blank">${data.website}</a>
              <div>${data.gender} </div>
              <div>${data.skills} </div>
            </div>
            <div class="col-4 d-flex h-100 border-lg">
              <img src = "${data.imageLink}" class="img-fluid rounded-start w-100" alt="Error">
            </div>
        </div>
        `;
    });
}