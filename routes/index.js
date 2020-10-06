// Importing required libraries
const router = require('express').Router();
const axios = require('axios')

// Limit of each page
const limit = 10;

// API URL
const url = "https://api.github.com/repos/walmartlabs/thorax/issues";

// Getting All issues
router.get('/', async (req, res) => {

    let page = parseInt(req.query.page) || 1;

    //calling API to receive data
    const response = await axios(url);
    const data = response.data;

    //checking for invalid page input
    if (page <= 0)
        page = 1;

    //getting the indexes for the pagination 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}
    //checking if there will be a next page
    if (endIndex < data.length)
        results.next = {
            page: page + 1
        }

    //checking if there will be a previous page
    if (startIndex > 0)
        results.prev = {
            page: page - 1
        }

    //setting current page
    results.curr = page;

    //getting issues for the correct page
    results.result = data.slice(startIndex, endIndex);

    //rendering page
    res.render('index', {
        results: results
    });
});

// GETs a single Issue
router.get("/issue/:id", async (req, res) => {
    try {
        // Calling API
        const response = await axios(url);
        const data = response.data;

        let issueI = {}
        //looking for issue matching the id
        data.map((issue) => {
            if (issue.number == req.params.id) {
                issueI = issue;
            }
        });

        res.render('issue', {
            issue: issueI
        });

    } catch (e) {
        res.render('issue', {
            msg: "Server Err"
        });
        console.log(e);
    }
});

//Exporting router
module.exports = router;