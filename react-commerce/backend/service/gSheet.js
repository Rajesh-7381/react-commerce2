const { google } = require('googleapis');

const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
const sheetClient = new google.auth.JWT( process.env.GOOGLE_SHEET_CLIENT_EMAIL, null, process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n'), scopes);

const sheets = google.sheets({ version: 'v4', auth: sheetClient });

// Ensure the authentication is handled
sheetClient.authorize(function (err, tokens) {
    if (err) {
        console.log("Error authorizing Sheets API", err);
        return;
    } else {
        console.log("Connected to Google Sheets API");
    }
});

module.exports = sheets;
