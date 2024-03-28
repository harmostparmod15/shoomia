import { ApiData } from "../../utils/constants";

const pagination = (page: number) => {
  const perPage = 6;

  const start = (page - 1) * perPage;
  const end = page * perPage;
  const responseArr = [];
  for (let i = start; i < end; i++) {
    responseArr.push(ApiData.sneakers[i]);
  }
  return responseArr;
};

export function GET(req: any) {
  try {
    const url = new URL(req.url);
    const query = Number(url.searchParams.get("page"));
    if (query > 13) {
      throw new Error("page exceeded");
    }
    const data = pagination(query);
    return Response.json({ success: true, data: data });
  } catch (error) {
    const er = error;
    return Response.json({ success: false, data: {}, error: "page exceeded" });
  }
}
