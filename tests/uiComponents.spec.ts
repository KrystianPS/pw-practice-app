import { test, expect } from '@playwright/test';

// dodac pozostałem UI elementy 
test.beforeEach('goto page', async({page}) => {
await page.goto('/');
})

test('datepicker', async ({page}) => {

 
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

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


test('sliders', async({page}) => {

    //mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    if (!box) {
        throw new Error('boundingBox is null – element not visible svg circle');
    }

    const x = box.x + box.width / 2
    const y = box.y + box.height /2 
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(
        x + box.width / 2,
        y + box.height / 2,
        {steps: 40}
    )
    await page.mouse.up()

    await expect(page.locator('[tabtitle="Temperature"]')).toContainText('30')
    })

test('slidersV2', async ({ page }) => {
  const slider = page.locator(
  '[tabtitle="Temperature"] ngx-temperature-dragger'
)
    await slider.scrollIntoViewIfNeeded()
    const value = page.locator('[tabtitle="Temperature"] .value.temperature')

    const box = await slider.boundingBox()
    if (!box) {
        throw new Error('boundingBox is null – element not visible temperature-dragger');
    }

  
  const cx = box.x + box.width / 2
  const cy = box.y + box.height / 2

  
  await page.mouse.move(cx, cy)
  await page.mouse.down()


  await page.mouse.move(
    cx + box.width / 2,
    cy + box.height / 2,
    { steps: 40 }
  )
  await page.mouse.up()

  await expect(value).toHaveText('30', { timeout: 2000 })
})



