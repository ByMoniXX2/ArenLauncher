/**
 * Mojang
 * 
 * This module serves as a minimal wrapper for Mojang's REST api.
 * 
 * @module mojang
 */
// Requirements
const request = require('request')
const logger  = require('./loggerutil')('%c[Mojang]', 'color: #a02d2a; font-weight: bold')

// Constants
const minecraftAgent = {
    name: 'Minecraft',
    version: 1
}
const authpath = 'https://authserver.mojang.com'
const statuses = [
    {
<<<<<<< HEAD
        service: 'session.minecraft.net',
        status: 'grey',
        name: 'Sessions multijoueurs',
        essential: true
    },
    {
        service: 'authserver.mojang.com',
        status: 'grey',
        name: "Serveurs d'authentification",
=======
        service: 'authserver.mojang.com',
        status: 'grey',
        name: 'Autentificacion',
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
        essential: true
    },
    {
        service: 'textures.minecraft.net',
        status: 'grey',
<<<<<<< HEAD
        name: 'Skins Minecraft',
=======
        name: 'Skins de Minecraft',
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
        essential: false
    },
    {
        service: 'api.mojang.com',
        status: 'grey',
<<<<<<< HEAD
        name: 'API Publique',
=======
        name: 'API Publica',
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
        essential: false
    },
    {
        service: 'minecraft.net',
        status: 'grey',
        name: 'Minecraft.net',
        essential: false
    },
    {
        service: 'account.mojang.com',
        status: 'grey',
<<<<<<< HEAD
        name: 'Site des comptes Mojang',
=======
        name: 'Website de cuentas de Mojang',
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
        essential: false
    }
]

// Functions

/**
 * Converts a Mojang status color to a hex value. Valid statuses
 * are 'green', 'yellow', 'red', and 'grey'. Grey is a custom status
 * to our project which represents an unknown status.
 * 
 * @param {string} status A valid status code.
 * @returns {string} The hex color of the status code.
 */
exports.statusToHex = function(status){
    switch(status.toLowerCase()){
        case 'green':
            return '#4ddd19'
        case 'yellow':
            return '#eac918'
        case 'red':
            return '#c32625'
        case 'grey':
        default:
            return '#848484'
    }
}

/**
 * Retrieves the status of Mojang's services.
 * The response is condensed into a single object. Each service is
 * a key, where the value is an object containing a status and name
 * property.
 * 
 * @see http://wiki.vg/Mojang_API#API_Status
 */
exports.status = function(){
    return new Promise((resolve, reject) => {
        request.get('https://status.mojang.com/check',
            {
                json: true,
                timeout: 10000
            },
            function(error, response, body){

                if(error || response.statusCode !== 200){
                    logger.warn('Unable to retrieve Mojang status.')
                    logger.debug('Error while retrieving Mojang statuses:', error)
                    //reject(error || response.statusCode)
                    for(let i=0; i<statuses.length; i++){
                        statuses[i].status = 'grey'
                    }
                    resolve(statuses)
                } else {
                    for(let i=0; i<body.length; i++){
                        const key = Object.keys(body[i])[0]
                        inner:
                        for(let j=0; j<statuses.length; j++){
                            if(statuses[j].service === key) {
                                statuses[j].status = body[i][key]
                                break inner
                            }
                        }
                    }
                    resolve(statuses)
                }
            })
    })
}

/**
 * Authenticate a user with their Mojang credentials.
 * 
 * @param {string} username The user's username, this is often an email.
 * @param {string} password The user's password.
 * @param {string} clientToken The launcher's Client Token.
 * @param {boolean} requestUser Optional. Adds user object to the reponse.
 * @param {Object} agent Optional. Provided by default. Adds user info to the response.
 * 
 * @see http://wiki.vg/Authentication#Authenticate
 */
exports.authenticate = function(username, password, clientToken, requestUser = true, agent = minecraftAgent){
    return new Promise((resolve, reject) => {

        const body = {
            agent,
            username,
            password,
            requestUser
        }
        if(clientToken != null){
            body.clientToken = clientToken
        }

        request.post(authpath + '/authenticate',
            {
                json: true,
                body
            },
            function(error, response, body){
                if(error){
                    logger.error('Error durante la autentificacion.', error)
                    reject(error)
                } else {
                    if(response.statusCode === 200){
                        resolve(body)
                    } else {
                        reject(body || {code: 'ENOTFOUND'})
                    }
                }
            })
    })
}

/**
 * Validate an access token. This should always be done before launching.
 * The client token should match the one used to create the access token.
 * 
 * @param {string} accessToken The access token to validate.
 * @param {string} clientToken The launcher's client token.
 * 
 * @see http://wiki.vg/Authentication#Validate
 */
exports.validate = function(accessToken, clientToken){
    return new Promise((resolve, reject) => {
        request.post(authpath + '/validate',
            {
                json: true,
                body: {
                    accessToken,
                    clientToken
                }
            },
            function(error, response, body){
                if(error){
                    logger.error('Error durante la validacion.', error)
                    reject(error)
                } else {
                    if(response.statusCode === 403){
                        resolve(false)
                    } else {
                    // 204 if valid
                        resolve(true)
                    }
                }
            })
    })
}

/**
 * Invalidates an access token. The clientToken must match the
 * token used to create the provided accessToken.
 * 
 * @param {string} accessToken The access token to invalidate.
 * @param {string} clientToken The launcher's client token.
 * 
 * @see http://wiki.vg/Authentication#Invalidate
 */
exports.invalidate = function(accessToken, clientToken){
    return new Promise((resolve, reject) => {
        request.post(authpath + '/invalidate',
            {
                json: true,
                body: {
                    accessToken,
                    clientToken
                }
            },
            function(error, response, body){
                if(error){
                    logger.error('Error durante la invalidacion.', error)
                    reject(error)
                } else {
                    if(response.statusCode === 204){
                        resolve()
                    } else {
                        reject(body)
                    }
                }
            })
    })
}

/**
 * Refresh a user's authentication. This should be used to keep a user logged
 * in without asking them for their credentials again. A new access token will
 * be generated using a recent invalid access token. See Wiki for more info.
 * 
 * @param {string} accessToken The old access token.
 * @param {string} clientToken The launcher's client token.
 * @param {boolean} requestUser Optional. Adds user object to the reponse.
 * 
 * @see http://wiki.vg/Authentication#Refresh
 */
exports.refresh = function(accessToken, clientToken, requestUser = true){
    return new Promise((resolve, reject) => {
        request.post(authpath + '/refresh',
            {
                json: true,
                body: {
                    accessToken,
                    clientToken,
                    requestUser
                }
            },
            function(error, response, body){
                if(error){
                    logger.error('Error during refresh.', error)
                    reject(error)
                } else {
                    if(response.statusCode === 200){
                        resolve(body)
                    } else {
                        reject(body)
                    }
                }
            })
    })
}