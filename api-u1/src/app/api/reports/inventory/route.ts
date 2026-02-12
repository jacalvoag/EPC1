import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const ALLOWED_CATEGORIES = ['Café en Grano', 'Bebidas Calientes', 'Repostería', 'Métodos de Extracción', ''];

const FilterSchema = z.object({
    categoria: z.string().refine(val => ALLOWED_CATEGORIES.includes(val), {
        message: 'Categoría no válida'
    }).optional().default(''),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params = {
        categoria: searchParams.get('categoria') || '',
    };

    const zodResult = FilterSchema.safeParse(params);

    if (!zodResult.success) {
        return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const { categoria } = zodResult.data;

    const sql = `
    SELECT producto, stock_actual, categoria, estado_stock
    FROM vw_inventory_risk
    WHERE ($1 = '' OR categoria = $1)
    ORDER BY stock_actual ASC
  `;

    try {
        const { rows } = await query(sql, [categoria]);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
