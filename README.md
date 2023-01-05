# Flow

1. When user opens up the web app the default location is set to user location

- This is achieved by using `useEffect` hook which basically runs when the component is mounted for the first time

```js
useEffect(() => {
	navigator.geolocation.getCurrentPosition(
		({ coords: { latitude, longitude } }) => {
			setCoordinates({ lat: latitude, lng: longitude });
		}
	);
}, []);
```

1. This peice of code is first runs on mount with the bounds inialised to user's current location and whenver the value of `type` or `bounds` changes it then make anbther API call to `Rapid API` to fetch the new results

```js
useEffect(() => {
	if (bounds.sw && bounds.ne) {
		setLoading(true);

		getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
			setPlaces(
				data?.filter(
					(place) => place.name && place.num_reviews > 0 && place.photo
				)
			);

			setLoading(false);
		});
	}
}, [type, bounds]);
```

1. The default category to `fetch` is set to `restaurants` which can be changed to `famous attractions`, `hotels`

1. There are mainly 3 components in this App

   1. Header
   1. ListDetails
   1. Maps

## Header

### How is Google Search working?

- In `Header` Component, I've an `AutoComplete` Component which is `imported` from `react-google-maps`
- In this I've passed two event handlers `onLoad` and `onPlaceChanged`
- `onLoad` is a callback function which runs when the `autocomplete` instance has been loaded
- `onPlaceChange` this is an event handler which is fired when a PlaceResult is made available for a Place which the user has selected
- After I get the results of the place which the user has selected then I first extract the new coordinates (latitude and longitude) and then update the `center` attribute in the `Map` component which then updates the UI

### How the cards on the map are changing when the user scrolls through the map

## Tasks

- Make responsive
- Axios request
