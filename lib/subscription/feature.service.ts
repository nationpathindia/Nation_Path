import dbConnect from "@/lib/mongodb";

import Feature from "@/app/models/Feature";

export async function getAllFeatures() {
  await dbConnect();

  return Feature.find({
  status: "active",
}).sort({
    category: 1,
    name: 1,
  });
}

export async function getFeatureByKey(slug: string) {
  await dbConnect();

  return Feature.findOne({
    slug,
    status: "active",
  });
}

export async function createFeature(data: any) {
  await dbConnect();

  const exists = await Feature.findOne({
  slug: data.slug,
});

  if (exists) {
    throw new Error("Feature key already exists.");
  }

  return Feature.create(data);
}

export async function updateFeature(
  id: string,
  data: any
) {
  await dbConnect();

  return Feature.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function deleteFeature(id: string) {
  await dbConnect();

  return Feature.findByIdAndDelete(id);
}