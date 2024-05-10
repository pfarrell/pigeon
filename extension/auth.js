document.getElementById('authenticate').addEventListener('click', function() {
  const clientId = 'YOUR_CLIENT_ID';
  const redirectUri = encodeURIComponent('https://<your-extension-id>.extensions.allizom.org/');
  const scope = encodeURIComponent('email');
  const responseType = 'token';
  const authUrl = `https://<oauth-provider-url>/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  browser.identity.launchWebAuthFlow({
    url: authUrl,
    interactive: true
  }).then(function(redirectUrl) {
    const params = new URLSearchParams(new URL(redirectUrl).hash.substring(1));
    const token = params.get('access_token');
    console.log('OAuth token:', token);
    // Optionally save the token using browser.storage.local.set
  }).catch(console.error);
});

