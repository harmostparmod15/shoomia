// import { ApiData } from "../../utils/constants";

// const pagination = (page: number) => {
//   const perPage = 6;

//   const start = (page - 1) * perPage;
//   const end = page * perPage;
//   const responseArr = [];
//   for (let i = start; i < end; i++) {
//     responseArr.push(ApiData.sneakers[i]);
//   }
//   return responseArr;
// };

// export function GET(req: any) {
//   try {
//     const url = new URL(req.url);
//     const query = Number(url.searchParams.get("page"));
//     if (query > 13) {
//       throw new Error("page exceeded");
//     }
//     const data = pagination(query);
//     return Response.json({ success: true, data: data });
//   } catch (error) {
//     const er = error;
//     return Response.json({ success: false, data: {}, error: "page exceeded" });
//   }
// }

// app/api/v1/sneakers/route.ts
import { ApiData } from "../../utils/constants";
const PER_PAGE = 6;

const paginateSneakers = (page: number) => {
  // Calculate start & end index
  const start = (page - 1) * PER_PAGE;
  const end = page * PER_PAGE;

  // Slice safely
  const sneakers = ApiData.sneakers.slice(start, end);

  return sneakers;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page")) || 1;

    const sneakers = paginateSneakers(page);

    if (sneakers.length === 0) {
      // Page exceeded
      return new Response(
        JSON.stringify({ success: false, data: [], error: "page exceeded" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, data: sneakers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        data: [],
        error: "Something went wrong",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
