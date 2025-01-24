import payload from 'payload';

export const getPayloadClient = async (p0: unknown) => {
  if (!(payload as any).isInitialized) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || '794ec646f796f280a09556a1',
      mongoURL: process.env.DATABASE_URI || 'mongodb://127.0.0.1/saas',
    });
  }
  return payload;
};
