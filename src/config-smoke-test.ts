/* eslint-disable prettier/prettier */
/* eslint-disable header/header */
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

export default [
  {
    username: 'test@org.com',
    command: 'onboarding',
    params: '',
    it: 'runs onboarding -u admin@integrationtesthubna40.org', // Like description
    expects: 'Retrieved metadatapackage from api',
    testPath: 'test/commands',
  },
  {
    command: 'hello:org',
    expects: 'Hello world',
    testPath: 'test/commands/hello',
  },
];
