package app.racers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import app.racers.entity.Racer;
import app.racers.repository.RacerRepository;

import javax.servlet.http.HttpServletRequest;

@Service
public class RacerService {

	@Autowired
	private RacerRepository racerRepository;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public Racer edit(Long id, Racer racer, HttpServletRequest request) {
		Racer racerDb = racerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Racer not found"));
		racerDb.updateFields(racer);
		return racerRepository.save(racerDb);
	}

}
