import {getSellerLoaction} from "@/lib/get-seller-location";
import LocationError from "./_components/location-error";

type Props = {
  params: {
    dashboardId: string;
  };
};
async function DashboardIdPage({params}: Props) {
  const location = await getSellerLoaction(params.dashboardId);

  return (
    <div className="pt-14 pl-[70px] lg:pl-60  flex-1 ">
      {!location || (location.length === 0 && <LocationError />)}
      <div className="m-2">Get started here</div>
    </div>
  );
}

export default DashboardIdPage;
