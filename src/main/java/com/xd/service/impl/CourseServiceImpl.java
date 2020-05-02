package com.xd.service.impl;

import com.xd.dao.CourseDao;
import com.xd.entity.Course;
import com.xd.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseDao courseDao;
    public List<Course> loadCourse() {
        return courseDao.loadCourse();
    }
}
