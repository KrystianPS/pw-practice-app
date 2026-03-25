import {Page, expect} from "@playwright/test";
import { HelperBase } from "./helperBase";



export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number ){
        const callendarInputField = this.page.getByPlaceholder('Form Picker');
        await callendarInputField.click();

        const dateAssert = await this.dateInTheCallendar(numberOfDaysFromToday)
        await expect(callendarInputField).toHaveValue(dateAssert)
    }


    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
         const callendarInputField = this.page.getByPlaceholder('Range Picker');
        await callendarInputField.click();
        const startDateAssert = await this.dateInTheCallendar(startDayFromToday)
        const endDateAssert = await this.dateInTheCallendar(startDayFromToday)

        const dateToAssert = `${startDateAssert} - ${endDateAssert}`

        await expect(callendarInputField).toHaveValue(dateToAssert)


    }



    
    private async dateInTheCallendar(numberOfDaysFromToday: number){  
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)

        const expectedDate = date.getDate().toString()
        const expedtedMonthShort = date.toLocaleString('En-Us', {month: "short"})
        const expedtedMonthLong = date.toLocaleString('En-Us', {month: "long"})
        const expetedYear = date.getFullYear()
        const dateAssert = `${expedtedMonthShort} ${expectedDate}, ${expetedYear}`
        let callendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthYear = ` ${expedtedMonthLong} ${expetedYear} `

        while(!callendarMonthYear?.includes(expectedMonthYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            callendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }
        
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click();
        return dateAssert
    }

}