const multer = require('multer');
const path = require('path');
const Products = require("../models/productsModel");


module.exports = {
    createProduct: async (req, res) => {
        try {
            const { title, description, price } = req.body;
                console.log(req.body)
            const newProduct = new Products({
                title,
                description,
                price,
                image:  `/uploads/${req.file.filename}`
            });

            await newProduct.save();

            const products = await Products.find();

            res.render("homepage" , {products : products, error : null , success : null})
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error!");
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Products.find();

            res.render("homepage" , {products , error : null , success : null})
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error!");
        }
    },


    getProductDetails : async (req, res) => {
        try {
            const product = await Products.findById(req.params.id)
            console.log({product})
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.render('productDetails', { product });
        } catch (error) {
            res.status(500).send('Server Error');
        }
    },
    editProduct : async (req, res) => {
        try {
            const product = await Products.findById(req.params.id)
            console.log({product})
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.render('editProduct', { product , error : null });
        } catch (error) {
            res.status(500).send('Server Error');
        }
    },

    updateProduct :  async (req, res) => {
        try {
            console.log(req.body)
            console.log(req.file)
            const productData = {  
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            };
    
            if (req.file) {
                productData.image = `/uploads/${ req.file.filename}`
            }
    
            await Products.findByIdAndUpdate(req.params.id, productData);
            res.json(productData)
        } catch (error) {
            console.log({error})
            res.status(500).send('Server Error');
        }
    },
    deleteProduct : async (req, res) => {
        try {

            await Products.findByIdAndDelete(req.params.id);
            res.json({success : true})           
        } catch (error) {
            console.log({error})
            res.status(500).send('Server Error');
        }
    },

};
