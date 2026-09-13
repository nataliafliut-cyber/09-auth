import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Nie znaleziono notatki' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
      body,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Błąd edycji notatki' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Błąd usuwania notatki' },
      { status: error.response?.status || 500 }
    );
  }
}