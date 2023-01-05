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

    async $ (target) {
        let uri = `${Defs.WINGET_URL}/${await this.getFirstLetter()}/${this.owner}/${this.product}`
        let result

        if (target) {
            uri = `${uri}/${target}`
        }

        result = await axios.get(uri, { [Defs.STR_RESPONSE_TYPE]: Defs.STR_ARRAY_BUFFER })
        result = zlib.unzipSync(result['data'])
        return cheerio.load(result)
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
        const exceptList = ['', '. .', '.validation']
        const list = []
        const $versions = _$("[data-test-selector='subdirectory-container']").find("[aria-labelledby='files']")

        $versions.children("[role='row']").each((index, row) => {
            const version = _$(row).find('span').eq(0).text().trim()

            if (!exceptList.includes(version)) {
                list.push(version)
            }
        })

        return list.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    }

    async getAppLastPackage (lastVersion) {
        const _$ = await this.$(lastVersion)
        return _$.text()
    }
}
