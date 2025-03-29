
const db = require("../config/dbconfig");
const path = require("path");
const fs = require("fs");
const upload = require("../utils/multerConfig");

const Brand = {
  DeleteBrand: (id) => {
    return new Promise((resolve, reject) => {
      const query = "select brand_image, brand_logo from brands where id=?";
      db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length === 0) {
          reject(new Error("Brand not found"));
        }
        const brandData = result[0];
        const brandImage = brandData.brand_image;
        const brandLogo = brandData.brand_logo;

        const brandImagePath = path.join(__dirname, `../../uploads/brands/brandimage/${brandImage}`);
        const brandLogoPath = path.join(__dirname, `../../uploads/brands/brandlogo/${brandLogo}`);
        console.log(`Brand Image Path: ${brandImagePath}`);
        console.log(`Brand Logo Path: ${brandLogoPath}`);

        const deleteFile = (filepath) => {
          if (fs.existsSync(filepath)) {
            fs.unlink(filepath, (err) => {
              if (err) {
                console.error(`Error deleting file: ${err}`);
              } else {
                console.log(`File deleted: ${filepath}`);
              }
            });
          } else {
            console.log(`File does not exist: ${filepath}`);
          }
        };

        if (brandImage) {
          deleteFile(brandImagePath);
        }

        if (brandLogo) {
          deleteFile(brandLogoPath);
        }

        // Delete the brand from the database
        const deleteQuery = "delete from brands where id=?";
        db.query(deleteQuery, [id], (err) => {
          if (err) {
            return reject(err);
          }
          resolve("Brand deleted successfully");
        });
      });
    });
  }
};

module.exports = Brand;
