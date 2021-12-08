import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

serve((_req) => {
  const config = {
    method: "post",
    url: "https://stockx.com/p/e",
    headers: {
      "apollographql-client-name": "Iron",
      "apollographql-client-version": "2021.12.01",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      operationName: "ProductList",
      variables: {
        country: "US",
        currencyCode: "USD",
        limit: 500,
        type: "MOST_POPULAR",
        vertical: "SNEAKERS",
      },
      query:
        "query ProductList($country: String!, $currencyCode: CurrencyCode!, $marketName: String, $type: ProductSelectionType!, $limit: Int!, $vertical: Vertical) {  allProducts(    filters: {vertical: {is: $vertical}}    type: $type    page: {page: 0, limit: $limit}  ) {    ...ProductListFragment    __typename  }}fragment ProductListFragment on ProductsConnection {  edges {    node {      title      productCategory      name      urlKey      uuid      media {        smallImageUrl        __typename      }      market(currencyCode: $currencyCode) {        bidAskData(country: $country, market: $marketName) {          highestBid          lastHighestBidTime          lastLowestAskTime          lowestAsk          __typename        }        salesInformation {          lastSale          salesThisPeriod          __typename        }        __typename      }      traits(filterTypes: [RELEASE_DATE]) {        name        value        __typename      }      __typename    }    __typename  }  __typename}",
    }),
  };

  const response = await axiod.request(config);
  const data = JSON.stringify(response.data);
  return new Response(data, {
    headers: { "content-type": "application/json" },
  });
});
