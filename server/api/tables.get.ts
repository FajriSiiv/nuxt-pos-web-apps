
import tableData from '../data/tables.json'


export default defineEventHandler(async (event) => {
  try {
    return tableData;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal memuat data table',
    });
  }
});