package com.nishant.aiinterview.service;

import com.nishant.aiinterview.entity.Interview;
import com.nishant.aiinterview.entity.User;
import com.nishant.aiinterview.repository.InterviewRepository;
import org.springframework.stereotype.Service;
import com.nishant.aiinterview.dto.InterviewResultResponse;
import com.nishant.aiinterview.entity.Answer;
import com.nishant.aiinterview.entity.Question;
import com.nishant.aiinterview.dto.InterviewStatsResponse;
import java.util.List;


@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final QuestionService questionService;

    public InterviewService(
            InterviewRepository interviewRepository,
            QuestionService questionService) {

        this.interviewRepository = interviewRepository;
        this.questionService = questionService;
    }

    public Interview createInterview(User user, String type) {

        Interview interview = new Interview(
                type,
                "STARTED",
                user
        );

        interview = interviewRepository.save(interview);

        // Generate interview questions using local AI
        questionService.generateQuestions(
                type,
                "EASY",
                5,
                interview
        );

        return interview;
    }

    public Interview getInterviewById(Long interviewId) {

        return interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));
    }

    public Interview completeInterview(Long interviewId) {

        Interview interview = getInterviewById(interviewId);

        interview.setStatus("COMPLETED");

        return interviewRepository.save(interview);
    }

    public InterviewResultResponse getInterviewResult(Long interviewId) {

        Interview interview = getInterviewById(interviewId);

        int totalQuestions = interview.getQuestions().size();

        int answeredQuestions = 0;

        double totalScore = 0.0;

        for (Question question : interview.getQuestions()) {

            for (Answer answer : question.getAnswers()) {

                if (answer.getScore() != null) {

                    answeredQuestions++;

                    totalScore += answer.getScore();

                    break;
                }
            }
        }

        double averageScore = 0.0;

        if (answeredQuestions > 0) {
            averageScore = totalScore / answeredQuestions;
        }

        return new InterviewResultResponse(
                interview.getId(),
                interview.getType(),
                interview.getStatus(),
                totalQuestions,
                answeredQuestions,
                averageScore
        );
    }

    public InterviewStatsResponse getInterviewStats(Long userId) {

        List<Interview> interviews =
                interviewRepository.findByUser_Id(userId);

        long totalInterviews = interviews.size();

        long completedInterviews = interviews.stream()
                .filter(interview ->
                        "COMPLETED".equals(interview.getStatus()))
                .count();

        double totalScore = 0.0;
        int scoredAnswers = 0;

        for (Interview interview : interviews) {

            for (Question question : interview.getQuestions()) {

                for (Answer answer : question.getAnswers()) {

                    if (answer.getScore() != null) {

                        totalScore += answer.getScore();

                        scoredAnswers++;

                    }

                }

            }

        }

        double averageScore = 0.0;

        if (scoredAnswers > 0) {

            averageScore =
                    totalScore / scoredAnswers;

        }

        double progress = 0.0;

        if (totalInterviews > 0) {

            progress =
                    ((double) completedInterviews
                            / totalInterviews) * 100;

        }

        return new InterviewStatsResponse(
                totalInterviews,
                completedInterviews,
                averageScore,
                progress
        );
    }
    public List<Interview> getInterviewsByUser(User user) {

        return interviewRepository.findByUser_Id(user.getId());
    }
}