package com.xd.controller;

import com.xd.entity.Course;
import com.xd.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CourseController {
    @Autowired
    private CourseService courseService;
    @RequestMapping("/loadCourse")
    @ResponseBody
    public Map<String,Object> loadCourse(){
        Map<String,Object> map=new HashMap<String,Object>();
        List<Course> courseList=new ArrayList<Course>();
        courseList=courseService.loadCourse();
        map.put("courseList",courseList);
        return map;
    }
}
