package com.xd.controller;

import com.xd.entity.Category;
import com.xd.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    /**
     * 加载所有的教材分类
     * @return
     */
    @RequestMapping("/loadCategory")
    @ResponseBody
    public Map<String,Object> loadCategory(){
        Map<String,Object> map=new HashMap<String, Object>();
        List<Category> categoryList=new ArrayList<Category>();
        categoryList=categoryService.findAllCategory();
        map.put("categoryList",categoryList);
        //System.out.println("总共有"+categoryList.size()+"分类");
        return map;
    }
}
