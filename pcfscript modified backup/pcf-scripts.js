#!/usr/bin/env node
"use strict";
// Copyright (C) Microsoft Corporation. All rights reserved.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const fs = require("fs");
const path = require("path");
const constants = require("../constants");
const taskRunner_1 = require("../taskRunner");
const taskGroup_1 = require("../taskGroup");
const manifestProcessor_1 = require("../manifestProcessor");
const apptelemetryclient_1 = require("../generated/apptelemetryclient");
RunAsync();
function RunAsync(customPath = "") {
	console.log(yargs_1.argv['customPath'] );
				
    return __awaiter(this, void 0, void 0, function* () {
        const version = (0, manifestProcessor_1.getPackageVersion)(constants.PCF_SCRIPTS_PACKAGE_NAME, process.cwd()) || '0.0.1';
        const telemetryClient = new apptelemetryclient_1.AppTelemetryClient('pcf-scripts', version);
        let result = {};
        let resultCode = 0;
        const startTime = Date.now();
        let customProperties = {};
        try {
            let buildSource = apptelemetryclient_1.BuildSource.NPM;
            if (yargs_1.argv['buildSource'] === apptelemetryclient_1.BuildSource[apptelemetryclient_1.BuildSource.VisualStudio]) {
                buildSource = apptelemetryclient_1.BuildSource.VisualStudio;
            }
            if (yargs_1.argv['buildSource'] === apptelemetryclient_1.BuildSource[apptelemetryclient_1.BuildSource.MSBuild]) {
                buildSource = apptelemetryclient_1.BuildSource.MSBuild;
            }
            customProperties = {
                'taskGroup': yargs_1.argv._[0],
                'buildSource': apptelemetryclient_1.BuildSource[buildSource]
            };
            if (process.env['PP_TOOLS_AUTOMATION_AGENT']) {
                customProperties['automationAgent'] = process.env['PP_TOOLS_AUTOMATION_AGENT'];
            }
            telemetryClient.trackEvent({ name: apptelemetryclient_1.TelemetryEvent[apptelemetryclient_1.TelemetryEvent.Start] });
            if (!yargs_1.argv._ || yargs_1.argv._.length === 0 || !Object.keys(taskGroup_1.standardTaskGroups).includes(yargs_1.argv._[0].toString())) {
                printUsage();
                resultCode = 400;
                return;
            }

		        let fileConfigPath = constants.CONFIGURATION_FILE_NAME.toString();
			if(yargs_1.argv['customPath'] != null && yargs_1.argv['customPath'] != undefined && yargs_1.argv['customPath'].length > 0)
			{
				fileConfigPath = yargs_1.argv['customPath'] + "/"+   fileConfigPath
				console.log(fileConfigPath);
			}
            const fileConfig = fs.readFileSync(path.resolve('.',fileConfigPath ));
            const config = JSON.parse(fileConfig.toString());
            const taskRunner = new taskRunner_1.TaskRunner(yargs_1.argv, config);
            result = yield taskRunner.run(taskGroup_1.standardTaskGroups);
            resultCode = 200;
        }
        catch (e) {
            resultCode = 500;
            console.error(`[pcf-scripts] [Error] encountered unexpected error:\n${e}`);
            telemetryClient.trackException({ exception: e });
            process.exitCode = 1;
        }
        finally {
            const isSuccessful = resultCode === 200;
            let customMeasurement = {};
            if (isSuccessful && !!(result === null || result === void 0 ? void 0 : result.compileTime)) {
                customMeasurement['compileTimeMs'] = result.compileTime;
            }
            telemetryClient.trackEvent({ name: apptelemetryclient_1.TelemetryEvent[apptelemetryclient_1.TelemetryEvent.End], measurements: customMeasurement });
            telemetryClient.trackRequest({
                name: 'Session',
                url: '',
                duration: Date.now() - startTime,
                resultCode: resultCode,
                success: isSuccessful,
                properties: customProperties
            });
            telemetryClient.flush();
        }
    });
}
function printUsage() {
    console.log('Unsupported command');
    console.log(`Usage: pcf-scripts ${Object.keys(taskGroup_1.standardTaskGroups).map(verb => '[' + verb + ']').join(' ')}`);
}

//# sourceMappingURL=pcf-scripts.js.map
