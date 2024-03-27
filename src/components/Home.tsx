import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectScrollable } from "./subComps/selectObject";
import ConvertCard from "./subComps/ConvertCard";
import { ArrowLeftRight, ChevronRight, Info } from "lucide-react";
import { z } from "zod";
import { formSchema } from "./form/formConfig";
import { getSpecific } from "@/constants/ApiHandler";
import { useRespContext } from "./form/useRespContext";
// import Loader from "./shared/Loader";
import { useState } from "react";
import Loader from "./shared/Loader";

const Home = () => {
  // const response = {
  //   from: "USD",
  //   to: "INR",
  //   amt: 1,
  //   response: 1,
  // };
  const { response, setResponse } = useRespContext();

  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "USD - US Dollar",
      to: "INR - Indian Rupee",
      amount: 1,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const base_curr = response.from.split(" ")[0];
      const query_curr = response.to.split(" ")[0];
      const mul = await getSpecific(base_curr, query_curr);
      if (!mul) throw Error("Couldn't fetch data.");
      else setLoaded(true);
      const val = mul?.data[query_curr].value;
      const ans = (val * values.amount).toFixed(3);
      const some = mul.meta.last_updated_at;
      setResponse({
        ...response,
        response: Number(ans),
        last_updated_at: some,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[8rem] w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-20 text-white"
          >
            <div className="flex flex-1 items-center justify-center gap-20">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="mb-10">
                    <FormLabel className="font-bold text-2xl">Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="p-10 text-xl outline-none w-60"
                        placeholder="Amount here"
                        type="number"
                        min={1}
                        {...field}
                        onChange={(event) => {
                          const value = parseFloat(event.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
                          } else {
                            // Handle invalid input (e.g., show error message)
                            <FormMessage />;
                          }
                        }}
                      />
                    </FormControl>
                    {/* <FormDescription className="py-2">
                  This is your public display name.
                </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="from"
                render={() => (
                  <FormItem className="mb-10">
                    <FormLabel className="font-bold text-2xl">From</FormLabel>
                    <FormControl>
                      {/* <Input
                    className="p-10 text-2xl outline-none"
                    placeholder="shadcn"
                    {...field}
                  /> */}
                      <SelectScrollable defaultValue={response.from} fromTo />
                    </FormControl>
                    {/* <FormDescription className="py-2">
                  This is your public display name.
                </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ArrowLeftRight />

              <FormField
                control={form.control}
                name="to"
                render={() => (
                  <FormItem className="mb-10">
                    <FormLabel className="font-bold text-2xl">To</FormLabel>
                    <FormControl>
                      {/* <Input
                    className="p-10 text-2xl outline-none"
                    placeholder="shadcn"
                    {...field}
                  /> */}
                      <SelectScrollable
                        defaultValue={response.to}
                        fromTo={false}
                      />
                    </FormControl>
                    {/* <FormDescription className="py-2">
                  This is your public display name.
                </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <ConvertCard
                val={response.response}
                amt={response.amt}
                from={response.from}
                to={response.to}
                lastUpdated={response.last_updated_at}
                className={loaded ? "" : "hidden"}
              />
              {!loaded && loading && <Loader />}
              <p className="flex absolute mt-40 gap-1">
                <Info size={20} className="mt-1" />
                Our converter applies the mid-market rate. It is solely for
                informational purposes. <br /> The Rate might differ while
                transferring money.
              </p>
              <Button
                className="gap-5 items-center font-semibold text-2xl rounded-3xl p-7 text-black bg-white hover:bg-white/75"
                type="submit"
                onClick={() => setLoading(true)}
              >
                Convert
                <ChevronRight className="mt-1" size={35} stroke="black" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Home;
