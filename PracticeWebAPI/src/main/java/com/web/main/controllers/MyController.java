package com.web.main.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.web.main.entities.DataSource;


import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class MyController {

	@GetMapping("/search")
	public String[] searchProperties() {
		DataSource data = new DataSource() ;
		String c = data.getArea();
		String a = data.getCity();
		String arr[] = {a,c};
		return arr ;
	}

}
