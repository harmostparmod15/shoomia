import { ApiData } from "../../utils/constants";
import { NextApiRequest } from "next";

const filterSneaker = (id: number) => {
  return ApiData.sneakers.filter((sneaker) => sneaker?.id === id);
};

export function GET(req: any) {
  const url = new URL(req.url);
  const query = Number(url.searchParams.get("q"));
  const data = filterSneaker(query);
  return Response.json({ success: true, data: data });
}
