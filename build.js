const builder = require('electron-builder')
const Platform = builder.Platform

function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('Cannot resolve current platform!')
            return undefined
    }
}

builder.build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    config: {
<<<<<<< HEAD
        appId: 'rtmclauncher',
        productName: 'RTMC Launcher',
        artifactName: '${productName}-setup-${version}.${ext}',
        copyright: 'Copyright © 2018-2020 Daniel Scalzi et GeekCorner',
=======
        appId: 'Aren Launcher',
        productName: 'Aren Launcher',
        artifactName: '${productName}-instalador-${version}.${ext}',
        copyright: 'Copyright © 2021 ByMoniXX',
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
        directories: {
            buildResources: 'build',
            output: 'dist'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64'
                }
            ]
        },
        nsis: {
            oneClick: false,
            perMachine: false,
            allowElevation: true,
            allowToChangeInstallationDirectory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.games'
        },
        linux: {
            target: 'AppImage',
<<<<<<< HEAD
            maintainer: 'GeekCorner',
            vendor: 'GeekCorner',
            synopsis: 'Launcher pour RTMC',
            description: 'Launcher pour RTMC permettant de rejoindre les différents modes de jeux..',
            category: 'Game',
            artifactName: '${productName}-linux-${version}.${ext}'
=======
            maintainer: 'ByMoniXX',
            vendor: 'ByMoniXX',
            synopsis: 'Launcher de Minecraft Modificado Para Tener Acceso A ArenServer',
            description: 'Launcher modificado que permite el acceso a ArenServer, las actualizaciones son automaticas.',
            category: 'Game'
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Build complete!')
}).catch(err => {
    console.error('Error during build!', err)
<<<<<<< HEAD
})
=======
})
>>>>>>> 84bce131c1b6d94e2fbe150ae671f30b387dc63b
