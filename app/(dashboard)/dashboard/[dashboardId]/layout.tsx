import {checkAuth, storeDetails} from "@/lib/check-user";
import {notFound} from "next/navigation";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
  params: {
    dashboardId: string;
  };
};

export async function generateMetadata({params}: Props) {
  const store = await storeDetails(params.dashboardId);
  return {
    title: store.name,
  };
}

async function DashboardIdLayout({children, params: {dashboardId}}: Props) {
  const isAuth = await checkAuth(dashboardId);
  const store = await storeDetails(dashboardId);

  if (!isAuth) {
    notFound();
  }

  return (
    <div className="h-full">
      <Header store={store} />

      <main className="flex">
        <Sidebar />

        {children}
      </main>
    </div>
  );
}

export default DashboardIdLayout;
