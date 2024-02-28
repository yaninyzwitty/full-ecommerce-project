type Props = {
  children: React.ReactNode;
};
function AuthLayout({children}: Props) {
  return (
    <div className="flex items-center flex-col space-y-5 justify-center h-full">
      <h2 className="text-3xl tracking-widest font-semibold">SHOPSPHERE</h2>

      <main className="">{children}</main>
    </div>
  );
}

export default AuthLayout;
