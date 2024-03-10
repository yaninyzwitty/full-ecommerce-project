import {Separator} from "@/components/ui/separator";
import {getSellerLoaction} from "@/lib/get-seller-location";
import Cards from "./_components/cards";
import Charts from "./_components/charts";
import LocationError from "./_components/location-error";

type Props = {
  params: {
    dashboardId: string;
  };
};
async function DashboardIdPage({params}: Props) {
  const location = await getSellerLoaction(params.dashboardId);
  const arr = [1, 2, 3];

  const data = [
    {
      name: "witty",
      total: 100,
    },
    {
      name: "hen",
      total: 160,
    },
    {
      name: "witty",
      total: 965,
    },
    {
      name: "bad",
      total: 333,
    },
    {
      name: "good",
      total: 665,
    },
    {
      name: "witty",
      total: 300,
    },
  ];

  return (
    <div className="pt-14 pl-[70px] lg:pl-60  flex-1 ">
      {!location || (location.length === 0 && <LocationError />)}
      <div className="m-2">
        <h3 className="text-3xl mt-2  font-medium">Your analytics</h3>
        <Separator className="my-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {arr.map((item) => (
            <Cards key={item} />
          ))}
        </div>
        <div className="p-2">
          <h3 className="text-3xl mt-2 font-medium">Your Products analytics</h3>
          <Charts data={data} />

          {/* <LineChart /> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardIdPage;
