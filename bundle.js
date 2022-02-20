/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEvent": () => (/* binding */ createEvent)
/* harmony export */ });
function createEvent() {
	const handlers = []

	function addListener(handler) {
		handlers.push(handler)
	}

	function trigger(...args) {
		handlers.forEach(handler => handler(...args))
	}

	return {
		addListener,
		trigger,
	}
}




/***/ }),

/***/ "./src/requests.js":
/*!*************************!*\
  !*** ./src/requests.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getJson": () => (/* binding */ getJson),
/* harmony export */   "HttpError": () => (/* binding */ HttpError),
/* harmony export */   "ConnectionError": () => (/* binding */ ConnectionError)
/* harmony export */ });
class HttpError extends Error {
	name = 'HttpError'
}
class ConnectionError extends Error {
	name = 'ConnectionError'
}

async function getJson(url) {
	let response
	try {
		response = await fetch(url)
	} catch (error) {
		throw new ConnectionError(error)
	}
	if (!response.ok) throw new HttpError(`failed to fetch ${url}: ${response.status}`)
	return response.json()
}




/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setGifUrl": () => (/* binding */ setGifUrl),
/* harmony export */   "spin": () => (/* binding */ spin),
/* harmony export */   "showResults": () => (/* binding */ showResults),
/* harmony export */   "showConnectionError": () => (/* binding */ showConnectionError),
/* harmony export */   "showCityNameError": () => (/* binding */ showCityNameError),
/* harmony export */   "cityAddedEvent": () => (/* binding */ cityAddedEvent)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/events.js");


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

const cityAddedEvent = (0,_events__WEBPACK_IMPORTED_MODULE_0__.createEvent)()

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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requests */ "./src/requests.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");



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
		const response = await (0,_requests__WEBPACK_IMPORTED_MODULE_0__.getJson)(url)
		return response.data.images.original.url
	} catch (error) {
		return null
	}
}

async function getWeather({ city, unit }) {
	const apiUnit = unit.toLowerCase() === 'c' ? 'metric' : 'imperial'
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${apiUnit}&appid=a6540480391277577c9eacb79ac2fb64`
	return { unit, ...await (0,_requests__WEBPACK_IMPORTED_MODULE_0__.getJson)(url) }
}

async function process({ city, unit }, requestId) {
	(0,_view__WEBPACK_IMPORTED_MODULE_1__.spin)()

	let weatherResponse

	try {
		weatherResponse = await getWeather({ city, unit })
	} catch (error) {
		if (activeRequestId === requestId) {
			if (error instanceof _requests__WEBPACK_IMPORTED_MODULE_0__.ConnectionError) (0,_view__WEBPACK_IMPORTED_MODULE_1__.showConnectionError)()
			else if (error instanceof _requests__WEBPACK_IMPORTED_MODULE_0__.HttpError) (0,_view__WEBPACK_IMPORTED_MODULE_1__.showCityNameError)()
		}
		return
	}

	if (activeRequestId !== requestId) return

	const giphyPromise = getGiphy(`${weatherResponse.weather[0].description}`)
	;(0,_view__WEBPACK_IMPORTED_MODULE_1__.showResults)(extractWeatherData(weatherResponse, unit))
	const gifUrl = await giphyPromise

	if (activeRequestId !== requestId || gifUrl === null) return

	;(0,_view__WEBPACK_IMPORTED_MODULE_1__.setGifUrl)(gifUrl)
}

_view__WEBPACK_IMPORTED_MODULE_1__.cityAddedEvent.addListener(formData => {
	activeRequestId += 1
	process(formData, activeRequestId)
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDWjs7QUFFQTs7QUFFQSxDQUFDLGlEQUFTO0FBQ1Y7O0FBRUEsNkRBQTBCO0FBQzFCO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3JlcXVlc3RzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVFdmVudCgpIHtcblx0Y29uc3QgaGFuZGxlcnMgPSBbXVxuXG5cdGZ1bmN0aW9uIGFkZExpc3RlbmVyKGhhbmRsZXIpIHtcblx0XHRoYW5kbGVycy5wdXNoKGhhbmRsZXIpXG5cdH1cblxuXHRmdW5jdGlvbiB0cmlnZ2VyKC4uLmFyZ3MpIHtcblx0XHRoYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4gaGFuZGxlciguLi5hcmdzKSlcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0YWRkTGlzdGVuZXIsXG5cdFx0dHJpZ2dlcixcblx0fVxufVxuXG5leHBvcnQgeyBjcmVhdGVFdmVudCB9XG4iLCJjbGFzcyBIdHRwRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdG5hbWUgPSAnSHR0cEVycm9yJ1xufVxuY2xhc3MgQ29ubmVjdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRuYW1lID0gJ0Nvbm5lY3Rpb25FcnJvcidcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SnNvbih1cmwpIHtcblx0bGV0IHJlc3BvbnNlXG5cdHRyeSB7XG5cdFx0cmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpXG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0dGhyb3cgbmV3IENvbm5lY3Rpb25FcnJvcihlcnJvcilcblx0fVxuXHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgSHR0cEVycm9yKGBmYWlsZWQgdG8gZmV0Y2ggJHt1cmx9OiAke3Jlc3BvbnNlLnN0YXR1c31gKVxuXHRyZXR1cm4gcmVzcG9uc2UuanNvbigpXG59XG5cbmV4cG9ydCB7IGdldEpzb24sIEh0dHBFcnJvciwgQ29ubmVjdGlvbkVycm9yIH1cbiIsImltcG9ydCB7IGNyZWF0ZUV2ZW50IH0gZnJvbSAnLi9ldmVudHMnXG5cbi8vIGRvbSBlbHNcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJylcbmNvbnN0IGNpdHlJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQjY2l0eU5hbWUnKVxuY29uc3QgdW5pdENJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQjdW5pdEMnKVxuY29uc3QgZm9ybUVyck1zZ0VsID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItbXNnJylcblxuY29uc3QgZ2lmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItZ2lmJylcblxuY29uc3QgaW5pdGlhbEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluaXRpYWwtY29udGVudCcpXG5jb25zdCBzcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwaW5uZXInKVxuY29uc3QgcHJpbWFyeVJlc3VsdEN0ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXJlc3VsdC1jdHInKVxuY29uc3Qgbm90Rm91bmRDaXR5RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90LWZvdW5kLWNpdHknKVxuY29uc3QgY29ubmVjdGlvbkVycm9yRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29ubmVjdGlvbi1lcnInKVxuY29uc3QgcmVtYWluaW5nUmVzdWx0c0N0ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmRhcnktcmVzdWx0cy1jdHInKVxuXG5jb25zdCByZXN1bHRFbHMgPSB7XG5cdGxvY2F0aW9uOiBwcmltYXJ5UmVzdWx0Q3RyLnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbicpLFxuXHRtYWluVGVtcDogcHJpbWFyeVJlc3VsdEN0ci5xdWVyeVNlbGVjdG9yKCcubWFpbi10ZW1wJyksXG5cdHRlbXBJY29uOiBwcmltYXJ5UmVzdWx0Q3RyLnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRlbXAtaWNvbiBpJyksXG5cdHRlbXBVbml0Q3RyczogW1xuXHRcdHByaW1hcnlSZXN1bHRDdHIucXVlcnlTZWxlY3RvcignLm1haW4tdGVtcC11bml0JyksXG5cdFx0Li4ucHJpbWFyeVJlc3VsdEN0ci5xdWVyeVNlbGVjdG9yQWxsKCcuc2Vjb25kYXJ5LXRlbXAtY3RyIC51bml0JyksXG5cdF0sXG5cdGRlc2NyaXB0aW9uOiBwcmltYXJ5UmVzdWx0Q3RyLnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLWRlc2NyaXB0aW9uJyksXG5cdGZlZWxUZW1wOiBwcmltYXJ5UmVzdWx0Q3RyLnF1ZXJ5U2VsZWN0b3IoJy5mZWVsLXRlbXAnKSxcblx0bWluVGVtcDogcHJpbWFyeVJlc3VsdEN0ci5xdWVyeVNlbGVjdG9yKCcubWluLXRlbXAnKSxcblx0bWF4VGVtcDogcHJpbWFyeVJlc3VsdEN0ci5xdWVyeVNlbGVjdG9yKCcubWF4LXRlbXAnKSxcblx0aHVtaWRpdHk6IHJlbWFpbmluZ1Jlc3VsdHNDdHIucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5JyksXG5cdHByZXNzdXJlOiByZW1haW5pbmdSZXN1bHRzQ3RyLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzc3VyZScpLFxuXHRjbG91ZHM6IHJlbWFpbmluZ1Jlc3VsdHNDdHIucXVlcnlTZWxlY3RvcignLmNsb3VkJyksXG5cdHZpc2liaWxpdHk6IHJlbWFpbmluZ1Jlc3VsdHNDdHIucXVlcnlTZWxlY3RvcignLnZpc2liaWxpdHknKSxcblx0d2luZFNwZWVkOiByZW1haW5pbmdSZXN1bHRzQ3RyLnF1ZXJ5U2VsZWN0b3IoJy53aW5kLXNwZWVkJyksXG5cdHdpbmREZWc6IHJlbWFpbmluZ1Jlc3VsdHNDdHIucXVlcnlTZWxlY3RvcignLndpbmQtZGVncmVlJyksXG5cdHdpbmRJY29uOiByZW1haW5pbmdSZXN1bHRzQ3RyLnF1ZXJ5U2VsZWN0b3IoJy53aW5kLWN0ciBpJyksXG59XG5cbi8vIGV2ZW50c1xuXG5jb25zdCBjaXR5QWRkZWRFdmVudCA9IGNyZWF0ZUV2ZW50KClcblxuZnVuY3Rpb24gaGFuZGxlRm9ybVN1Ym1pdChlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKVxuXHRjb25zdCBjaXR5ID0gY2l0eUlucHV0LnZhbHVlLnRyaW0oKVxuXHRpZiAoIWNpdHkpIHtcblx0XHRmb3JtRXJyTXNnRWwudGV4dENvbnRlbnQgPSAnY2l0eSBuYW1lIGlzIHJlcXVpcmVkJ1xuXHRcdHJldHVyblxuXHR9XG5cdGNvbnN0IHVuaXQgPSB1bml0Q0lucHV0LmNoZWNrZWQgPyAnQycgOiAnRidcblxuXHRjaXR5SW5wdXQudmFsdWUgPSAnJ1xuXHRmb3JtRXJyTXNnRWwudGV4dENvbnRlbnQgPSAnJ1xuXG5cdGNpdHlBZGRlZEV2ZW50LnRyaWdnZXIoe1xuXHRcdGNpdHksXG5cdFx0dW5pdCxcblx0fSlcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVSZXN1bHRzKHJlc3VsdHMpIHtcblx0cmVzdWx0RWxzLmRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcmVzdWx0cy5kZXNjcmlwdGlvblxuXHRyZXN1bHRFbHMubG9jYXRpb24udGV4dENvbnRlbnQgPSByZXN1bHRzLmxvY2F0aW9uXG5cdHJlc3VsdEVscy5wcmVzc3VyZS50ZXh0Q29udGVudCA9IHJlc3VsdHMucHJlc3N1cmVcblx0cmVzdWx0RWxzLndpbmREZWcudGV4dENvbnRlbnQgPSByZXN1bHRzLndpbmQuZGVnXG5cdHJlc3VsdEVscy53aW5kU3BlZWQudGV4dENvbnRlbnQgPSByZXN1bHRzLndpbmQuc3BlZWRcblx0cmVzdWx0RWxzLnZpc2liaWxpdHkudGV4dENvbnRlbnQgPSByZXN1bHRzLnZpc2liaWxpdHlcblx0cmVzdWx0RWxzLmh1bWlkaXR5LnRleHRDb250ZW50ID0gcmVzdWx0cy5odW1pZGl0eVxuXHRyZXN1bHRFbHMuY2xvdWRzLnRleHRDb250ZW50ID0gcmVzdWx0cy5jbG91ZHNcblx0cmVzdWx0RWxzLm1pblRlbXAudGV4dENvbnRlbnQgPSByZXN1bHRzLnRlbXAubWluXG5cdHJlc3VsdEVscy5tYXhUZW1wLnRleHRDb250ZW50ID0gcmVzdWx0cy50ZW1wLm1heFxuXHRyZXN1bHRFbHMuZmVlbFRlbXAudGV4dENvbnRlbnQgPSByZXN1bHRzLnRlbXAuZmVlbHNcblx0cmVzdWx0RWxzLm1haW5UZW1wLnRleHRDb250ZW50ID0gcmVzdWx0cy50ZW1wLm1haW5cblx0cmVzdWx0RWxzLnRlbXBVbml0Q3Rycy5mb3JFYWNoKHVuaXRFbCA9PiB7XG5cdFx0dW5pdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VuaXQtYycsICd1bml0LWYnKVxuXHRcdHVuaXRFbC5jbGFzc0xpc3QuYWRkKGB1bml0LSR7cmVzdWx0cy51bml0LnRvTG93ZXJDYXNlKCl9YClcblx0fSlcblx0cmVzdWx0RWxzLnRlbXBJY29uLmNsYXNzTmFtZSA9IGB3aSB3aS1vd20tJHtyZXN1bHRzLmlzTmlnaHQgPyAnbmlnaHQnIDogJ2RheSd9LSR7cmVzdWx0cy5pZH1gXG5cdHJlc3VsdEVscy53aW5kSWNvbi5jbGFzc05hbWUgPSBgaWNvbiB3aSB3aS13aW5kIHRvd2FyZHMtJHtyZXN1bHRzLndpbmQuZGVnfS1kZWdgXG59XG5cbmZ1bmN0aW9uIHJlc2V0VmlldygpIHtcblx0aW5pdGlhbEVsLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpXG5cdHByaW1hcnlSZXN1bHRDdHIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJylcblx0bm90Rm91bmRDaXR5RWwuY2xhc3NMaXN0LmFkZCgnZC1ub25lJylcblx0Y29ubmVjdGlvbkVycm9yRWwuY2xhc3NMaXN0LmFkZCgnZC1ub25lJylcblx0cmVtYWluaW5nUmVzdWx0c0N0ci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXHRzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NwaW5uaW5nJylcblx0Z2lmLnNyYyA9ICcjJ1xufVxuXG5mdW5jdGlvbiBzcGluKCkge1xuXHRyZXNldFZpZXcoKVxuXHRpbml0aWFsRWwuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJylcblx0c3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdzcGlubmluZycpXG59XG5cbmZ1bmN0aW9uIHNob3dSZXN1bHRzKHJlc3VsdHMpIHtcblx0cG9wdWxhdGVSZXN1bHRzKHJlc3VsdHMpXG5cdHJlc2V0VmlldygpXG5cdHByaW1hcnlSZXN1bHRDdHIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJylcblx0cmVtYWluaW5nUmVzdWx0c0N0ci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxufVxuXG5mdW5jdGlvbiBzaG93Q29ubmVjdGlvbkVycm9yKCkge1xuXHRyZXNldFZpZXcoKVxuXHRjb25uZWN0aW9uRXJyb3JFbC5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKVxufVxuXG5mdW5jdGlvbiBzaG93Q2l0eU5hbWVFcnJvcigpIHtcblx0cmVzZXRWaWV3KClcblx0bm90Rm91bmRDaXR5RWwuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJylcbn1cblxuZnVuY3Rpb24gc2V0R2lmVXJsKHVybCkge1xuXHRnaWYuc3JjID0gdXJsXG59XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlRm9ybVN1Ym1pdClcbmV4cG9ydCB7XG5cdHNldEdpZlVybCxcblx0c3Bpbixcblx0c2hvd1Jlc3VsdHMsXG5cdHNob3dDb25uZWN0aW9uRXJyb3IsXG5cdHNob3dDaXR5TmFtZUVycm9yLFxuXHRjaXR5QWRkZWRFdmVudCxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ29ubmVjdGlvbkVycm9yLCBnZXRKc29uLCBIdHRwRXJyb3IgfSBmcm9tICcuL3JlcXVlc3RzJ1xuaW1wb3J0IHtcblx0c2hvd0NpdHlOYW1lRXJyb3IsXG5cdHNob3dSZXN1bHRzLFxuXHRzaG93Q29ubmVjdGlvbkVycm9yLFxuXHRzcGluLFxuXHRzZXRHaWZVcmwsXG5cdGNpdHlBZGRlZEV2ZW50LFxufSBmcm9tICcuL3ZpZXcnXG5cbmxldCBhY3RpdmVSZXF1ZXN0SWQgPSAwXG5cbmZ1bmN0aW9uIGV4dHJhY3RXZWF0aGVyRGF0YSh3ZWF0aGVyUmVzcG9uc2UsIHVuaXQpIHtcblx0Y29uc3Qge1xuXHRcdG5hbWU6IGNpdHksXG5cdFx0c3lzOiB7IGNvdW50cnksIHN1bnJpc2UsIHN1bnNldCB9LFxuXHRcdHdlYXRoZXI6IFt7IGlkLCBkZXNjcmlwdGlvbiB9XSxcblx0XHR2aXNpYmlsaXR5LFxuXHRcdHdpbmQsXG5cdFx0Y2xvdWRzOiB7IGFsbDogY2xvdWRzIH0sXG5cdFx0bWFpbjoge1xuXHRcdFx0cHJlc3N1cmUsIGh1bWlkaXR5LFxuXHRcdFx0dGVtcDogbWFpblRlbXAsXG5cdFx0XHRmZWVsc19saWtlOiB0ZW1wRmVlbCxcblx0XHRcdHRlbXBfbWluOiBtaW5UZW1wLFxuXHRcdFx0dGVtcF9tYXg6IG1heFRlbXAsXG5cdFx0fSxcblx0fSA9IHdlYXRoZXJSZXNwb25zZVxuXG5cdC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3RicmFueWVuLzYyZDk3NDY4MWRlYThlZTBjYWExP3Blcm1hbGlua19jb21tZW50X2lkPTI1Njg2NDMjZ2lzdGNvbW1lbnQtMjU2ODY0M1xuXHRjb25zdCBub3dUaW1lc3RhbXAgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKVxuXHRjb25zdCBpc05pZ2h0ID0gIShub3dUaW1lc3RhbXAgPj0gc3VucmlzZSAmJiBub3dUaW1lc3RhbXAgPD0gc3Vuc2V0KVxuXHRyZXR1cm4ge1xuXHRcdGlkLFxuXHRcdGlzTmlnaHQsXG5cdFx0dW5pdCxcblx0XHRkZXNjcmlwdGlvbixcblx0XHRsb2NhdGlvbjogYCR7Y2l0eX0sICR7Y291bnRyeX1gLFxuXHRcdHRlbXA6IHtcblx0XHRcdG1haW46IG1haW5UZW1wLFxuXHRcdFx0bWluOiBtaW5UZW1wLFxuXHRcdFx0bWF4OiBtYXhUZW1wLFxuXHRcdFx0ZmVlbHM6IHRlbXBGZWVsLFxuXHRcdH0sXG5cdFx0cHJlc3N1cmUsXG5cdFx0d2luZCxcblx0XHR2aXNpYmlsaXR5LFxuXHRcdGh1bWlkaXR5LFxuXHRcdGNsb3Vkcyxcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRHaXBoeShxdWVyeSkge1xuXHRjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvdHJhbnNsYXRlP2FwaV9rZXk9MXFtbzR5VHJBR3FOWlhabDVEQ1VVNVpETnFkYWc0Z3Mmcz13ZWF0aGVyK2F0bW9zcGhlcmUrJHtxdWVyeX1gXG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRKc29uKHVybClcblx0XHRyZXR1cm4gcmVzcG9uc2UuZGF0YS5pbWFnZXMub3JpZ2luYWwudXJsXG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKHsgY2l0eSwgdW5pdCB9KSB7XG5cdGNvbnN0IGFwaVVuaXQgPSB1bml0LnRvTG93ZXJDYXNlKCkgPT09ICdjJyA/ICdtZXRyaWMnIDogJ2ltcGVyaWFsJ1xuXHRjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPSR7YXBpVW5pdH0mYXBwaWQ9YTY1NDA0ODAzOTEyNzc1NzdjOWVhY2I3OWFjMmZiNjRgXG5cdHJldHVybiB7IHVuaXQsIC4uLmF3YWl0IGdldEpzb24odXJsKSB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3MoeyBjaXR5LCB1bml0IH0sIHJlcXVlc3RJZCkge1xuXHRzcGluKClcblxuXHRsZXQgd2VhdGhlclJlc3BvbnNlXG5cblx0dHJ5IHtcblx0XHR3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBnZXRXZWF0aGVyKHsgY2l0eSwgdW5pdCB9KVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChhY3RpdmVSZXF1ZXN0SWQgPT09IHJlcXVlc3RJZCkge1xuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgQ29ubmVjdGlvbkVycm9yKSBzaG93Q29ubmVjdGlvbkVycm9yKClcblx0XHRcdGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yKSBzaG93Q2l0eU5hbWVFcnJvcigpXG5cdFx0fVxuXHRcdHJldHVyblxuXHR9XG5cblx0aWYgKGFjdGl2ZVJlcXVlc3RJZCAhPT0gcmVxdWVzdElkKSByZXR1cm5cblxuXHRjb25zdCBnaXBoeVByb21pc2UgPSBnZXRHaXBoeShgJHt3ZWF0aGVyUmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbn1gKVxuXHRzaG93UmVzdWx0cyhleHRyYWN0V2VhdGhlckRhdGEod2VhdGhlclJlc3BvbnNlLCB1bml0KSlcblx0Y29uc3QgZ2lmVXJsID0gYXdhaXQgZ2lwaHlQcm9taXNlXG5cblx0aWYgKGFjdGl2ZVJlcXVlc3RJZCAhPT0gcmVxdWVzdElkIHx8IGdpZlVybCA9PT0gbnVsbCkgcmV0dXJuXG5cblx0c2V0R2lmVXJsKGdpZlVybClcbn1cblxuY2l0eUFkZGVkRXZlbnQuYWRkTGlzdGVuZXIoZm9ybURhdGEgPT4ge1xuXHRhY3RpdmVSZXF1ZXN0SWQgKz0gMVxuXHRwcm9jZXNzKGZvcm1EYXRhLCBhY3RpdmVSZXF1ZXN0SWQpXG59KVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9