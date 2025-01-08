package com.MainApp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MainApp.Entity.Product;
import com.MainApp.Repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
    private ProductRepository productRepository;

    public void createProduct(Product product) {
    	productRepository.save(product);
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public void updateProduct(int id, Product updatedProduct) {
       Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Record not found."));
       existingProduct.setName(updatedProduct.getName());
       existingProduct.setPrice(updatedProduct.getPrice());
       existingProduct.setQuantity(updatedProduct.getQuantity());
        productRepository.save(existingProduct);
    }

    public void deleteProduct(int id) {
    	productRepository.deleteById(id);
    }

}
