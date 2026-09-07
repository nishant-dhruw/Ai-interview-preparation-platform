package com.nishant.aiinterview.service;

import com.nishant.aiinterview.entity.Interview;
import com.nishant.aiinterview.entity.Question;
import com.nishant.aiinterview.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final OllamaService ollamaService;

    public QuestionService(
            QuestionRepository questionRepository,
            OllamaService ollamaService) {

        this.questionRepository = questionRepository;
        this.ollamaService = ollamaService;
    }

    public Question createQuestion(
            String questionText,
            String category,
            String difficulty,
            Interview interview) {

        Question question = new Question(
                questionText,
                category,
                difficulty,
                interview
        );

        return questionRepository.save(question);
    }

    public List<Question> getQuestionsByInterview(Interview interview) {

        return questionRepository.findByInterview(interview);
    }

    public List<Question> generateQuestions(
            String category,
            String difficulty,
            int count,
            Interview interview) {

        String response = ollamaService.generateQuestions(
                category,
                difficulty,
                count
        );

        System.out.println("========== OLLAMA RESPONSE ==========");
        System.out.println(response);
        System.out.println("=====================================");

        String[] questions = response.split("\\r?\\n");

        List<Question> savedQuestions =
                new java.util.ArrayList<>();


        for (String questionText : questions) {

            questionText = questionText.trim();


            // Ignore empty lines
            if (questionText.isEmpty()) {
                continue;
            }


            // Remove common AI numbering
            questionText =
                    questionText.replaceFirst(
                            "^\\d+[.)]\\s*",
                            ""
                    ).trim();


            // Stop after requested number
            if (savedQuestions.size() >= count) {
                break;
            }


            Question question = new Question(
                    questionText,
                    category,
                    difficulty,
                    interview
            );

            Question savedQuestion =
                    questionRepository.save(question);

            interview.addQuestion(savedQuestion);

            savedQuestions.add(savedQuestion);
        }


        System.out.println(
                "Questions saved: " +
                        savedQuestions.size()
        );


        return savedQuestions;
    }
}