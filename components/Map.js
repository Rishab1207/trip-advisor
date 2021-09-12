import { Image } from "@chakra-ui/image";
import { Box, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import GoogleMapReact from "google-map-react";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import { mapStyles } from "../theme/mapStyles";

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
	const isDesktop = useMediaQuery("(min-width: 600px)");

	return (
		<>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyCBRKnl72Jtz2wZP_jMLGXBHZsfgat81js" }}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={{
					disableDefaultUI: true,
					zoomControl: true,
					styles: mapStyles,
				}}
				onChange={(e) => {
					setCoordinates({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}
			>
				{places?.map((place, i) => {
					return (
						<Box
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
						>
							{!isDesktop ? (
								<MdLocationOn />
							) : (
								<Box
									p={2}
									bg="white"
									display="flex"
									flexDirection="column"
									width="150px"
									justifyContent="center"
									cursor="pointer"
								>
									<Text fontSize="lg" fontWeight="semibold" mb={2}>
										{place.name}
									</Text>
									<Image
										src={
											place.photo
												? place.photo.images.large.url
												: "https://logopond.com/logos/a447d60b6c1ffcfcb618ed05ecd9a679.png"
										}
										objectFit="cover"
										alt={place.name}
										width="100%"
									/>
								</Box>
							)}
						</Box>
					);
				})}
			</GoogleMapReact>
		</>
	);
};

export default Map;
