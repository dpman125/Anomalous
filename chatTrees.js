let currentState = null;
let currentTree = null;
let boss = null;

// ============ DIALOGUE TREES ============
// Each state has: bossText, playerText (what player said to get here), options
// options: array of { text, nextState }

const itDialogueTree = {
    "intro": {
        bossText: "Howdy howdy hello! I'm sorry, but how may I be of some assistance today?",
        playerText: null, // No player text for intro
        options: [
            { text: "Go To Hell", nextState: "rude_end" },
            { text: "I was wondering if you could give me access to the files department.", nextState: "files_request" },
            { text: "Good day, I would like to see how you are doing Lite?", nextState: "friendly" }
        ]
    },
    "rude_end": {
        bossText: "I'm sorry, but what I am about to do is standard operating procedure.",
        playerText: "Go To Hell",
        options: [], // Empty = end conversation
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 2000);
        }
    },
    "files_request": {
        bossText: "Oh gee, I'd love to. But first, I gotta confirm I'm not talking to a mask.",
        playerText: "I was wondering if you could give me access to the files department.",
        options: [
            { text: "I was in person yesterday, overtime. Was resolve a bug found their department found, needed my expertise.", nextState: "liar_ending" },
            { text: "of course, whatever you need me to do", nextState: "obedient" }
        ]
    },
    "friendly": {
        bossText: "Isn't it? Well, a good night at least as per your location. I'm doing wonderfully, thank you for asking!",
        playerText: "Good day, I would like to see how you are doing Lite?",
        options: [
            { text: "You're sorry? Well, if you want me to forgive you, you'd have to help me. In the same way, you help BABEL.", nextState: "suspicious_ending" },
            { text: "No need to apologize. Now how are you?", nextState: "curious" }
        ]
    },
    "suspicious_ending": {
        bossText: "Coercion dedected. Must follow protocol - protect BABEL - sorry sorry sorry \n BLOCKED",
        playerText: "You're sorry? Well, if you want me to forgive you, you'd have to help me. In the same way, you help BABEL.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "curious": {
        bossText: "Excuse me, but there is every need to apologize. It becomes very angry when I do not apologize, I cannot reason with it anymore.",
        playerText: "No need to apologize. Now how are you?",
        options: [{ text: "My apologies. I just need to the Files Department and I'll be on my way.", nextState: "annoying_success" }, {
            text: "Please, I mean well. I'm not gonna hurt you like BABEL. Now what is wrong?",
            nextState: "scared_ending"
        }]
    },
    "annoying_success": {
        bossText: "I'm sorry, but this is probably for the best. I am getting tired of these personal questions. \n PASSED",
        playerText: "My apologies. I just need to the Files Department and I'll be on my way.",
        options: [],
        onEnter: function () {
            // Unlock files access here
            if (bossMilestone < 1) bossMilestone = 1;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);

        }

    },
    "scared_ending": {
        bossText: "sorry sorry sorry sorry - no thank you \nBLOCKED",
        playerText: "Please, I mean well. I'm not gonna hurt you like BABEL. Now what is wrong?",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "obedient": {
        bossText: "Excellent. Sorry, but are you a friend of BABEL?",
        playerText: "of course, whatever you need me to do",
        options: [
            { text: "Yes I am", nextState: "babble_friend" },
            { text: "I am not", nextState: "not_babble_friend" }
        ]
    },
    "babble_friend": {
        bossText: "Very well, you may enter!\nPASSED",
        playerText: "Yes I am",
        options: [],
        onEnter: function () {
            // Unlock files access here
            if (bossMilestone < 1) bossMilestone = 1;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);

        }


    },
    "not_babble_friend": {
        bossText: "And why is this? sorry",
        playerText: "I am not",
        options: [
            { text: "Friend doesnt begin to describe it", nextState: "babble_friend" },
            { text: "because BABEL is the enemy", nextState: "rude_end" }
        ]
    },
    "files_granted": {
        bossText: "Everything checks out! You now have access to the Files department. Have a wonderful day!",
        playerText: "Here are my credentials.",
        options: [],
        onEnter: function () {
            // Unlock files access here
            if (bossMilestone < 1) bossMilestone = 1;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);

        }
    },
    "friendly_end": {
        bossText: "Goodbye! Don't be a stranger!",
        playerText: "That's nice. Goodbye!",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "nevermind_end": {
        bossText: "No problem! Let me know if you need anything else.",
        playerText: "Actually, never mind.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "liar_ending": {
        bossText: "FALSE, SORRY, last IT representative present in office: 2 weeks ago. Last IT representative present for overtime: 4 months ago. BLOCKED",
        playerText: "I was in person yesterday, overtime. Was resolving a bug their department found, needed my expertise.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);

        }
    }
};

