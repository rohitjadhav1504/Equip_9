package com.MainApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.MainApp.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer>{
	

}
