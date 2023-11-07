#!/usr/bin/env node

// 显示 loading 动画
import ora from 'ora'
// 用来下载远程模板
import download from 'download-git-repo'
// 用来下载远程模板
import symbols from 'log-symbols'
// 显示 loading 动画
import chalk from 'chalk'
import fs from 'fs'

export default function create([projectName]) {

  // 第一个参数是 project-name
  if (!projectName) {
    console.log(chalk.red("\nError command: a2n-cli create <project-name>, project-name can't be empty! "))
    return
  }

  if (fs.existsSync(`./${projectName}`)) {
    console.log(chalk.red(symbols.error), chalk.red(`Folder ${projectName} already exists`))
    return
  }

  const templateUrl = 'https://github.com/lwq0615/a2n-template.git'
  console.log("download from '" + templateUrl + "'")

  console.log(chalk.green('\n Start generating... \n'))
  // 出现加载图标
  const spinner = ora('Downloading...')
  spinner.start()

  // 下载项目模板代码
  download("direct:" + templateUrl, `./${projectName}`, { clone: true }, (err) => {
    if (err) {
      spinner.fail()
      console.log(chalk.red(symbols.error), chalk.red(`Generation failed. ${err}`))
      return
    }
    // 读取package.json文件
    fs.readFile(`./${projectName}/package.json`, 'utf-8', (err, data) => {
      if (err) console.log(chalk.red(symbols.error), chalk.red(err))
      // 更换项目name
      const pkg = JSON.parse(data)
      pkg.name = projectName
      fs.writeFileSync(`./${projectName}/package.json`, JSON.stringify(pkg, null, 2), {
        encoding: 'utf-8'
      }, (err) => {
        spinner.fail()
        console.log(chalk.red(symbols.error), chalk.red(`package.json rename failed. ${err}`))
        return
      })
    })
    // 结束加载图标
    spinner.succeed()
    console.log(chalk.green(symbols.success), chalk.green('Generation completed!'))
    console.log('\n a2n init done')
  })

}