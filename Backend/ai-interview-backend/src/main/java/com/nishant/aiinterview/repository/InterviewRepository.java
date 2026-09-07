package com.nishant.aiinterview.repository;

import com.nishant.aiinterview.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository
        extends JpaRepository<Interview, Long> {

    List<Interview> findByUser_Id(Long userId);
}