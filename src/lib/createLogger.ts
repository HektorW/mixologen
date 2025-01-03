export function createLogger(baseMessage: string, requestId: string | null = null) {
	const transformedBaseMessage = requestId
		? `[${requestId}] ${baseMessage} - `
		: `${baseMessage} - `

	function log(message: string, ...args: any[]) {
		console.log(`${transformedBaseMessage}${message}`, ...args)
	}

	function time(message: string) {
		console.time(`${transformedBaseMessage}${message}`)
		return () => {
			console.timeEnd(`${transformedBaseMessage}${message}`)
		}
	}

	function timeFn<T>(message: string, fn: () => T) {
		console.time(`${transformedBaseMessage}${message}`)
		const result = fn()
		console.timeEnd(`${transformedBaseMessage}${message}`)
		return result
	}

	function timeFnAsync<T>(message: string, fn: () => Promise<T>) {
		console.time(`${transformedBaseMessage}${message}`)
		return fn().finally(() => {
			console.timeEnd(`${transformedBaseMessage}${message}`)
		})
	}

	return {
		log,
		time,
		timeFn,
		timeFnAsync
	}
}
