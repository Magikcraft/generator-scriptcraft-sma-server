"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
	prompting() {
		this.log(
			yosay(
				`Welcome to the ${chalk.red(
					"Scriptcraft SMA Server Config"
				)} generator by Magikcraft.io!`
			)
		);

		const prompts = [
			{
				type: "input",
				name: "serverName",
				message: "What is this server config called?",
				default: "sma-server"
			},
			{
				type: "input",
				name: "port",
				message: "What port will it run on?",
				default: "25565"
			},
			{
				type: "input",
				name: "packages",
				message:
					"What SMA packages do you want installed (comma-separated)?",
				default: "@magikcraft/mct1"
			}
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		this.fs.extendJSON(this.destinationPath("package.json"), {
			name: this.props.serverName,
			version: "1.0.0",
			description: this.props.description,
			keywords: "scriptcraft, scriptcraft-sma, server",
			author: "",
			license: "ISC",
			smaServer: {
				dockerTag: "latest",
				port: this.props.port,
				serverName: this.props.serverName
			}
		});
	}

	install() {
		this.npmInstall(this.props.packages.split(","));
	}
};