import {Separator} from "@/components/ui/separator";
import SettingsRoutes from "./_components/settings-routes";
import GeneralSettings from "./_components/general-settings";

function SettingsPage({
  params,
  searchParams,
}: {
  params: {dashboardId: string};
  searchParams?: {path?: string};
}) {
  const searchParamValue = searchParams?.path;
  return (
    <div className="flex-1 w-full pl-[70px] lg:pl-60 pt-14">
      <div className="p-6">
        <h3 className="text-3xl  font-medium">Settings page</h3>
        <p className="text-sm text-gray-600 font-medium">
          Manage your settings and preferences here
        </p>
      </div>
      <Separator className="w-full" />

      <SettingsRoutes dashboardId={params.dashboardId} />
      <Separator className=" my-2" />

      <GeneralSettings
        searchParamValue={searchParamValue}
        dashboardId={params.dashboardId}
      />
    </div>
  );
}

export default SettingsPage;
