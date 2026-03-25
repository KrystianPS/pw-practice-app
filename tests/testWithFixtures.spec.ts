import {test} from '../test-options';
import {faker} from '@faker-js/faker'






test('parametrized methods', async({pageManager}) => {
  
    const randomFullName = faker.person.fullName()
    const randomEmail = (`${faker.person.firstName().toLowerCase()}${faker.number.int(20)}${faker.person.lastName().toLowerCase()}@test.com`)
    

    await pageManager.onFormsLayourPage().submitUsingTheGridFormWithCredentialAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await pageManager.onFormsLayourPage().submitUsingInlineFormWithCredentialAndCheckbox(randomFullName, randomEmail, false)

        
})
