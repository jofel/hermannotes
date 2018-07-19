package hu.u_szeged.ohsh.repository;

import hu.u_szeged.ohsh.domain.Helper;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Helper entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HelperRepository extends JpaRepository<Helper,Long> {
    
}
