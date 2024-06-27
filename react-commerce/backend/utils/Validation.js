const Joi=require("joi");

// for user registration
 const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required().label('Name'), // Descriptive label for name
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().label('Mobile Number'), // Correct pattern for 10-digit mobile numbers
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required().label('Email'), // Email validation
    password: Joi.string().trim().min(8).max(25).required().label('Password').pattern(new RegExp('^[a-zA-Z0-9#?!@$%^&*\\-]{8,25}$')), 
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
    }).unknown().required().label('Image')
  });

//   for forgotting password
const passwordForgotSchema = Joi.object({
    password: Joi.string().trim().min(8).max(25).required().label('Password').pattern(new RegExp('^[a-zA-Z0-9#?!@$%^&*\\-]{8,25}')),
  });


// for CMS PAGE
const CmsPageSchema=Joi.object({
  title:Joi.string().required().trim().label('Title'),
  url:Joi.string().required().trim().label('URL'),
  description:Joi.string().required().trim().label('Description'),
  meta_title:Joi.string().required().trim().label('Meta Title'),
  meta_keywords:Joi.string().required().trim().label('Meta keywords'),
  meta_description:Joi.string().required().trim().label('Meta description'),
});  

// for category
const CategorySchema=Joi.object({
  category_name:Joi.string().required().trim().label('Category Name'),
  parent_id:Joi.number().required().label('Parent ID'),
  category_discount:Joi.number().required().label('Category Discpount'),
  description:Joi.string().required().trim().label('Description'),
  url:Joi.string().required().trim().label('URL'),
  meta_title:Joi.string().required().trim().label('Meta Title'),
  meta_description:Joi.string().required().trim().label('Meta Description'),
  meta_keyword:Joi.string().required().trim().label('Meta Keyword'),
  category_image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
  }).unknown().required().label('Category Image')
});

// for product
const ProductSchema = Joi.object({
  category_id: Joi.string().trim().required().label('Category ID'),
  product_name: Joi.string().trim().required().label('Product Name'),
  product_code: Joi.string().trim().required().pattern(new RegExp('^[a-zA-Z0-9]')).label('Product Code'),
  family_color: Joi.string().trim().required().label('Family Color'),
  product_color: Joi.string().trim().required().label('Product Code'),
  group_code: Joi.string().trim().required().pattern(new RegExp('^[a-zA-Z0-9]')).label('Group Code'),
  product_price: Joi.number().required().label('Product Price'),
  product_weight: Joi.string().trim().required().pattern(new RegExp('^[a-zA-Z0-9]')).label('Product Weight'),
  product_discount: Joi.number().required().label('Product Discount'),
  discount_type: Joi.string().trim().required().label('Discount Type'),
  final_price: Joi.number().required().label('Final Price'),
  description: Joi.string().trim().required().label('Description'),
  washcare: Joi.string().trim().required().label('WashCare'),
  keywords: Joi.string().trim().required().label('Keywords'),
  fabric: Joi.string().trim().required().label('Fabric'),
  pattern: Joi.string().trim().required().label('Pattern'),
  sleeve: Joi.string().trim().required().label('Sleeve'),
  fit: Joi.string().trim().required().label('Fit'),
  occassion: Joi.string().trim().required().label('Occassion'),
  meta_keywords: Joi.string().trim().required().label('Meta Keywords'),
  meta_description: Joi.string().trim().required().label('Meta Description'),
  meta_title: Joi.string().trim().required().label('Meta Title'),
  is_featured: Joi.string().trim().required().label('Is Featured'),
  product_video: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required(),
  }).unknown().required().label('Product Video'),

  product_image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required(),
  }).unknown().required().label('Product Image'),

  attributes: Joi.array().items(Joi.object({
    size: Joi.string().trim().required().label('Size'),
    sku: Joi.string().trim().required().label('SKU'),
    price: Joi.number().required().label('Price'),
    stock: Joi.number().required().label('Stock'),
  })).required().label('Attributes'),
});

// for brand
const BrandSchema = Joi.object({
  brand_name: Joi.string().trim().required().label('Brand Name'),
  brand_discount: Joi.number().required().label('Brand Discount'),
  description: Joi.string().trim().required().label('Description'),
  url: Joi.string().trim().required().label('URL'),
  meta_title: Joi.string().trim().required().label('Meta Title'),
  meta_description: Joi.string().trim().required().label('Meta Description'),
  meta_keyword: Joi.string().trim().required().label('Meta Keyword'),
  brand_image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
  }).unknown().required().label('Brand Image'),

  brand_logo: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
  }).unknown().required().label('Brand Logo')
});

// for banner
const BannerSchema=Joi.object({
  type:Joi.string().trim().required().label('Type'),
  link:Joi.string().trim().required().label('Link'),
  alt:Joi.string().trim().required().label('Alt'),
  BannerImage: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
  }).unknown().required().label('Brand Logo')
});

module.exports={registerSchema,passwordForgotSchema,CmsPageSchema,CategorySchema,ProductSchema,BrandSchema,BannerSchema}  