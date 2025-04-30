const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      eenum: {
        values: ["ignored", "interested", "accepted", "rejected"],
      },
    },
  },
  {
    timestamps: true,
  }
);

// connectionRequestSchema.pre("save", function () {
//   const connectionRequest = this;
//   if (connectionRequest.senderId.equals(connectionRequest.recieverId))
//     throw new Error("can't send request to yourself");
//   next();
// });

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
