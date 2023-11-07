#!/usr/bin/env node

import { program } from 'commander'
import create from './create.js'
import chalk from 'chalk'
import pkg from '../package.json' assert { type: 'json' }

(function () {

  chalk.level = 1
  program.name('a2n-cli')
    .version(pkg.version)
    .usage('<command> <options>')
  program.command('create')
    .description('创建应用(options: [project-name])')
    .action((options, command) => {
      create(command.args)
    })
  program.parse(process.argv)
  // 当没有输入参数的时候给个提示
  if (program.args.length < 1) return program.help()

})()