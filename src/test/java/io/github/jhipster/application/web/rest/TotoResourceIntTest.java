package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterApp;

import io.github.jhipster.application.domain.Toto;
import io.github.jhipster.application.repository.TotoRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

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


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TotoResource REST controller.
 *
 * @see TotoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TotoResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TotoRepository totoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTotoMockMvc;

    private Toto toto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TotoResource totoResource = new TotoResource(totoRepository);
        this.restTotoMockMvc = MockMvcBuilders.standaloneSetup(totoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Toto createEntity(EntityManager em) {
        Toto toto = new Toto()
            .name(DEFAULT_NAME);
        return toto;
    }

    @Before
    public void initTest() {
        toto = createEntity(em);
    }

    @Test
    @Transactional
    public void createToto() throws Exception {
        int databaseSizeBeforeCreate = totoRepository.findAll().size();

        // Create the Toto
        restTotoMockMvc.perform(post("/api/totos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(toto)))
            .andExpect(status().isCreated());

        // Validate the Toto in the database
        List<Toto> totoList = totoRepository.findAll();
        assertThat(totoList).hasSize(databaseSizeBeforeCreate + 1);
        Toto testToto = totoList.get(totoList.size() - 1);
        assertThat(testToto.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTotoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = totoRepository.findAll().size();

        // Create the Toto with an existing ID
        toto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTotoMockMvc.perform(post("/api/totos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(toto)))
            .andExpect(status().isBadRequest());

        // Validate the Toto in the database
        List<Toto> totoList = totoRepository.findAll();
        assertThat(totoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTotos() throws Exception {
        // Initialize the database
        totoRepository.saveAndFlush(toto);

        // Get all the totoList
        restTotoMockMvc.perform(get("/api/totos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(toto.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getToto() throws Exception {
        // Initialize the database
        totoRepository.saveAndFlush(toto);

        // Get the toto
        restTotoMockMvc.perform(get("/api/totos/{id}", toto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(toto.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingToto() throws Exception {
        // Get the toto
        restTotoMockMvc.perform(get("/api/totos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateToto() throws Exception {
        // Initialize the database
        totoRepository.saveAndFlush(toto);

        int databaseSizeBeforeUpdate = totoRepository.findAll().size();

        // Update the toto
        Toto updatedToto = totoRepository.findById(toto.getId()).get();
        // Disconnect from session so that the updates on updatedToto are not directly saved in db
        em.detach(updatedToto);
        updatedToto
            .name(UPDATED_NAME);

        restTotoMockMvc.perform(put("/api/totos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedToto)))
            .andExpect(status().isOk());

        // Validate the Toto in the database
        List<Toto> totoList = totoRepository.findAll();
        assertThat(totoList).hasSize(databaseSizeBeforeUpdate);
        Toto testToto = totoList.get(totoList.size() - 1);
        assertThat(testToto.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingToto() throws Exception {
        int databaseSizeBeforeUpdate = totoRepository.findAll().size();

        // Create the Toto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTotoMockMvc.perform(put("/api/totos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(toto)))
            .andExpect(status().isBadRequest());

        // Validate the Toto in the database
        List<Toto> totoList = totoRepository.findAll();
        assertThat(totoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteToto() throws Exception {
        // Initialize the database
        totoRepository.saveAndFlush(toto);

        int databaseSizeBeforeDelete = totoRepository.findAll().size();

        // Get the toto
        restTotoMockMvc.perform(delete("/api/totos/{id}", toto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Toto> totoList = totoRepository.findAll();
        assertThat(totoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Toto.class);
        Toto toto1 = new Toto();
        toto1.setId(1L);
        Toto toto2 = new Toto();
        toto2.setId(toto1.getId());
        assertThat(toto1).isEqualTo(toto2);
        toto2.setId(2L);
        assertThat(toto1).isNotEqualTo(toto2);
        toto1.setId(null);
        assertThat(toto1).isNotEqualTo(toto2);
    }
}
