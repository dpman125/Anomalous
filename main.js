

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
            console.log('Available commands: help, hello, quit, exit, status, version');
            break;
        case 'hello':
        case 'hi':
        case 'hey':
            document.getElementById('dialog').textContent = 'Hello, User! How can I assist you today?';
            break;
        case 'quit':
        case 'exit':
        case 'bye':
            console.log('Goodbye!');
            rl.close();
            process.exit(0);
            break;
        case 'status':
            console.log('System is running normally.');
            break;
        case 'version':
            console.log('Version 1.0.0');
            break;
        case '':
            // Do nothing for empty input
            break;
        default:
            console.log(`Unknown command: "${input}". Type "help" for available commands.`);
    }
}


console.log('Command Handler Ready. Type "help" for available commands.');