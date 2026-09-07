package com.nishant.aiinterview.dto;

public class QuestionResponse {

    private Long id;
    private String questionText;
    private String category;
    private String difficulty;

    public QuestionResponse(
            Long id,
            String questionText,
            String category,
            String difficulty) {

        this.id = id;
        this.questionText = questionText;
        this.category = category;
        this.difficulty = difficulty;
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
}