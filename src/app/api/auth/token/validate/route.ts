import {NextRequest, NextResponse} from "next/server";


export async function POST(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  if (token) {
    return NextResponse.json({message: "ok"}, {status: 200})
  }

  return NextResponse.json({message: "unauthorized"}, {status: 401})
}
