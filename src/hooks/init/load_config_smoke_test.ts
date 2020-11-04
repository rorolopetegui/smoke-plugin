/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable header/header */
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Hook, IPlugin } from '@oclif/config';
import { tsPath } from '@oclif/config/lib/ts-node';
import { ConfigPropertyMeta, Logger } from '@salesforce/core';
import { isObject } from '@salesforce/ts-types';

const log = Logger.childFromRoot('plugin-config:load_config_SmokeTest');
const OCLIF_META_PJSON_KEY = 'configMeta';

function loadConfigSmokeTest(plugin: IPlugin): ConfigPropertyMeta | undefined {
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
    log.error(`Error trying to load config SmokeTest from ${configSmokeTestRequireLocation}`);
    return;
  }
}

const hook: Hook<'init'> = ({ config: oclifConfig }) => {
  const loadedConfigSmokeTests = (oclifConfig.plugins || [])
    .map((plugin) => {
      const configSmokeTest = loadConfigSmokeTest(plugin);
      if (!configSmokeTest) {
        log.info(`No config smoke test found for ${plugin.name}`);
      }

      return configSmokeTest;
    })
    .filter(isObject);

  const flattenedConfigSmokeTests = [].concat(...loadedConfigSmokeTests);
  // Now that we have the commands, and expected behavior, now it just rests to run all of them
  // Also here we need to retrieve mocks from the config file, need to understand what will be the behavior of different tests.
  // Possible solutions, make flags? HasSomething: True, then do this thing.
  flattenedConfigSmokeTests.forEach((_smokeTest) => {});
};

export default hook;
