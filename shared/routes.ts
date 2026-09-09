import { z } from 'zod';
import { 
  insertContactMessageSchema, 
  insertWebsiteOrderSchema, 
  insertJobApplicationSchema,
  contactMessages, 
  websiteOrders,
  jobApplications
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  orders: {
    submit: {
      method: 'POST' as const,
      path: '/api/orders',
      input: insertWebsiteOrderSchema,
      responses: {
        201: z.custom<typeof websiteOrders.$inferSelect>(),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  careers: {
    apply: {
      method: 'POST' as const,
      path: '/api/careers',
      input: insertJobApplicationSchema,
      responses: {
        201: z.custom<typeof jobApplications.$inferSelect>(),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

