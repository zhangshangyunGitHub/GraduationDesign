package com.xd.dao;

import com.xd.entity.Course;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseDao {
    /**
     * 加载所有的课程
     * @return
     */
    List<Course> loadCourse();
}
