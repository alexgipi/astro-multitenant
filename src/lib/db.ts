import mongoose, { Model } from "mongoose";
import dbConnect from "./mongodb";

// Create tenant schema
const TenantSchema = new mongoose.Schema({
  subdomain: {
    type: String,
    unique: true,
  },
  icon: String,
}, { timestamps: true });


export const findAll = async (collectionName:string) => {
  console.log({collectionName});
  
  const Model = mongoose.models[collectionName] || mongoose.model(collectionName, TenantSchema);
  await dbConnect();
  
  const docs = await Model.find({});
  return docs || [];
};

export const findByidOrSubdomain = async (collectionName:any, idOrSubdomain:any) => {
  console.log("findById", collectionName, idOrSubdomain);
  await dbConnect();
  const Model = mongoose.models[collectionName] || mongoose.model(collectionName, TenantSchema);
  await Model.init(); 
  const query = {
    $or: [
      { _id: mongoose.Types.ObjectId.isValid(idOrSubdomain) ? idOrSubdomain : null },
      { subdomain: idOrSubdomain },
    ]
  };

  const doc = await Model.findOne(query);
  // console.log({doc})
  return doc;
};

export const createDocument = async (collectionName: any, data: any) => {
  try {
    console.log("createDocument", collectionName, data);
    await dbConnect();
    const Model = mongoose.models[collectionName] || mongoose.model(collectionName, TenantSchema);
    await Model.init(); 

    const doc = new Model(data);
    await doc.save();

    return doc;

  } catch (error:any) {
    // console.error("Error creating document:", error);

    if (error.code === 11000 && error.keyPattern?.subdomain) {
      return { error: "This subdomain is already taken" };
    }

    return { error: "Error creating document" };
  }
};

export const deleteDocument = async (collectionName: any, id: any) => {
  try {
    console.log("deleteDocument", collectionName, id);
    await dbConnect();
    const Model = mongoose.models[collectionName] || mongoose.model(collectionName, TenantSchema);
    await Model.init(); 

    const doc = await Model.findByIdAndDelete(id);

    return { doc, message: "Document deleted", ok: true };

  } catch (error:any) {
    // console.error("Error deleting document:", error);

    return { message: "Error deleting document", ok: false };
  }
}