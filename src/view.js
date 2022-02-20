import { createEvent } from './events'

// dom els
const form = document.querySelector('form')
const cityInput = form.querySelector('input#cityName')
const unitCInput = form.querySelector('input#unitC')
const formErrMsgEl = form.querySelector('.error-msg')

const gif = document.querySelector('.weather-gif')

const initialEl = document.querySelector('.initial-content')
const spinner = document.querySelector('.spinner')
const primaryResultCtr = document.querySelector('.main-result-ctr')
const notFoundCityEl = document.querySelector('.not-found-city')
const connectionErrorEl = document.querySelector('.connection-err')
const remainingResultsCtr = document.querySelector('.secondary-results-ctr')

const resultEls = {
	location: primaryResultCtr.querySelector('.location'),
	mainTemp: primaryResultCtr.querySelector('.main-temp'),
	tempIcon: primaryResultCtr.querySelector('.main-temp-icon i'),
	tempUnitCtrs: [
		primaryResultCtr.querySelector('.main-temp-unit'),
		...primaryResultCtr.querySelectorAll('.secondary-temp-ctr .unit'),
	],
	description: primaryResultCtr.querySelector('.weather-description'),
	feelTemp: primaryResultCtr.querySelector('.feel-temp'),
	minTemp: primaryResultCtr.querySelector('.min-temp'),
	maxTemp: primaryResultCtr.querySelector('.max-temp'),
	humidity: remainingResultsCtr.querySelector('.humidity'),
	pressure: remainingResultsCtr.querySelector('.pressure'),
	clouds: remainingResultsCtr.querySelector('.cloud'),
	visibility: remainingResultsCtr.querySelector('.visibility'),
	windSpeed: remainingResultsCtr.querySelector('.wind-speed'),
	windDeg: remainingResultsCtr.querySelector('.wind-degree'),
	windIcon: remainingResultsCtr.querySelector('.wind-ctr i'),
}

// events

const cityAddedEvent = createEvent()

function handleFormSubmit(e) {
	e.preventDefault()
	const city = cityInput.value.trim()
	if (!city) {
		formErrMsgEl.textContent = 'city name is required'
		return
	}
	const unit = unitCInput.checked ? 'C' : 'F'

	cityInput.value = ''
	formErrMsgEl.textContent = ''

	cityAddedEvent.trigger({
		city,
		unit,
	})
}

function populateResults(results) {
	resultEls.description.textContent = results.description
	resultEls.location.textContent = results.location
	resultEls.pressure.textContent = results.pressure
	resultEls.windDeg.textContent = results.wind.deg
	resultEls.windSpeed.textContent = results.wind.speed
	resultEls.visibility.textContent = results.visibility
	resultEls.humidity.textContent = results.humidity
	resultEls.clouds.textContent = results.clouds
	resultEls.minTemp.textContent = results.temp.min
	resultEls.maxTemp.textContent = results.temp.max
	resultEls.feelTemp.textContent = results.temp.feels
	resultEls.mainTemp.textContent = results.temp.main
	resultEls.tempUnitCtrs.forEach(unitEl => {
		unitEl.classList.remove('unit-c', 'unit-f')
		unitEl.classList.add(`unit-${results.unit.toLowerCase()}`)
	})
	resultEls.tempIcon.className = `wi wi-owm-${results.isNight ? 'night' : 'day'}-${results.id}`
	resultEls.windIcon.className = `icon wi wi-wind towards-${results.wind.deg}-deg`
}

function resetView() {
	initialEl.classList.add('d-none')
	primaryResultCtr.classList.add('d-none')
	notFoundCityEl.classList.add('d-none')
	connectionErrorEl.classList.add('d-none')
	remainingResultsCtr.classList.add('hidden')
	spinner.classList.remove('spinning')
	gif.src = '#'
}

function spin() {
	resetView()
	initialEl.classList.remove('d-none')
	spinner.classList.add('spinning')
}

function showResults(results) {
	populateResults(results)
	resetView()
	primaryResultCtr.classList.remove('d-none')
	remainingResultsCtr.classList.remove('hidden')
}

function showConnectionError() {
	resetView()
	connectionErrorEl.classList.remove('d-none')
}

function showCityNameError() {
	resetView()
	notFoundCityEl.classList.remove('d-none')
}

function setGifUrl(url) {
	gif.src = url
}

form.addEventListener('submit', handleFormSubmit)
export {
	setGifUrl,
	spin,
	showResults,
	showConnectionError,
	showCityNameError,
	cityAddedEvent,
}
