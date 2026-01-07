
import historyOrderData from '../data/history-order.json'


export default defineEventHandler(async (event) => {
  try {
    return historyOrderData;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal memuat data table',
    });
  }
});