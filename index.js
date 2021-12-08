import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const postRequest = await fetch("https://stockx.com/p/e", {
  method: "post",
  headers: {
    "apollographql-client-name": "Iron",
    "apollographql-client-version": "2021.12.01",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
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
});

const data = await postRequest.json();
console.log(data)

serve((_req) => {
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
});
