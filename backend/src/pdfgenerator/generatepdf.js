import puppeteer from "puppeteer";
import ejs from "ejs";
import path from "path";
const generatePDF = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    const data = {
        name: "Kanak Kumawat",
        email: "kanak@gmail.com",
        items: [
            { name: "Cake", price: 500 },
            { name: "Cold Coffee", price: 150 }
        ],
        total: 650
    };
    const html = await ejs.renderFile(
        path.join("views", "invoice.ejs"),
        data
    );
    await page.setContent(html, {
        waitUntil: "networkidle0"
    });

    await page.pdf({
        path: "output/invoice.pdf",
        format: "A4",
        printBackground: true,
        margin: {
            top: "20mm",
            bottom: "20mm"
        }
    });

    await browser.close();

    console.log(" PDF Generated Successfully");
};

generatePDF();
