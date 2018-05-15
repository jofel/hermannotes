package hu.u_szeged.ohsh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import hu.u_szeged.ohsh.domain.enumeration.ProgramStatus;

/**
 * A Program.
 */
@Entity
@Table(name = "program")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Program implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Lob
    @Column(name = "jhi_plan")
    private String plan;

    @Column(name = "plan_cost")
    private Integer planCost;

    @Lob
    @Column(name = "decision")
    private String decision;

    @Column(name = "decision_cost")
    private Integer decisionCost;

    @Lob
    @Column(name = "report")
    private String report;

    @Column(name = "report_cost")
    private Integer reportCost;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ProgramStatus status;

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

    public Program title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public Program date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPlan() {
        return plan;
    }

    public Program plan(String plan) {
        this.plan = plan;
        return this;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public Integer getPlanCost() {
        return planCost;
    }

    public Program planCost(Integer planCost) {
        this.planCost = planCost;
        return this;
    }

    public void setPlanCost(Integer planCost) {
        this.planCost = planCost;
    }

    public String getDecision() {
        return decision;
    }

    public Program decision(String decision) {
        this.decision = decision;
        return this;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }

    public Integer getDecisionCost() {
        return decisionCost;
    }

    public Program decisionCost(Integer decisionCost) {
        this.decisionCost = decisionCost;
        return this;
    }

    public void setDecisionCost(Integer decisionCost) {
        this.decisionCost = decisionCost;
    }

    public String getReport() {
        return report;
    }

    public Program report(String report) {
        this.report = report;
        return this;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public Integer getReportCost() {
        return reportCost;
    }

    public Program reportCost(Integer reportCost) {
        this.reportCost = reportCost;
        return this;
    }

    public void setReportCost(Integer reportCost) {
        this.reportCost = reportCost;
    }

    public ProgramStatus getStatus() {
        return status;
    }

    public Program status(ProgramStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ProgramStatus status) {
        this.status = status;
    }

    public Student getStudent() {
        return student;
    }

    public Program student(Student student) {
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
        Program program = (Program) o;
        if (program.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), program.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Program{" + "id=" + getId() + ", title='" + getTitle() + "'" + ", date='" + getDate() + "'" + ", plan='"
                + getPlan() + "'" + ", planCost='" + getPlanCost() + "'" + ", decision='" + getDecision() + "'"
                + ", decisionCost='" + getDecisionCost() + "'" + ", report='" + getReport() + "'" + ", reportCost='"
                + getReportCost() + "'" + ", status='" + getStatus() + "'" + "}";
    }
}
