package app.racers.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import app.racers.entity.Racer;

@RepositoryRestResource
public interface RacerRepository extends PagingAndSortingRepository<Racer, Long> {

	@Override
	Racer save(Racer racer);

	@Override
	void deleteById(Long id);

	@Override
	void delete(Racer racer);
}
