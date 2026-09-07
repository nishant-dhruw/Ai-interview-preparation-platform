package com.nishant.aiinterview.dto;

import com.nishant.aiinterview.entity.Interview;
import com.nishant.aiinterview.entity.Question;

import java.time.LocalDateTime;
import java.util.List;

public class InterviewResponse {

    private Long id;
    private String type;
    private String status;
    private LocalDateTime createdAt;
    private List<QuestionResponse> questions;

    public InterviewResponse(
            Long id,
            String type,
            String status,
            LocalDateTime createdAt,
            List<QuestionResponse> questions) {

        this.id = id;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
        this.questions = questions;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<QuestionResponse> getQuestions() {
        return questions;
    }

    public static InterviewResponse from(Interview interview) {

        List<QuestionResponse> questions =
                interview.getQuestions()
                        .stream()
                        .map(question ->
                                new QuestionResponse(
                                        question.getId(),
                                        question.getQuestionText(),
                                        question.getCategory(),
                                        question.getDifficulty()
                                )
                        )
                        .toList();

        return new InterviewResponse(
                interview.getId(),
                interview.getType(),
                interview.getStatus(),
                interview.getCreatedAt(),
                questions
        );
    }
}