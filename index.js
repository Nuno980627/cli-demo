#!/usr/bin/env node

// var program = require("commander"); //commonder.js解析用户的参数
// var download = require("download-git-repo"); //从github 下载包
// var inquirer = require("inquirer"); // inquirerjs 命令行交互包
// var ora =require("ora")// 加载spinner样式
// const {chalk} = require("chalk");
import {program} from "commander"//commonder.js解析用户的参数
import download from "download-git-repo"//从github 下载包
import inquirer from "inquirer"// inquirerjs 命令行交互包
import ora from "ora"// 加载spinner样式
import chalk from "chalk" //增加命令行输出的颜色

//console.log("write cli")
// 获取用户携带的参数
//go-cli init list help
//console.log(process.argv)
program.version("0.1.0");

program
  .command("setup <source>") //<>必填参数 []选填参数
  .description("初始化项目")
  .action((source) => {
     const spinner=ora('正在下载...').start()
    // console.log(source);
    setTimeout(() => {
      spinner.succeed()
    }, 3000);
  });
program
  .command("list") //<>必填参数 []选填参数
  .description("展示列表")
  .action(() => {
    //inquirer 问题规则
    const promptList = [
      {
        type: "input",
        message: "设置一个用户名:",
        name: "name",
        default: "test_user", // 默认值
      },
    ];
    //可以考虑用handlebars做模板引擎的替换
    //执行问题
    inquirer.prompt(promptList).then((answers) => {
      //输出黄色文字
      console.log(chalk.yellow(JSON.stringify(answers))); // 返回的结果
    });
  });
program
  .command("download <name>") //<>必填参数 []选填参数
  .description("下载模板到本地")
  .action((name) => {
    //download
    //第一个参数，下载地址
    //第二个参数，下载路径
    download(
      "direct:https://gitee.com/panjiachen/vue-element-admin.git",
      name,
      { clone: true },
      function (err) {
        console.log(err);
      }
    );
  });
program.parse(process.argv);
