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

    let bestphone = " ";
    let flag = 1;
    productData.map(data => {
        if (data.name == "phone") {
            data.brands.map(brand => {
                if (brand.brand == "any") {
                    brand.models.map(model => {
                        bestphone = "Name = " + model.model + " Price = " + model.price + " Discount = " + model.discount;
                        console.log(bestphone);
                        flag = 0;
                    })
                }
                else {
                    if (flag == 1) {
                        bestphone = "The most trending phone is iphone X whose price is 80000 and there is a discount of  20";
                        console.log(bestphone);
                    }
                }
            })
        }
    })
    // console.log(req.params.brand)
    // var modprice = "";
    // productData.map(data => {
    //     data.brands.map(brdata => {
    //         brdata.models.map(model => {
    //             if (model.model == "Galaxy s7") {
    //                 modprice = model.price;
    //             }
    //         })
    //     })
    //     console.log(modprice);
    // })

    // productData.map(data => {
    //     var brstr = "";
    //     var modstr = "";
    //     if (data.name == "phone") {
    //         data.brands.map(brdata => {
    //             console.log("Hello")
    //             if (brdata.brand == "samsung") {
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
            speech: "The brands available are" + brstr,
            displayText: "The brands available are" + brstr,
            source: 'webhook-echo-sample'
        });
    }
    // Brand close

    // Price of particular phone
    if (req.body.result.action == "pricemodel") {
        let flag = 1;
        var modprice = "";
        var result = req.body.result.parameters['models'];
        productData.map(data => {
            data.brands.map(brdata => {
                brdata.models.map(model => {
                    if (model.model == result) {
                        modprice = model.price;
                        flag = 0;
                    }
                })
            })
        })
        if (flag == 0) {
            return res.json({
                speech: "The price is " + modprice,
                displayText: "The price is " + modprice,
                url: "https://www.youtube.com/",
                imageUrl:"http://images.indianexpress.com/2017/04/sachin-m4.jpg",
                source: 'webhook-echo-sample'
            });
        }
        else {
            return res.json({
                speech: "Sorry this model is not available",
                displayText: "Sorry this model is not available",
                source: 'webhook-echo-sample'
            })
            }
    }

    // Price of particular phone close

    // Model name  of particular phone
    if (req.body.result.action == "modelsavailable") {
        var brstr1 = "";
        var modstr1 = "";
        var result = req.body.result.parameters['type'];
        var brresult = req.body.result.parameters['brand'];
        productData.map(data => {

            if (data.name == result) {
                data.brands.map(brdata => {
                    if (brdata.brand == brresult) {
                        brdata.models.map(model => {
                            modstr1 += "" + model.model;
                        })
                        brstr1 += " " + modstr1 + ","
                    }
                })

            }
        })
        return res.json({
            speech: "The models available are " + brstr1,
            displayText: "The models available are " + brstr1,
            source: 'webhook-echo-sample'
        });
    }

    // MOdel name of particular phone close

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
            speech: "The quantity left is " + result,
            displayText: result,
            source: 'webhook-echo-sample'
        });
    }
    //Quantity left in stock close
    //trending phone

    if (req.body.result.action == "bestphone") {
        var bestphone = "";
        var flag = 1;
        var brandName = req.body.result.parameters['brand'];
        var phoneType = req.body.result.parameters['type'];
        productData.map(data => {
            if (data.name == phoneType) {
                data.brands.map(brand => {
                    if (brand.brand == brandName) {
                        brand.models.map(model => {
                            bestphone = "The most trending phone in " + brandName + " is " + model.model + " Price = " + model.price + " Discount = " + model.discount;
                            flag = 0;
                        })
                    }
                    else {
                        if (flag == 1)
                            bestphone = "The most trending phone is iphone X whose price is 80000 and there is a discount of  20";
                    }
                })
            }
        })
        return res.json({
            speech: bestphone,
            displayText: bestphone,
            source: 'webhook-echo-sample',
            "messages": [
                {
                    "imageUrl": "https://cnet2.cbsistatic.com/img/SVArV0NpzrZzcyVYNgybsAB_5e8=/770x433/2017/09/12/61096602-8e41-41d5-a63d-0ed945435e49/iphonexfl.jpg",
                    "platform": "facebook",
                    "type": 3
                },
                {
                    "imageUrl": "https://www.w3schools.com/w3images/fjords.jpg",
                    "platform": "google",
                    "type": 3
                },
                {
                    "buttons": [
                        {
                            "postback": "Card Link URL or text",
                            "text": "Card Link Title"
                        }
                    ],
                    "imageUrl": "https://www.w3schools.com/w3images/fjords.jpg",
                    "platform": "facebook",
                    "subtitle": "Card Subtitle",
                    "title": "Card Title",
                    "type": 1
                },
                {
                    "buttons": [
                        {
                            "openUrlAction": {
                                "url": "https://www.w3schools.com/w3images/fjords.jpg",
                            },
                            "title": "AoG Card Link title"
                        }
                    ],
                    "formattedText": "AoG Card Description",
                    "image": {
                        "url": "https://www.w3schools.com/w3images/fjords.jpg",
                    },
                    "platform": "google",
                    "subtitle": "AoG Card Subtitle",
                    "title": "AoG Card Title",
                    "type": "basic_card"
                }
            ]


        });

    }
    //trending phone close
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
            speech: "The discount is " + moddiscount+" %",
            displayText: "The discount is " + moddiscount+" %",
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
            speech: "The products are " + txt,
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
//             "google": slack_message
//         }
//     });
// });


restService.listen((process.env.PORT || 8000), function () {
    console.log("Server is listening to 8000");
});
