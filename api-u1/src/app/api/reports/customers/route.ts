import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const PaginationSchema = z.object({
    page: z.string().transform(Number).pipe(z.number().positive()).catch(1),
    limit: z.string().transform(Number).pipe(z.number().positive().max(100)).catch(10),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params = {
        page: searchParams.get('page') || '1',
        limit: searchParams.get('limit') || '10',
    };

    const zodResult = PaginationSchema.safeParse(params);

    if (!zodResult.success) {
        return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const { page, limit } = zodResult.data;
    const offset = (page - 1) * limit;

    const sql = `
    SELECT cliente, total_gastado, num_ordenes, gasto_promedio 
    FROM vw_customer_value 
    ORDER BY total_gastado DESC 
    LIMIT $1 OFFSET $2
  `;

    try {
        const { rows } = await query(sql, [limit, offset]);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
