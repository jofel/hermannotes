package hu.u_szeged.ohsh.web.rest;

import hu.u_szeged.ohsh.HermannotesApp;

import hu.u_szeged.ohsh.domain.Helper;
import hu.u_szeged.ohsh.repository.HelperRepository;
import hu.u_szeged.ohsh.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HelperResource REST controller.
 *
 * @see HelperResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HermannotesApp.class)
public class HelperResourceIntTest {

    @Autowired
    private HelperRepository helperRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHelperMockMvc;

    private Helper helper;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        HelperResource helperResource = new HelperResource(helperRepository);
        this.restHelperMockMvc = MockMvcBuilders.standaloneSetup(helperResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Helper createEntity(EntityManager em) {
        Helper helper = new Helper();
        return helper;
    }

    @Before
    public void initTest() {
        helper = createEntity(em);
    }

    @Test
    @Transactional
    public void createHelper() throws Exception {
        int databaseSizeBeforeCreate = helperRepository.findAll().size();

        // Create the Helper
        restHelperMockMvc.perform(post("/api/helpers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helper)))
            .andExpect(status().isCreated());

        // Validate the Helper in the database
        List<Helper> helperList = helperRepository.findAll();
        assertThat(helperList).hasSize(databaseSizeBeforeCreate + 1);
        Helper testHelper = helperList.get(helperList.size() - 1);
    }

    @Test
    @Transactional
    public void createHelperWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = helperRepository.findAll().size();

        // Create the Helper with an existing ID
        helper.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHelperMockMvc.perform(post("/api/helpers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helper)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Helper> helperList = helperRepository.findAll();
        assertThat(helperList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHelpers() throws Exception {
        // Initialize the database
        helperRepository.saveAndFlush(helper);

        // Get all the helperList
        restHelperMockMvc.perform(get("/api/helpers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(helper.getId().intValue())));
    }

    @Test
    @Transactional
    public void getHelper() throws Exception {
        // Initialize the database
        helperRepository.saveAndFlush(helper);

        // Get the helper
        restHelperMockMvc.perform(get("/api/helpers/{id}", helper.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(helper.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHelper() throws Exception {
        // Get the helper
        restHelperMockMvc.perform(get("/api/helpers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHelper() throws Exception {
        // Initialize the database
        helperRepository.saveAndFlush(helper);
        int databaseSizeBeforeUpdate = helperRepository.findAll().size();

        // Update the helper
        Helper updatedHelper = helperRepository.findOne(helper.getId());

        restHelperMockMvc.perform(put("/api/helpers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHelper)))
            .andExpect(status().isOk());

        // Validate the Helper in the database
        List<Helper> helperList = helperRepository.findAll();
        assertThat(helperList).hasSize(databaseSizeBeforeUpdate);
        Helper testHelper = helperList.get(helperList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingHelper() throws Exception {
        int databaseSizeBeforeUpdate = helperRepository.findAll().size();

        // Create the Helper

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHelperMockMvc.perform(put("/api/helpers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helper)))
            .andExpect(status().isCreated());

        // Validate the Helper in the database
        List<Helper> helperList = helperRepository.findAll();
        assertThat(helperList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHelper() throws Exception {
        // Initialize the database
        helperRepository.saveAndFlush(helper);
        int databaseSizeBeforeDelete = helperRepository.findAll().size();

        // Get the helper
        restHelperMockMvc.perform(delete("/api/helpers/{id}", helper.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Helper> helperList = helperRepository.findAll();
        assertThat(helperList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Helper.class);
        Helper helper1 = new Helper();
        helper1.setId(1L);
        Helper helper2 = new Helper();
        helper2.setId(helper1.getId());
        assertThat(helper1).isEqualTo(helper2);
        helper2.setId(2L);
        assertThat(helper1).isNotEqualTo(helper2);
        helper1.setId(null);
        assertThat(helper1).isNotEqualTo(helper2);
    }
}
