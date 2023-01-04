import * as cheerio from 'cheerio'
import axios from 'axios'
import Defs from './constants'
import zlib from 'zlib'

export default class App {
    constructor({ owner, product }) {
        this.owner = owner
        this.product = product
    }

    onError (msg) {
        throw new Error(`ERROR :: RETRIEVE :: ${msg}`)
    }

    async $ () {
        let html = await axios.get(`${Defs.WINGET_URL}/${await this.getFirstLetter()}/${this.owner}/${this.product}`, { [Defs.STR_RESPONSE_TYPE]: Defs.STR_ARRAY_BUFFER })
        html = zlib.unzipSync(html['data'])
        return cheerio.load(html)
    }

    async getFirstLetter (){
        return this.owner.substring(0, 1).toLowerCase()
    }

    getAppName () {
        return this.product
    }

    getAppOwner () {
        return this.owner
    }

    async getAppVersions () {
        const _$ = await this.$()
        const $versions = _$("[data-test-selector='subdirectory-container']").find("[aria-labelledby='files']")
        const list = []

        $versions.children("[role='row']").each((index, row) => {
            if (index > 1) {
                list.push(_$(row).find('span').text())
            }
        })

        return list.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    }
}
