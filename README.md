# Instructions
Public Sheet link:
https://docs.google.com/spreadsheets/d/1k2WL8lhCH_M2gDaDdE1OGw2c4lZj5n6VoevNr3wG4Wo

## Getting access to the Google API
1. Create a project at https://console.cloud.google.com/
1. Create a Service Account following these instructions:
https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
1. Download the credentials to the service account and name it 'Credentials.json'
1. Add Credentials.json to the root directory of the repository

## NPM Setup
Run the following commands

```
$npm init
$npm install google-spreadsheet
```

## Running the program
Run the program with:
```
$node index.js
```