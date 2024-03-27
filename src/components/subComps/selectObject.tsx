import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Data } from "@/constants/currency-codes";
import { useRespContext } from "../form/useRespContext";

export function SelectScrollable({
  defaultValue,
  fromTo,
}: {
  defaultValue: string;
  fromTo: boolean;
}) {
  const { response, setResponse } = useRespContext();
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        setResponse({
          ...response,
          [fromTo ? "from" : "to"]: value.split(" ")[0],
        });
      }}
    >
      <SelectTrigger className="w-full h-20 text-xl">
        <SelectValue placeholder="Select a currency" />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="est">Eastern Standard Time (EST)</SelectItem> */}
        {Data.map((item, index) => (
          <SelectItem key={index} value={item.code}>
            {item.code} - {item.name}
          </SelectItem>
        )).sort()}
      </SelectContent>
    </Select>
  );
}
