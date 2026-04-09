import express from "express";
import { registerShop } from "../handlers/shopHandler/registerShop/registerShop.js";
import { loginShop } from "../handlers/shopHandler/LoginShop/loginShop.js";
import { updateShopProfile } from "../handlers/shopHandler/updateShopProfile/updateProfile.js";
import { listCustomerShopDetail } from "../handlers/shopHandler/customerShopListing/customerShopListing.js";
import { createProductFunction } from "../handlers/productHandler/createProduct/createProduct.js";
import { listProductFunction } from "../handlers/productHandler/listProductDetail/listProductDetail.js";
import { updateProductFunction } from "../handlers/productHandler/updateProduct/updateProduct.js";
import { deleteProductFunction } from "../handlers/productHandler/deleteProduct/deleteProduct.js";
import { listCustomerProductFunction } from "../handlers/productHandler/customerProductListing/customerProductListing.js";
import { placeOrderFunction } from "../handlers/orderHandler/orderPlacement/orderPlacement.js";
import { incomingOrder } from "../handlers/orderHandler/incomingOrder/incomingOrder.js";
import { updateOrderStatueFunction } from "../handlers/orderHandler/updateOrderStatus/orderStatus.js";


const router = express.Router();

//shop endpoints
router.post("/register-shop", registerShop);
router.post("/login-shop", loginShop);
router.put("/update-profile",updateShopProfile);
router.get("/customer-shop-detail",listCustomerShopDetail)

//Product endoint
router.post("/add-product",createProductFunction);
router.get("/list-shop-product",listProductFunction);
router.put("/update-product",updateProductFunction);
router.delete("/delete-product",deleteProductFunction);
router.get("/product-list",listCustomerProductFunction);

//Place Order
router.post("/place-order",placeOrderFunction);
router.get("/incoming-order",incomingOrder);
router.put("/update-order-status",updateOrderStatueFunction)

export default router;
