/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable no-console */
import { expect, test } from '@salesforce/command/lib/test';

describe('onboarding', () => {
  test
    .withOrg({ username: 'test@org.com' }, true)
    .stdout()
    .command(['onboarding'])
    .it('runs onboarding', (ctx) => {
      expect(ctx.stdout).to.contain('Hey this is onboarding');
    });
});
