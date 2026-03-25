import { test, expect } from '@playwright/test';




test('datepicker', async ({page}, testInfo) => {

    await page.goto('/');
    if (testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    if (testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }

    const callendarInputField = page.getByPlaceholder('Form Picker');
    await callendarInputField.click();

    let date = new Date()
    date.setDate(date.getDate()+200)

    const expectedDate = date.getDate().toString()
    const expedtedMonthShort = date.toLocaleString('En-Us', {month: "short"})
    const expedtedMonthLong = date.toLocaleString('En-Us', {month: "long"})
    const expetedYear = date.getFullYear()
    const dateAssert = `${expedtedMonthShort} ${expectedDate}, ${expetedYear}`

    let callendarMonthYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthYear = ` ${expedtedMonthLong} ${expetedYear} `

    while(!callendarMonthYear?.includes(expectedMonthYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        callendarMonthYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click();
    await expect(callendarInputField).toHaveValue(dateAssert)
});