package hu.u_szeged.ohsh.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.u_szeged.ohsh.domain.Circular;

import hu.u_szeged.ohsh.repository.CircularRepository;
import hu.u_szeged.ohsh.web.rest.util.HeaderUtil;
import hu.u_szeged.ohsh.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Circular.
 */
@RestController
@RequestMapping("/api")
public class CircularResource {

    private final Logger log = LoggerFactory.getLogger(CircularResource.class);

    private static final String ENTITY_NAME = "circular";

    private final CircularRepository circularRepository;

    public CircularResource(CircularRepository circularRepository) {
        this.circularRepository = circularRepository;
    }

    /**
     * POST  /circulars : Create a new circular.
     *
     * @param circular the circular to create
     * @return the ResponseEntity with status 201 (Created) and with body the new circular, or with status 400 (Bad Request) if the circular has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/circulars")
    @Timed
    public ResponseEntity<Circular> createCircular(@RequestBody Circular circular) throws URISyntaxException {
        log.debug("REST request to save Circular : {}", circular);
        if (circular.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new circular cannot already have an ID")).body(null);
        }
        Circular result = circularRepository.save(circular);
        return ResponseEntity.created(new URI("/api/circulars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /circulars : Updates an existing circular.
     *
     * @param circular the circular to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated circular,
     * or with status 400 (Bad Request) if the circular is not valid,
     * or with status 500 (Internal Server Error) if the circular couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/circulars")
    @Timed
    public ResponseEntity<Circular> updateCircular(@RequestBody Circular circular) throws URISyntaxException {
        log.debug("REST request to update Circular : {}", circular);
        if (circular.getId() == null) {
            return createCircular(circular);
        }
        Circular result = circularRepository.save(circular);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, circular.getId().toString()))
            .body(result);
    }

    /**
     * GET  /circulars : get all the circulars.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of circulars in body
     */
    @GetMapping("/circulars")
    @Timed
    public ResponseEntity<List<Circular>> getAllCirculars(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Circulars");
        Page<Circular> page = circularRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/circulars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /circulars/:id : get the "id" circular.
     *
     * @param id the id of the circular to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the circular, or with status 404 (Not Found)
     */
    @GetMapping("/circulars/{id}")
    @Timed
    public ResponseEntity<Circular> getCircular(@PathVariable Long id) {
        log.debug("REST request to get Circular : {}", id);
        Circular circular = circularRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(circular));
    }

    /**
     * DELETE  /circulars/:id : delete the "id" circular.
     *
     * @param id the id of the circular to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/circulars/{id}")
    @Timed
    public ResponseEntity<Void> deleteCircular(@PathVariable Long id) {
        log.debug("REST request to delete Circular : {}", id);
        circularRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
