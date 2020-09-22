import mongoose, { Schema } from "mongoose";

export const PROVIDER_ENUM = ["FACEBOOK", "GOOGLE"];

const CustomerSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatarUrl: String,
		provider: [
			{
				uid: { required: true, type: String },
				type: { required: true, type: String, enum: PROVIDER_ENUM },
			},
		],
	},
	{ timestamps: true }
);

//In customer.js getOrCreateCustomer() will need to request email information
CustomerSchema.index({ email: 1 }); //Intended for performance. Refer to docs.

export default mongoose.model("Customer", CustomerSchema);
