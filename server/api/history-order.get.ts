
import fs from 'node:fs/promises';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  try {
    const filePath = path.resolve(process.cwd(), 'server/data/history-order.json');
    
    const data = await fs.readFile(filePath, 'utf-8');
    const response = await JSON.parse(data)

    return response.orders;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal memuat data history order',
    });
  }
});