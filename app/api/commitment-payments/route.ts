import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";

// GET - Fetch payment status for a specific month/year or commitment
export async function GET(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month');
        const year = searchParams.get('year');
        const commitment_id = searchParams.get('commitment_id');

        let payments;
        if (month && year) {
            // Get all payments for a specific month/year
            payments = await db.all(
                `SELECT cps.*, cl.commitment_name
                 FROM commitment_payment_status_table cps
                 JOIN commitment_list_table cl ON cps.commitment_id = cl.commitment_id
                 WHERE cps.payment_month = ? AND cps.payment_year = ?`,
                [parseInt(month), parseInt(year)]
            );
        } else if (commitment_id) {
            // Get all payments for a specific commitment
            payments = await db.all(
                'SELECT * FROM commitment_payment_status_table WHERE commitment_id = ? ORDER BY payment_year DESC, payment_month DESC',
                [commitment_id]
            );
        } else {
            // Get all payments
            payments = await db.all('SELECT * FROM commitment_payment_status_table');
        }

        return NextResponse.json(payments);
    } catch (error) {
        console.error('Failed to fetch payment status:', error);
        return NextResponse.json({ error: 'Failed to fetch payment status' }, { status: 500 });
    }
}

// POST - Create or update payment status
export async function POST(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            commitment_id,
            payment_month,
            payment_year,
            payment_status
        } = body;

        // Try to insert, if exists then update (upsert)
        await db.run(
            `INSERT INTO commitment_payment_status_table (
                commitment_id,
                payment_month,
                payment_year,
                payment_status
            ) VALUES (?, ?, ?, ?)
            ON CONFLICT(commitment_id, payment_month, payment_year)
            DO UPDATE SET payment_status = ?`,
            [
                commitment_id,
                payment_month,
                payment_year,
                payment_status ? 1 : 0,
                payment_status ? 1 : 0
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update payment status:', error);
        return NextResponse.json({ error: 'Failed to update payment status' }, { status: 500 });
    }
}

// PUT - Update payment status (toggle)
export async function PUT(request: Request) {
    try {
        const db = await openDB();
        const body = await request.json();

        const {
            commitment_id,
            payment_month,
            payment_year,
            payment_status
        } = body;

        await db.run(
            `UPDATE commitment_payment_status_table
             SET payment_status = ?
             WHERE commitment_id = ? AND payment_month = ? AND payment_year = ?`,
            [
                payment_status ? 1 : 0,
                commitment_id,
                payment_month,
                payment_year
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update payment status:', error);
        return NextResponse.json({ error: 'Failed to update payment status' }, { status: 500 });
    }
}

// DELETE - Delete payment status record
export async function DELETE(request: Request) {
    try {
        const db = await openDB();
        const { searchParams } = new URL(request.url);
        const payment_id = searchParams.get('id');

        if (!payment_id) {
            return NextResponse.json({ error: 'Payment ID required' }, { status: 400 });
        }

        await db.run('DELETE FROM commitment_payment_status_table WHERE commitment_payment_id = ?', [payment_id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete payment status:', error);
        return NextResponse.json({ error: 'Failed to delete payment status' }, { status: 500 });
    }
}
