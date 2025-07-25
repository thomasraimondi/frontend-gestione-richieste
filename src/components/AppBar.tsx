import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Diversity2Icon from "@mui/icons-material/Diversity2";

const settings = ["Profile"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user } = useAuth();

  const pages = [user ? { id: 2, name: "Dashboard", path: "/dashboard" } : { id: 1, name: "Home", path: "/" }];
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = () => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/profile");
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#114412", top: 0, left: 0, right: 0, zIndex: 1000, height: "70px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={user ? "/dashboard" : "/"} className="hidden lg:block">
            <Diversity2Icon sx={{ fontSize: "50px" }} />
          </Link>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages
                .filter((page) => page !== null)
                .map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Link to={page.path || ""}>
                      <Typography sx={{ textAlign: "center" }}>{page?.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <div className="flex items-center justify-center lg:hidden grow">
            <Link to={user ? "/dashboard" : "/"}>
              <Diversity2Icon />
            </Link>
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter((page) => page !== null)
              .map((page) => (
                <Link to={page.path || ""} key={page.id}>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                    {page.name}
                  </Button>
                </Link>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user ? "Open settings" : "Login"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar>{user?.name.charAt(0).toUpperCase() + user?.lastname.charAt(0).toUpperCase()}</Avatar>
                ) : (
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={`/${setting}`}>
                    <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
