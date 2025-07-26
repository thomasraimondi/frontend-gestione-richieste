import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DashboardCrew from "../pages/Dashboard/DashboardCrew";
import DashboardPersonal from "../pages/Dashboard/DashboardPersonal";
import { useAuth } from "../contexts/AuthContext";
import DashboardManager from "../pages/Dashboard/DashboardManager";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsComponent() {
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabSx = {
    color: "#114412",
    "&.Mui-selected": {
      color: "#114412",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {user?.role === "director" && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#114412",
              },
            }}
          >
            <Tab label="Richieste Manager" {...a11yProps(0)} sx={tabSx} />
            <Tab label="Richieste Crew" {...a11yProps(1)} sx={tabSx} />
          </Tabs>
        )}
        {user?.role === "manager" && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#114412",
              },
            }}
          >
            <Tab label="Richieste Crew" {...a11yProps(0)} sx={tabSx} />
            <Tab label="Richieste Personali" {...a11yProps(1)} sx={tabSx} />
          </Tabs>
        )}
        {user?.role === "crew" && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#114412",
              },
            }}
          >
            <Tab label="Richieste Personali" {...a11yProps(0)} sx={tabSx} />
          </Tabs>
        )}
      </Box>
      {user?.role === "director" && (
        <>
          <CustomTabPanel value={value} index={0}>
            <DashboardManager />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DashboardCrew />
          </CustomTabPanel>
        </>
      )}
      {user?.role === "manager" && (
        <>
          <CustomTabPanel value={value} index={0}>
            <DashboardCrew />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DashboardPersonal />
          </CustomTabPanel>
        </>
      )}
      {user?.role === "crew" && (
        <CustomTabPanel value={value} index={0}>
          <DashboardPersonal />
        </CustomTabPanel>
      )}
    </Box>
  );
}
