package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Toto;
import io.github.jhipster.application.repository.TotoRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Toto.
 */
@RestController
@RequestMapping("/api")
public class TotoResource {

    private final Logger log = LoggerFactory.getLogger(TotoResource.class);

    private static final String ENTITY_NAME = "toto";

    private final TotoRepository totoRepository;

    public TotoResource(TotoRepository totoRepository) {
        this.totoRepository = totoRepository;
    }

    /**
     * POST  /totos : Create a new toto.
     *
     * @param toto the toto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new toto, or with status 400 (Bad Request) if the toto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/totos")
    @Timed
    public ResponseEntity<Toto> createToto(@RequestBody Toto toto) throws URISyntaxException {
        log.debug("REST request to save Toto : {}", toto);
        if (toto.getId() != null) {
            throw new BadRequestAlertException("A new toto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Toto result = totoRepository.save(toto);
        return ResponseEntity.created(new URI("/api/totos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /totos : Updates an existing toto.
     *
     * @param toto the toto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated toto,
     * or with status 400 (Bad Request) if the toto is not valid,
     * or with status 500 (Internal Server Error) if the toto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/totos")
    @Timed
    public ResponseEntity<Toto> updateToto(@RequestBody Toto toto) throws URISyntaxException {
        log.debug("REST request to update Toto : {}", toto);
        if (toto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Toto result = totoRepository.save(toto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, toto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /totos : get all the totos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of totos in body
     */
    @GetMapping("/totos")
    @Timed
    public List<Toto> getAllTotos() {
        log.debug("REST request to get all Totos");
        return totoRepository.findAll();
    }

    /**
     * GET  /totos/:id : get the "id" toto.
     *
     * @param id the id of the toto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the toto, or with status 404 (Not Found)
     */
    @GetMapping("/totos/{id}")
    @Timed
    public ResponseEntity<Toto> getToto(@PathVariable Long id) {
        log.debug("REST request to get Toto : {}", id);
        Optional<Toto> toto = totoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(toto);
    }

    /**
     * DELETE  /totos/:id : delete the "id" toto.
     *
     * @param id the id of the toto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/totos/{id}")
    @Timed
    public ResponseEntity<Void> deleteToto(@PathVariable Long id) {
        log.debug("REST request to delete Toto : {}", id);

        totoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
