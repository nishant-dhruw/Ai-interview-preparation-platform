package com.nishant.aiinterview.repository;

import com.nishant.aiinterview.entity.Answer;
import com.nishant.aiinterview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    List<Answer> findByQuestion(Question question);
}