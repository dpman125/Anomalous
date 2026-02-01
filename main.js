// variables
characterIndex = -1;
siteIndex = -1;

// game start
document.addEventListener('keydown', function (event) {
    // Code to execute when a key is pressed down

    if (event.key === 'Enter' && window.location.href.endsWith('index.html')) {
        window.location.href = 'home.html';
    }

});

function chatBtnUpdate() {
    const character = characterList[characterIndex];
    if (bossMilestone !== -1 && character && character !== LeroyJenkins) {
        console.log(characterIndex);
        console.log(character);
        document.getElementById("chatBtn").style.display = "flex";
        document.getElementById("chatBtn").innerHTML = "Chat with " + character.dept + " Lead";
    } else {
        console.log("Hiding chat button");
        document.getElementById("chatBtn").style.display = "none";
    }
}


//----------profile toggle functions-------------
function nextProfile() {
    console.log("Next profile");
    if (characterIndex < characterList.length - 1) {
        characterIndex++;
        console.log(characterIndex);
        console.log(characterList[characterIndex]);
    }

    updateProfileDisplay();
}

function previousProfile() {
    console.log("Previous profile");
    if (characterIndex > 0) {
        characterIndex--;
        console.log(characterIndex);
        console.log(characterList[characterIndex]);
    }

    updateProfileDisplay();
}

function updateProfileDisplay() {
    const character = characterList[characterIndex];
    if (!character) {
        document.getElementById("profile_name").innerHTML = "No account Selected";
        document.getElementById("profile_age").innerHTML = "";
        document.getElementById("profile_bio").innerHTML = "Please select an account or sign in";
        document.getElementById("profile_img").src = "img/defaultavatar.png";
        return;
    }
    chatBtnUpdate();
    document.getElementById("profile_name").innerHTML = character.name;
    document.getElementById("profile_age").innerHTML = character.age;
    document.getElementById("profile_bio").innerHTML = character.bio;
    document.getElementById("profile_img").src = character.img;
}

//----------site toggle functions-------------
function nextSite() {
    console.log("Next site");
    if (siteIndex < siteList.length - 1 && bossMilestone > siteIndex) {
        siteIndex++;
        console.log(siteIndex);
        console.log(siteList[siteIndex]);
    }

    updateSiteDisplay();
    chatBtnUpdate();
}

function previousSite() {
    console.log("Previous site");
    if (siteIndex > 0) {
        siteIndex--;
        console.log(siteIndex);
        console.log(siteList[siteIndex]);
    }

    updateSiteDisplay();
    chatBtnUpdate();
}

function updateSiteDisplay() {
    const site = siteList[siteIndex];
    document.getElementById("current_site").src = site.url ? site.url : "default_site_url.jpg";
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
    document.getElementById("profileForm").reset();

    // Godmode check - outside the loop
    if (username === "g" && password === "g") {
        alert("Godmode activated! All profiles unlocked.");
        milestone = 6;
        bossMilestone = 6;
        for (const character of sideCharacterList) {
            if (!characterList.includes(character)) {
                characterList.push(character);
            }
        }
        nextSite();
        closeModal('profileModal');
        updateProfileDisplay();
        chatBtnUpdate();
        return;
    }

    // Normal login check
    for (const character of sideCharacterList) {
        if (character.username === username) {

            if (character.password === password) {
                alert("Login successful!");
                if (bossMilestone == -1) {
                    bossMilestone = 0;
                    milestone = 0;
                    nextSite();
                    document.getElementById("GS_iframe").contentWindow.showChunk(milestone + 1);
                } else {
                    if (milestone <= bossMilestone + 1) {
                        milestone++;
                        document.getElementById("GS_iframe").contentWindow.showChunk(milestone + 1);
                    }
                }
                if (!characterList.includes(character)) {
                    characterList.push(character);
                }
                closeModal('profileModal');
                characterIndex = characterList.indexOf(character);
                updateProfileDisplay();
                chatBtnUpdate();
                return;
            }
            alert("Incorrect password for username: " + username + ". \n HINT: " + character.hint);
        }
    }

    // Only show if no match found
    alert("username not found");
}

