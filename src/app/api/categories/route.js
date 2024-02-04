import { Category } from "../../models/Category";

export async function POST(req) {
  const { data } = await req.json();
  console.log(data.name);
  const categoryDoc = await Category.create({ name: data.name });
  return Response.json(categoryDoc);
}

export async function PUT(req) {
  const { data } = await req.json();
  const id = data._id;
  console.log(data._id);
  await Category.updateOne({ _id: id }, { name: data.name });
  return Response.json(true);
}

export async function GET() {
  return Response.json(await Category.find());
}
