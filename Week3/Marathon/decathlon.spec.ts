import {expect, test} from '@playwright/test'
test('Search product, apply filters, add to cart in Decathlon',async({page})=>{
    await page.goto('https://www.decathlon.in/')
    await expect(page).toHaveURL('https://www.decathlon.in/')
    await page.locator("[placeholder='Search for 60+ sports and 6,000+ products']").click()
    await expect (page.locator("[placeholder='Search for 60+ sports and 6,000+ products']")).toBeEnabled()
    //To search the product name as "shoes" in the search field.
    const searchValue = page.locator("[placeholder='Search for 60+ sports and 6,000+ products']")
    searchValue.fill('shoes')
    searchValue.press("Enter")
    await page.waitForTimeout(1000)
    //Capture and print the page title in the console.
    console.log(await page.title())
    //To verify the page title is displayed as "Search | shoes".
    await expect(page).toHaveTitle('Search | shoes')
    //To filter product
    await page.locator('//span[text()="Sport"]/parent::button').click()
    await page.locator('[data-test-id="filter-checkbox-sport_pratice_en-Running"]').check()
    await page.locator('//span[text()="Gender"]/parent::button').click()
    await page.locator('[data-test-id="filter-checkbox-gender_id_en-MEN"]').check()
    await page.locator('//span[text()="Size"]/parent::button').click()
    await page.getByText('10.5',{exact:true}).click()
    await page.locator('//span[text()="Most relevant"]/parent::button').click()
    await page.getByRole('option',{name:'Price (low → high)'}).click()
    //To select the first product from the displayed product list.
    await page.locator('[aria-label="Decathlon Men Running Daily Foam Cushion Shoes, Jogflow 190.1 - Black"]').first().click()
    await page.getByRole('button',{name: 'Select size 10.5'}).click()
    await page.getByRole('button',{name: 'Add to cart'}).click()
    // Close ads popup
    const adsPopup = page.locator('div[class="dy-lb-close"][aria-label="Close"]');
    await expect(adsPopup).toBeVisible();
    await adsPopup.click();
    //to verify product added to cart popup msg
    const popMsg = page.getByRole('heading',{name:'Product(s) added to cart'})
    await expect(popMsg).toBeVisible()
    await page.locator('[aria-label="Cart"]').click()
    //To Fetch the total cart value.
    const total = page.locator('[data-test-id="cart:cart-checkout-total-cart-value"]>p')
    //Print the total cart amount in the console
    console.log('Total cart amount',await total.innerText())
})