const axios = require('axios');
const cheerio = require('cheerio');
const XLSX = require('xlsx');
const fs = require('fs');

// Function to extract table data from the webpage
async function scrapeTableData(url) {
    try {
        const data = [];
        let page = 1;
        let hasMoreRows = true;

        while (hasMoreRows) {
            const response = await axios.get(`${url}&page=${page}`);
            const $ = cheerio.load(response.data);
            const tableRows = $('table tbody tr');

            if (tableRows.length > 0) {
                tableRows.each((index, element) => {
                    const row = [];
                    $(element).find('td').each((i, el) => {
                        row.push($(el).text().trim());
                    });
                    data.push(row);
                });
                page++;
            } else {
                hasMoreRows = false;
            }
        }

        return data;
    } catch (error) {
        console.error('Error scraping table data:', error);
        return null;
    }
}

// Function to save data into an Excel file
function saveToExcel(data, filename) {
    let wb;
    if (fs.existsSync(filename)) {
        // If the file exists, read the existing workbook
        wb = XLSX.readFile(filename);
    } else {
        // If the file doesn't exist, create a new workbook
        wb = XLSX.utils.book_new();
    }

    // Convert data to worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Append data to existing worksheet or create a new one
    if (wb.Sheets['Sheet1']) {
        // If the sheet already exists, append data to it
        XLSX.utils.sheet_add_aoa(wb.Sheets['Sheet1'], XLSX.utils.sheet_to_json(ws, {header: 1}), {origin: -1});
    } else {
        // If the sheet doesn't exist, add a new sheet with the data
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    }

    // Write the workbook to file
    XLSX.writeFile(wb, filename);
}

// Function to generate alphabets from A to Z
function generateAlphabets() {
    const alphabets = [];
    for (let i = 65; i <= 90; i++) { // ASCII codes for A to Z
        alphabets.push(String.fromCharCode(i));
    }
    return alphabets;
}

// Generate alphabets from A to Z
const alphabets = generateAlphabets();

// Loop through each alphabet and scrape data for each page
(async () => {
    const filename = 'station_data.xlsx'; // Excel file name
    for (const alpha of alphabets) {
        const url = `https://www.railyatri.in/stations?name=${alpha}`;
        const tableData = await scrapeTableData(url);
        if (tableData) {
            saveToExcel(tableData, filename);
            console.log(`Table data for alphabet ${alpha} added to ${filename}`);
        } else {
            console.log(`Failed to scrape table data for alphabet ${alpha}.`);
        }
    }
})();
