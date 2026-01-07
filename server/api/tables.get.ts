
import fs from 'node:fs/promises';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  try {
    const filePath = path.resolve(process.cwd(), 'server/data/tables.json');
    
    const data = await fs.readFile(filePath, 'utf-8');
    
    return JSON.parse(data);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal memuat data meja',
    });
  }
});