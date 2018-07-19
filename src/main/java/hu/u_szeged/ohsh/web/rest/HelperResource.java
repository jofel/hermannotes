package hu.u_szeged.ohsh.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.u_szeged.ohsh.domain.Helper;

import hu.u_szeged.ohsh.repository.HelperRepository;
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
 * REST controller for managing Helper.
 */
@RestController
@RequestMapping("/api")
public class HelperResource {

    private final Logger log = LoggerFactory.getLogger(HelperResource.class);

    private static final String ENTITY_NAME = "helper";

    private final HelperRepository helperRepository;

    public HelperResource(HelperRepository helperRepository) {
        this.helperRepository = helperRepository;
    }

    /**
     * POST  /helpers : Create a new helper.
     *
     * @param helper the helper to create
     * @return the ResponseEntity with status 201 (Created) and with body the new helper, or with status 400 (Bad Request) if the helper has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/helpers")
    @Timed
    public ResponseEntity<Helper> createHelper(@RequestBody Helper helper) throws URISyntaxException {
        log.debug("REST request to save Helper : {}", helper);
        if (helper.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new helper cannot already have an ID")).body(null);
        }
        Helper result = helperRepository.save(helper);
        return ResponseEntity.created(new URI("/api/helpers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /helpers : Updates an existing helper.
     *
     * @param helper the helper to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated helper,
     * or with status 400 (Bad Request) if the helper is not valid,
     * or with status 500 (Internal Server Error) if the helper couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/helpers")
    @Timed
    public ResponseEntity<Helper> updateHelper(@RequestBody Helper helper) throws URISyntaxException {
        log.debug("REST request to update Helper : {}", helper);
        if (helper.getId() == null) {
            return createHelper(helper);
        }
        Helper result = helperRepository.save(helper);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, helper.getId().toString()))
            .body(result);
    }

    /**
     * GET  /helpers : get all the helpers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of helpers in body
     */
    @GetMapping("/helpers")
    @Timed
    public ResponseEntity<List<Helper>> getAllHelpers(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Helpers");
        Page<Helper> page = helperRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/helpers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /helpers/:id : get the "id" helper.
     *
     * @param id the id of the helper to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the helper, or with status 404 (Not Found)
     */
    @GetMapping("/helpers/{id}")
    @Timed
    public ResponseEntity<Helper> getHelper(@PathVariable Long id) {
        log.debug("REST request to get Helper : {}", id);
        Helper helper = helperRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(helper));
    }

    /**
     * DELETE  /helpers/:id : delete the "id" helper.
     *
     * @param id the id of the helper to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/helpers/{id}")
    @Timed
    public ResponseEntity<Void> deleteHelper(@PathVariable Long id) {
        log.debug("REST request to delete Helper : {}", id);
        helperRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
