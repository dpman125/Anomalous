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
        return;
    }

    // Normal login check
    for (const character of sideCharacterList) {
        if (character.username === username && character.password === password) {
            alert("Login successful!");
            if (bossMilestone == -1) {
                bossMilestone = 0;
                nextSite();
            }
            if (!characterList.includes(character)) {
                characterList.push(character);
            }
            closeModal('profileModal');
            characterIndex = characterList.indexOf(character);
            updateProfileDisplay();
            return;
        }
    }

    // Only show if no match found
    alert("Invalid username or password.\n \n Hint: Not very secure password");
}

document.getElementById("team_img1").src = sideCharacterList[0].img;
document.getElementById("team_img2").src = sideCharacterList[1].img;
document.getElementById("team_img3").src = sideCharacterList[2].img;
document.getElementById("team_img4").src = sideCharacterList[3].img;
document.getElementById("team_img5").src = sideCharacterList[4].img;
document.getElementById("team_img6").src = sideCharacterList[5].img;
document.getElementById("team_img7").src = sideCharacterList[6].img;
document.getElementById("team_img8").src = sideCharacterList[7].img;
document.getElementById("team_img9").src = sideCharacterList[8].img;
document.getElementById("team_img10").src = sideCharacterList[9].img;
document.getElementById("team_img11").src = sideCharacterList[10].img;
document.getElementById("team_img12").src = sideCharacterList[11].img;
document.getElementById("team_img13").src = sideCharacterList[12].img;
document.getElementById("team_img14").src = sideCharacterList[13].img;
document.getElementById("team_img15").src = sideCharacterList[14].img;
document.getElementById("team_img16").src = sideCharacterList[15].img;
document.getElementById("team_img17").src = sideCharacterList[16].img;
document.getElementById("team_img18").src = sideCharacterList[17].img;

document.getElementById("team_name1").innerText = sideCharacterList[0].name;
document.getElementById("team_name2").innerText = sideCharacterList[1].name;
document.getElementById("team_name3").innerText = sideCharacterList[2].name;
document.getElementById("team_name4").innerText = sideCharacterList[3].name;
document.getElementById("team_name5").innerText = sideCharacterList[4].name;
document.getElementById("team_name6").innerText = sideCharacterList[5].name;
document.getElementById("team_name7").innerText = sideCharacterList[6].name;
document.getElementById("team_name8").innerText = sideCharacterList[7].name;
document.getElementById("team_name9").innerText = sideCharacterList[8].name;
document.getElementById("team_name10").innerText = sideCharacterList[9].name;
document.getElementById("team_name11").innerText = sideCharacterList[10].name;
document.getElementById("team_name12").innerText = sideCharacterList[11].name;
document.getElementById("team_name13").innerText = sideCharacterList[12].name;
document.getElementById("team_name14").innerText = sideCharacterList[13].name;
document.getElementById("team_name15").innerText = sideCharacterList[14].name;
document.getElementById("team_name16").innerText = sideCharacterList[15].name;
document.getElementById("team_name17").innerText = sideCharacterList[16].name;
document.getElementById("team_name18").innerText = sideCharacterList[17].name;

document.getElementById("team_age1").innerText = sideCharacterList[0].age;
document.getElementById("team_age2").innerText = sideCharacterList[1].age;
document.getElementById("team_age3").innerText = sideCharacterList[2].age;
document.getElementById("team_age4").innerText = sideCharacterList[3].age;
document.getElementById("team_age5").innerText = sideCharacterList[4].age;
document.getElementById("team_age6").innerText = sideCharacterList[5].age;
document.getElementById("team_age7").innerText = sideCharacterList[6].age;
document.getElementById("team_age8").innerText = sideCharacterList[7].age;
document.getElementById("team_age9").innerText = sideCharacterList[8].age;
document.getElementById("team_age10").innerText = sideCharacterList[9].age;
document.getElementById("team_age11").innerText = sideCharacterList[10].age;
document.getElementById("team_age12").innerText = sideCharacterList[11].age;
document.getElementById("team_age13").innerText = sideCharacterList[12].age;
document.getElementById("team_age14").innerText = sideCharacterList[13].age;
document.getElementById("team_age15").innerText = sideCharacterList[14].age;
document.getElementById("team_age16").innerText = sideCharacterList[15].age;
document.getElementById("team_age17").innerText = sideCharacterList[16].age;
document.getElementById("team_age18").innerText = sideCharacterList[17].age;

document.getElementById("team_bio1").innerText = sideCharacterList[0].bio;
document.getElementById("team_bio2").innerText = sideCharacterList[1].bio;
document.getElementById("team_bio3").innerText = sideCharacterList[2].bio;
document.getElementById("team_bio4").innerText = sideCharacterList[3].bio;
document.getElementById("team_bio5").innerText = sideCharacterList[4].bio;
document.getElementById("team_bio6").innerText = sideCharacterList[5].bio;
document.getElementById("team_bio7").innerText = sideCharacterList[6].bio;
document.getElementById("team_bio8").innerText = sideCharacterList[7].bio;
document.getElementById("team_bio9").innerText = sideCharacterList[8].bio;
document.getElementById("team_bio10").innerText = sideCharacterList[9].bio;
document.getElementById("team_bio11").innerText = sideCharacterList[10].bio;
document.getElementById("team_bio12").innerText = sideCharacterList[11].bio;
document.getElementById("team_bio13").innerText = sideCharacterList[12].bio;
document.getElementById("team_bio14").innerText = sideCharacterList[13].bio;
document.getElementById("team_bio15").innerText = sideCharacterList[14].bio;
document.getElementById("team_bio16").innerText = sideCharacterList[15].bio;
document.getElementById("team_bio17").innerText = sideCharacterList[16].bio;
document.getElementById("team_bio18").innerText = sideCharacterList[17].bio;