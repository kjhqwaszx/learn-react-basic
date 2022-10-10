import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 아이템 조회 API
async function getProduct(id) {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export default async function handler(req, res) {
  const { id } = req.query;
  if (id == null) {
    res.status(400).json({ message: 'No id' });
    return;
  }

  try {
    const products = await getProduct(Number(id));
    res.status(200).json({ items: products, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
