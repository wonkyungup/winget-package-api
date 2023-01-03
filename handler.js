'use strict'

import Response from './assets/response'
import Defs from './assets/constants'
import axios from 'axios'
import * as cheerio from 'cheerio'
import * as zlib from 'zlib'

const onError = (msg) => {
    throw new Error(`ERROR :: RETRIEVE :: ${msg}`)
}

const getFirstLetter = async (owner) => {
    return owner.substring(0, 1).toLowerCase()
}

const getElement = async ({ owner, product }) => {
    try {
        const html = await axios.get(`${Defs.WINGET_URL}/${await getFirstLetter(owner)}/${owner}/${product}`, { [Defs.STR_RESPONSE_TYPE]: Defs.STR_ARRAY_BUFFER })
        return zlib.unzipSync(html['data'])
    } catch (err) {
        onError(err['message'])
    }
}

export const index = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const app = {}

    try {
        const $ = cheerio.load(await getElement(event["pathParameters"]))
        const $main = $("[data-test-selector='subdirectory-container']")

        app['main'] = $main.html()

        return Response.success(app)
    } catch (err) {
        return Response.error(Defs.WINGET_CATCH_ERROR_OWNER)
    }
}
