package com.xd.service;

import com.xd.entity.Apply;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ApplyService {
    /**
     * 添加申请记录
     * @param bid
     * @param cid
     * @param tid
     * @param account
     * @return
     */
    Boolean addApply(Integer bid,Integer cid,Integer tid,Integer account);

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
