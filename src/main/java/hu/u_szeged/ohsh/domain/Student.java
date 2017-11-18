package hu.u_szeged.ohsh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import hu.u_szeged.ohsh.domain.enumeration.StudentStatus;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "studies")
    private String studies;

    @Column(name = "room")
    private Integer room;

    @Column(name = "point")
    private Integer point;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StudentStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Student name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudies() {
        return studies;
    }

    public Student studies(String studies) {
        this.studies = studies;
        return this;
    }

    public void setStudies(String studies) {
        this.studies = studies;
    }

    public Integer getRoom() {
        return room;
    }

    public Student room(Integer room) {
        this.room = room;
        return this;
    }

    public void setRoom(Integer room) {
        this.room = room;
    }

    public Integer getPoint() {
        return point;
    }

    public Student point(Integer point) {
        this.point = point;
        return this;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public StudentStatus getStatus() {
        return status;
    }

    public Student status(StudentStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(StudentStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", studies='" + getStudies() + "'" +
            ", room='" + getRoom() + "'" +
            ", point='" + getPoint() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
