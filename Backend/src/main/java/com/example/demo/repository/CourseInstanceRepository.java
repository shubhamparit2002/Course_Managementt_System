package com.example.demo.repository;




import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.CourseInstance;

public interface CourseInstanceRepository extends JpaRepository<CourseInstance, Long> {
    // Custom query methods if needed
    @Query("SELECT ci FROM CourseInstance ci JOIN FETCH ci.course")
    List<CourseInstance> findAllWithCourses();
}
