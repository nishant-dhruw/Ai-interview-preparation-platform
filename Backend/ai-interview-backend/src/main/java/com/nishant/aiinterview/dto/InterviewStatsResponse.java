package com.nishant.aiinterview.dto;

public class InterviewStatsResponse {

    private long totalInterviews;
    private long completedInterviews;
    private double averageScore;
    private double progress;

    public InterviewStatsResponse(
            long totalInterviews,
            long completedInterviews,
            double averageScore,
            double progress) {

        this.totalInterviews = totalInterviews;
        this.completedInterviews = completedInterviews;
        this.averageScore = averageScore;
        this.progress = progress;
    }

    public long getTotalInterviews() {
        return totalInterviews;
    }

    public long getCompletedInterviews() {
        return completedInterviews;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public double getProgress() {
        return progress;
    }
}