
import billingQueueData from '../data/billing-queue.json'


export default defineEventHandler(async (event) => {
  try {
    return billingQueueData;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal memuat data billing queue',
    });
  }
});