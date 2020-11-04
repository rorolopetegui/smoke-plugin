/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { Messages } from '@salesforce/core';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
// TODO: replace the package name with your new package's name
const messages = Messages.loadMessages('@rorolopetegui/plugin-hello', 'org');

export class Onboarding extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx oboarding
    Hey this is onboarding
  `,
  ];
  public static args = [{ name: 'file' }];

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  // protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  // protected static requiresProject = false;

  public run(): Promise<AnyJson> {
    const outputString = 'Hey this is onboarding';
    this.ux.log(outputString);

    // Return an object to be displayed with --json
    return Promise.resolve({
      outputString,
    });
  }
}
