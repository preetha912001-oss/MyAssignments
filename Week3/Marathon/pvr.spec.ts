import {test,expect} from '@playwright/test'
test('Verify dynamic movie ticket booking flow in PVR Cinemas website',async({page})=>{
    await page.goto('https://www.pvrcinemas.com/')
    //Select the required city
    await page.getByRole('heading',{name:'Chennai'}).click()
    await page.locator('.date-show span').filter({ hasText: 'Cinema' }).click()
    //To select cinema
    const selectCinema = page.getByRole('button', { name: 'Select Cinema' });
    await expect(selectCinema).toBeEnabled();
    await selectCinema.click();
    const cinema = page.locator('ul.p-dropdown-items li').first()
    await expect(cinema).toBeVisible();
    await cinema.click();
    await page.waitForTimeout(1000)
    //To select date
    const date = page.locator('ul.p-dropdown-items li').first();
    await expect(date).toBeVisible();
    await date.click();
    //To select movie
    const movie = page.locator('//span[text()="PARIS CAFE"]/parent::li');
    await expect(movie).toBeVisible();
    await movie.click();
    await page.waitForTimeout(1000)
    //To select time
    const timings = page.locator('ul.p-dropdown-items:visible li');
    for (let i = 0; i < await timings.count(); i++) {
        if (await timings.nth(i).isEnabled()) {
            await timings.nth(i).click();
            break;
        }
    }
    //Submit
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Accept' }).click()
    //To select available seat
    const seat = page.locator('//span[@class="seat-current-pvr"]').nth(0);
    await expect(seat).toBeVisible();
    await seat.click();
    await expect(page.locator('h5')).toHaveText('PARIS CAFE')
    let seatInfo = [ 
    page.locator('[class="seat-info"]').nth(0),
    page.locator('[class="seat-info"]').nth(1),
    page.locator('//div[@class="select-seat-number"]//p').nth(2)
    ]
    for (let i = 0; i <seatInfo.length; i++) {
    console.log(await seatInfo[i].innerText());
    break;
    }
    //Verifying the total ticket amount is displayed
    const total = page.locator('//div[@class="grand-prices"]/h6');
    await expect(total).toBeVisible();
    console.log('Total cart amount:', await total.innerText());
    //Verifying the page title is displayed correctly.
    console.log(await page.title())
})