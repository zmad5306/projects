package com.example;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@ModelAttribute("message")
	public String message() {
		return "Hello world!";
	}
	
	@RequestMapping("/")
	public String index() {
		return "index";
	}
}
