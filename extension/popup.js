document.getElementById('sendUrlButton').addEventListener('click', function() {
    browser.runtime.sendMessage({action: "sendUrl"});
});

