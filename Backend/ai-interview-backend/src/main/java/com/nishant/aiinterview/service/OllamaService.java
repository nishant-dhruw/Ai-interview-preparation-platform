package com.nishant.aiinterview.service;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class OllamaService {

    private final RestTemplate restTemplate;
    private final JsonMapper jsonMapper;

    private static final String OLLAMA_URL =
            "http://localhost:11434/api/generate";

    private static final String MODEL =
            "qwen3:8b";

    public OllamaService() {
        this.restTemplate = new RestTemplate();
        this.jsonMapper = new JsonMapper();
    }

    public String generate(String prompt) {

        Map<String, Object> request = new HashMap<>();

        request.put("model", MODEL);
        request.put("prompt", prompt);
        request.put("stream", false);

        String response = restTemplate.postForObject(
                OLLAMA_URL,
                request,
                String.class
        );

        try {

            JsonNode jsonNode =
                    jsonMapper.readTree(response);

            String ollamaResponse =
                    jsonNode
                            .get("response")
                            .asText();

            System.out.println("========== OLLAMA RESPONSE ==========");
            System.out.println(ollamaResponse);
            System.out.println("=====================================");

            return ollamaResponse;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to read Ollama response", e
            );
        }
    }
    public String generateQuestions(String category, String difficulty, int count) {

        String prompt = """
            Generate %d interview questions for a %s interview.
            
            Difficulty: %s
            
            Rules:
            - Generate exactly %d questions.
            - Each question must be on a separate line.
            - Do not add numbering.
            - Do not add explanations.
            - Do not add answers.
            - Return only the questions.
            """.formatted(
                count,
                category,
                difficulty,
                count
        );

        return generate(prompt);
    }
}