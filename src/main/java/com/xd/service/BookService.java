package com.xd.service;

import com.xd.entity.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookService {
    /**
     * 根据书籍的多种条件查询书籍
     * @param book
     * @return
     */
    List<Book> searchBook(Book book);
    /**
     * 根据传入的条件查询书籍数量
     * @param book
     * @return
     */
    Integer bookCount(Book book);
    /**
     * 更新教材信息
     * @param book
     * @return
     */
    Boolean updateBook(Book book);

    /**
     * 根据特点id删除相应书籍记录
     * @param bid
     * @return
     */
    Boolean deleteBookById(Integer bid);

    /**
     * 添加书籍
     * @param book
     * @return
     */
    Boolean addBook(Book book);

    /**
     * 批量删除书籍
     * @param bid
     * @return
     */
    Boolean batchDelBook(String[] bid);

    /**
     * 根据id查询出某本书的库存
     * @param id
     * @return
     */
    Integer searchBookAccountById(Integer id);

    /**
     * 根据主键更新书籍的库存
     * @param bid
     * @param newInventory
     * @return
     */
    Integer updateBookInventoryById(@Param("bid") Integer bid, @Param("newInventory") Integer newInventory);

    /**
     * 根据名字模糊搜索得到主键集合
     * @param bname
     * @return
     */
    List<Integer> searchIdByBname(@Param("bname")String bname);
}
