// variables
characterIndex = -1;
siteIndex = -1;

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
    if (characterIndex < mcList.length - 1 && milestone > characterIndex) {
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
    if (!character) {
        document.getElementById("profile_name").innerText = "No account Selected";
        document.getElementById("profile_age").innerText = "";
        document.getElementById("profile_bio").innerText = "Please select an account or sign in";
        document.getElementById("profile_img").src = "img/waltah.jpg";
        return;
    }
    document.getElementById("profile_name").innerText = character.name;
    document.getElementById("profile_age").innerText = character.age;
    document.getElementById("profile_bio").innerText = character.bio;
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
}

function previousSite() {
    console.log("Previous site");
    if (siteIndex > 0) {
        siteIndex--;
        console.log(siteIndex);
        console.log(siteList[siteIndex]);
    }

    updateSiteDisplay();
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
    for (const character of mcList) {

        if (username === "godmode" && password === "godmode") {
            alert("Godmode activated! All profiles unlocked.");
            milestone = 6;
            bossMilestone = 6;
            nextSite();
            closeModal('profileModal');
            updateProfileDisplay();
            return;
        }
        // if user name and password match, and it is a new login, update milestone
        if (character.username === username && character.password === password) {
            alert("Login successful!");

            // the only time the site will update without a boss conversation is on first login
            if (bossMilestone == -1) {
                bossMilestone = 0;
                nextSite();
            }
            console.log(mcList.indexOf(character) + " vs " + milestone);
            if (mcList.indexOf(character) > milestone) {
                milestone = mcList.indexOf(character);
            }
            else {
                console.log("Logged into previous profile, milestone unchanged");
            }
            // switch to the profile you logged into (can techincally login to the same profile again, but is not nessasary)
            closeModal('profileModal');
            characterIndex = mcList.indexOf(character);
            updateProfileDisplay();
            document.getElementById("profileForm").reset();
            return;
        }
    }
    alert("Invalid username or password.\n \n Hint: Not very secure password");
    document.getElementById("profileForm").reset();
}