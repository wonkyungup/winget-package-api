import * as cheerio from 'cheerio'
import axios from 'axios'
import Defs from './constants'
import zlib from 'zlib'

const exceptList = ['', '. .', '.validation']

export default class App {
    constructor({ owner, product }) {
        this.owner = owner
        this.product = product
        this.versions = []
        this.files = []
    }

    onError (msg) {
        throw new Error(`ERROR :: RETRIEVE :: ${msg}`)
    }

    async $ (version, file) {
        try {
            let uri = `${Defs.WINGET_URL}/${await this.getFirstLetter()}/${this.owner}/${this.product}`
            let result

            if (version && !file) {
                uri = `${uri}/${version}`
            }

            if (version && file) {
                uri = `${uri}/${version}/${file}`
            }

            result = await axios.get(uri, { [Defs.STR_RESPONSE_TYPE]: Defs.STR_ARRAY_BUFFER })
            result = zlib.unzipSync(result['data'])
            return cheerio.load(result)
        } catch (err) {
            this.onError(err['message'])
        }
    }

    async getFirstLetter (){
        try {
            return this.owner.substring(0, 1).toLowerCase()
        } catch (err) {
            this.onError(err['message'])
        }
    }

    getAppName () {
        return this.product
    }

    getAppOwner () {
        return this.owner
    }

    async getAppVersions () {
        try {
            const _$ = await this.$()
            const $versions = _$("[data-test-selector='subdirectory-container']").find("[aria-labelledby='files']")

            $versions.children("[role='row']").each((index, row) => {
                const version = _$(row).find('span').eq(0).text().trim()

                if (!exceptList.includes(version)) {
                    this.versions.push(version)
                }
            })

            this.versions = this.versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
            return this.versions
        } catch (err) {
            this.onError(err['message'])
        }
    }

    async getAppLastPackageFiles () {
        try {
            const _$ = await this.$(this.versions[0])
            const $files = _$("[data-test-selector='subdirectory-container']").find("[aria-labelledby='files']")

            $files.children("[role='row']").each((index, row) => {
                const file = _$(row).find('span').eq(0).text().trim()

                if (!exceptList.includes(file)) {
                    this.files.push(file)
                }
            })

            return this.files
        } catch (err) {
            this.onError(err['message'])
        }
    }

    async getAppLastPackageFileContent (file) {
        try {
            const _$ = await this.$(this.versions[0], file)
            const $text = _$("[itemprop='text']").find("tbody")

            const obj = {}
            $text.children("tr").each((index, tr) => {
                index++
                if (index > 3) {
                    const td = _$(tr).find(`#LC${index}`)
                    const key = td.find('span').eq(0).text().replace(/[^a-zA-Z0-9]/g, '')
                    const value = td.find('span').eq(1).text()

                    if (key && value) {
                        obj[key] = value.replace(/[^a-zA-Z0-9.:///&-]/g, '')
                    }
                }
            })

            return obj
        } catch (err) {
            this.onError(err['message'])
        }
    }
}
