const CmsPage = require("../Models/CmsPage");
const sheets  = require('../service/gSheet'); // Adjust the path as necessary
const { faker } = require('@faker-js/faker');
const messageing=require("../firebase/firebaseAdmin")
exports.getAllPages = async (req, res) => {
  const page=parseInt(req.query.page);
  const limit=parseInt(req.query.limit);
  // console.log(page)
  // console.log(limit)
  try {
    const data = await CmsPage.getAll(limit,page);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePageStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    await CmsPage.updateStatus(id, status);
    // console.log(id + " "+status)
    res.status(200).json({ message: "Status updated successfully!" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deletePage = async (req, res) => {
  const id = req.params.id;
  try {
    await CmsPage.delete(id);
    res.status(200).json({ message: "Deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePage = async (req, res) => {
  const id = req.params.id;
  const {  title,  url,  description,  meta_title,  meta_keywords,  meta_description,} = req.body;
  const updatedPage = {  title,  url,  description,  meta_title,  meta_keywords,  meta_description,};

  try {
    await CmsPage.update(id, updatedPage);
    res.status(200).json({ message: "Update successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// async function generateAndAddPages() {
//   for (let i = 0; i < 1000; i++) {
//     const page = {
//       title: faker.lorem.sentence(),
//       url: faker.internet.url(),
//       description: faker.lorem.paragraph(),
//       meta_title: faker.lorem.sentence(),
//       meta_keywords: faker.lorem.words(5),
//       meta_description: faker.lorem.sentence(),
//     };
//     await CmsPage.add(page);
//     await logPageToGoogleSheets(page);

//   }
// }

// generateAndAddPages().then(() => {
//   console.log("Added 1000 fake CMS pages to the database");
// }).catch((error) => {
//   console.error("Error generating and adding pages:", error);
// });
exports.addPage = async (req, res) => {
  const { title, url, description, meta_title, meta_keywords, meta_description } = req.body;
  
  const newPage = {
    title,
    url,
    description,
    meta_title,
    meta_keywords,
    meta_description,
  };

  try {
    // Save the new page to the database
    const result = await CmsPage.add(newPage);
    // console.log("DB insertion result:", result);

    // for notification
    const message={
      notification:{
        title: "New CMS Page Added",
        body: `Page: ${title} has been added.`,
      },
      topic: "cms-updates",
    }
    await messageing.send(message)
    console.log("Push notification sent");

    // Log the new page to Google Sheets
    await logPageToGoogleSheets(newPage);

    res.status(200).json({ message: "Insertion successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to log the CMS page data to Google Sheets
async function logPageToGoogleSheets(pageData) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Cms!A:F', 
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          pageData.title,
          pageData.url,
          pageData.description,
          pageData.meta_title,
          pageData.meta_keywords,
          pageData.meta_description,
        ]],
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to log page data to Google Sheets');
    }
  } catch (error) {
    console.error('Error logging page data:', error);
    throw new Error('Logging page data failed');
  }
}

exports.getPageById = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  try {
    const result = await CmsPage.getById(id);
    if(result){
    res.status(200).json({message:"found successfully!", data: result });
    }else{
      res.status(200).json({message:"not found successfully!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.searchCMSData = async (req, res) => {
  const searchTerm = req.params.searchTerm;
  try {
    const result = await CmsPage.searchTerm(searchTerm);
    res.status(200).json({ message: " successfully get" ,result});
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.addPage = async (req, res) => {
//   const {  title,  url,  description,  meta_title,  meta_keywords,  meta_description,} = req.body;
//   // console.log(req.body)
//   const newPage = {  title,  url,  description,  meta_title,  meta_keywords,  meta_description,};

//   try {
//     const result = await CmsPage.add(newPage);
//     // console.log("DB insertion result:", result);
//     res.status(200).json({ message: "Insertion successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };