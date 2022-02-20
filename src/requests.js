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

export { getJson, HttpError, ConnectionError }
