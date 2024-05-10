function sendCurrentUrl() {
    // Get the active tab
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
        // Extract the URL of the active tab
        let url = tabs[0].url;

        // Send the URL to your server endpoint
        fetch(`http://patf.com/pigeon/receive_url?url=${encodeURIComponent(url)}`)
            .then(response => response.json())
            .then(data => console.log('URL sent successfully', data))
            .catch(error => console.error('Error sending URL', error));
    });
}

// Listen for a message from the popup (if using a popup to trigger the action)
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendUrl') {
        sendCurrentUrl();
    }
});

