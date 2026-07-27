import mongoose from "mongoose";

export function getModel<T = any>(
  name: string,
  schema: mongoose.Schema
) {
  return (mongoose.models[name] ||
    mongoose.model(name, schema)) as mongoose.Model<T>;
}