'use strict'

import Response from './assets/response'
import Defs from './assets/constants'
import App from './assets/app'

export const index = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const winget = {}

    try {
        const app = new App(event["pathParameters"])

        winget['name'] = app.getAppName()
        winget['owner'] = app.getAppOwner()
        winget['versions'] = await app.getAppVersions()
        winget['last_package'] = {
            version: winget['versions'][0],
            content: await app.getAppLastPackage(winget['versions'][0])
        }

        return Response.success(winget)
    } catch (err) {
        return Response.error(Defs.WINGET_CATCH_ERROR_OWNER)
    }
}
