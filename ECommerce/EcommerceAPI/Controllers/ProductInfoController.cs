using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using EcommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("api/ecommerce/productscontroller")]
    public class ProductInfoController : ControllerBase
    {

         private readonly ApplicationDBContext _dbContext;
      public ProductInfoController(ApplicationDBContext _db)
    {
        _dbContext= _db;
    }
        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            return Ok(_dbContext.products);
        }

        //getting the product
        [HttpGet("get/product/{productId}")]
        public IActionResult GetproductDetail(int productId)
        {
            var product = _dbContext.products.Find(productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        //Adding new product
        [HttpPost("add/newProduct")]
        public IActionResult AddNewProduct([FromBody] ProductInfo product)
        {
       
            _dbContext.products.Add(product);
            _dbContext.SaveChanges();
            return Ok(product.ProductID);
        }

        //checking if the product already exists
        [HttpGet("product/{productName}")]
        public IActionResult GetProductExist(string productName)
        {
            bool isProductValid = _dbContext.products.Any(product => product.ProductName.ToLower() == productName.ToLower());
            return Ok(isProductValid);
        }

        [HttpPut("new/product/edit")]
        public IActionResult EditProduct(ProductInfo productData)
        {
            var product = _dbContext.products.FirstOrDefault(product => product.ProductID == productData.ProductID);
            if (product == null)
            {
                return NotFound();
            }
            product.ProductName = productData.ProductName;
            product.ProductCount = productData.ProductCount; 
            product.ProductPrice = productData.ProductPrice; 
            product.ShippingDuration = productData.ShippingDuration; 
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("delete/{productID}")]
        public IActionResult DeleteProduct(int productID)
        {
            var product = _dbContext.products.Find( productID);
            if (product == null)
            {
                return NotFound();
            }
            _dbContext.products.Remove(product);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}