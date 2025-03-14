import { NextResponse } from "next/server";import { cookies } from "next/headers";




export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const cookieStore = await cookies();
    const organization_id = cookieStore.get("organizationId")?.value;
     //const organization_id = "160db8736a9d47989381e01a987e4413";

    const response = await fetch(
      `https://api.timbu.cloud/products?organization_id=${organization_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
