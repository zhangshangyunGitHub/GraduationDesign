package com.xd.controller;

import com.xd.entity.Apply;
import com.xd.entity.User;
import com.xd.service.ApplyService;
import com.xd.service.BookService;
import com.xd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ApplyController {
    @Autowired
    private ApplyService applyService;
    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;
    @RequestMapping("/addApply")
    @ResponseBody
    public Map<String,Object> addApply(HttpServletRequest request,
                                       @RequestParam("bid")Integer bid,
                                       @RequestParam("cid")Integer cid,
                                       @RequestParam("account")Integer account){
        Map<String,Object> map=new HashMap<String, Object>();
        System.out.println("申请数量："+account);
        System.out.println("所申请的书籍："+bid);
        System.out.println("书籍用于的课程："+cid);
        HttpSession session=request.getSession();
        User user= (User) session.getAttribute("user");
        Integer tid=user.getId();
        Boolean flag;
        try {
            flag=applyService.addApply(bid,cid,tid,account);
        } catch (Exception e) {
            e.printStackTrace();
            flag=false;
        }
        map.put("flag",flag);
        return map;
    }
    @RequestMapping("/searchApply")
    @ResponseBody
    public Map<String,Object> searchApply(@RequestParam(value = "username",required = false)String username,
                                          @RequestParam(value = "bname",required = false)String bname){
        /*根据前台传入的教材名来模糊搜索得到相应记录的主键集合*/
        List<Integer> tids = userService.searchIdByUsername(username);
        /*如果bids的size为0，说明没有查到数据，应向bids中add一个不存在的书籍id*/
        if(tids.size()==0){
            tids.add(-1);
        }
        /*根据前台传入的用户名来模糊搜索得到相应记录的主键集合*/
        List<Integer> bids = bookService.searchIdByBname(bname);
        /*同上理*/
        if(bids.size()==0){
            bids.add(-1);
        }
        Map<String,Object> map=new HashMap<String, Object>();
        List<Apply> applyList=new ArrayList<Apply>();
        applyList=applyService.searchApply(bids,tids);
        map.put("data",applyList);
        map.put("msg","");
        map.put("code",0);
        map.put("count",applyList.size());
        return map;
    }

    @RequestMapping("/agreeApply")
    @ResponseBody
    public Map<String,Object> agreeApply(@RequestParam("id") Integer id,
                                         @RequestParam("account") Integer account,
                                         @RequestParam("inventory") Integer inventory,
                                         @RequestParam("bid")Integer bid){
        Map<String,Object> map=new HashMap<String, Object>();
        Integer newInventory=inventory-account;
        Integer bi=bookService.updateBookInventoryById(bid,newInventory);
        Integer ai=applyService.updateApplyFlagById(id);
        Boolean flag=false;
        if(bi>0&&ai>0){
            flag=true;
        }
        map.put("flag",flag);
        return map;

    }

    @RequestMapping("/rejectApply")
    @ResponseBody
    public Map<String,Object> rejectApply(@RequestParam("id")Integer id){
        Map<String,Object> map=new HashMap<String, Object>();
        Integer i = applyService.rejectApply(id);
        System.out.println("更新的记录数："+i);
        Boolean flag=false;
        if(i>0){
            flag=true;
        }
        map.put("flag",flag);
        return map;
    }
    @RequestMapping("/batchDelApply")
    @ResponseBody
    public Map<String,Object> batchDelApply(@RequestParam("id[]")String[] id){
        Map<String,Object> map=new HashMap<String, Object>();
        Boolean flag=false;
        Integer i=applyService.batchDelApply(id);
        if(i>0){
            flag=true;
        }
        map.put("flag",flag);
        return map;
    }
}
