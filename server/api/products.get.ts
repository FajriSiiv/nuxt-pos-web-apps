
import productData from '../data/product.json'


export default defineEventHandler(async (event) => {
  try {
    return productData;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal memuat data produk',
    });
  }
});