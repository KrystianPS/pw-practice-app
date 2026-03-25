import {Page} from "@playwright/test";
import { HelperBase } from "./helperBase";



export class NavigationPage extends HelperBase{
    
  

    constructor(page: Page) {
       super(page)
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms');
        await this.page.getByText('Form Layouts').click();
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms');
        await this.page.waitForTimeout(2000)
        await this.page.getByText('Datepicker').click();
    }

    async smartTablePage(){
          await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click();
    }

    async toolTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')

        await this.page.getByText('Tooltip').click();
    }


    private async selectGroupMenuItem(groupMenuItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupMenuItemTitle)
        const expandedStatus = await groupMenuItem.getAttribute('aria-expanded')

        if(expandedStatus == "false"){
            await groupMenuItem.click()
        }
    }

}
