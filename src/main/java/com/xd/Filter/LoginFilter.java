package com.xd.Filter;

import com.xd.entity.User;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("init.....");
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request= (HttpServletRequest) servletRequest;
        HttpServletResponse response= (HttpServletResponse) servletResponse;
        if (request.getRequestURI().endsWith("login.jsp")||request.getRequestURI().endsWith("register.jsp")){
            filterChain.doFilter(servletRequest,servletResponse);
            return;
        }
        User user = (User)request.getSession().getAttribute("user");
        if(user!=null){//说明有session(登录后会存session)
            filterChain.doFilter(servletRequest,servletResponse);
        }else {
            response.sendRedirect("login.jsp");
        }
    }

    public void destroy() {
        System.out.println("destroy....");
    }
}
