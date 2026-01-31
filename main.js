

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
        case '':
            // Do nothing for empty input
            break;
        default:
            console.log(`Unknown command: "${input}". Type "help" for available commands.`);
    }
}


console.log('Command Handler Ready. Type "help" for available commands.');