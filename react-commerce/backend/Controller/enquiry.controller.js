const sheets = require('../service/gSheet');

const enquiryController = async (req, res) => {
    try {
        const { name, email, password, message } = req.body;

        if (!name || !email || !password || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // GOOGLE SHEET ENTRY
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID, 
            range: 'Enquiry!A:D', 
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[name, email, password, message]], 
            },
        });

        if (response.status === 200) {
            // RESPONSE SEND
            res.status(201).json({ success: true, message: 'Data added to Google Sheets' });
        } else {
            res.status(500).json({ success: false, message: 'Error adding data to Google Sheets' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

module.exports = enquiryController;
