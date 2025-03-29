const { db }= require("../config/dbconfig");
const upload = require("../utils/multerConfig");
const Category=require("../Models/Category");
const { cloudinary }=require("../helper/cloudinaryConfig");
const sheets = require("../service/gSheet");

// Get all categories
exports.getAll = async (req, res) => {
    try {
        const data=await Category.getAll();
        // console.log(data)
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// exports.getAll=async(req,res)=>{
//     try {
//         const flatData=await Category.getAll();
//         const buildTree=()
//     } catch (error) {
        
//     }
// }

// Add category
exports.create = async (req, res) => {
       
        const {AdminUser_id,  parent_id,category_name, category_discount, description, url, meta_title, meta_description, meta_keywords } = req.body;
        // console.log(req.body)
        const category_image = req.file ? await cloudinary.uploader.upload(req.file.path,{folder:'Category'}) : null;
        // console.log(category_image)
        const newCategory={AdminUser_id,parent_id,category_name, category_image,category_discount,description,url,meta_title,meta_description,meta_keywords};
        try {
            await Category.add(newCategory);
            // console.log(1)
            await logPageToGoogleSheets(newCategory)
            res.json({message:"new category added successfully!"})
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    
};

async function logPageToGoogleSheets(newCategory) {
    try {
        const response=await sheets.spreadsheets.values.append({
            spreadsheetId:process.env.GOOGLE_SHEET_ID,
            range:'Categorys!A:I',
            insertDataOption:'INSERT_ROWS',
            valueInputOption:'RAW',
            requestBody:{
                values:[[newCategory.parent_id,newCategory.category_name,newCategory.category_discount,newCategory.description,newCategory.url,newCategory.meta_title,newCategory.meta_description,newCategory.meta_keywords,newCategory.AdminUser_id]]
            }
        })
        if(response.status !==200){
            throw new Error('Failed to log page data to google sheets')
          }
    } catch (error) {
        console.error('Error logging page data',error)
        throw new Error('Logging page data failed')
    }
}

// Get single category data
exports.categoryEditData = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const result=await Category.getById(id);
        console.log(result)
        if(result.length === 0){
            return res.status(404).json({ message: "Oops! Data not found" });
        }
        const data={...result, category_image: `http://localhost:8081/uploads/categories/${result.category_image}`}
        res.status(200).json({ message: `Data fetched Successfully! at id-> ${data.id}`, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
};



// Update category
exports.updateCategory = async (req, res) => {
        const id  = req.params.id;
        console.log(id)
        const category_image = req.file ? req.file.filename : null;
        // console.log(category_image)
        const { category_name, parent_id, category_discount, description, url, meta_title, meta_description, meta_keyword } = req.body;
        const updatedCategory={category_name, parent_id,category_image, category_discount, description, url, meta_title, meta_description, meta_keyword};
        try {
            await Category.update(id,updatedCategory);
            res.status(200).json({ message: "Update successful!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }  
};

// update status category
exports.updateCategoryStatus = async (req, res) => {
    const id = req.params.id;
    const {status}=req.body;
    try {
        await Category.updateStatus(id,status);

        const io=req.app.get("io");
        io.emit("notification",{
            message: `request recived for status change`,
        })
        res.status(200).json({ message: "Status updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// delete category
exports.categoryDelete = async (req, res) => {
    const id = req.params.id;
    
    try {
        await Category.delete(id);
        res.status(200).json({ message: "Data deleted successfully!" });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Internal server error" });
    }
};

// Count distinct categories
exports.uniqueCategories = async (req, res) => {
    try {
        const catcount=await Category.countDistinct();
        res.json({catcount:catcount});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all categories IDs
exports.categories2 = async (req, res) => {
    // console.log(1)
    try {
        const data=await Category.getAllIdWithNames();
        // console.log(data)
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get parent category by parentId
exports.parentCategory = async (req, res) => {
    const parentId = req.params.parentId;
    try {
        const data=await Category.getParentCategory(parentId);
        // console.log(data)
        if(!data){
            return res.status(404).json({ message: "Parent category not found" });
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
