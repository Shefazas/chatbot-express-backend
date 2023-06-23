const factory = require('./handlerFactory');
const User = require('../models/userModel');
const CatchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');

const Email = require('../utils/email');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createUser = CatchAsync(
  async (req, res, next) => {
    // const userId = await IdGenerator.createId("user");

    const newUser = await User.create({
      // userId: userId,
      name: req.body.name,
      email: req.body.email,
      contactNo: req.body.contactNo,
      role: req.body.role,
      designation: req.body.designation,
      permissions: req.body.permissions,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });



    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  }
);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}

exports.updateMe = CatchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This route is not for password updates. Please use /updateMyPassword', 400)
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})

exports.deleteMe = CatchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  })
});

// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not defined! Please use /signup instead'
//   });
// }

exports.getUser = factory.getOne(User, { path: 'role designation' });
exports.getAllUsers = factory.getAll(User, 'role designation');

//Do not update passwords with this!

// exports.updateUser = factory.updateOne(User);

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.user) req.body.modifiedBy = req.user._id;
  const user = await User.findOneAndUpdate(
    { _id: req.params.id, email: { $ne: 'admin@admin.com' } },
    req.body,
    { new: true }
  );

  // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

// exports.deleteUser = factory.deleteOne(User);

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.params.id, email: { $ne: 'admin@admin.com' } });
  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    message: 'Successfully Deleted'
  });
});

exports.searchUser = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.query.userId) {
    filter.userId = {
      $regex: new RegExp(req.query.userId.trim()),
      $options: "i"
    };
  }
  if (req.query.name) {
    filter.name = { $regex: new RegExp(req.query.name.trim()), $options: "i" };
  }
  if (req.query.email) {
    filter.email = { $regex: new RegExp(req.query.email.trim()), $options: "i" };
  }
  if (req.query.contactNo) {
    filter.contactNo = { $regex: new RegExp(req.query.contactNo.trim()), $options: "i" };
  }
  const usersApifeatures = new ApiFeatures(User.find(filter), req.query)
    .populate('role designation')
    .paginate()
    .limitFields()
    .sort();
  const users = await usersApifeatures.query;
  const count = new ApiFeatures(User.find(filter), req.query).count();
  const results = await count.query;
  // const apiFeatures = new ApiFeatures(User.find(filter), req.query)
  //   .paginate()
  //   .counttest();
  // const users = await apiFeatures.query;
  // const results = apiFeatures.applyCount().query;
  res.status(200).json({
    status: 'success',
    results,
    data: users
  })
});

// filter.name = {
  //   $regex: new RegExp(`${req.query.name.trim()}.*`),
  //   $options: "i"
  // }

// $regex: new RegExp(req.query.name.trim(), 'i')