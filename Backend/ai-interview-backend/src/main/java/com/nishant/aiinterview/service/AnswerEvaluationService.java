package com.nishant.aiinterview.service;

import com.nishant.aiinterview.entity.Answer;
import org.springframework.stereotype.Service;

@Service
public class AnswerEvaluationService {

    private final OllamaService ollamaService;

    public AnswerEvaluationService(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    public Answer evaluateAnswer(Answer answer) {

        String question = answer.getQuestion().getQuestionText();
        String answerText = answer.getAnswerText();

        String prompt = """
                You are an AI interviewer evaluating a candidate's answer.

                Question:
                %s

                Candidate's Answer:
                %s

                Evaluate the answer.

                Give your response in exactly this format:

                Score: X/10
                Feedback: <brief feedback>

                Give a fair score based on correctness, completeness, and clarity.
                """.formatted(question, answerText);

        String evaluation = ollamaService.generate(prompt);

        Double score = extractScore(evaluation);
        String feedback = extractFeedback(evaluation);

        answer.setScore(score);
        answer.setFeedback(feedback);

        return answer;
    }

    private Double extractScore(String evaluation) {

        try {
            int start = evaluation.indexOf("Score:") + 6;
            int end = evaluation.indexOf("/10", start);

            String scoreText =
                    evaluation.substring(start, end).trim();

            return Double.parseDouble(scoreText);

        } catch (Exception e) {
            return 0.0;
        }
    }

    private String extractFeedback(String evaluation) {

        int start = evaluation.indexOf("Feedback:");

        if (start == -1) {
            return evaluation;
        }

        return evaluation
                .substring(start + 9)
                .trim();
    }
}