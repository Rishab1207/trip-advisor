import { Grid, GridItem } from "@chakra-ui/layout";
import Head from "next/head";
import Layout from "../components/Layout";
import Map from "../components/Map";
import ListDetails from "../components/ListDetails";
import { useEffect, useState } from "react";
import { getPlacesData } from "../lib/api";

export default function Home() {
	const [places, setPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [loading, setLoading] = useState(false);
	const [oldPlaces, setOldPlaces] = useState([]);

	const [type, setType] = useState("restaurants");
	const [rating, setRating] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		console.log({ oldPlaces, places });

		const filteredPlacesByRating = oldPlaces.filter(
			(place) => Number(place.rating) > rating
		);

		filteredPlacesByRating.sort((a, b) => Number(b.rating) - Number(a.rating));

		setPlaces(filteredPlacesByRating);
	}, [rating]);

	useEffect(() => {
		console.log({ coordinates, bounds });

		if (bounds.sw && bounds.ne) {
			setLoading(true);

			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				const allPlaces = data?.filter(
					(place) => place.name && place.num_reviews > 0 && place.photo
				);

				allPlaces?.sort((a, b) => Number(b.rating) - Number(a.rating));

				setPlaces(allPlaces);

				setOldPlaces(allPlaces);

				setLoading(false);
			});
		}
	}, [type, bounds]);

	return (
		<Layout setCoordinates={setCoordinates}>
			<Head>
				<title>Trip Advisor</title>
				<meta name="description" content="Trip Advisor" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Grid
				gridTemplateColumns="repeat(12, 1fr)"
				height="100%"
				gridTemplateAreas={""}
			>
				{/* List */}
				<GridItem
					colSpan={{ sm: 12, md: 4 }}
					bg="whiteAlpha.600"
					maxH="100vh"
					p={4}
					overflowY="scroll"
				>
					<ListDetails
						places={places}
						isLoading={loading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</GridItem>
				{/* Map */}
				<GridItem colSpan={{ sm: 12, md: 8 }}>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
						places={places}
					/>
				</GridItem>
			</Grid>
		</Layout>
	);
}
