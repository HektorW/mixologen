import type { Handle } from '@sveltejs/kit'

import { createLogger } from '$lib/createLogger'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.requestId = crypto.randomUUID()

	const { log, time } = createLogger('hooks.server', event.locals.requestId)

	log('handle', { route: event.route })

	const endHandleResolveTime = time('handle resolve')
	const response = await resolve(event)
	endHandleResolveTime()

	response.headers.set('x-request-id', event.locals.requestId)

	return response
}
