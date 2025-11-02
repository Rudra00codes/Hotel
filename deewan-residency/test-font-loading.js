// Font loading test script
const puppeteer = require('puppeteer');

async function testFontLoading() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Listen for network requests
    const fontRequests = [];
    page.on('response', response => {
        const url = response.url();
        if (url.includes('.woff') || url.includes('.woff2')) {
            fontRequests.push({
                url: url,
                status: response.status(),
                statusText: response.statusText()
            });
        }
    });
    
    try {
        await page.goto('http://localhost:3001/font-test.html');
        await page.waitForTimeout(2000); // Wait for fonts to load
        
        console.log('Font loading test results:');
        console.log('========================');
        
        if (fontRequests.length === 0) {
            console.log('❌ No font requests detected');
        } else {
            fontRequests.forEach(request => {
                const status = request.status === 200 ? '✅' : '❌';
                console.log(`${status} ${request.url} - ${request.status} ${request.statusText}`);
            });
        }
        
        // Check if fonts are actually loaded
        const fontsLoaded = await page.evaluate(() => {
            return document.fonts.check('16px Stardom');
        });
        
        console.log(`\nFont availability: ${fontsLoaded ? '✅' : '❌'} Stardom font ${fontsLoaded ? 'is' : 'is not'} available`);
        
    } catch (error) {
        console.error('Error testing font loading:', error);
    } finally {
        await browser.close();
    }
}

testFontLoading();