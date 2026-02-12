import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    const sql = `
    SELECT metodo_pago, total_transacciones, monto_acumulado, porcentaje_popularidad 
    FROM vw_payment_mix
    ORDER BY monto_acumulado DESC
  `;

    try {
        const { rows } = await query(sql);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
