package hu.u_szeged.ohsh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import hu.u_szeged.ohsh.domain.enumeration.RequestStatus;

/**
 * A Request.
 */
@Entity
@Table(name = "request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "jhi_time")
    private String time;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "contentcost")
    private Integer contentcost;

    @Lob
    @Column(name = "decision")
    private String decision;

    @Column(name = "decisioncost")
    private Integer decisioncost;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RequestStatus status;

    @Column(name = "personal")
    private Boolean personal;

    @Column(name = "notified")
    private Boolean notified;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Student messenger;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Request title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public Request date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public Request time(String time) {
        this.time = time;
        return this;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public Request content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getContentcost() {
        return contentcost;
    }

    public Request contentcost(Integer contentcost) {
        this.contentcost = contentcost;
        return this;
    }

    public void setContentcost(Integer contentcost) {
        this.contentcost = contentcost;
    }

    public String getDecision() {
        return decision;
    }

    public Request decision(String decision) {
        this.decision = decision;
        return this;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }

    public Integer getDecisioncost() {
        return decisioncost;
    }

    public Request decisioncost(Integer decisioncost) {
        this.decisioncost = decisioncost;
        return this;
    }

    public void setDecisioncost(Integer decisioncost) {
        this.decisioncost = decisioncost;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public Request status(RequestStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public Boolean isPersonal() {
        return personal;
    }

    public Request personal(Boolean personal) {
        this.personal = personal;
        return this;
    }

    public void setPersonal(Boolean personal) {
        this.personal = personal;
    }

    public Boolean isNotified() {
        return notified;
    }

    public Request notified(Boolean notified) {
        this.notified = notified;
        return this;
    }

    public void setNotified(Boolean notified) {
        this.notified = notified;
    }

    public Student getStudent() {
        return student;
    }

    public Request student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Student getMessenger() {
        return messenger;
    }

    public Request messenger(Student student) {
        this.messenger = student;
        return this;
    }

    public void setMessenger(Student student) {
        this.messenger = student;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Request request = (Request) o;
        if (request.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), request.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Request{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", date='" + getDate() + "'" +
            ", time='" + getTime() + "'" +
            ", content='" + getContent() + "'" +
            ", contentcost='" + getContentcost() + "'" +
            ", decision='" + getDecision() + "'" +
            ", decisioncost='" + getDecisioncost() + "'" +
            ", status='" + getStatus() + "'" +
            ", personal='" + isPersonal() + "'" +
            ", notified='" + isNotified() + "'" +
            "}";
    }
}
