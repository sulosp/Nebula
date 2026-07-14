import { NextResponse } from "next/server";
import { layoutBoardNodes } from "@/lib/build-board";
import { clustersForItems, CORPUS } from "@/lib/corpus";
import { expandQuery } from "@/lib/query-expansion";
import { searchCorpus, searchWithEmbeddings } from "@/lib/search";
import type { SearchResponse } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { query?: string };
  const query = body.query?.trim() ?? "dark editorial web design";

  const expandedQuery = await expandQuery(query);

  const embedded = await searchWithEmbeddings(CORPUS, query, expandedQuery);
  let results = embedded ?? searchCorpus(CORPUS, query, expandedQuery);

  if (results.length === 0) {
    results = searchCorpus(CORPUS, "editorial dark", expandedQuery, 8);
  }

  const nodes = layoutBoardNodes(query, expandedQuery, results);
  const clusters = clustersForItems(nodes);

  const response: SearchResponse = {
    query,
    expandedQuery,
    clusters,
    nodes,
    edges: [],
  };

  return NextResponse.json(response);
}
