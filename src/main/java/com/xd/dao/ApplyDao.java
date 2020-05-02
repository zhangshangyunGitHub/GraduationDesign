package com.xd.dao;

import com.xd.entity.Apply;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyDao {

    /**
     * @Description: TODO
     * @param bid
     * @param cid
     * @param tid
     * @param account
     * @return: java.lang.Boolean
     * @Author: 张上贇
     * @Date: 2019/9/19 13:53
     * 添加申请记录
     */
    Boolean addApply(@Param("bid") Integer bid,
                     @Param("cid") Integer cid,
                     @Param("tid") Integer tid,
                     @Param("account") Integer account);

    /**
     * 查询出所有的申请记录
     * @return
     */
    List<Apply> searchApply(@Param("bids") List<Integer> bids,@Param("tids") List<Integer> tids);

    /**
     * 根据id更新某条记录
     * @param id
     * @return
     */
    Integer rejectApply(Integer id);

    /**
     * 根据主键更新申请表的申请状态
     * @param id
     * @return
     */
    Integer updateApplyFlagById(Integer id);

    /**
     * 批量删除申请记录
     * @param id
     * @return
     */
    Integer batchDelApply(@Param("id")String[] id);
}
