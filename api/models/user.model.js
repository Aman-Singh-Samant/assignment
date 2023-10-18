import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    startDate:{
        type: String,
        required:true,
    },
    endDate:{
        type: String,
        required: true,
    },
    excludeDates:{
        type:String,
    },
    numberOfDays:{
        type:Number,
        required:true,
    },
    leadCount:{
        type:Number,
        required:true,
    },
    expDRR:{
        type:Number,
        required:true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
