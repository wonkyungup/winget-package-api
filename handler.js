'use strict'

import Response from './assets/response'
import Defs from './assets/constants'
import axios from 'axios'
import zlib from 'zlib'
import * as cheerio from 'cheerio'

const onError = (msg) => {
    throw new Error(`ERROR :: RETRIEVE :: ${msg}`)
}

const getFirstLetter = async (owner) => {
    return owner.substring(0, 1).toLowerCase()
}

const getGunzipSync = async ({ owner, product }) => {
    try {
        const html = await axios.get(`${Defs.WINGET_URL}/${await getFirstLetter(owner)}/${owner}/${product}`, {
            responseType: Defs.ZLIB_RESPONSE_TYPE
        })

        return zlib.gunzipSync(html.data).toString()
    } catch (err) {
        onError(err['message'])
    }
}

export const index = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const app = {}

    try {
        const $ = cheerio.load(await getGunzipSync(event["pathParameters"]))
        const $main = $("[data-test-selector='subdirectory-container']")

        app['main'] = $main.html()

        return Response.success(app)
    } catch (err) {
        return Response.error(Defs.WINGET_CATCH_ERROR_OWNER)
    }
}
