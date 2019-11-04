package com.softcen.bigcen.med.admin.board.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.admin.board.dao.BoardMgmtDAO;

@Service(value="boardMgmtService")
public class BoardMgmtServiceImpl implements IBoardMgmtService{
	
	@Autowired
	private BoardMgmtDAO boardMgmtDAO;

	@Override
	public Object insertBoardMgmt(Map<Object, Object> paramMap) {
		return boardMgmtDAO.insertBoardMgmt(paramMap);
	}
	
	public List<Map<Object, Object>> selectBoardMgmt(Map<String, String> paramMap){
		return boardMgmtDAO.selectBoardMgmt(paramMap);
	}
	
	@Override
	public Object updateBoardMgmt(Map<Object, Object> paramMap) {
		return boardMgmtDAO.updateBoardMgmt(paramMap);
	}
	
	@Override
	public Object deleteBoardMgmt(Map<Object, Object> paramMap) {
		int ret = 0;
		
		//물리적 첨부파일 삭제
		
		//게시판관리 삭제	외래키로 게시물과 첨부파일 삭제
		ret = (Integer)boardMgmtDAO.deleteBoardMgmt(paramMap);
				
		return ret;
	}
	
	@Override
	public Object orderBoardMgmtUpDown(Map<Object, Object> paramMap) {
		int ret = 0;
		
		//자기 order 번호 변경
		ret = (Integer)boardMgmtDAO.orderBoardMgmtUp(paramMap);
		
		//바뀔 order 번호 변경
		boardMgmtDAO.orderBoardMgmtDown(paramMap);
				
		return ret;
	}
	

}
