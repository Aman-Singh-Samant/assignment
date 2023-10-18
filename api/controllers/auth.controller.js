import User from "../models/user.model.js";

export const auth = async (req,res,next)=>{
    const {
      startDate,
      endDate,
      excludeDates,
      numberOfDays,
      leadCount,
      expDRR
    } = req.body;
    const newUser = new User({
      startDate,
      endDate,
      excludeDates,
      numberOfDays,
      leadCount,
      expDRR,
    })
    try {
        await newUser.save();
        res.status(201).json("User created sucessfully!!");
    } catch (error) {
        next(error)
    }
}