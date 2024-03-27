// {
//     "meta": {
//       "last_updated_at": "2024-03-23T23:59:59Z"
//     },
//     "data": {
//       "CAD": {
//         "code": "CAD",
//         "value": 1.3609502326
//       },
//       "EUR": {
//         "code": "EUR",
//         "value": 0.9251901729
//       },
//       "USD": {
//         "code": "USD",
//         "value": 1
//       }
//     }
//   }
// {
//   "meta": {
//     "last_updated_at": "2024-03-24T23:59:59Z"
//   },
//   "data": {
//     "USD": {
//       "code": "USD",
//       "value": 0.0119788929
//     }
//   }
// }
// type SpecificResp = {
//   meta: {
//     last_updated_at: string;
//   };
//   data: {
//     (key: string): {
//       code: string;
//       value: number;
//     };
//   };
// };
import { ResponseData } from "@/lib/types";
import { client } from "./config";

export async function getApi(date: string) {
  try {
    const response = await client.historical({
      date,
    });
    if (!response) throw Error;
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getCurrencies() {
  const response = await client.currencies();
  if (!response) throw Error;
  return response;
}

export async function getApiLatest() {
  try {
    const response = await client.latest();
    if (!response) throw Error;
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getSpecific(
  base_currency: string,
  currencies: string[] | string
) {
  try {
    const response: ResponseData = await client.latest({
      base_currency,
      currencies,
    });
    if (!response) throw Error;
    return response;
  } catch (error) {
    console.log(error);
  }
}
