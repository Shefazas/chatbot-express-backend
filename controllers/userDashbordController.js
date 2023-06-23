const IdentityRepo = require('../models/identityModel');
//const ItemWithTitlesRepo = require('../models/itemWithTitlesModel');
const countryRepo = require('../models/countryModel');

exports.getUserDashbord = async (req, res, next) => {



  if (req.user) {
    const user = req.user._id;
    console.log(user);

    const totalIdentity = await IdentityRepo.countDocuments({ createdBy: user });
    // const totalProductAndService = await ItemWithTitlesRepo.aggregate([
    //   {
    //     $match:{ createdBy: user } 
    //   },
    //   {
    //     $lookup: {
    //       from: 'products',
    //       localField: 'product',
    //       foreignField: '_id',
    //       as: 'ProductandServices'
    //     },
    //   },
    //   {
    //     $unwind: "$ProductandServices"
    //   },
    //   {
    //     $group: {
    //       _id: "$ProductandServices.type",
    //       count: { $sum: 1 }
    //     }
    //   }
    // ]);

    const IdentityStatus = await IdentityRepo.aggregate([
      {
        $match: { createdBy: user }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])



    const IdentityGroup = await IdentityRepo.aggregate([
      {
        $match: { createdBy: user }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ])

    res.status(200).json({
      status: 'success',
      totalIdentity: totalIdentity,
      totalProductAndService: totalProductAndService,
      IdentityStatus: IdentityStatus,
      IdentityGroup: IdentityGroup
    })
  }

}


exports.getIdentityWeeklyStatus = async (req, res, next) => {

  if (req.user) {
    const user = req.user._id;

    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    const IdentityWeeklyStatus = await IdentityRepo.aggregate([
      {
        $match: {
          createdBy: user,
          updatedAt: {
            $gte: lastWeek, // filter documents created in the last 7 days
            $lt: today // filter documents created before today
          }
        }
      },
      {
        $group: {
          _id: {
            status: "$status",
            day: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: "$_id.status",
          day: "$_id.day",
          count: 1
        }
      },
      {
        $sort: {
          day: 1
        }
      }
    ]);


    res.status(200).json({
      status: 'success',
      IdentityWeeklyStatus: IdentityWeeklyStatus
    })
  }

}