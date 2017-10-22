#!/usr/bin/env node

const argv = require('yargs')
.usage('Usage: $0 <option>')
.option('solutiondata',{alias: "sd",describe: "Directory containing solution data"})

.option('cfsrfs',require('./verifiers/cfs-rfs-verifier.js'))
.option('pscfsres',require('./verifiers/product-service-resource-verifier.js'))
.option('servicequalification',require('./verifiers/service-qualification-verifier.js'))

.command(require('./commands/validate.js'))

.demandOption(['solutiondata'])
.argv
