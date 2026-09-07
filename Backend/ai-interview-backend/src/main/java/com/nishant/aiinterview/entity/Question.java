package com.nishant.aiinterview.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionText;

    private String category;

    private String difficulty;

    @ManyToOne
    @JoinColumn(name = "interview_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Interview interview;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();

    public Question() {
    }

    public Question(
            String questionText,
            String category,
            String difficulty,
            Interview interview) {

        this.questionText = questionText;
        this.category = category;
        this.difficulty = difficulty;
        this.interview = interview;
    }

    public Long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public String getCategory() {
        return category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public Interview getInterview() {
        return interview;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setInterview(Interview interview) {
        this.interview = interview;
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
        answer.setQuestion(this);
    }
}