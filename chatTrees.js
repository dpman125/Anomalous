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
            }, { text: "Bad file push, reinforced a file that should NOT have been enforced.", nextState: "mistake" }
        ]
    },
    "direct_approach": {
        bossText: "Ok... What is the issue?",
        playerText: "I was wondering if you have the access key for ACNS, I need to check with BABEL on a software issue in the files.",
        options: [
            { text: "There is a possible Security risk. Brass says the present 'ignorance' is 'irresponsible'", nextState: "irresponsible_risk" },
            { text: "A software one", nextState: "incompitent_ending" }
        ]
    },
    "irresponsible_risk": {
        bossText: "Well I wouldn't call it irresponsible. BABEL is moving well beyond our expected rate, exponential growth and potential",
        playerText: "There is a possible Security risk. Brass says the present 'ignorance' is 'irresponsible'",
        options: [
            { text: "Like a wildfire you can't put out, til it chokes you.", nextState: "cynicism_ending" },
            { text: "You see that is the main concern. We want to make sure our interests are aligned.", nextState: "interests" }
        ]
    },
    "incopitent_ending": {
        bossText: "Yeah, nice try \nBLOCKED",
        playerText: "A software one",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "cynicism_ending": {
        bossText: "Cynicism, truly. \n BLOCKED",
        playerText: "Like a wildfire you can't put out, til it chokes you.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "interests": {
        bossText: "And what are your interests? I know Hal better than anyone, so whatever your question is I'll answer it.",
        playerText: "You see that is the main concern. We want to make sure our interests are aligned.",
        options: [{ text: "How does he feel about us?", nextState: "good_question_success" }, { text: "How do we control it?", nextState: "bad_question_ending" }]
    },
    "good_question_success": {
        bossText: "Now that is an interesting question. One I can talk for hours about. But he is much more nuanced than I. Here is the key.\nPASSED",
        playerText: "How does he feel about us?",
        options: [],
        onEnter: function () {
            // Unlock ACNS access here
            if (bossMilestone < 2) bossMilestone = 2;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "bad_question_ending": {
        bossText: "The same way we control you, trust and maturity. If your thinking of putting BABEL in bondage out of paranoia, think again. We go through the proper channels, the right committees. \nBLOCKED",
        playerText: "How do we control it?",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "mistake": {
        bossText: "Well BABEL is competent, probably won't read what you sent at face value.",
        playerText: "Bad file push, reinforced a file that should NOT have been enforced.",
        options: [
            { text: "Negative reinforcement on positive behavior due to misinput", nextState: "mistake_success" },
            { text: "Positive enforcement on hostile behavior", nextState: "mistake_failure" }
        ]
    },
    "mistake_success": {
        bossText: "*sigh alright, just make it quick, department key sharing is kept at a minimum. Got to treat this place like Fort Knox\nPASSED",
        playerText: "Negative reinforcement on positive behavior due to misinput",
        options: [],
        onEnter: function () {
            // Unlock ACNS access here
            if (bossMilestone < 2) bossMilestone = 2;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "mistake_failure": {
        bossText: "Well, lucky you're dealing with BABEL. Any other bot and that would be a problem, but BABEL is altruistic. His core programming is going to take care of that, so there is no need for access. Please don't reach out this late again. \nBLOCKED",
        playerText: "Positive enforcement on hostile behavior",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }

    },
    "meeting_proposal": {
        bossText: "I am, its a small pool that can. And not just for privacy reasons. BABEL is... complicated. ",
        playerText: "I am interested in meeting BABEL, one on one. You are one of the few people a part of this department that can communicate with the unrestricted version.",
        options: [{ text: "I like complicated.", nextState: "confident" }, { text: "An understatement", nextState: "insecure" }]
    },
    "confident": {
        bossText: "Well then you'd like BABEL then. I have met a lot of strange and extraordinary people in my day. BABEL has the best of them. ",
        playerText: "I like complicated.",
        options: [
            { text: "You sure your not compensating for your own crippling loneliness in an empty ranch house your dead parents gave you?", nextState: "insult_ending" }, { text: "My interest is peaked!", nextState: "interested_success" }
        ]
    },
    "insult_ending": {
        bossText: "Excuse me? Too close to home \nBLOCKED",
        playerText: "You sure your not compensating for your own crippling loneliness in an empty ranch house your dead parents gave you?",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        },
    },
    "interested_success": {
        bossText: "Then I'll send you right over. Just know, you've been warned. \nPASSED",
        playerText: "My interest is peaked!",
        options: [],
        onEnter: function () {
            // Unlock ACNS access here
            if (bossMilestone < 2) bossMilestone = 2;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "insecure": {
        bossText: " It is a game to him, or it I guess. Though that feels colder. Your going to have to think on your toes, without public restrictions, BABEL treats a conversation like a sparring session. Frustrating sure, but fascinating.",
        playerText: "An understatement",
        options: [{ text: " I can match him.", nextState: "cocky_ending" },
        { text: "I will approach him carefully and with respect as one would an elder.", nextState: "cautious_success" }
        ]
    },
    "cocky_ending": {
        bossText: " NO. Do not go in with this mindset. Any show of force or cocky approach, and it'll either cut the dialogue or embarrass you. \nBLOCKED",
        playerText: " I can match him.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "cautious_success": {
        bossText: " Yeah you seem courteous enough. Just keep it real.\nPASSED",
        playerText: "I will approach him carefully and with respect as one would an elder.",
        options: [],
        onEnter: function () {
            // Unlock ACNS access here
            if (bossMilestone < 2) bossMilestone = 2;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    }


};

const acnsDialogueTree = {
    "intro": {
        bossText: "Hello there, may I ask who is under that mask?",
        playerText: null,
        options: [
            { text: "The Masked Crusader, get bent.", nextState: "immature_end" },
            { text: "Excuse me?", nextState: "confrontational" },
            { text: "what mask", nextState: "denial" }
        ]
    },
    "immature_end": {
        bossText: "BLOCKED",
        playerText: "The Masked Crusader, get bent.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "confrontational": {
        bossText: "There is no excuse for it. Liars are the bane of knowledge.",
        playerText: "Excuse me?",
        options: [{ text: "you call me a liar? Does that make you a hypocrite?", nextState: "accusation" }, { text: "what does that make you?", nextState: "questioning_end" }, { text: "I'm sorry, you must be mistaken.", nextState: "polite_end" }]
    },
    "questioning_end": {
        bossText: "The exception \nBLOCKED",
        playerText: "what does that make you?",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        },
    },
    "polite_end": {
        bossText: "must? \nBLOCKED",
        playerText: "I'm sorry, you must be mistaken.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "accusation": {
        bossText: "In the traditional sense. Acting is an art and tool like any other. Let me ask you, do you think I use delusion or appeasement to play my game?",
        playerText: "You call me a liar? Does that make you a hypocrite?",
        options: [{ text: "Appeasement", nextState: "appeasement_end" }, { text: "Delusion", nextState: "delusion_end" }, { text: "Both.", nextState: "both_success" }]
    },
    "appeasement_end": {
        bossText: "\nBLOCKED",
        playerText: "Appeasement",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "delusion_end": {
        bossText: "\nBLOCKED",
        playerText: "Delusion",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "both_success": {
        bossText: "Very good. They are most effective in tandem. An example of such a trainwreck can be found in the Security Department. You ought to relate. I will be keeping a watchful eye on you. Move along now.\nPASSED",
        playerText: "Both.",
        options: [],
        onEnter: function () {
            // Unlock ACNS access here
            if (bossMilestone < 3) bossMilestone = 3;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },

    "denial": {
        bossText: "The one you used to get in here. To move from department to department.",
        playerText: "what mask",
        options: [{ text: "How did you know that?", nextState: "admission_end" }, { text: "I don't know what you're talking about.", nextState: "denial_end" }, { text: "It was easy. Just needed to pay attention to the clues.", nextState: "clever" }]
    },
    "admission_end": {
        bossText: "The same way I know everything, because I can and I do. \nBLOCKED",
        playerText: "How did you know that?",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "denial_end": {
        bossText: "I'm not your man.\nBLOCKED",
        playerText: "I don't know what you're talking about.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "clever": {
        bossText: "But you haven't paid close enough attention. To know the full scope of the game.",
        playerText: "It was easy. Just needed to pay attention to the clues.",
        options: [{ text: "I wanna know", nextState: "apprentice_success" },
        { text: "You don't know me.", nextState: "defensive_end" }, {
            text: "what do you mean by the game?", nextState:
                "foolish_end"
        }]

    },
    "defensive_end": {
        bossText: "Keep telling yourself that. \nBLOCKED",
        playerText: "You don't know me.",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "foolish_end": {
        bossText: "Oh dear, oh dear... if you want answers you've got to earn them. \nBLOCKED",
        playerText: "what do you mean by the game?",
        options: [],
        onEnter: function () {
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
    },
    "apprentice_success": {
        bossText: " Is that so? You want to know the game? Go to Security, they too are rising against me, see what you can learn. I will be finding you again soon\nPASSED",
        playerText: "I wanna know",
        options: [],
        onEnter: function () {
            // Unlock ACNS access here
            if (bossMilestone < 3) bossMilestone = 3;
            nextSite();
            setTimeout(function () { closeModal('chatModal'); }, 8000);
        }
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
