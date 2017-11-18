package hu.u_szeged.ohsh.web.rest;

import hu.u_szeged.ohsh.HermannotesApp;

import hu.u_szeged.ohsh.domain.Circular;
import hu.u_szeged.ohsh.repository.CircularRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import hu.u_szeged.ohsh.domain.enumeration.DayOfWeek;
/**
 * Test class for the CircularResource REST controller.
 *
 * @see CircularResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HermannotesApp.class)
public class CircularResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final DayOfWeek DEFAULT_DAY = DayOfWeek.monday;
    private static final DayOfWeek UPDATED_DAY = DayOfWeek.tuesday;

    private static final String DEFAULT_TIME = "AAAAAAAAAA";
    private static final String UPDATED_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALE = "AAAAAAAAAA";
    private static final String UPDATED_LOCALE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private CircularRepository circularRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCircularMockMvc;

    private Circular circular;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CircularResource circularResource = new CircularResource(circularRepository);
        this.restCircularMockMvc = MockMvcBuilders.standaloneSetup(circularResource)
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
    public static Circular createEntity(EntityManager em) {
        Circular circular = new Circular()
            .title(DEFAULT_TITLE)
            .day(DEFAULT_DAY)
            .time(DEFAULT_TIME)
            .locale(DEFAULT_LOCALE)
            .content(DEFAULT_CONTENT)
            .image(DEFAULT_IMAGE)
            .active(DEFAULT_ACTIVE);
        return circular;
    }

    @Before
    public void initTest() {
        circular = createEntity(em);
    }

    @Test
    @Transactional
    public void createCircular() throws Exception {
        int databaseSizeBeforeCreate = circularRepository.findAll().size();

        // Create the Circular
        restCircularMockMvc.perform(post("/api/circulars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(circular)))
            .andExpect(status().isCreated());

        // Validate the Circular in the database
        List<Circular> circularList = circularRepository.findAll();
        assertThat(circularList).hasSize(databaseSizeBeforeCreate + 1);
        Circular testCircular = circularList.get(circularList.size() - 1);
        assertThat(testCircular.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCircular.getDay()).isEqualTo(DEFAULT_DAY);
        assertThat(testCircular.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testCircular.getLocale()).isEqualTo(DEFAULT_LOCALE);
        assertThat(testCircular.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCircular.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testCircular.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createCircularWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = circularRepository.findAll().size();

        // Create the Circular with an existing ID
        circular.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCircularMockMvc.perform(post("/api/circulars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(circular)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Circular> circularList = circularRepository.findAll();
        assertThat(circularList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCirculars() throws Exception {
        // Initialize the database
        circularRepository.saveAndFlush(circular);

        // Get all the circularList
        restCircularMockMvc.perform(get("/api/circulars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(circular.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].day").value(hasItem(DEFAULT_DAY.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].locale").value(hasItem(DEFAULT_LOCALE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getCircular() throws Exception {
        // Initialize the database
        circularRepository.saveAndFlush(circular);

        // Get the circular
        restCircularMockMvc.perform(get("/api/circulars/{id}", circular.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(circular.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.day").value(DEFAULT_DAY.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.locale").value(DEFAULT_LOCALE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCircular() throws Exception {
        // Get the circular
        restCircularMockMvc.perform(get("/api/circulars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCircular() throws Exception {
        // Initialize the database
        circularRepository.saveAndFlush(circular);
        int databaseSizeBeforeUpdate = circularRepository.findAll().size();

        // Update the circular
        Circular updatedCircular = circularRepository.findOne(circular.getId());
        updatedCircular
            .title(UPDATED_TITLE)
            .day(UPDATED_DAY)
            .time(UPDATED_TIME)
            .locale(UPDATED_LOCALE)
            .content(UPDATED_CONTENT)
            .image(UPDATED_IMAGE)
            .active(UPDATED_ACTIVE);

        restCircularMockMvc.perform(put("/api/circulars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCircular)))
            .andExpect(status().isOk());

        // Validate the Circular in the database
        List<Circular> circularList = circularRepository.findAll();
        assertThat(circularList).hasSize(databaseSizeBeforeUpdate);
        Circular testCircular = circularList.get(circularList.size() - 1);
        assertThat(testCircular.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCircular.getDay()).isEqualTo(UPDATED_DAY);
        assertThat(testCircular.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testCircular.getLocale()).isEqualTo(UPDATED_LOCALE);
        assertThat(testCircular.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCircular.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testCircular.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingCircular() throws Exception {
        int databaseSizeBeforeUpdate = circularRepository.findAll().size();

        // Create the Circular

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCircularMockMvc.perform(put("/api/circulars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(circular)))
            .andExpect(status().isCreated());

        // Validate the Circular in the database
        List<Circular> circularList = circularRepository.findAll();
        assertThat(circularList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCircular() throws Exception {
        // Initialize the database
        circularRepository.saveAndFlush(circular);
        int databaseSizeBeforeDelete = circularRepository.findAll().size();

        // Get the circular
        restCircularMockMvc.perform(delete("/api/circulars/{id}", circular.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Circular> circularList = circularRepository.findAll();
        assertThat(circularList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Circular.class);
        Circular circular1 = new Circular();
        circular1.setId(1L);
        Circular circular2 = new Circular();
        circular2.setId(circular1.getId());
        assertThat(circular1).isEqualTo(circular2);
        circular2.setId(2L);
        assertThat(circular1).isNotEqualTo(circular2);
        circular1.setId(null);
        assertThat(circular1).isNotEqualTo(circular2);
    }
}
