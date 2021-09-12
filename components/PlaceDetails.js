import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import { AiFillStar, AiTwotonePhone } from "react-icons/ai";
import { BsArrowUpRight } from "react-icons/bs";
import { Button } from "@chakra-ui/button";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
} from "@chakra-ui/accordion";

const PlaceDetails = ({ place, selected, refProp }) => {
	// console.log(place);

	if (selected)
		refProp?.current?.scrollIntoView({ behaviour: "smooth", block: "start" });

	return (
		<Stack spacing={4}>
			<Box boxShadow="lg">
				<Image
					src={
						place.photo
							? place.photo.images.large.url
							: "https://logopond.com/logos/a447d60b6c1ffcfcb618ed05ecd9a679.png"
					}
					height="300px"
					alt={place.name}
					objectFit="cover"
					width="100%"
				/>

				{/* Content */}
				<Text p={2} fontWeight="semibold" fontSize="lg" mt={3}>
					{place.name}
				</Text>

				{/* Rating */}

				<Stack spacing={3} padding={3}>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Text>Rating</Text>
						<Text>
							{place.rating ? (
								<Box display="flex" alignItems="center">
									{place.rating} <AiFillStar />
								</Box>
							) : (
								"NA"
							)}
						</Text>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Text>Price</Text>
						<Text>{place.price ? place.price : "NA"}</Text>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Text>Ranking</Text>
						<Text width="70%" textAlign="right">
							{place.ranking}
						</Text>
					</Box>

					{/* Awards */}

					{place && place?.awards.length > 0 && (
						<Accordion allowMultiple>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Awards
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<Stack spacing={3}>
										{place.awards.map((award) => {
											return (
												<Box
													display="flex"
													justifyContent="space-between"
													alignItems="center"
												>
													<Image
														src={award.images.small}
														alt={award.display_name}
													/>
													<Text>{award.display_name}</Text>
												</Box>
											);
										})}
									</Stack>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					)}

					{/* Type of Food */}
					<Flex direction="row" flexWrap="wrap" my={3}>
						{place?.cuisine?.map(({ name }) => (
							<Tag margin={2}>{name}</Tag>
						))}
					</Flex>

					{/* Location Address */}
					{place?.address && (
						<Flex justifyContent="space-between">
							<Box>
								<MdLocationOn />
							</Box>
							<Box textAlign="right" width="70%">
								{place.address}
							</Box>
						</Flex>
					)}

					{/* phone */}
					{place?.phone && (
						<Flex justifyContent="space-between">
							<Box>
								<AiTwotonePhone />
							</Box>
							<Box>{place.phone}</Box>
						</Flex>
					)}
				</Stack>

				<Divider />

				{/* Website URL */}
				<Stack direction="row-reverse" p={3}>
					<Box>
						{place?.web_url && (
							<a href={place.web_url} target="_blank">
								<Button
									colorScheme="primary"
									variant="outline"
									rightIcon={<BsArrowUpRight />}
								>
									Trip Advisor
								</Button>
							</a>
						)}
					</Box>
					<Box>
						{place?.website && (
							<a href={place.website} target="_blank">
								<Button
									colorScheme="primary"
									variant="outline"
									rightIcon={<BsArrowUpRight />}
								>
									Visit
								</Button>
							</a>
						)}
					</Box>
				</Stack>
			</Box>
		</Stack>
	);
};

export default PlaceDetails;
