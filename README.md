# Argus 

<p align="center">
  <img src="public/img/logo.jpg" alt="Logo" width="200"/>
</p>

## Description

Arus is an interactive Blind XSS and SSRF testing suite that you can setup for free using firebase and netlify

## Features

- HTTP request logs
- Blind XSS : Fetch loaded dom
- Blind XSS : Screenshot the vulnerable page

## Installation

Follow these steps to install the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/rahim7x/Argus.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Argus
   ```
3. Install the required dependencies:
   ```bash
   npm install && npm install -g netlify-cli
   ```
4. Create a firebase project and then create a new realtime databse
5. Create a Firebase Service Account Key:
>In your Firebase project's settings, go to the "Service Accounts" tab.
Create a new service account and grant it the necessary permissions to access your Realtime Database.
Download the service account key as a JSON file.
6. Open `Argus/netlify/functions/config.js` in a text editor and add the copied json in authData field 
7. Also add your database url in targetUrl field
8. Change the credentials (username and password) in  `Argus/netlify/functions/config.js`  
8. Then run `netlify login` to log into your account , to test it locally run `netlify dev`
9. Deploy the project by running `netlify deploy --prod`
## Usage

Provide examples of how to use your project. Include code snippets or screenshots if necessary.

