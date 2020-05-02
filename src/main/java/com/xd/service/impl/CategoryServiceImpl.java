package com.xd.service.impl;

import com.xd.dao.CategoryDao;
import com.xd.entity.Category;
import com.xd.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryDao categoryDao;
    /**
     * 加载所有的教材分类
     * @return
     */
    public List<Category> findAllCategory() {
        return categoryDao.findAllCategory();
    }
}
