package com.xd.dao;

import com.xd.entity.Category;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryDao {
    /**
     * 查找所有的教材分类
     * @return
     */
    List<Category> findAllCategory();
}
