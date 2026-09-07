package com.nishant.aiinterview.controller;

import com.nishant.aiinterview.dto.AnswerResponse;
import com.nishant.aiinterview.entity.Answer;
import com.nishant.aiinterview.entity.Question;
import com.nishant.aiinterview.repository.QuestionRepository;
import com.nishant.aiinterview.service.AnswerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin
public class AnswerController {

    private final AnswerService answerService;
    private final QuestionRepository questionRepository;

    public AnswerController(
            AnswerService answerService,
            QuestionRepository questionRepository) {

        this.answerService = answerService;
        this.questionRepository = questionRepository;
    }

    @PostMapping("/submit")
    public ResponseEntity<AnswerResponse> submitAnswer(
            @RequestParam Long questionId,
            @RequestParam String answerText) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        Answer answer = answerService.submitAnswer(
                answerText,
                question
        );

        return ResponseEntity.ok(
                AnswerResponse.from(answer)
        );
    }

    @GetMapping("/question/{questionId}")
    public List<AnswerResponse> getAnswersByQuestion(@PathVariable Long questionId) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        return answerService.getAnswersByQuestion(question)
                .stream()
                .map(AnswerResponse::from)
                .toList();
    }
}