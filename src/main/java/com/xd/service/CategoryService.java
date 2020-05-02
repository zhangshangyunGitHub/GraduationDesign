package com.xd.service;

import com.xd.entity.Category;

import java.util.List;

public interface CategoryService {
    /**
     * 查找所有的教材分类
     * @return
     */
    List<Category> findAllCategory();
}
