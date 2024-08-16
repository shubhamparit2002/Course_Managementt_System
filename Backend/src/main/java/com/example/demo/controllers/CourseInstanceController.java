package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.CourseInstance;
import com.example.demo.services.CourseInstanceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/instances")
@CrossOrigin("*")
public class CourseInstanceController {

    @Autowired
    private CourseInstanceService courseInstanceService;

    @PostMapping
    public ResponseEntity<CourseInstance> createCourseInstance(@RequestBody CourseInstance courseInstance) {
        CourseInstance createdInstance = courseInstanceService.createCourseInstance(courseInstance);
        return ResponseEntity.ok(createdInstance);
    }
    
    @GetMapping()
    public ResponseEntity<List<CourseInstance>> getAllInstances() {
        List<CourseInstance> instances = courseInstanceService.getAllCourses();
        return ResponseEntity.ok(instances);
    }

    @GetMapping("/{year}/{semester}")
    public ResponseEntity<List<CourseInstance>> getCoursesByYearAndSemester(@PathVariable int year, @PathVariable int semester) {
        List<CourseInstance> instances = courseInstanceService.getCourseInstancesByYearAndSemester(year, semester);
        return ResponseEntity.ok(instances);
    }

    @GetMapping("/{year}/{semester}/{id}")
    public ResponseEntity<CourseInstance> getCourseInstanceById(@PathVariable int year, @PathVariable int semester, @PathVariable Long id) {
        Optional<CourseInstance> instance = courseInstanceService.getCourseInstanceById(id);
        return instance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{year}/{semester}/{id}")
    public ResponseEntity<Void> deleteCourseInstance(@PathVariable int year, @PathVariable int semester, @PathVariable Long id) {
        courseInstanceService.deleteCourseInstance(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<CourseInstance>> getAllCourseInstances() {
        List<CourseInstance> instances = courseInstanceService.getAllCourseInstances();
        return ResponseEntity.ok(instances);
    }

}
