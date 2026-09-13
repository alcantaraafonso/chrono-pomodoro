import { Link } from "react-router";

type LinkRouterProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<"a">;

export function RouterLink({ href, children, ...props }: LinkRouterProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
