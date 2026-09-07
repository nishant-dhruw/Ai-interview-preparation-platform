package com.nishant.aiinterview.dto;

import com.nishant.aiinterview.entity.Answer;

import java.time.LocalDateTime;

public class AnswerResponse {

    private Long id;
    private String answerText;
    private Double score;
    private String feedback;
    private LocalDateTime submittedAt;

    public AnswerResponse(
            Long id,
            String answerText,
            Double score,
            String feedback,
            LocalDateTime submittedAt) {

        this.id = id;
        this.answerText = answerText;
        this.score = score;
        this.feedback = feedback;
        this.submittedAt = submittedAt;
    }

    public Long getId() {
        return id;
    }

    public String getAnswerText() {
        return answerText;
    }

    public Double getScore() {
        return score;
    }

    public String getFeedback() {
        return feedback;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public static AnswerResponse from(Answer answer) {

        return new AnswerResponse(
                answer.getId(),
                answer.getAnswerText(),
                answer.getScore(),
                answer.getFeedback(),
                answer.getSubmittedAt()
        );
    }
}