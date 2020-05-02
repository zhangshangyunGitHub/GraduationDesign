package com.xd.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xd.entity.User;
import com.xd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {
    /*
    * 登录
    * */
    @Autowired
    private UserService userService;
    @RequestMapping("/login")
    public ModelAndView login(String account,String password,Integer flag,HttpServletRequest request){
        System.out.println("==========================");
        System.out.println("ContextPath"+request.getContextPath());
        System.out.println("ServletPath"+request.getServletPath());
        System.out.println("pathInfo"+request.getPathInfo());
        System.out.println("session.path"+request.getSession().getServletContext().getRealPath("/"));
        System.out.println("path"+request.getServletContext().getRealPath("/"));
        System.out.println("==========================");
        Map<String,String> error=new HashMap<String, String>();
        if(account==null||account.equals("")){
            error.put("message","请输入账号！");
            return new ModelAndView("login",error);
        }else if (password==null||password.equals("")){
            error.put("message","请输入密码！");
            return  new ModelAndView("login",error);
        }else if (flag==null){
            error.put("message","请选择用户角色！");
            return new ModelAndView("login",error);
        }else {
            User user=userService.login(account,password,flag);
            if(user!=null){
                HttpSession session = request.getSession();
                user.setSign(1);
                session.setAttribute("user",user);
                Map<String,User> map=new HashMap<String, User>();
                map.put("user",user);
                return new ModelAndView("index",map);
            }else {
                error.put("message","您输入你用户名或密码有误！");
                return new ModelAndView("login",error);
            }
        }
    }

    /**
     *
     * @param request
     * @param username
     * @param account
     * @param password
     * @param flag
     * @param img
     * @return
     */
    @RequestMapping("/register")
    @ResponseBody
    public Map<String,Object> register(HttpServletRequest request,
                                       @RequestParam("username")String username,
                                       @RequestParam("account")String account,
                                       @RequestParam("password")String password,
                                       @RequestParam("flag")Integer flag,
                                       @RequestParam("img") MultipartFile img){
        Map<String,Object> map=new HashMap<String, Object>();
        User user=new User();
        Boolean sign;
        User person = userService.findUserByAccount(account);
        if (person!=null){
            map.put("message","该账号已存在！");
            return map;
        }else {
            String path=request.getSession().getServletContext().getRealPath("/")+"images/"+img.getOriginalFilename();
            String truePath=request.getContextPath()+"images/"+img.getOriginalFilename();
            user.setUsername(username);
            user.setAccount(account);
            user.setPassword(password);
            user.setImg(truePath);
            user.setFlag(flag);
            try {
                sign=userService.register(user);
                img.transferTo(new File(path));
            } catch (Exception e) {
                e.printStackTrace();
                sign=false;
            }
            map.put("flag",sign);
            return map;
        }
    }

    /**
     * 退出功能（注销功能）
     * @param request
     * @return
     */
    @RequestMapping("/exit")
    public String exit(HttpServletRequest request){
        HttpSession session=request.getSession();
        session.removeAttribute("user");
        return "redirect:/login.jsp";
    }
    @RequestMapping("/check")
    @ResponseBody
    public Map<String,Boolean> check(HttpServletRequest request){
        HttpSession session=request.getSession();
        User user= (User) session.getAttribute("user");
        Map<String,Boolean> map=new HashMap<String, Boolean>();
        if(user==null){
            map.put("flag",false);
            return map;
        }else {
            map.put("flag",true);
            return map;
        }
    }

    @RequestMapping("/searchUser")
    @ResponseBody
    public Map<String,Object> searchUser(User user,Integer page,Integer limit){
        PageHelper.startPage(page, limit);
        List<User> userList = userService.searchUser(user);
        Map<String,Object> map=new HashMap<String, Object>();
        PageInfo pageInfo=new PageInfo(userList);
        map.put("data",userList);
        map.put("msg","");
        map.put("code",0);
        map.put("count",pageInfo.getTotal());
        return map;
    }
    @RequestMapping("/saveMsg")
    @ResponseBody
    public Map<String,Object> amendMsg(HttpServletRequest request,
                                       @RequestParam("img") MultipartFile img,
                                       @RequestParam("username") String username,
                                       @RequestParam("account") String account,
                                       @RequestParam("password") String password
    ){
        Map<String,Object> map=new HashMap<String,Object>();
        User user =(User) request.getSession().getAttribute("user");
        String filename=img.getOriginalFilename();
        String truePath=null;
        String path=null;
        Boolean flag;
        if(filename.equals("")){
            user.setAccount(account);
            user.setPassword(password);
            user.setUsername(username);
            try {
                flag=userService.amendMsg(user);
            } catch (Exception e) {
                e.printStackTrace();
                flag=false;
            }
            map.put("flag",flag);
            return map;
        }else {
            path=request.getSession().getServletContext().getRealPath("/")+"images/"+filename;
            truePath=request.getContextPath()+"images/"+filename;
            user.setImg(truePath);
            user.setAccount(account);
            user.setPassword(password);
            user.setUsername(username);
            try {
                flag=userService.amendMsg(user);
                img.transferTo(new File(path));
            } catch (Exception e) {
                e.printStackTrace();
                flag=false;
            }
            map.put("flag",flag);
            return map;
        }
    }
    @RequestMapping("/batchDelUser")
    @ResponseBody
    public Map<String,Object> batchDelUser(@RequestParam(value = "id[]") String[] id){
        Map<String,Object> map=new HashMap<String,Object>();
        Boolean flag;
        try {
            flag=userService.batchDelUser(id);
        } catch (Exception e) {
            e.printStackTrace();
            flag=false;
        }
        map.put("flag",flag);
        return map;
    }

    @RequestMapping("/deleteUser")
    @ResponseBody
    public Map<String,Object> deleteUser(Integer id){
        Map<String,Object> map=new HashMap<String,Object>();
        Boolean flag;
        try {
            flag= userService.deleteUser(id);
        } catch (Exception e) {
            e.printStackTrace();
            flag=false;
        }
        map.put("flag",flag);
        return map;
    }

    @RequestMapping("/updateUser")
    @ResponseBody
    public Map<String,Object> updateUser(HttpServletRequest request,
                                       @RequestParam("username")String username,
                                       @RequestParam("account")String account,
                                       @RequestParam("password")String password,
                                       @RequestParam("flag")Integer flag,
                                       @RequestParam("id") Integer id,
                                       @RequestParam("img") MultipartFile img){
        Map<String,Object> map=new HashMap<String, Object>();
        User user=userService.findUserByAccount(account);
        System.out.println(user.getImg());
        String filename=img.getOriginalFilename();
        String truePath=null;
        String path=null;
        Boolean sign;
        if(filename.equals("")){
            user.setUsername(username);
            user.setAccount(account);
            user.setPassword(password);
            user.setFlag(flag);
            user.setId(id);
            try {
                sign=userService.updateUser(user);
            } catch (Exception e) {
                e.printStackTrace();
                sign=false;
            }
            map.put("flag",sign);
            return map;
        }else {
            path=request.getSession().getServletContext().getRealPath("/")+"images/"+img.getOriginalFilename();
            truePath=request.getContextPath()+"images/"+img.getOriginalFilename();
            user.setUsername(username);
            user.setAccount(account);
            user.setPassword(password);
            user.setImg(truePath);
            user.setFlag(flag);
            user.setId(id);
            try {
                sign=userService.updateUser(user);
                img.transferTo(new File(path));
            } catch (Exception e) {
                e.printStackTrace();
                sign=false;
            }
            map.put("flag",sign);
            return map;
        }
    }

}