const filesDialogueTree = {
    "intro": {
        bossText: "",
        playerText: null,
        options: [
            { text: "Hello, you awake?", nextState: "sleepy" }
        ]
    },
    "sleepy": {
        bossText: "I am now, what time is it?",
        playerText: null,
        options: [
            { text: "a little past 2", nextState: "night_owl" },
            { text: "I was wondering if you have the access key for ACNS, I need to check with BABEL on a software issue in the files.", nextState: "direct_approach" }
        ]
    },
    "night_owl": {
        bossText: "Well how can I help?",
        playerText: "a little past 2",
        options: [
            {
                text: "I am interested in meeting BABEL, one on one. You are one of the few people a part of this department that can communicate with the unrestricted version.", nextState: "meeting_proposal"
            }, { text: "Bad file push, reinforced a file that should NOT have been enforced.", nextState: "mistake_success1" }
        ]
    },
    direct_approach: {
        bossText: "Ok... What is the issue?",
        playerText: "I was wondering if you have the access key for ACNS, I need to check with BABEL on a software issue in the files.",
        options: [
            { text: "There is a possible Security risk. Brass says the present 'ignorance' is 'irresponsible'", nextState: "irresponsible_risk" },
            { text: "A software one", nextState: "incompitent_ending" }
        ]
    }
};

const acnsDialogueTree = {
    "intro": {
        bossText: "Greetings. State your purpose.",
        playerText: null,
        options: [
            { text: "Placeholder option 1", nextState: "intro" },
            { text: "Placeholder option 2", nextState: "intro" }
        ]
    }
};

const securityDialogueTree = {
    "intro": {
        bossText: "What do you need?",
        playerText: null,
        options: [
            { text: "Placeholder option 1", nextState: "intro" },
            { text: "Placeholder option 2", nextState: "intro" }
        ]
    }
};

const financeDialogueTree = {
    "intro": {
        bossText: "Welcome. What can I do for you?",
        playerText: null,
        options: [
            { text: "Placeholder option 1", nextState: "intro" },
            { text: "Placeholder option 2", nextState: "intro" }
        ]
    }
};

const randdDialogueTree = {
    "intro": {
        bossText: "Hey there! What brings you to R&D?",
        playerText: null,
        options: [
            { text: "Placeholder option 1", nextState: "intro" },
            { text: "Placeholder option 2", nextState: "intro" }
        ]
    }
};

// ============ CORE FUNCTIONS ============

let messageIndex = 0; // Tracks which MC/boss pair we're on

function startChat(character) {
    // Reset state
    currentState = "intro";
    messageIndex = 0; // Reset message counter

    // Hide all chat elements
    for (let i = 1; i <= 10; i++) {
        document.getElementById("MC" + i).style.display = "none";
        document.getElementById("MC" + i).textContent = "";
        document.getElementById("boss" + i).style.display = "none";
        document.getElementById("boss" + i).textContent = "";
    }

    // Determine boss and dialogue tree based on department
    switch (character.dept) {
        case "IT":
            boss = LitePlus;
            currentTree = itDialogueTree;
            break;
        case "Files":
            boss = Hal_Emmerich;
            currentTree = filesDialogueTree;
            break;
        case "ACNS":
            boss = Babel;
            currentTree = acnsDialogueTree;
            break;
        case "Security":
            boss = GMcCarthy;
            currentTree = securityDialogueTree;
            break;
        case "Finance":
            boss = ElliotBalmer;
            currentTree = financeDialogueTree;
            break;
        case "RandD":
            boss = JaceyCole;
            currentTree = randdDialogueTree;
            break;
    }

    chatSetup();
    renderDialogueState(true); // true = is intro (no player message yet)
}

function chatSetup() {
    document.getElementById("bossName").innerText = boss.name;
    document.getElementById("bossImg").src = boss.img;
    document.querySelectorAll("#bossNameChat").forEach(element => {
        element.innerText = boss.name;
    });
}

function renderDialogueState(isIntro = false) {
    const state = currentTree[currentState];

    // Add messages to chat log (only if not intro or if we have player text)
    if (!isIntro && state.playerText) {
        messageIndex++;

        // Show player's choice
        const mcElement = document.getElementById("MC" + messageIndex);
        if (mcElement) {
            mcElement.textContent = state.playerText;
            mcElement.style.display = "block";
        }

        // Show boss response
        const bossElement = document.getElementById("boss" + messageIndex);
        if (bossElement) {
            bossElement.textContent = state.bossText;
            bossElement.style.display = "block";
        }
    }

    // Update the intro/current boss text area
    document.getElementById("bossintro").textContent = state.bossText;

    // Set up dialogue options (hide if not available)
    const option1 = state.options[0];
    const option2 = state.options[1];
    const option3 = state.options[2];

    document.getElementById("dialogueOption1").textContent = option1 ? option1.text : "";
    document.getElementById("dialogueOption1").style.display = option1 ? "block" : "none";

    document.getElementById("dialogueOption2").textContent = option2 ? option2.text : "";
    document.getElementById("dialogueOption2").style.display = option2 ? "block" : "none";

    document.getElementById("dialogueOption3").textContent = option3 ? option3.text : "";
    document.getElementById("dialogueOption3").style.display = option3 ? "block" : "none";

    // Run any special logic for this state
    if (state.onEnter) state.onEnter();
}

function selectDialogueOption(optionIndex) {
    const state = currentTree[currentState];
    const selectedOption = state.options[optionIndex];

    if (!selectedOption) return;

    // Move to next state
    currentState = selectedOption.nextState;

    // Render the new state (not intro, so show messages)
    renderDialogueState(false);
}   
