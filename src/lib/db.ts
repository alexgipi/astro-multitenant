import mongoose, { Model } from "mongoose";
import dbConnect from "./mongodb";

// Create tenant schema
const TenantSchema = new mongoose.Schema({
  name: String,
  slug: String,
  emoji: String,
}, { timestamps: true });


export const findAll = async (collectionName:string) => {
  console.log({collectionName});
  
  const Model = mongoose.models[collectionName] || mongoose.model(collectionName, TenantSchema);
  await dbConnect();
  
  const docs = await Model.find({});
  return docs || [];
};

export const findByIdOrSlug = async (collectionName:any, idOrSlug:any) => {
  console.log("findById", collectionName, idOrSlug);
  const Model = mongoose.models[collectionName] || mongoose.model(collectionName, TenantSchema);
  await dbConnect();
  const query = {
    $or: [
      { _id: mongoose.Types.ObjectId.isValid(idOrSlug) ? idOrSlug : null },
      { slug: idOrSlug },
    ]
  };

  const doc = await Model.findOne(query);
  // console.log({doc})
  return doc;
};

export const createUser = async (newUser:any) => {
  await dbConnect();
  const user = await {name: 'alexxx'} // Use the `User` model
  return user;
};