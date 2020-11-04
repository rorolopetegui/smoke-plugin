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
    // Currently we are only using this testpath, do we want to use the parameters, and mock everything as in the tests?
    testPath: 'test/commands',
  },
  {
    command: 'hello:org',
    expects: 'Hello world',
    // Currently we are only using this testpath
    testPath: 'test/commands/hello',
  },
];
