import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "../theme/theme";
import "../styles/globals.css";

const myTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={myTheme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
