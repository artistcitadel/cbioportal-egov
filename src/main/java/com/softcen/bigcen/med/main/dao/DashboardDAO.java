package com.softcen.bigcen.med.main.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository("dashboardDAO")
public class DashboardDAO extends BigcenMedAbstractMapperDAO{
	
	
	/**
	 * 대시보드정보 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboard(Map<Object, Object> paramMap){
		return sqlSession.selectOne("dashboard.selectDashboard");
	}
	
	/**
	 * 대시보드차트 정보 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboardChart(Map<Object, Object> paramMap){
		return sqlSession.selectList("dashboard.selectDashboardChart", paramMap);
	}
	
	/**
	 * 대시보드게시판 정보 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboardBoard(Map<Object, Object> paramMap){
		return sqlSession.selectList("dashboard.selectDashboardBoard", paramMap);
	}
	
	/**
	 * 대시보드 서비스 상태 조회 (Veretica)
	 * @param paramMap
	 * @return
	 */
	public Object selectSvcStatus(Map<Object, Object> paramMap){
		return sqlSessionVerticaA.selectOne("dashboard.selectDashboardSvcStatus", paramMap);
	}
	
	/**
	 * 대시보드 요약정보 조회 (Veretica)
	 * @param paramMap
	 * @return
	 */
	public Object selectResearchTargetStat(Map<Object, Object> paramMap){
		return sqlSessionVerticaA.selectList("dashboard.selectDashboardResearchTargetStat", paramMap);
	}
	
	
	public Object selectDashboardChartList(Map<Object, Object> paramMap) throws SQLException{
		return sqlSessionVerticaA.selectList("dashboard.selectDashboardChartList", paramMap);
	}
	
	public Object selectDashboardBoardList(Map<Object, Object> paramMap) throws SQLException{
		return sqlSession.selectList("dashboard.selectDashboardBoardList", paramMap);
	}
	
	public Object selectDashboardBoardCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("dashboard.selectDashboardBoardCount", paramMap);
		
	}
	
	/**
	 * 게시글 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertBoardData(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("dashboard.insertBoardData", paramMap);
		return ret;
	}
	
	
	/**
	 * 게시글 파일 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertBoardFileData(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("dashboard.insertBoardFileData", paramMap);
		return ret;
	}
	
	/**
	 * 게시글 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateBoardData(Map<Object, Object> paramMap) {
		int ret = sqlSession.update("dashboard.updateBoardData", paramMap);
		
		return ret;
	}
	
	/**
	 * 게시글 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteBoardData(Map<Object, Object> paramMap) {
		int ret = sqlSession.delete("dashboard.deleteBoardData", paramMap);
		
		return ret;
	}
	
	public Object selectBoardDataDetail(Map<Object, Object> paramMap) throws SQLException{
		sqlSession.update("dashboard.updateBoardVisit", paramMap);
		
		return sqlSession.selectList("dashboard.selectBoardDataDetail", paramMap);
	}
	
	public Object selectBoardDataDetailFile(Map<Object, Object> paramMap) throws SQLException{
		return sqlSession.selectList("dashboard.selectBoardDataDetailFile", paramMap);
	}
	
	public Object selectMySaveData(Map<Object, Object> paramMap) throws SQLException{
		return sqlSession.selectList("dashboard.selectMySaveData", paramMap);
	}
	
	/**
	 * chart 관리 리스트
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectChartMgmt(Map<String, String> paramMap){
		return sqlSession.selectList("dashboard.selectChartMgmt", paramMap);
		
	}
	
	/**
	 * 첨부파일 개별삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteFile(Map<Object, Object> paramMap) {
		return sqlSession.delete("dashboard.deleteFile", paramMap);
	}
	
	
}
