package com.MainApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MainApp.Entity.Product;
import com.MainApp.Service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    // POST API to create a record
    @PostMapping
    public ResponseEntity<String> createRecord(@RequestBody Product product) {
    	productService.createProduct(product);
        return ResponseEntity.ok("Record created successfully.");
    }

    // GET API to retrieve all records
    @GetMapping
    public ResponseEntity<List<Product>> getAllRecords() {
        return ResponseEntity.ok(productService.getAllProduct());
    }

    // PUT API to update a record
    @PutMapping("/{id}")
    public ResponseEntity<String> updateRecord(@PathVariable int id, @RequestBody Product product) {
    	productService.updateProduct(id, product);
        return ResponseEntity.ok("Product updated successfully.");
    }

    // DELETE API to delete a record
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecord(@PathVariable int id) {
    	productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully.");
    }
}
