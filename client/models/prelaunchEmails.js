import { Schema, model, models } from "mongoose";

const PrelaunchEmailSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],

    }
});

const PrelaunchEmail = models.PrelaunchEmail || model("PrelaunchEmails", PrelaunchEmailSchema);
export default PrelaunchEmail;