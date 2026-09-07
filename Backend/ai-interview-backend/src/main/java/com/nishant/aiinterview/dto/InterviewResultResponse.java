package com.nishant.aiinterview.dto;

public class InterviewResultResponse {

    private Long interviewId;
    private String type;
    private String status;
    private int totalQuestions;
    private int answeredQuestions;
    private double averageScore;

    public InterviewResultResponse(
            Long interviewId,
            String type,
            String status,
            int totalQuestions,
            int answeredQuestions,
            double averageScore) {

        this.interviewId = interviewId;
        this.type = type;
        this.status = status;
        this.totalQuestions = totalQuestions;
        this.answeredQuestions = answeredQuestions;
        this.averageScore = averageScore;
    }

    public Long getInterviewId() {
        return interviewId;
    }

    public String getType() {
        return type;
    }

    public String getStatus() {
        return status;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public int getAnsweredQuestions() {
        return answeredQuestions;
    }

    public double getAverageScore() {
        return averageScore;
    }
}