package com.xd.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xd.entity.Book;
import com.xd.entity.Category;
import com.xd.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/searchBook")
    @ResponseBody
    public Map<String,Object> searchBookByOther(Book book,
                                                int page,
                                                int limit,
                                                @RequestParam(value = "categoryId",required = false) Integer categoryId){
        if (categoryId!=null){
            Category category=new Category();
            category.setCategoryId(categoryId);
            book.setCategory(category);
        }
        PageHelper.startPage(page, limit);
        List<Book> bookList= null;
        try {
            bookList = bookService.searchBook(book);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String,Object> obj=new HashMap<String, Object>();
        obj.put("code",0);
        obj.put("message","");
        obj.put("count",bookService.bookCount(book));
        System.out.println("记录条数："+obj.get("count"));
        obj.put("data",bookList);
        bookList.forEach(System.out::println);
        return obj;
    }
    /*根据id查询出书籍的库存*/
    @RequestMapping("/searchBookAccountById")
    @ResponseBody
    public Map<String,Object> searchBookAccountById(@RequestParam("id") Integer id){
        Map<String,Object> map=new HashMap<String, Object>();
        Integer account=bookService.searchBookAccountById(id);
        map.put("account",account);
        return map;
    }

    @RequestMapping("/updateBook")
    @ResponseBody
    public Map<String,Object> updateBook(Book book,
                                         @RequestParam("categoryId") Integer categoryId){
        Category category=new Category();
        category.setCategoryId(categoryId);
        book.setCategory(category);
        Map<String,Object> map=new HashMap<String, Object>();

        Boolean flag = false;
        try {
            flag = bookService.updateBook(book);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("是否成功："+flag);
        map.put("flag",flag);
        return map;
    }

    @RequestMapping("/deleteBook")
    @ResponseBody
    public Map<String,Object> deleteBook(Integer bid){
        Map<String,Object> map=new HashMap<String, Object>();
        Boolean flag=false;
        try {
            flag = bookService.deleteBookById(bid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("flag",flag);
        return map;
    }
    @RequestMapping("/addBook")
    @ResponseBody
    public Map<String,Object> addBook(Book book
            ,@RequestParam("categoryId") Integer categoryId){
        Category category=new Category();
        category.setCategoryId(categoryId);
        book.setCategory(category);
        System.out.println(book.getIsbn());
        Map<String,Object> map=new HashMap<String,Object>();
        Boolean flag=false;
        try {
            flag = bookService.addBook(book);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("flag",flag);
        return map;
    }

    @RequestMapping("/batchDelBook")
    @ResponseBody
    public Map<String,Object> batchDelBook(@RequestParam(value="bid[]") String[] bid){
        Map<String,Object> map=new HashMap<String,Object>();
       /* for(int i=0;i<bid.length;i++){
            System.out.println(bid[i]);
        }*/
       Boolean flag=false;
        try {
            flag=bookService.batchDelBook(bid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("flag",flag);
        return map;
    }
}
