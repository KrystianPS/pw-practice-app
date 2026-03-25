import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();


export default defineConfig<TestOptions>({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [ 
              process.env.CI ? ["dot"] : ["list"],
              [
                "@argos-ci/playwright/reporter",
                {
                  uploadToArgos: !!process.env.CI,
                  token: "argos_84579a166e9660957df57697f37042548c",
                },
              ],

              ['json', {outputFile: 'test-results/JSONReport.json'}],
              ['html']]
              ,

  use: {
      baseURL: 'http://localhost:4200/',
      globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
      trace: 'on-first-retry',
      screenshot: "only-on-failure",
  },


    projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
       },
    }, {
      name: 'staging',
      use: { ...devices['Desktop Chrome'],
       },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 120000,
    reuseExistingServer: true,
  }
});
