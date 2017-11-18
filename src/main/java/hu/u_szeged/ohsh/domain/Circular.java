package hu.u_szeged.ohsh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import hu.u_szeged.ohsh.domain.enumeration.DayOfWeek;

/**
 * A Circular.
 */
@Entity
@Table(name = "circular")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Circular implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "day")
    private DayOfWeek day;

    @Column(name = "jhi_time")
    private String time;

    @Column(name = "locale")
    private String locale;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "image")
    private String image;

    @Column(name = "active")
    private Boolean active;

    @ManyToOne
    private Student student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Circular title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public DayOfWeek getDay() {
        return day;
    }

    public Circular day(DayOfWeek day) {
        this.day = day;
        return this;
    }

    public void setDay(DayOfWeek day) {
        this.day = day;
    }

    public String getTime() {
        return time;
    }

    public Circular time(String time) {
        this.time = time;
        return this;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocale() {
        return locale;
    }

    public Circular locale(String locale) {
        this.locale = locale;
        return this;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getContent() {
        return content;
    }

    public Circular content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public Circular image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean isActive() {
        return active;
    }

    public Circular active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Student getStudent() {
        return student;
    }

    public Circular student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Circular circular = (Circular) o;
        if (circular.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), circular.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Circular{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", day='" + getDay() + "'" +
            ", time='" + getTime() + "'" +
            ", locale='" + getLocale() + "'" +
            ", content='" + getContent() + "'" +
            ", image='" + getImage() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
