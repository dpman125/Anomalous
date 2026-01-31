

document.addEventListener('keydown', function (event) {
    // Code to execute when a key is pressed down

    if (event.key === 'Enter') {

        input = document.getElementById('commandinput').value;
        document.getElementById('commandinput').value = '';
        handleCommand(input);
    }

    console.log('Key pressed:', event.key);
});

function handleCommand(input) {
    const command = input.trim().toLowerCase();

    switch (command) {
        case 'help':
            document.getElementById('dialog').textContent = ('Available commands: help, hello, quit, status, version');
            break;
        case 'hello':
            document.getElementById('dialog').textContent = ('Hello, User! How can I assist you today?');
            break;
        case 'quit':
            document.getElementById('dialog').textContent = ('Goodbye!');
            rl.close();
            process.exit(0);
            break;
        case 'status':
            document.getElementById('dialog').textContent = ('System is running normally.');
            break;
        case 'version':
            document.getElementById('dialog').textContent = ('Version 1.0.0');
            break;
        case 'upupdowndownleftrightabstart':
            document.getElementById('dialog').textContent = ("You think you're smart, don't you?");
            break;
        case '67':
            document.getElementById('dialog').textContent = ('...');
            break;
        case 'bitcoin':
            document.getElementById('dialog').textContent = ('Why the hell did you forget that password? We could be billionares right now');
            break;
        case 'developers':
            document.getElementById('dialog').textContent = ("Okay! So what is the $64,00 quEstion? Holy cow I've just got to tough it up now, here we go. What's the $64,000 question for the field? What is the most asked question that I've recieved this week? What the HELL are we supposed to do about .NET Steve? It's a very good question, and it's got a veeeEEeeery very clear answer. Developers. The key to .NET, the key to industry transformation, the keEEeeey to success is: developers. Developers! Developers! Developers! Developers! Developers! Developers! Developers! Developers! Developers! DevElopers! DevElopers! DevElopers! DevElopers! ...YES!");
            break;
        case 'aaaaaaa':
            document.getElementById('dialog').textContent = ("Screaming won't help you, you know");
            break;
        case 'begin':
            document.getElementById('dialog').textContent = ('Are you ready to begin?');
            break;
        case '':
            // Do nothing for empty input
            break;
        default:
            document.getElementById('dialog').textContent = (`Unknown command: "${input}". Type "help" for available commands.`);
    }
}


console.log('Command Handler Ready. Type "help" for available commands.');