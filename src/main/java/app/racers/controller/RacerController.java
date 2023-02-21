package app.racers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import app.racers.entity.Racer;
import app.racers.service.RacerService;

import javax.servlet.http.HttpServletRequest;

@RestController
public class RacerController {

	@Autowired
	private RacerService racerService;

	@PutMapping("/api/racers/{id}/profile")
	public Racer edit(HttpServletRequest request, @PathVariable Long id, @RequestBody Racer racer) {
		return racerService.edit(id, racer, request);
	}


}
