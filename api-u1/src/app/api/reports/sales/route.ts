import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const FilterSchema = z.object({
    date_from: z.string().optional().transform(val => val && val.match(/^\d{4}-\d{2}-\d{2}$/) ? val : undefined),
    date_to: z.string().optional().transform(val => val && val.match(/^\d{4}-\d{2}-\d{2}$/) ? val : undefined),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params = {
        date_from: searchParams.get('date_from') || undefined,
        date_to: searchParams.get('date_to') || undefined,
    };

    const zodResult = FilterSchema.safeParse(params);

    if (!zodResult.success) {
        return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const { date_from, date_to } = zodResult.data;

    const sql = `
    SELECT sale_date, total_ventas, total_tickets, ticket_promedio 
    FROM vw_sales_daily 
    WHERE ($1::DATE IS NULL OR sale_date >= $1)
      AND ($2::DATE IS NULL OR sale_date <= $2)
    ORDER BY sale_date DESC
  `;

    try {
        const { rows } = await query(sql, [date_from || null, date_to || null]);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
