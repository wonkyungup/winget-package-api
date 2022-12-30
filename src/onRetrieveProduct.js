'use strict'

import Res from '../assets/response'

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        return Res.success(event)
    } catch (err) {
        return REResSP.error()
    }
}