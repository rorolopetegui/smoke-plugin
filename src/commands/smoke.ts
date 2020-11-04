/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, ConfigPropertyMeta } from '@salesforce/core';
import { AnyJson, isObject } from '@salesforce/ts-types';
import { IPlugin } from '@oclif/config';
import { tsPath } from '@oclif/config/lib/ts-node';
const Mocha = require('mocha');

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

const OCLIF_META_PJSON_KEY = 'configMeta';

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
// TODO: replace the package name with your new package's name
const messages = Messages.loadMessages('@rorolopetegui/plugin-hello', 'org');

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

export default class Smoke extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx smoke
    Throws results
  `,
  ];

  public static args = [{ name: 'file' }];

  protected static flagsConfig = {};

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public run(): Promise<AnyJson> {
    // const { args, flags } = this.parse(Smoke);
    this.ux.log('=======hello smoke=======');

    const loadedConfigSmokeTests = (this.config.plugins || [])
      .map((plugin) => {
        const configSmokeTest = this.loadConfigSmokeTest(plugin);
        return configSmokeTest;
      })
      .filter(isObject);

    const flattenedConfigSmokeTests = [].concat(...loadedConfigSmokeTests);
    const mocha = new Mocha();
    flattenedConfigSmokeTests.forEach((smokeTest) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const path = require('path');
      // Instantiate a Mocha instance.
      const testDir = smokeTest.testPath;

      // Add each test file to the mocha instance
      fs.readdirSync(testDir)
        .filter(function (file) {
          // Only keep the test files
          return file.substr(-8) === '.test.ts';
        })
        .forEach(function (file) {
          mocha.addFile(path.join(testDir, file));
        });
    });
    // Or do both changes before running the tests
    // mocha.reporter('list').ui('tdd').run();
    // Run the tests.
    mocha
      .reporter('list')
      .ui('tdd')
      .run()
      .on('test', function (test) {
        console.log('Test started: ' + test.title);
      })
      .on('waiting', function (test) {
        console.log('==waiting==', test);
      })
      .on('ready', function (test) {
        console.log('==ready==', test);
      })
      .on('test end', function (test) {
        console.log('Test done: ' + test.title);
      })
      .on('pass', function (_test) {
        console.log('Test passed');
      })
      .on('retry', function (test, err) {
        console.log('==retry==', test);
        console.log(err);
      })
      .on('pending', function (test) {
        console.log('==pending==', test);
      })
      .on('running', function () {
        console.log('==running==');
      })
      .on('fail', function (test, err) {
        console.log('Test fail');
        console.log(test);
        console.log(err);
      })
      .on('end', function () {
        console.log('All done');
      });

    const outputString = 'Hello smoke tests';
    return Promise.resolve({
      orgId: this.org?.getOrgId(),
      outputString,
    });
  }

  private loadConfigSmokeTest = (plugin: IPlugin): ConfigPropertyMeta | undefined => {
    let configSmokeTestRequireLocation: string | undefined;
    try {
      const configSmokeTestPath = plugin.pjson?.oclif?.[OCLIF_META_PJSON_KEY];

      if (typeof configSmokeTestPath !== 'string') {
        return;
      }
      const relativePath = tsPath(plugin.root, configSmokeTestPath);
      // use relative path if it exists, require string as is
      configSmokeTestRequireLocation = relativePath ?? configSmokeTestPath;
    } catch {
      return;
    }
    if (!configSmokeTestRequireLocation) {
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const configSmokeTestPathModule = require(configSmokeTestRequireLocation);
      return configSmokeTestPathModule?.default ?? configSmokeTestPathModule;
    } catch {
      throw new SfdxError(`Error trying to load config SmokeTest from ${configSmokeTestRequireLocation}`);
    }
  };
}
