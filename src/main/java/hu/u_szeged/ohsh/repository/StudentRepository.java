package hu.u_szeged.ohsh.repository;

import hu.u_szeged.ohsh.domain.Student;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    
}
