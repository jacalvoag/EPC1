import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const FilterSchema = z.object({
    search: z.string().optional().default(''),
    page: z.string().transform(Number).pipe(z.number().positive()).catch(1),
    limit: z.string().transform(Number).pipe(z.number().positive().max(50)).catch(10),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params = {
        search: searchParams.get('search') || '',
        page: searchParams.get('page') || '1',
        limit: searchParams.get('limit') || '10',
    };

    const zodResult = FilterSchema.safeParse(params);

    if (!zodResult.success) {
        return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const { search, page, limit } = zodResult.data;
    const offset = (page - 1) * limit;

    const sql = `
    SELECT producto, categoria, unidades_vendidas, ingresos_totales, ranking_ingresos
    FROM vw_top_products_ranked
    WHERE producto ILIKE $1
    ORDER BY ranking_ingresos ASC
    LIMIT $2 OFFSET $3
  `;

    try {
        const { rows } = await query(sql, [`%${search}%`, limit, offset]);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
