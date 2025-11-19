import ProductData from './ProductData.mjs';
const dataSourceURL="tents.json";
const dataSource=new ProductData(dataSourceURL)
const category= "tents"
const listElement=document.querySelector(".product_list")
const product_list=new ProductList(dataSource,category,listElement)
product_list.init()
