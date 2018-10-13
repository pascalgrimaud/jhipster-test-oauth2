package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Toto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Toto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TotoRepository extends JpaRepository<Toto, Long> {

}
