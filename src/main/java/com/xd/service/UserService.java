package com.xd.service;

import com.xd.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserService {
    /**
     * 用戶登錄方法
     * @param account
     * @param password
     * @param flag
     * @return
     */
    User login(String account, String password, int flag);
    /**
     * 用戶註冊方法
     * @param user
     */
    Boolean register(User user);

    /**
     * 查询出用户表中的所有人员
     * @return
     */
    List<User> findAllUser();

    /**
     * 根据账号查找用户
     * @param account
     * @return
     */
    User findUserByAccount(String account);

    /**
     * 根据条件查询出用户记录
     * @param user
     * @return
     */
    List<User> searchUser(User user);

    /**
     * 保存修改的个人信息
     * @param user
     * @return
     */
    Boolean amendMsg(User user);

    /**
     * 批量删除用户信息
     * @param id
     * @return
     */
    Boolean batchDelUser(String[] id);

    /**
     * 根据id删除用户
     * @param id
     * @return
     */
    Boolean deleteUser(Integer id);

    /**
     * 根据ID更新用户信息
     * @param user
     * @return
     */
    Boolean updateUser(User user);

    /**
     * 根据名字模糊搜索得到主键的集合
     * @param username
     * @return
     */
    List<Integer> searchIdByUsername(@Param("username")String username);
}
