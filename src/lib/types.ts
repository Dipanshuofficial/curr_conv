interface MetaData {
  last_updated_at: string;
}

interface CurrencyData {
  code: string;
  value: number;
}

export interface ResponseData {
  meta: MetaData;
  data: { [currency: string]: CurrencyData };
}
