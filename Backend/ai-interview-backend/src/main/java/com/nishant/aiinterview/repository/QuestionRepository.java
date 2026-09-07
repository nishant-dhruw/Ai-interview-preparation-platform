package com.nishant.aiinterview.repository;

import com.nishant.aiinterview.entity.Question;
import com.nishant.aiinterview.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByInterview(Interview interview);
}