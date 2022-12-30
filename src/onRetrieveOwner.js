'use strict'

import Res from '../assets/response'
import axios from 'axios'
import zlib from 'zlib'
import * as cheerio from 'cheerio'

const onError = (msg) => {
    throw new Error(`ERROR :: RETRIEVE :: OWNER :: ${msg}`)
}

const getFirstLetter = async (owner) => {
    return owner.substring(0, 1).toLocaleLowerCase()
}

const getGunzipSync = (owner) => {
    return new Promise(async (resolve, reject) => {
        try {
            const html = await axios.get(`https://github.com/microsoft/winget-pkgs/tree/master/manifests/${await getFirstLetter(owner)}/${owner}`, { responseType: 'arraybuffer' })
            zlib.gunzip(html.data, (err, output) => {
                if (err) {
                    throw new Error('zlib error')
                }
                resolve(output.toString())
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    const app = {}

    try {
        const { owner } = event["pathParameters"]
        if (!owner) {
            onError('Owner retrieve :: failed')
        }

        app['owner'] = owner
        app['main'] = await getGunzipSync(owner)

        return Res.success(app)
    } catch (err) {
        return Res.error(err['message'])
    }
}
