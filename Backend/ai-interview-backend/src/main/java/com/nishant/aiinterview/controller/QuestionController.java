package com.nishant.aiinterview.controller;

import com.nishant.aiinterview.entity.Interview;
import com.nishant.aiinterview.entity.Question;
import com.nishant.aiinterview.repository.InterviewRepository;
import com.nishant.aiinterview.service.QuestionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin
public class QuestionController {

    private final QuestionService questionService;
    private final InterviewRepository interviewRepository;

    public QuestionController(
            QuestionService questionService,
            InterviewRepository interviewRepository) {

        this.questionService = questionService;
        this.interviewRepository = interviewRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Question> createQuestion(
            @RequestParam Long interviewId,
            @RequestParam String questionText,
            @RequestParam String category,
            @RequestParam String difficulty) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        Question question = questionService.createQuestion(
                questionText,
                category,
                difficulty,
                interview
        );

        return ResponseEntity.ok(question);
    }
    @GetMapping("/interview/{interviewId}")
    public ResponseEntity<List<Question>> getQuestionsByInterview(
            @PathVariable Long interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        List<Question> questions =
                questionService.getQuestionsByInterview(interview);

        return ResponseEntity.ok(questions);
    }
}