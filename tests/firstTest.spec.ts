import {test} from '@playwright/test';



test.beforeEach('goto page', async({page}) => {
await page.goto('/');
})


test.describe('test suite 1', () => {

  test.beforeEach('navigate to Forms tab', async({page}) => {
    await page.getByText('Forms').click();
  })

  test('navigate to form layout', async ({ page }) => {
    await page.getByText('Form Layouts').click();
  });

  test('navigate to datepickerpage', async ({ page }) => {
    await page.getByText('Datepicker').click();
  });
});

