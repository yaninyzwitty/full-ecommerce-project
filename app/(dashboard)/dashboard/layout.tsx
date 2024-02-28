import React from "react";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({children}: Props) {
  return <div>{children}</div>;
}

export default DashboardLayout;
