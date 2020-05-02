package com.xd.service.impl;

import com.xd.dao.ApplyDao;
import com.xd.entity.Apply;
import com.xd.service.ApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplyServiceImpl implements ApplyService {
    @Autowired
    private ApplyDao applyDao;
    public Boolean addApply(Integer bid, Integer cid, Integer tid, Integer account) {
        return applyDao.addApply(bid,cid,tid,account);
    }

    public List<Apply> searchApply(List<Integer> bids, List<Integer> tids) {
        return applyDao.searchApply(bids,tids);
    }

    public Integer rejectApply(Integer id) {
        return applyDao.rejectApply(id);
    }

    public Integer updateApplyFlagById(Integer id) {
        return applyDao.updateApplyFlagById(id);
    }

    public Integer batchDelApply(String[] id) {
        return applyDao.batchDelApply(id);
    }

}
