// hubspot-integration.js

function getCsrfToken() {
    let csrfToken = null;
    document.cookie.split(';').forEach(cookie => {
        if (cookie.trim().startsWith('csrf.app=')) {
            csrfToken = cookie.trim().substring('csrf.app='.length);
        }
    });
    return csrfToken;
}

function makeRequest() {
    const csrfToken = getCsrfToken();
    
    if (!csrfToken) {
        console.error("No CSRF Cookie found.");
        return;
    }

    fetch("https://api.hubspot.com/viral-links/v1/tracking?viralLinkType=livechat&deviceId=a9509623-dbd5-4978-90f4-d9536096afd7&hubId=144730300", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-CSRF-Token': csrfToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log("Data received:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

makeRequest();
