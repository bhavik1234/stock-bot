var data = [{
    product_id: "phone_234",
    name: "phone",
    qty: 5,
    brands: [{
        brand: "samsung",
        models:
        [
            { model: "Galaxy s7", price: 40000 },
            { model: "Galaxy Note 8", price: 6000 }]

    },
    {
        brand: "apple",
        models: [
            { model: "iPhone 7", price: 40000 },
            { model: "iPhone X", price: 80000 }
        ]
    }
    ]
},
{
    product_id: "car_981",
    name: "car",
    qty: 10,
    brands:[]
}]

module.exports = data;
