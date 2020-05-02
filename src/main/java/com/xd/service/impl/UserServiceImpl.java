package com.xd.service.impl;

import com.xd.dao.UserDao;
import com.xd.entity.User;
import com.xd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    public User login(String account, String password, int flag) {
        return userDao.login(account,password,flag);
    }

    public Boolean register(User user) {
       return userDao.register(user);
    }

    public List<User> findAllUser() {
        return userDao.findAllUser();
    }

    public User findUserByAccount(String account) {
        return userDao.findUserByAccount(account);
    }

    public List<User> searchUser(User user) {
        return userDao.searchUser(user);
    }

    public Boolean amendMsg(User user) {
        return userDao.amendMsg(user);
    }

    public Boolean batchDelUser(String[] id) {
        return userDao.batchDelUser(id);
    }

    public Boolean deleteUser(Integer id) {
        return userDao.deleteUser(id);
    }

    public Boolean updateUser(User user) {
        return userDao.updateUser(user);
    }

    public List<Integer> searchIdByUsername(String username) {
        return userDao.searchIdByUsername(username);
    }
}
