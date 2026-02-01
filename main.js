// variables
characterIndex = -1;


// game start
document.addEventListener('keydown', function (event) {
    // Code to execute when a key is pressed down

    if (event.key === 'Enter' && window.location.href.endsWith('index.html')) {
        window.location.href = 'new_page.html';
    }

    console.log('Key pressed:', event.key);
});



//----------profile toggle functions-------------
function nextProfile() {
    console.log("Next profile");
    if (characterIndex < mcList.length - 1) {
        characterIndex++;
        console.log(characterIndex);
        console.log(mcList[characterIndex]);
    }

    updateProfileDisplay();
}

function previousProfile() {
    console.log("Previous profile");
    if (characterIndex > 0) {
        characterIndex--;
        console.log(characterIndex);
        console.log(mcList[characterIndex]);
    }

    updateProfileDisplay();
}

function updateProfileDisplay() {
    const character = mcList[characterIndex];
    document.getElementById("profile_name").innerText = character.name;
    document.getElementById("profile_age").innerText = "Age: " + character.age;
    document.getElementById("profile_bio").innerText = character.bio;
    document.getElementById("profile_img").src = character.img;
}


//----------auth functions-------------
function closeModal(modalname) {
    document.getElementById(modalname).style.display = "none";
}

function openModal(modalname) {
    document.getElementById(modalname).style.display = "flex";
}

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    for (const character of mcList) {
        if (character.username === username && character.password === password) {
            alert("Login successful!");
            closeModal('profileModal');
            return;
        }
    }
    alert("Invalid username or password.");
}