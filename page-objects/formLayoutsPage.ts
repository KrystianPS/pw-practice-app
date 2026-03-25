import {Page} from "@playwright/test";
import { HelperBase } from "./helperBase";


export class FormLayoutsPage extends HelperBase{



    constructor(page:Page){

        super(page)
    }

    async submitUsingTheGridFormWithCredentialAndSelectOption(email: string, password: string, optionText: string){
        const usingGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
        await usingGridForm.getByRole('button').click()

    }

    async submitUsingInlineFormWithCredentialAndCheckbox(name: string, email: string, rememberMe: boolean){

const usingInlineForm = this.page.locator('nb-card', {hasText: 'Inline Form'})
        await usingInlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await usingInlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        if(rememberMe)
            await usingInlineForm.getByRole('checkbox').check({force: true})
        await usingInlineForm.getByRole('button').click()
    }
}