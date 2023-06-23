const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const UserRepo = require('../models/userModel')

const createDefaultAdmin = async () => {
  try {
    // Check if there are any users in the database
    const users = await UserRepo.find({ email: 'admin@admin.com' }).count();
    if (users === 0) {
      // If there are no users, create a default admin user
      // const salt = await bcrypt.genSalt(12);
      // const hashedPassword = await bcrypt.hash('password123', process.env.Salt);
      const admin = new UserRepo({
        email: 'admin@admin.com',
        password: 'password123',
        passwordConfirm: 'password123',
        name: 'Admin',
        contactNo: '9995521658',
        userType: 'admin',
        permissions: [
          "identity.add.any",
          "identity.list.any",
          "identity.view.any",
          "identity.edit.any",
          "identity.request.any",
          "identity.approve.any",
          "identity.reject.any",
          "industry.add.any",
          "industry.list.any",
          "industry.view.any",
          "industry.edit.any",
          "industry.delete.any",
          "subindustry.add.any",
          "subindustry.list.any",
          "subindustry.view.any",
          "subindustry.edit.any",
          "subindustry.delete.any",
          "category.add.any",
          "category.list.any",
          "category.view.any",
          "category.edit.any",
          "category.delete.any",
          "subcategory.delete.any",
          "subcategory.add.any",
          "subcategory.list.any",
          "subcategory.view.any",
          "subcategory.edit.any",
          "subcategory.delete.any",
          "role.add.any",
          "role.list.any",
          "role.view.any",
          "role.edit.any",
          "role.delete.any",
          "segment.add.any",
          "segment.list.any",
          "segment.view.any",
          "segment.edit.any",
          "segment.delete.any",
          "title.add.any",
          "title.list.any",
          "title.view.any",
          "title.edit.any",
          "title.delete.any",
          "title.search.any",
          "product_master.add.any",
          "product_master.list.any",
          "product_master.view.any",
          "product_master.edit.any",
          "product_master.search.any",
          "product_master.delete.any",
          "service_master.add.any",
          "service_master.list.any",
          "service_master.view.any",
          "service_master.edit.any",
          "service_master.search.any",
          "service_master.delete.any",
          "product_variety.add.any",
          "product_variety.list.any",
          "product_variety.view.any",
          "product_variety.edit.any",
          "product_variety.search.any",
          "product_variety.delete.any",
          "service_variety.add.any",
          "service_variety.list.any",
          "service_variety.view.any",
          "service_variety.edit.any",
          "service_variety.search.any",
          "service_variety.delete.any",
          "identity_business.add.any",
          "identity_business.list.any",
          "identity_business.view.any",
          "identity_business.edit.any",
          "identity_business.delete.any",
          "identity_business.search.any",
          "identity_business.approve.any",
          "identity_business.reject.any",
          "identity_business.request.any",
          "identity_individual.add.any",
          "identity_individual.list.any",
          "identity_individual.view.any",
          "identity_individual.edit.any",
          "identity_individual.delete.any",
          "identity_individual.search.any",
          "identity_individual.approve.any",
          "identity_individual.reject.any",
          "identity_individual.request.any",
          "user.add.any",
          "user.list.any",
          "user.view.any",
          "user.edit.any",
          "user.search.any",
          "user.delete.any",
          "designation.add.any",
          "designation.list.any",
          "designation.view.any",
          "designation.edit.any",
          "designation.delete.any"
        ]
      });
      await admin.save();
      console.log('Default admin user with all privileges created');
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = createDefaultAdmin;