import Header from "./_components/header";

type Props = {
  children: React.ReactNode;
};
function PublicLayout({children}: Props) {
  return (
    <div className="h-full bg-gray-100">
      <Header />
      <main className="pt-20 h-full flex-1">{children}</main>
    </div>
  );
}

export default PublicLayout;
