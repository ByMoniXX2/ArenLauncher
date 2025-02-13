// Work in progress
const logger = require('./loggerutil')('%c[DiscordWrapper]', 'color: #7289da; font-weight: bold')

const {Client} = require('discord-rpc')

let client
let activity

<<<<<<< HEAD
exports.initRPC = function(genSettings, servSettings, initialDetails = 'En attente du client...'){
=======
exports.initRPC = function(genSettings, servSettings, initialDetails = 'Tramitando en la aduana...'){
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
    client = new Client({ transport: 'ipc' })

    activity = {
        details: initialDetails,
<<<<<<< HEAD
        largeImageKey: genSettings.smallImageKey,
        largeImageText: genSettings.smallImageText,
=======
        state: 'Servidor: ' + servSettings.shortId,
        largeImageKey: servSettings.largeImageKey,
        largeImageText: servSettings.largeImageText,
        smallImageKey: genSettings.smallImageKey,
        smallImageText: genSettings.smallImageText,
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
        startTimestamp: new Date().getTime(),
        instance: false
    }

    client.on('ready', () => {
        logger.log('Discord RPC conectado')
        client.setActivity(activity)
    })
    
    client.login({clientId: genSettings.clientId}).catch(error => {
        if(error.message.includes('ENOENT')) {
            logger.log('Unable to initialize Discord Rich Presence, no client detected.')
        } else {
            logger.log('Unable to initialize Discord Rich Presence: ' + error.message, error)
        }1
    })
}

exports.updateState = function(state){
    if(client){
        activity.state = state
        client.setActivity(activity)
        logger.log('Updated discord state to: ' + state)
    }
}

exports.clearState = function(){
    if(client){
        activity = {
            details: activity.details,
            largeImageKey: activity.largeImageKey,
            largeImageText: activity.largeImageText,
            startTimestamp: activity.startTimestamp,
            instance: activity.instance
        }
        client.setActivity(activity)
        logger.log('Cleared the activity state!')
    }  
}

exports.clearDetails = function(){
    if(client){
        activity = {
            state: activity.state,
            largeImageKey: activity.largeImageKey,
            largeImageText: activity.largeImageText,
            startTimestamp: activity.startTimestamp,
            instance: activity.instance
        }
        logger.log('Cleared the activity details!')
    }
}

exports.resetTime = function(){
    if(client){
        activity.startTimestamp = new Date().getTime()
        client.setActivity(activity)
        logger.log('Reset the activity time!')
    }
}

exports.updateDetails = function(details){
    if(client){
        activity.details = details
        client.setActivity(activity)
        logger.log('Updated discord details to: ' + details)
    }
}

exports.shutdownRPC = function(){
    if(!client) return
    client.clearActivity()
    client.destroy()
    client = null
    activity = null
}

exports.getClient = function(){
    return client
}