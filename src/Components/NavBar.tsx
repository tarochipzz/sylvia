import { Link, useLocation } from "react-router-dom";

const StyledLink = ({
  to,
  children,
  isActive,
}: {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <Link
    to={to}
    className="text-lg font-light cursor-pointer hover:underline hover:text-stone-900 transition-colors"
    style={{ fontWeight: isActive ? "500" : "300" }}
  >
    {children}
  </Link>
);

export const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-row gap-[18px] text-stone-700">
      <StyledLink to="/" isActive={location.pathname === "/"}>
        Home
      </StyledLink>
      <StyledLink to="/gallery" isActive={location.pathname === "/gallery"}>
        Gallery
      </StyledLink>
      <StyledLink to="/projects" isActive={location.pathname === "/projects"}>
        Projects
      </StyledLink>
      <StyledLink to="/about" isActive={location.pathname === "/about"}>
        About
      </StyledLink>
    </nav>
  );
};
