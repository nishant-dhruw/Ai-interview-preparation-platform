package com.nishant.aiinterview.controller;

import com.nishant.aiinterview.entity.Interview;
import com.nishant.aiinterview.entity.User;
import com.nishant.aiinterview.service.InterviewService;
import com.nishant.aiinterview.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nishant.aiinterview.dto.InterviewResultResponse;
import com.nishant.aiinterview.dto.InterviewStatsResponse;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin
public class InterviewController {

    private final InterviewService interviewService;
    private final UserRepository userRepository;

    public InterviewController(
            InterviewService interviewService,
            UserRepository userRepository) {

        this.interviewService = interviewService;
        this.userRepository = userRepository;
    }

    @PostMapping("/start")
    public ResponseEntity<Interview> startInterview(
            @RequestParam Long userId,
            @RequestParam String type) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Interview interview =
                interviewService.createInterview(user, type);

        return ResponseEntity.ok(interview);
    }

    @GetMapping("/{interviewId}")
    public ResponseEntity<Interview> getInterview(
            @PathVariable Long interviewId) {

        Interview interview =
                interviewService.getInterviewById(interviewId);

        return ResponseEntity.ok(interview);
    }

    @PostMapping("/{interviewId}/complete")
    public ResponseEntity<Interview> completeInterview(
            @PathVariable Long interviewId) {

        Interview interview =
                interviewService.completeInterview(interviewId);

        return ResponseEntity.ok(interview);
    }

    @GetMapping("/{interviewId}/result")
    public ResponseEntity<InterviewResultResponse> getInterviewResult(
            @PathVariable Long interviewId) {

        InterviewResultResponse result =
                interviewService.getInterviewResult(interviewId);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/user/{userId}/stats")
    public ResponseEntity<InterviewStatsResponse> getInterviewStats(
            @PathVariable Long userId) {

        InterviewStatsResponse stats =
                interviewService.getInterviewStats(userId);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Interview>> getUserInterviews(
            @PathVariable Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Interview> interviews =
                interviewService.getInterviewsByUser(user);

        return ResponseEntity.ok(interviews);
    }
}