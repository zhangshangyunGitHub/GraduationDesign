package com.xd.service.impl;

import com.xd.dao.BookDao;
import com.xd.entity.Book;
import com.xd.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    /**
     *根据书籍的多种条件查询教材
     * @param book
     * @return
     */
    public List<Book> searchBook(Book book) {
        return bookDao.searchBook(book);
    }

    /**
     * 根据传入的不同条件查询书籍数量
     * @param book
     * @return
     */
    public Integer bookCount(Book book) {
        return bookDao.bookCount(book);
    }

    /**
     * 更新教材信息
     * @param book
     * @return
     */
    public Boolean updateBook(Book book) {
        return bookDao.updateBook(book);
    }

    /**
     * 根据id删除书籍
     * @param bid
     * @return
     */
    public Boolean deleteBookById(Integer bid) {
        return bookDao.deleteBookById(bid);
    }

    /**
     * 添加书籍
     * @param book
     * @return
     */
    public Boolean addBook(Book book) {
        return bookDao.addBook(book);
    }

    /**
     * 批量删除书籍
     * @param bid
     * @return
     */
    public Boolean batchDelBook(String[] bid) {
        return bookDao.batchDelBook(bid);
    }

    /**
     * 根据id查询出某本书的库存
     * @param id
     * @return
     */
    public Integer searchBookAccountById(Integer id) {
        return bookDao.searchBookAccountById(id);
    }

    public Integer updateBookInventoryById(Integer bid, Integer newInventory) {
        return bookDao.updateBookInventoryById(bid,newInventory);
    }

    public List<Integer> searchIdByBname(String bname) {
        return bookDao.searchIdByBname(bname);
    }


}
