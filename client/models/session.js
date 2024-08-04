import { Schema, model, models } from "mongoose";

const SessionSchema = new Schema({
  score: {
    type: Number,
    required: [true, 'Score is required!']
  },
  start: {
    type: Number,
    required: [true, 'Starting timestamp is required!'],
  },
  data: [
    {
      score: Number,
      timestamp: Number
    }
  ],
  email: {
    type: String,
    required: [true, 'User email is required!'],
  },
});


const Session = models.Session || model("Session", SessionSchema);
export default Session;