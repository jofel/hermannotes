package hu.u_szeged.ohsh.repository;

import hu.u_szeged.ohsh.domain.Program;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Program entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramRepository extends JpaRepository<Program,Long> {
    
}
