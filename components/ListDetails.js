import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import PlaceDetails from "./PlaceDetails";

const ListDetails = ({
	places,
	isLoading,
	type,
	setType,
	rating,
	setRating,
}) => {
	return (
		<Stack spacing={5}>
			<Text fontSize="lg" fontWeight="semibold">
				Restaurants, Hotels & Attractions around you!
			</Text>

			<FormControl>
				<FormLabel>Type</FormLabel>
				<Select
					placeholder="Select option"
					variant="filled"
					onChange={(e) => setType(e.target.value)}
					defaultValue="restaurants"
				>
					<option value="restaurants">Restaurants</option>
					<option value="hotels">Hotels</option>
					<option value="attractions">Attractions</option>
				</Select>
			</FormControl>
			<FormControl>
				<FormLabel>Rating</FormLabel>
				<Select
					placeholder="Select option"
					variant="filled"
					onChange={(e) => setRating(e.target.value)}
					defaultValue={rating}
				>
					<option value={0}>All</option>
					<option value={3}>Above 3.0</option>
					<option value={4}>Above 4.0</option>
					<option value={4.5}>Above 4.5</option>
				</Select>
			</FormControl>

			{isLoading ? (
				<Grid placeItems="center" height="100%">
					<Spinner size="lg" />
				</Grid>
			) : (
				<>
					{/* Places */}
					<Grid gridTemplateColumns="repeat(12, 1fr)" mt={8} gap={10}>
						{places?.map((place, i) => (
							<GridItem key={i} colSpan={12}>
								<PlaceDetails place={place} />
							</GridItem>
						))}
					</Grid>
				</>
			)}
		</Stack>
	);
};

export default ListDetails;
