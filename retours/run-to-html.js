require('./to-html').doExport(process.argv[2])
    .catch(e => {
        console.error(e)
    })
