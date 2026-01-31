

document.addEventListener('keydown', function (event) {
    // Code to execute when a key is pressed down

    if (event.key === 'Enter') {
        window.location.href = 'new_page.html';
    }

    console.log('Key pressed:', event.key);
});
