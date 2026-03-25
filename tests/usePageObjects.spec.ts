import {test} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker'



test.beforeEach('goto page', async({page}) => {
await page.goto('/');
})

test('navigate to forms page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().toolTipPage();
})

test('parametrized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    // const randomEmail =`${randomFullName.replace(" ", "")}${faker.number.int(30)}@test.com` 
    const randomEmail = (`${faker.person.firstName().toLowerCase()}${faker.number.int(20)}${faker.person.lastName().toLowerCase()}@test.com`)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormsLayourPage().submitUsingTheGridFormWithCredentialAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await pm.onFormsLayourPage().submitUsingInlineFormWithCredentialAndCheckbox(randomFullName, randomEmail, false)
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
        
})
test('datePickingWithParameter', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(2)
})
test('datePickingWithParameterV2 @smoke', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(2,4)
})
