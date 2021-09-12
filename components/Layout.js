import { Box } from "@chakra-ui/layout";
import React from "react";
import Header from "./Header";

const Layout = ({ children, setCoordinates }) => {
	return (
		<Box height="90vh">
			<Header setCoordinates={setCoordinates} />
			<main style={{ height: "100%" }}>{children}</main>
		</Box>
	);
};

export default Layout;
