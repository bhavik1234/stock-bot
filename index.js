'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var productData = require("./data");
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function (req, res) {

    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});
// demo api
//Name of brands
restService.get('/demo/:brand', function (req, res) {
    // console.log(req.params.brand)
    var modprice = "";
    productData.map(data => {
        data.brands.map(brdata => {
            brdata.models.map(model => {
                if (model.model == "Galaxy s7") {
                    modprice = model.price;
                }
            })
        })
        console.log(modprice);
    })

    // productData.map(data => {
    //     var brstr = "";
    //     var modstr = "";
    //     if (data.name == "phone") {
    //         data.brands.map(brdata => {
    //             console.log("Hello")
    //             if (brdata.brand == "apple") {
    //                 brdata.models.map(model => {
    //                     modstr += "" + model.model;
    //                 })
    //                 brstr += " " + modstr + ","
    //             }
    //         })
    //         console.log(brstr);
    //     }
    // })


    // productData.map(data => {
    //     data.brands.map(brdata => {
    //         console.log(brdata.brand);
    //         if (brdata.brand == req.params.brand) {
    //             brdata.models.map(modelData => {
    //                 if (modelData.model == "Galaxy s7") {
    //                     res.json(modelData)
    //                 }
    //             })
    //         }

    //     })

    // console.log(data.brand+"."+req.params.brand)
    // if (data.name == "phone"&& data.brand+"."+req.params.brand) {
    //     res.json(data.brand="");
    // }
})

//demo api
restService.post('/prodinfo', function (req, res) {

    //Brand names

    if (req.body.result.action == "brands") {
        var brstr = "";
        var result = req.body.result.parameters['type'];
        productData.map(data => {
            if (data.name == result) {
                data.brands.map(brname => {
                    brstr += " " + brname.brand + ",";
                })
            }
        })
        return res.json({
            speech: "The brand names available are" + brstr,
            displayText: "The brand names available are" + brstr,
            source: 'webhook-echo-sample'
        });
    }
    // Brand close

    // Price of particular phone
    if (req.body.result.action == "pricemodel") {
        var modprice = "";
        var result = req.body.result.parameters['models'];
        productData.map(data => {
            data.brands.map(brdata => {
                brdata.models.map(model => {
                    if (model.model == result) {
                        modprice = model.price;
                    }
                })
            })
        })

        return res.json({
            speech: "The price is" + modprice,
            displayText: "The price is" + modprice,
            source: 'webhook-echo-sample'
        });
    }
    // Model of particular phone close

    // Price of particular phone

    // Price of particular phone close

    //Quantity left in stock
    if (req.body.result.action == 'stockinfo') {
        var result = req.body.result.parameters['type'];

        // Map data
        productData.map(data => {
            if (data.name == result || data.product_id == result) {
                result = data.qty;
            }
        })
        // Map data


        return res.json({
            speech: "The quantity is" + result,
            displayText: result,
            source: 'webhook-echo-sample'
        });
    }
    //Quantity left in stock close

    // discount
    if (req.body.result.action == "discount") {
        var moddiscount = "";
        var result = req.body.result.parameters['models'];
        productData.map(data => {
            data.brands.map(brdata => {
                brdata.models.map(model => {
                    if (model.model == result) {
                        moddiscount = model.discount;
                    }
                })
            })
        })

        return res.json({
            speech: "The Discount is" + moddiscount,
            displayText: "The discount is" + moddiscount,
            source: 'webhook-echo-sample'
        });
    }
    // discount closed

    // All products
    if (req.body.result.action == 'allproducts') {
        var allData = [];

        // Map data
        productData.map(data => {
            allData.push(data.name);
        })
        // Map data close

        var txt = ''
        allData.forEach(prod => {
            txt += "  " + prod;
        })

        return res.json({
            speech: "The products are" + txt,
            displayText: "The products are " + txt,
            source: 'webhook-echo-sample'
        });
    }
    // All products close
})

// restService.post('/slack-test', function(req, res) {

//     var slack_message = {
//         "text": "Details of JIRA board for Browse and Commerce",
//         "attachments": [{
//             "title": "JIRA Board",
//             "title_link": "http://www.google.com",
//             "color": "#36a64f",

//             "fields": [{
//                 "title": "Epic Count",
//                 "value": "50",
//                 "short": "false"
//             }, {
//                 "title": "Story Count",
//                 "value": "40",
//                 "short": "false"
//             }],

//             "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
//         }, {
//             "title": "Story status count",
//             "title_link": "http://www.google.com",
//             "color": "#f49e42",

//             "fields": [{
//                 "title": "Not started",
//                 "value": "50",
//                 "short": "false"
//             }, {
//                 "title": "Development",
//                 "value": "40",
//                 "short": "false"
//             }, {
//                 "title": "Development",
//                 "value": "40",
//                 "short": "false"
//             }, {
//                 "title": "Development",
//                 "value": "40",
//                 "short": "false"
//             }]
//         }]
//     }
//     return res.json({
//         speech: "speech",
//         displayText: "speech",
//         source: 'webhook-echo-sample',
//         data: {
//             "slack": slack_message
//         }
//     });
// });


restService.listen((process.env.PORT || 8000), function () {
    console.log("Server is listening to 8000");
});
