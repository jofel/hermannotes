package hu.u_szeged.ohsh.web.rest;

import hu.u_szeged.ohsh.HermannotesApp;

import hu.u_szeged.ohsh.domain.Program;
import hu.u_szeged.ohsh.repository.ProgramRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import hu.u_szeged.ohsh.domain.enumeration.ProgramStatus;

/**
 * Test class for the ProgramResource REST controller.
 *
 * @see ProgramResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HermannotesApp.class)
public class ProgramResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PLAN = "AAAAAAAAAA";
    private static final String UPDATED_PLAN = "BBBBBBBBBB";

    private static final Integer DEFAULT_PLAN_COST = 1;
    private static final Integer UPDATED_PLAN_COST = 2;

    private static final String DEFAULT_DECISION = "AAAAAAAAAA";
    private static final String UPDATED_DECISION = "BBBBBBBBBB";

    private static final Integer DEFAULT_DECISION_COST = 1;
    private static final Integer UPDATED_DECISION_COST = 2;

    private static final String DEFAULT_REPORT = "AAAAAAAAAA";
    private static final String UPDATED_REPORT = "BBBBBBBBBB";

    private static final Integer DEFAULT_REPORT_COST = 1;
    private static final Integer UPDATED_REPORT_COST = 2;

    private static final ProgramStatus DEFAULT_STATUS = ProgramStatus.plan;
    private static final ProgramStatus UPDATED_STATUS = ProgramStatus.progress;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProgramMockMvc;

    private Program program;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ProgramResource programResource = new ProgramResource(programRepository);
        this.restProgramMockMvc = MockMvcBuilders.standaloneSetup(programResource)
                .setCustomArgumentResolvers(pageableArgumentResolver).setControllerAdvice(exceptionTranslator)
                .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it, if
     * they test an entity which requires the current entity.
     */
    public static Program createEntity(EntityManager em) {
        Program program = new Program().title(DEFAULT_TITLE).date(DEFAULT_DATE).plan(DEFAULT_PLAN)
                .planCost(DEFAULT_PLAN_COST).decision(DEFAULT_DECISION).decisionCost(DEFAULT_DECISION_COST)
                .report(DEFAULT_REPORT).reportCost(DEFAULT_REPORT_COST).status(DEFAULT_STATUS);
        return program;
    }

    @Before
    public void initTest() {
        program = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgram() throws Exception {
        int databaseSizeBeforeCreate = programRepository.findAll().size();

        // Create the Program
        restProgramMockMvc.perform(post("/api/programs").contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(program))).andExpect(status().isCreated());

        // Validate the Program in the database
        List<Program> programList = programRepository.findAll();
        assertThat(programList).hasSize(databaseSizeBeforeCreate + 1);
        Program testProgram = programList.get(programList.size() - 1);
        assertThat(testProgram.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testProgram.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testProgram.getPlan()).isEqualTo(DEFAULT_PLAN);
        assertThat(testProgram.getPlanCost()).isEqualTo(DEFAULT_PLAN_COST);
        assertThat(testProgram.getDecision()).isEqualTo(DEFAULT_DECISION);
        assertThat(testProgram.getDecisionCost()).isEqualTo(DEFAULT_DECISION_COST);
        assertThat(testProgram.getReport()).isEqualTo(DEFAULT_REPORT);
        assertThat(testProgram.getReportCost()).isEqualTo(DEFAULT_REPORT_COST);
        assertThat(testProgram.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createProgramWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programRepository.findAll().size();

        // Create the Program with an existing ID
        program.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramMockMvc.perform(post("/api/programs").contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(program))).andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Program> programList = programRepository.findAll();
        assertThat(programList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrograms() throws Exception {
        // Initialize the database
        programRepository.saveAndFlush(program);

        // Get all the programList
        restProgramMockMvc.perform(get("/api/programs?sort=id,desc")).andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(program.getId().intValue())))
                .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
                .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
                .andExpect(jsonPath("$.[*].plan").value(hasItem(DEFAULT_PLAN.toString())))
                .andExpect(jsonPath("$.[*].planCost").value(hasItem(DEFAULT_PLAN_COST)))
                .andExpect(jsonPath("$.[*].decision").value(hasItem(DEFAULT_DECISION.toString())))
                .andExpect(jsonPath("$.[*].decisionCost").value(hasItem(DEFAULT_DECISION_COST)))
                .andExpect(jsonPath("$.[*].report").value(hasItem(DEFAULT_REPORT.toString())))
                .andExpect(jsonPath("$.[*].reportCost").value(hasItem(DEFAULT_REPORT_COST)))
                .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getProgram() throws Exception {
        // Initialize the database
        programRepository.saveAndFlush(program);

        // Get the program
        restProgramMockMvc.perform(get("/api/programs/{id}", program.getId())).andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.id").value(program.getId().intValue()))
                .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
                .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
                .andExpect(jsonPath("$.plan").value(DEFAULT_PLAN.toString()))
                .andExpect(jsonPath("$.planCost").value(DEFAULT_PLAN_COST))
                .andExpect(jsonPath("$.decision").value(DEFAULT_DECISION.toString()))
                .andExpect(jsonPath("$.decisionCost").value(DEFAULT_DECISION_COST))
                .andExpect(jsonPath("$.report").value(DEFAULT_REPORT.toString()))
                .andExpect(jsonPath("$.reportCost").value(DEFAULT_REPORT_COST))
                .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProgram() throws Exception {
        // Get the program
        restProgramMockMvc.perform(get("/api/programs/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgram() throws Exception {
        // Initialize the database
        programRepository.saveAndFlush(program);
        int databaseSizeBeforeUpdate = programRepository.findAll().size();

        // Update the program
        Program updatedProgram = programRepository.findOne(program.getId());
        updatedProgram.title(UPDATED_TITLE).date(UPDATED_DATE).plan(UPDATED_PLAN).planCost(UPDATED_PLAN_COST)
                .decision(UPDATED_DECISION).decisionCost(UPDATED_DECISION_COST).report(UPDATED_REPORT)
                .reportCost(UPDATED_REPORT_COST).status(UPDATED_STATUS);

        restProgramMockMvc.perform(put("/api/programs").contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedProgram))).andExpect(status().isOk());

        // Validate the Program in the database
        List<Program> programList = programRepository.findAll();
        assertThat(programList).hasSize(databaseSizeBeforeUpdate);
        Program testProgram = programList.get(programList.size() - 1);
        assertThat(testProgram.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testProgram.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testProgram.getPlan()).isEqualTo(UPDATED_PLAN);
        assertThat(testProgram.getPlanCost()).isEqualTo(UPDATED_PLAN_COST);
        assertThat(testProgram.getDecision()).isEqualTo(UPDATED_DECISION);
        assertThat(testProgram.getDecisionCost()).isEqualTo(UPDATED_DECISION_COST);
        assertThat(testProgram.getReport()).isEqualTo(UPDATED_REPORT);
        assertThat(testProgram.getReportCost()).isEqualTo(UPDATED_REPORT_COST);
        assertThat(testProgram.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingProgram() throws Exception {
        int databaseSizeBeforeUpdate = programRepository.findAll().size();

        // Create the Program

        // If the entity doesn't have an ID, it will be created instead of just being
        // updated
        restProgramMockMvc.perform(put("/api/programs").contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(program))).andExpect(status().isCreated());

        // Validate the Program in the database
        List<Program> programList = programRepository.findAll();
        assertThat(programList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProgram() throws Exception {
        // Initialize the database
        programRepository.saveAndFlush(program);
        int databaseSizeBeforeDelete = programRepository.findAll().size();

        // Get the program
        restProgramMockMvc.perform(delete("/api/programs/{id}", program.getId()).accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Program> programList = programRepository.findAll();
        assertThat(programList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Program.class);
        Program program1 = new Program();
        program1.setId(1L);
        Program program2 = new Program();
        program2.setId(program1.getId());
        assertThat(program1).isEqualTo(program2);
        program2.setId(2L);
        assertThat(program1).isNotEqualTo(program2);
        program1.setId(null);
        assertThat(program1).isNotEqualTo(program2);
    }
}
