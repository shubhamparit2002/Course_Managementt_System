package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CourseInstance;
import com.example.demo.repository.CourseInstanceRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseInstanceService {

    @Autowired
    private CourseInstanceRepository courseInstanceRepository;

    public CourseInstance createCourseInstance(CourseInstance courseInstance) {
        return courseInstanceRepository.save(courseInstance);
    }

    public List<CourseInstance> getCourseInstancesByYearAndSemester(int year, int semester) {
        // You may need to add a custom query method in repository
        return courseInstanceRepository.findAll(); // Modify to filter by year and semester
    }

    public Optional<CourseInstance> getCourseInstanceById(Long id) {
        return courseInstanceRepository.findById(id);
    }

    public void deleteCourseInstance(Long id) {
        courseInstanceRepository.deleteById(id);
    }
    

	public List<CourseInstance> getAllCourses() {
		// TODO Auto-generated method stub
		return courseInstanceRepository.findAll();
	}

	public List<CourseInstance> getAllCourseInstances() {
        return courseInstanceRepository.findAllWithCourses();
    }
}
