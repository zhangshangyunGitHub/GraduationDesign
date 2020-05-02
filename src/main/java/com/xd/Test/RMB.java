package com.xd.Test;

import java.util.Scanner;

/**
 * @Author: 张上贇
 * @Desciption: TODO
 * @Date: Created in 2019/9/24 16:11
 * @ClassName: RMB
 */
public class RMB {
    public static void main(String[] args) {
/*        int a=1;
        int b=1;
        int c=1;
        int d=1;
        int e=1;
        int f=1;*/
        for(int a=1;a<100;a++){
            for(int b=1;b<=50;b++){
                for(int c=1;c<=20;c++){
                    for(int d=1;d<=10;d++){
                        for(int e=1;e<=5;e++){
                            for(int f=1;f<=2;f++){
                                if((a+(2*b)+(5*c)+(10*d)+(20*e)+(50*f))==100){
                                    System.out.println(a+"个一块"+b+"个2块"+c+"5个块"+"d"+"个10块"+e+"个20块"+f+"个50块");
                                }
                            }
                        }
                    }
                }
            }
        }

    }
}
