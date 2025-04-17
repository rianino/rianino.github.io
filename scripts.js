// Placeholder for JavaScript functionality
console.log("Website loaded successfully.");

window.addEventListener('scroll', function() {
    const phonebook = document.getElementById('phonebook');
    const cover = document.getElementById('phonebookCover');
    const content = document.getElementById('phonebookContent');
    if (!phonebook) return;
    const rect = phonebook.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * 0.7) {
        phonebook.classList.add('open');
    } else {
        phonebook.classList.remove('open');
    }
});