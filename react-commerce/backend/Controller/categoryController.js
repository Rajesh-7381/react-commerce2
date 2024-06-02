const db = require("../config/dbconfig");
const upload = require("../utils/multerConfig");
const Category=require("../Models/Category");

// Get all categories
exports.categories = async (req, res) => {
    try {
        const data=await Category.getAll();
        res.json(data);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add category
exports.addCategory = async (req, res) => {
    upload.single("category_image")(req, res, async(err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error uploading file" });
        }

        const { category_name, parent_id, category_discount, description, url, meta_title, meta_description, meta_keyword } = req.body;
        const category_image = req.file.filename;
        const newCategory={category_name,parent_id,category_image,category_discount,description,url,meta_title,meta_description,meta_keyword};
        try {
            await Category.add(newCategory);
        } catch (error) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    });
};

// Get single category data
exports.categoryEditData = async (req, res) => {
    const id = req.params.id;
    try {
        const result=await Category.getById(id);
        if(result.length === 0){
            return res.status(404).json({ message: "Data not found!" });
        }
        const data={...result[0], category_image: `http://localhost:8081/uploads/categories/${result[0].category_image}`}
        res.status(200).json({ message: "Data fetched!", data });
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};



// Update category
exports.updateCategory = async (req, res) => {
    upload.single("category_image")(req, res, async(err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error uploading file" });
        }

        const id = req.params.id;
        const category_image = req.file.filename;
        const { category_name, parent_id, category_discount, description, url, meta_title, meta_description, meta_keyword } = req.body;
        const updatedCategory={category_name, parent_id,category_image, category_discount, description, url, meta_title, meta_description, meta_keyword};
        try {
            await Category.update(id,updatedCategory);
            res.status(200).json({ message: "Update successful!" });
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};

// update status category
exports.updateCategoryStatus = async (req, res) => {
    const id = req.params.id;
    const {status}=req.body;
    try {
        await Category.updateStatus(id,status);
        res.status(200).json({ message: "Status updated successfully!" });
    } catch (error) {
        console.error(err);
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
        console.error(err);
    res.status(500).json({ message: "Internal server error" });
    }
};

// Count distinct categories
exports.uniqueCategories = async (req, res) => {
    try {
        const catcount=await Category.countDistinct();
        res.json({catcount});
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all categories IDs
exports.categories2 = async (req, res) => {
    try {
        const data=await Category.getAllIds();
        res.json(data);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get parent category by parentId
exports.parentCategory = async (req, res) => {
    const parentId = req.params.parentId;
    try {
        const data=await Category.getParentCategory(parentId);
        if(!data){
            return res.status(404).json({ message: "Parent category not found" });
        }
        res.json(data);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
