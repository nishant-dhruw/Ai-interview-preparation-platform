package com.nishant.aiinterview.service;

import com.nishant.aiinterview.entity.Answer;
import com.nishant.aiinterview.entity.Question;
import com.nishant.aiinterview.repository.AnswerRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final AnswerEvaluationService answerEvaluationService;

    public AnswerService(
            AnswerRepository answerRepository,
            AnswerEvaluationService answerEvaluationService) {

        this.answerRepository = answerRepository;
        this.answerEvaluationService = answerEvaluationService;
    }

    public Answer submitAnswer(
            String answerText,
            Question question) {

        Answer answer = new Answer(
                answerText,
                question
        );

        // AI evaluates the answer
        answer = answerEvaluationService.evaluateAnswer(answer);

        // Save evaluated answer
        return answerRepository.save(answer);
    }
    public List<Answer> getAnswersByQuestion(Question question) {
        return answerRepository.findByQuestion(question);
    }
}