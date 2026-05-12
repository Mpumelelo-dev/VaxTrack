/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================
*/

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Footer() {
  return (
    <MDBox width="100%" display="flex" justifyContent="center" alignItems="center" px={1.5} py={2}>
      <MDTypography variant="button" color="text">
        © {new Date().getFullYear()}
      </MDTypography>
    </MDBox>
  );
}

export default Footer;
