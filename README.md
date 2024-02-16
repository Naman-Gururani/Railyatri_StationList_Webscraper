
# ** Web Scraping and Excel Export **

This Node.js script performs web scraping to extract table data from a webpage and saves it into an Excel file. It utilizes Axios for HTTP requests, Cheerio for HTML parsing, and XLSX for Excel file manipulation.

## ** Setup **
Before running the script, make sure you have Node.js installed on your system. You can install the required packages by running:

``` npm install axios cheerio xlsx ```

## ** Usage **
1. Clone or download the repository to your local machine.
2. Navigate to the directory containing the script.
3. Run the script using Node.js:
    ``` node script.js ```
   
## ** Script Overview **

The script consists of the following main components:

1. Scraping Function: The scrapeTableData function extracts table data from the webpage. It iterates through pages, scraping data until no more rows are returned.

2. Excel Export Function: The saveToExcel function saves the scraped data into an Excel file. It appends data to an existing sheet or creates a new sheet if one doesn't exist.

3. Alphabet Generator: The generateAlphabets function generates alphabets from A to Z, which are used to construct URLs for scraping data for each alphabet.

4. Main Execution: The script loops through each alphabet and scrapes data for each page. It then saves the data into an Excel file named station_data.xlsx.

### ** Disclaimer **
This script is provided for educational purposes only. Ensure compliance with website terms of service and legal requirements before using it for web scraping.
