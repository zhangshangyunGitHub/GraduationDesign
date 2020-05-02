package com.xd.Test;

import java.util.Arrays;

/**
 * @Author: 张上贇
 * @Desciption: TODO
 * @Date: Created in 2019/9/27 8:51
 * @ClassName: QuickSort
 */
public class QuickSort {
    public static void main(String[] args) {
        int ac=0;
        int[] array={9,8,7,6,5,4,3,2,1};
        System.out.println("未比较前是："+Arrays.toString(array));
        for(int i=0;i<array.length-1;i++){
            ac++;
            for(int j=0; j<array.length-1; j++){
                if(array[j]>array[j+1]){
                    int temp=array[j];
                    array[j]=array[j+1];
                    array[j+1]=temp;
                }
            }
            System.out.println("比较了"+ac+"轮后："+Arrays.toString(array));
        }
        System.out.println("排序后的数组："+ Arrays.toString(array));
        int[] ary={23,3,55,43,22,1,9,76};
        for (int i=0;i<ary.length; i++){
            int index=i;
            for(int j=i+1; j<ary.length; j++){
                if(ary[j]<ary[index]){
                    index=j;
                    System.out.println("此时的最小值："+ary[index]);
                }
            }
            int temp=ary[i];
            ary[i]=ary[index];
            ary[index]=temp;
            System.out.println("显示："+Arrays.toString(ary));
        }
        System.out.println("选择排序结果："+Arrays.toString(ary));
    }
}
