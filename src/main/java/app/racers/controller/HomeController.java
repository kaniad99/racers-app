package app.racers.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping(value = {
		"/",
		"/about",
		"/users",
		"/users/create",
		"/users/{id}",
		"/racers",
		"/racers/create",
		"/racers/{id}"
	})
	public String index() {
		return "index";
	}
}
