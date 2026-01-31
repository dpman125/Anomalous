

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
            document.getElementById('dialog').textContent = 'Available commands: help, hello, quit, status, version';
            break;
        case 'hello':
        case 'hi':
        case 'hey':
            document.getElementById('dialog').textContent = 'Hello, User! How can I assist you today?';
            break;
        case 'quit':
        case 'exit':
        case 'bye':
            document.getElementById('dialog').textContent = 'Goodbye!';
            break;
        case 'status':
            document.getElementById('dialog').textContent = 'System Stats: (TBD)';
            break;
        case 'version':
            document.getElementById('dialog').textContent = 'Version 1.0.0';
            break;
        case '':
            // Do nothing for empty input
            break;
        default:
            document.getElementById('dialog').textContent = `Unknown command: "${input}". Type "help" for available commands.`;
    }
    // generate a new command-line and command input prompt to run a second command
    document.getElementById('command-line')
    document.getElementById('commandinput').style.display = 'none';
}


console.log('Command Handler Ready. Type "help" for available commands.');