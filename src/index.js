import { ConnectionError, getJson, HttpError } from './requests'
import {
	showCityNameError,
	showResults,
	showConnectionError,
	spin,
	setGifUrl,
	cityAddedEvent,
} from './view'

let activeRequestId = 0

function extractWeatherData(weatherResponse, unit) {
	const {
		name: city,
		sys: { country, sunrise, sunset },
		weather: [{ id, description }],
		visibility,
		wind,
		clouds: { all: clouds },
		main: {
			pressure, humidity,
			temp: mainTemp,
			feels_like: tempFeel,
			temp_min: minTemp,
			temp_max: maxTemp,
		},
	} = weatherResponse

	// https://gist.github.com/tbranyen/62d974681dea8ee0caa1?permalink_comment_id=2568643#gistcomment-2568643
	const nowTimestamp = Math.floor(Date.now() / 1000)
	const isNight = !(nowTimestamp >= sunrise && nowTimestamp <= sunset)
	return {
		id,
		isNight,
		unit,
		description,
		location: `${city}, ${country}`,
		temp: {
			main: mainTemp,
			min: minTemp,
			max: maxTemp,
			feels: tempFeel,
		},
		pressure,
		wind,
		visibility,
		humidity,
		clouds,
	}
}

async function getGiphy(query) {
	const url = `https://api.giphy.com/v1/gifs/translate?api_key=1qmo4yTrAGqNZXZl5DCUU5ZDNqdag4gs&s=weather+atmosphere+${query}`
	try {
		const response = await getJson(url)
		return response.data.images.original.url
	} catch (error) {
		return null
	}
}

async function getWeather({ city, unit }) {
	const apiUnit = unit.toLowerCase() === 'c' ? 'metric' : 'imperial'
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${apiUnit}&appid=a6540480391277577c9eacb79ac2fb64`
	return { unit, ...await getJson(url) }
}

async function process({ city, unit }, requestId) {
	spin()

	let weatherResponse

	try {
		weatherResponse = await getWeather({ city, unit })
	} catch (error) {
		if (activeRequestId === requestId) {
			if (error instanceof ConnectionError) showConnectionError()
			else if (error instanceof HttpError) showCityNameError()
		}
		return
	}

	if (activeRequestId !== requestId) return

	const giphyPromise = getGiphy(`${weatherResponse.weather[0].description}`)
	showResults(extractWeatherData(weatherResponse, unit))
	const gifUrl = await giphyPromise

	if (activeRequestId !== requestId || gifUrl === null) return

	setGifUrl(gifUrl)
}

cityAddedEvent.addListener(formData => {
	activeRequestId += 1
	process(formData, activeRequestId)
})
