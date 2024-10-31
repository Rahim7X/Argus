# Argus 

![Logo](public/img/logo.jpg)

## Description

A brief description of your project goes here. Explain what the project does, its purpose, and any relevant details.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

Follow these steps to install the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/rahim7x/yourproject.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Argus
   ```
3. Install the required dependencies:
   ```bash
   npm install -g netlify-cli
   ```
4. Create a firebase project and then create a new realtime databse
5. Create a Firebase Service Account Key:
>In your Firebase project's settings, go to the "Service Accounts" tab.
Create a new service account and grant it the necessary permissions to access your Realtime Database.
Download the service account key as a JSON file.
6. Open `Argus/netlify/functions/config.js` in a text editor and add the copied json in authData field 
7. Also add your database url in targetUrl field
8. Change the credentials (username and password) in  `Argus/netlify/functions/config.js`  
8. Then run `netlify login` to log into your account 
9. Deploy the project by running `netlify deploy --prod`
## Usage

Provide examples of how to use your project. Include code snippets or screenshots if necessary.

