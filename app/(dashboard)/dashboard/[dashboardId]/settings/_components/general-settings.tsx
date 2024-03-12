import {getStoreDetails, getStoreId} from "@/lib/get-store-id";
import GeneralStoreName from "./general-store";
import GeneralStoreDescription from "./general-store-description";

type Props = {
  searchParamValue?: string;
  dashboardId: string;
};
async function GeneralSettings({searchParamValue, dashboardId}: Props) {
  const storeId = await getStoreId(dashboardId);
  const store = await getStoreDetails(dashboardId);
  console.log(store);

  return (
    <div className="m-6">
      <h3 className="text-2xl font-medium">
        {searchParamValue || "General Settings"}
      </h3>
      <div className="mt-2">
        {!searchParamValue && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GeneralStoreName storeId={storeId} initialName={store.name} />
            <GeneralStoreDescription
              storeId={storeId}
              initialDescription={store.description}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneralSettings;
