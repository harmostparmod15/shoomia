import { NextResponse } from "next/server";
import { ApiData } from "@/app/api/utils/constants";

const recommendedSneakers = (data: any) => {
  let responseArr: any = [];

  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.trunc(Math.random() * 80);
    responseArr.push(data[randomIndex]);
  }

  return responseArr;
};

export function GET() {
  const responseArr = recommendedSneakers(ApiData.sneakers);
  return NextResponse.json({ success: true, data: responseArr });
}
