import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().positive()).catch(1),
  limit: z.string().transform(Number).pipe(z.number().positive().max(100)).catch(10),
});

export const SalesFilterSchema = z.object({
  date_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  date_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});