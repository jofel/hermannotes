package hu.u_szeged.ohsh.repository;

import hu.u_szeged.ohsh.domain.Circular;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Circular entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CircularRepository extends JpaRepository<Circular,Long> {
    
}
