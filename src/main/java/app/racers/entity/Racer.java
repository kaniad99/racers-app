package app.racers.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "RACER")
@AllArgsConstructor
@NoArgsConstructor
public class Racer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name = "FIRST_NAME")
	private String firstName;
	@Column(name = "LAST_NAME")
	private String lastName;
	@Column(name = "DATE_OF_BIRTH")
	private LocalDate dateOfBirth;
	@Column(name = "VEHICLE_BRAND")
	private String vehicleBrand;
	@Column(name = "VEHICLE_MODEL")
	private String vehicleModel;
	@Column(name = "TRACK_NAME")
	private String trackName;
	@Column(name = "RECORD_TIME_OF_TRACK")
	private String recordTimeOfTrack;

	public void updateFields(Racer racer) {
		this.firstName = racer.getFirstName();
		this.lastName = racer.getLastName();
		this.dateOfBirth = racer.getDateOfBirth();
		this.vehicleBrand = racer.getVehicleBrand();
		this.vehicleModel = racer.getVehicleModel();
		this.trackName = racer.getTrackName();
		this.recordTimeOfTrack = racer.getRecordTimeOfTrack();
	}
}
