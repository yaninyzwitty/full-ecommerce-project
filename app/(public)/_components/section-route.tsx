type Props = {
  route: {
    name: string;
    href: string;
    active: boolean;
  };
};
function SectionRoute({route}: Props) {
  return (
    <div>
      <h3 className="text-xl font-mono uppercase">{route.name}</h3>
    </div>
  );
}

export default SectionRoute;
