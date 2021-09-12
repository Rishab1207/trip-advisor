import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

// Navigation bar

const Header = ({ setCoordinates }) => {
	const [autoComplete, setAutoComplete] = useState(null);

	const onLoadHandler = (autoC) => setAutoComplete(autoC);

	const onPlaceChanged = () => {
		const lat = autoComplete.getPlace().geometry.location.lat();
		const lng = autoComplete.getPlace().geometry.location.lng();

		setCoordinates({ lat, lng });
	};

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			bg="#3d5aff"
			p={5}
			color="white"
		>
			<Heading fontSize="2xl">Trip Advisor</Heading>
			<Stack direction="row" spacing={4} alignItems="center">
				<Box>Explore New Places</Box>
				<Box>
					<Autocomplete onLoad={onLoadHandler} onPlaceChanged={onPlaceChanged}>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<RiSearchLine color="gray.300" />}
							/>
							<Input
								type="text"
								placeholder="Search any place..."
								borderRadius="0"
							/>
						</InputGroup>
					</Autocomplete>
				</Box>
			</Stack>
		</Box>
	);
};

export default Header;
