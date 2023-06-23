const { Joi } = require("celebrate");

const designationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(500).optional()
});

const identitySchema = Joi.object({
  companyName: Joi.string().min(2).required(),
  companyID: Joi.string().valid('Seller', 'Reseller', 'Agent', 'Manufacturer').default('Seller'),
  segment: Joi.string().required(),
  sector: Joi.string().required(),
  industry: Joi.string().required(),
  type: Joi.string().valid('Product', 'Service', 'Product & Service').default('Product'),
  country: Joi.string().optional(),
  address: Joi.object().optional(),
  primaryContact: Joi.object({
    name: Joi.string(),
    primaryEmail: Joi.string().email(),
    primaryContactNumber: Joi.string().max(20),
    alternateEmail: Joi.string().email(),
    alternateContactNumber: Joi.string().max(20),
    designation: Joi.string()
  }).optional(),
  otherContactInfo: Joi.array().items(Joi.object({
    name: Joi.string().min(2).max(60),
    designation: Joi.string().min(2).max(60),
    email: Joi.string().email(),
    alternateEmail: Joi.string().email(),
    contactNumber: Joi.string().max(20),
    fax: Joi.string()
  })).optional(),
  kycInfo: Joi.object().optional(),
  companyVerifyDocuments: Joi.array().items(Joi.object({
    id: Joi.string().optional(),
    docName: Joi.string().optional(),
    docNo: Joi.string().optional(),
    docType: Joi.string().optional(),
    docUrl: Joi.string().optional()
  })).optional(),
  userIDverifyDocuments: Joi.array().items(Joi.object({
    id: Joi.string().optional(),
    docName: Joi.string().optional(),
    docNo: Joi.string().optional(),
    docType: Joi.string().optional(),
    docUrl: Joi.string().optional()
  })).optional()
});

const identityBusinessSchema = Joi.object({
  companyID: Joi.string().valid('Seller', 'Reseller', 'Agent', 'Manufacturer').default('Seller'),
  name: Joi.string().min(2).max(60).required(),
  subIndustry: Joi.string().required(),
  segment: Joi.string().required(),
  industry: Joi.string().required(),
  country: Joi.string().optional(),
  address: Joi.object().optional(),
  kycInfo: Joi.object().optional(),
  primaryContact: Joi.object({
    name: Joi.string().min(2).max(60),
    primaryEmail: Joi.string().email(),
    primaryContactNumber: Joi.string().max(20),
    alternateEmail: Joi.string().email(),
    alternateContactNumber: Joi.string().max(20),
    designation: Joi.string()
  }).optional(),
  verificationDocuments: Joi.array().items(Joi.object({
    id: Joi.string().optional(),
    docName: Joi.string().optional(),
    docNo: Joi.string().optional(),
    docType: Joi.string().optional(),
    docUrl: Joi.array().items(Joi.string())
  })).optional(),
});

const identityBusinessPachSchema = Joi.object({
  companyID: Joi.string().valid('Seller', 'Reseller', 'Agent', 'Manufacturer').default('Seller'),
  name: Joi.string().min(2).max(60).optional(),
  subIndustry: Joi.string().optional(),
  segment: Joi.string().optional(),
  industry: Joi.string().optional(),
  country: Joi.string().optional(),
  address: Joi.object().optional(),
  kycInfo: Joi.object().optional(),
  primaryContact: Joi.object({
    name: Joi.string().min(2).max(60),
    primaryEmail: Joi.string().email(),
    primaryContactNumber: Joi.string().max(20),
    alternateEmail: Joi.string().email(),
    alternateContactNumber: Joi.string().max(20),
    designation: Joi.string()
  }).optional(),
  verificationDocuments: Joi.array().items(Joi.object({
    id: Joi.string().optional(),
    docName: Joi.string().optional(),
    docNo: Joi.string().optional(),
    docType: Joi.string().optional(),
    docUrl: Joi.array().items(Joi.string())
  })).optional(),
});

const identityIndividualSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  primaryContactNumber: Joi.string().required(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  address: Joi.object().optional(),
  department: Joi.string().optional(),
  designation: Joi.string().optional(),
  verificationDocuments: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      docName: Joi.string(),
      docNo: Joi.string(),
      docType: Joi.string(),
      docUrl: Joi.array().items(Joi.string())
    })
  )
}).optional();


const identityIndividualPachSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  primaryContactNumber: Joi.string().optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  address: Joi.object().optional(),
  department: Joi.string().optional(),
  designation: Joi.string().optional(),
  verificationDocuments: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      docName: Joi.string(),
      docNo: Joi.string(),
      docType: Joi.string(),
      docUrl: Joi.array().items(Joi.string())
    })
  )
}).optional();


const industrySchema = Joi.object(
  {
    name: Joi.string().min(2).max(60).required(),
    description: Joi.string().min(2).optional()
  });

const subIndustrySchema = Joi.object(
  {
    name: Joi.string().min(2).max(60).required(),
    description: Joi.string().min(2).optional(),
    industry: Joi.string().required()
  });

const categorySchema = Joi.object(
  {
    name: Joi.string().min(2).max(60).required(),
    description: Joi.string().min(2).optional(),
    subIndustry: Joi.string().required(),
    industry: Joi.string().optional()
  });

const subCategorySchema = Joi.object(
  {
    name: Joi.string().min(2).max(60).required(),
    description: Joi.string().min(2).optional(),
    category: Joi.string().required(),
    industry: Joi.string().optional(),
    subIndustry: Joi.string().optional()
  });

const itemSchema = Joi.object(
  {
    name: Joi.string().min(2).max(60).required(),
    description: Joi.string().min(2).optional(),
    product: Joi.string().required(),
    titles: Joi.array().items(Joi.string()).optional()
  });

const productSchema = Joi.object(      // Schema for itemWithTitles
  {
    description: Joi.string().min(2).optional(),
    item: Joi.string().required(),
    product: Joi.string().required(),
    titlesValues: Joi.array().items(Joi.object({
      titleId: Joi.string(),
      value: Joi.string()
    })).optional()
  });

const product_masterSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  industry: Joi.string().required(),
  subIndustry: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  titles: Joi.array().items(Joi.string())
});

const product_masterPachSchema = Joi.object({
  name: Joi.string().min(2).max(60).optional(),
  industry: Joi.string().optional(),
  subIndustry: Joi.string().optional(),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  titles: Joi.array().items(Joi.string())
});

const roleSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  description: Joi.string().min(2).max(600).optional(),
  permissions: Joi.array().items(Joi.string()).optional()
});

const sectorSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  description: Joi.string().min(2).max(600).optional()
});

const segmentSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  description: Joi.string().min(2).max(600).optional()
});

const titleSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  description: Joi.string().min(2).max(600).optional(),
})

const userSchema = Joi.object({
  name: Joi.string().required(),
  userType: Joi.string().valid('admin', 'employee').default('employee'),
  email: Joi.string().email().required(),
  contactNo: Joi.string().pattern(/^[0-9]+$/).optional(),
  role: Joi.array().items(Joi.string()).optional(),
  designation: Joi.string().optional(),
  userType: Joi.string().optional(),
  password: Joi.string().optional(),
  passwordConfirm: Joi.string().optional(),
  permissions: Joi.array().items(Joi.string()).optional()
}).options({ abortEarly: false })

module.exports = {
  designationSchema,
  identitySchema,
  industrySchema,
  subIndustrySchema,
  categorySchema,
  subCategorySchema,
  itemSchema,
  productSchema,
  product_masterSchema,
  product_masterPachSchema,
  roleSchema,
  sectorSchema,
  segmentSchema,
  identityBusinessSchema,
  identityBusinessPachSchema,
  identityIndividualSchema,
  identityIndividualPachSchema,
  titleSchema,
  userSchema
};





