package com.xd.service;

import com.xd.entity.Course;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CourseService {
    /**
     * 加载所有的课程
     * @return
     */
    List<Course> loadCourse();
}
