import axios from "axios";

const getPlacesData = async (type, sw, ne, cancelToken) => {
	const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

	try {
		const {
			data: { data },
		} = await axios.get(URL, {
			params: {
				bl_latitude: sw.lat,
				tr_latitude: ne.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng,
			},
			headers: {
				"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
				"x-rapidapi-key": "c57a4ae5c6mshf4cb52e7bc8065fp17df2cjsna790a41be73d",
			},
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};

export { getPlacesData };
