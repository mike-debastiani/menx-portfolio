import { NextRequest, NextResponse } from 'next/server';
import { getProjectCategoryBySlug } from '@/lib/sanity.queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  try {
    const category = await getProjectCategoryBySlug(slug);
    return NextResponse.json({ category });
  } catch (error) {
    console.error('Error fetching project category:', error);
    return NextResponse.json({ error: 'Failed to fetch project category' }, { status: 500 });
  }
}
