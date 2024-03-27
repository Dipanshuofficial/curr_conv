import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getApiLatest } from "@/constants/ApiHandler";
import { ResponseData } from "@/lib/types";
import { Data } from "@/constants/currency-codes";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "S.NO.", width: 90 },
  {
    field: "currency",
    headerName: "Currency",
    width: 150,
    
  },
  {
    field: "countryName",
    headerName: "Country Name",
    width: 300,
    
  },
  {
    field: "value",
    headerName: "Rate",
    width: 150,
    
  },
];

type rowsType = {
  id: number;
  currency: string;
  value: number;
  countryName: string;
};

const resp: ResponseData = await getApiLatest();

const rows: rowsType[] = [];

let count = 1;

for (const item in resp.data) {
  Data.map((it) => {
    if (it.code === resp.data[item].code) {
      rows.push({
        id: count,
        currency: resp.data[item].code,
        countryName: it.name,
        value: resp.data[item].value,
      });
      count++;
    }
  });
}

export default function DataGridDemo() {
  return (
    <Box sx={{ height: "80%", width: "50%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 60,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
