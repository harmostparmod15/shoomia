import { NextResponse } from "next/server";

import { ApiData } from "../../utils/constants";

export async function GET(request: Request) {
  return NextResponse.json({ msg: "success", data: ApiData });
}
