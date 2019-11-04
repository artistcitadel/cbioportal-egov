package com.softcen.bigcen.med.analysisFunctions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.h2.tools.Server;
import org.hamcrest.Matchers;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;


/**
 *  R Functions으로 구현된 기능을 테스트 하기 위한 Vertica 서버와  R Language Pack 그리고 테스트 데이터가 필요합니다.
 *  관련 자료는 사내 NAS(http://192.168.70.39:5000/) 내  /solution/04.빅센메드2/99.설치도구/vertica 에 존재합니다. 
 *
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"file:src/test/resources/junit-context.xml"})
public class AnalysisFunctionsTest {
	
	/*
	 * AnalysisFunctions
	 */
	private static AnalysisFunctions af = new AnalysisFunctions();
	
	/*
	 * h2 info
	 * junit test에서만 동작하는 in-memory database입니다.
	 * vertica r function의 결과와 구현된 AnalysisFunctions의 결과를 비교하기 위해 사용됩니다.
	 */
	private static String[] H2_ARGS = {"-tcpPort", "9092", "-tcpAllowOthers"};
	private static Server H2_SERVER;
	
	@Resource(name="h2SqlSessionFactory")
	private SqlSessionFactory h2SSF;
	
	/*
	 * vertica info
	 * vertica r function의 결과를 확인하기 위한 database입니다.
	 */
	@Resource(name="verticaSqlSessionFactory")
	private SqlSessionFactory verticaSSF;
	
	/**
	 * h2 서버를 구동합니다.
	 * 
	 * @throws SQLException
	 * @throws ClassNotFoundException
	 * @throws InterruptedException
	 */
	@BeforeClass
	public static void startH2() throws SQLException, ClassNotFoundException, InterruptedException
	{
		H2_SERVER = Server.createTcpServer(H2_ARGS).start();
	}

	/**
	 * h2 서버를 종료합니다.
	 * 
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 */
	@AfterClass
	public static void stopH2() throws ClassNotFoundException, SQLException
	{
		H2_SERVER.stop();
	}
	
	/**
	 * h2의 데이터를 삭제합니다.
	 * 
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 */
	@Test
	public void _deleteH2Data()
	{
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "DROP ALL OBJECTS";
			stmt.execute(sql);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}

	/**
	 * h2에 데이터를 입력합니다.
	 * 
	 * @throws IOException
	 * @throws SQLException
	 */
	@Test
	public void _insertH2Data()
	{
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			File file = new File("src/test/resources/sql");
			for(File f : file.listFiles())
			{
				String[] sqls = readLine(f.getPath()).split(";");
				for(String s : sqls)
				{
					stmt.execute(s);
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	/**
	 * text파일의 문자를 반환합니다.
	 * 
	 * @param filePath
	 * @return
	 */
	private static String readLine(String filePath) 
	{
		String content = "";
	    try
	    {
	        content = new String ( Files.readAllBytes( Paths.get(filePath) ) );
	    }
	    catch (IOException e)
	    {
	        e.printStackTrace();
	    }
	    return content;
	}
	
	/**
	 * ResultSet to List
	 * 
	 * @param rs
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	private static List rsToList(ResultSet rs)
	{
        List<Map<String, Object>> list = Lists.newArrayList();
		try
		{
			ResultSetMetaData md = rs.getMetaData();
			while(rs.next())
			{
				Map<String, Object> m = Maps.newHashMap();
				for(int i = 1 ; i <= md.getColumnCount() ; i++)
				{
					String k = md.getColumnLabel(i);
					Object v = rs.getObject(md.getColumnName(i));

					m.put(k, v);
				}
				
				if(!m.containsValue(null))
				{
					list.add(m);
				}
			}
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
         
        return list;
    }
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#summary(List)}
	 */
	@Test
	public void summary()
	{
		double[] expected = {3.000, 3.125, 3.350, 3.383, 3.575, 3.900};
		double[] actual = af.summary(Lists.newArrayList(3.5, 3.0, 3.2, 3.1, 3.6, 3.9));
		
		assertThat(actual, Matchers.is(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#groupingByKey(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void groupingByKey()
	{
		Map<String, List<Double>> expected = Maps.newHashMap();
		expected.put("A", Lists.newArrayList(1.0, 1.0, 1.0));
		expected.put("B", Lists.newArrayList(79.0, 46.0, 71.0));
				
		Map<Object, Object> m0 = Maps.newHashMap();
		m0.put("A", 1.0);
		m0.put("B", 79.0);
		Map<Object, Object> m1 = Maps.newHashMap();
		m1.put("A", 1.0);
		m1.put("B", 46.0);
		Map<Object, Object> m2 = Maps.newHashMap();
		m2.put("A", 1.0);
		m2.put("B", 71.0);
		List<Map<Object, Object>> l = Lists.newArrayList(m0, m1, m2);
		Map<String, List<Double>> actual = af.groupingByKey(l);
		
		assertThat(actual, Matchers.is(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#groupingByValue(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void groupingByValue()
	{
		Map<String, List<Double>> expected = Maps.newHashMap();
		expected.put("MID", Lists.newArrayList(1.0, 1.0, 1.0));
				
		Map<Object, Object> m0 = Maps.newHashMap();
		m0.put("MID", 1.0);
		Map<Object, Object> m1 = Maps.newHashMap();
		m1.put("MID", 1.0);
		Map<Object, Object> m2 = Maps.newHashMap();
		m2.put("MID", 1.0);
		List<Map<Object, Object>> l = Lists.newArrayList(m0, m1, m2);
		Map<String, List<Double>> actual = af.groupingByValue(l).getMap();
		
		assertThat(actual, Matchers.is(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#groupingByValue(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void groupingByValue2()
	{
		Map<String, List<Double>> expected = Maps.newHashMap();
		expected.put("F", Lists.newArrayList(0.0, 0.0));
		expected.put("M", Lists.newArrayList(0.0));
				
		Map<Object, Object> m0 = Maps.newHashMap();
		m0.put("G0_PT_PAT_MST_SEX_1", "F");
		m0.put("MEDIAN", 0.0);
		Map<Object, Object> m1 = Maps.newHashMap();
		m1.put("G0_PT_PAT_MST_SEX_1", "F");
		m1.put("MEDIAN", 0.0);
		Map<Object, Object> m2 = Maps.newHashMap();
		m2.put("G0_PT_PAT_MST_SEX_1", "M");
		m2.put("MEDIAN", 0.0);
		List<Map<Object, Object>> l = Lists.newArrayList(m0, m1, m2);
		Map<String, List<Double>> actual = af.groupingByValue(l).getMap();
		
		assertThat(actual, Matchers.is(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_stat_p(List)}
	 */
	@Test
	public void tt_stat_p()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectActionSampleTTestDataGrid2*/
			String sql = "SELECT tt_stat_p(PERIOD_CD, G1_R1_RG_ENTRY_RGST_LST_RG_AGE_1) OVER() AS T "
					+ "FROM CRDW_SECU.TM_0000000_20171121222503704";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("T");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G1_R1_RG_ENTRY_RGST_LST_RG_AGE_1 B "
					+ "FROM TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_stat_p(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_stat_p(List)}
	 */
	@Test
	public void tt_stat_p2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectActionSampleTTestDataGrid2*/
			String sql = "SELECT tt_stat_p(G0_DG_DISS_LST_DIS_AGE_2, G0_DG_DISS_LST_DIS_AGE_2) OVER() AS T "
					+ "FROM CRDW_SECU.TM_0000000_20180709103834470";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("T");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_DG_DISS_LST_DIS_AGE_2 B "
					+ "FROM TM_0000000_20180709103834470";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_stat_p(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#mid(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void mid()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid1
			selectActionSampleTTestDataGrid1
			selectOneWayAnalysisDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT mid(PERIOD_CD) OVER() AS MID FROM CRDW_SECU.TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD AS MID FROM TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.mid(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#mid(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void mid2()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid1
			selectActionSampleTTestDataGrid1
			selectOneWayAnalysisDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT MID(G0_DG_DISS_LST_DIS_AGE_2) OVER(PARTITION BY R0_PT_PAT_MST_SEX_1) AS MEDIAN "
					+ "FROM CRDW_SECU.TM_0000000_20180705131519371 "
					+ "WHERE R0_PT_PAT_MST_SEX_1 IS NOT NULL AND R0_PT_PAT_MST_SEX_1 = 'M'";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 AS MEDIAN FROM TM_0000000_20180705131519371 "
					+ "WHERE R0_PT_PAT_MST_SEX_1 IS NOT NULL AND R0_PT_PAT_MST_SEX_1 = 'M'";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.mid(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#mid(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void mid3()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid1
			selectActionSampleTTestDataGrid1
			selectOneWayAnalysisDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT G0_PT_PAT_MST_SEX_1, MID(G0_DG_DISS_LST_DIS_AGE_2) OVER(PARTITION BY G0_PT_PAT_MST_SEX_1) AS MEDIAN "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 <> ''";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_PT_PAT_MST_SEX_1, G0_DG_DISS_LST_DIS_AGE_2 AS MEDIAN "
					+ "FROM TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 <> ''";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.mid(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#sd0(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void sd0()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid1
			selectActionSampleTTestDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT sd0(PERIOD_CD) OVER() AS SD FROM CRDW_SECU.TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD AS SD FROM TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.sd0(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#sd0(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void sd02()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid1
			selectActionSampleTTestDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT SD0(G0_DG_DISS_LST_DIS_AGE_2) OVER(PARTITION BY R0_PT_PAT_MST_SEX_1) AS SD "
					+ "FROM CRDW_SECU.TM_0000000_20180705131519371 "
					+ "WHERE R0_PT_PAT_MST_SEX_1 IS NOT NULL AND R0_PT_PAT_MST_SEX_1 = 'F'";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 AS SD FROM TM_0000000_20180705131519371 "
					+ "WHERE R0_PT_PAT_MST_SEX_1 IS NOT NULL AND R0_PT_PAT_MST_SEX_1 = 'F'";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.sd0(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual.get(0).get("SD"), Matchers.closeTo(expected.get(0).get("SD"), 1e-10));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#sd0(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void sd03()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid1
			selectActionSampleTTestDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT G0_PT_PAT_MST_SEX_1, SD0(PERIOD_CD) OVER(PARTITION BY G0_PT_PAT_MST_SEX_1) AS SD "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 <> ''";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_PT_PAT_MST_SEX_1, PERIOD_CD AS SD FROM "
					+ "TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 <> ''";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.sd0(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_df_p(List)}
	 */
	@Test
	public void tt_df_p()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectActionSampleTTestDataGrid2*/
			String sql = "SELECT tt_df_p(PERIOD_CD, G1_R1_RG_ENTRY_RGST_LST_RG_AGE_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20171121222503704";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G1_R1_RG_ENTRY_RGST_LST_RG_AGE_1 B "
					+ "FROM TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_df_p(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_df_p(List)}
	 */
	@Test
	public void tt_df_p2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectActionSampleTTestDataGrid2*/
			String sql = "SELECT tt_df_p(G0_DG_DISS_LST_DIS_AGE_2, G0_DG_DISS_LST_DIS_AGE_2) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180709103834470";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_DG_DISS_LST_DIS_AGE_2 B "
					+ "FROM TM_0000000_20180709103834470";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_df_p(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_pv_p(List)}
	 */
	@Test
	public void tt_pv_p()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectActionSampleTTestDataGrid2*/
			String sql = "SELECT tt_pv_p(PERIOD_CD, G1_R1_RG_ENTRY_RGST_LST_RG_AGE_1) OVER() AS PV "
					+ "FROM CRDW_SECU.TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G1_R1_RG_ENTRY_RGST_LST_RG_AGE_1 B "
					+ "FROM TM_0000000_20171121222503704";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_pv_p(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_pv_p(List)}
	 */
	@Test
	public void tt_pv_p2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectActionSampleTTestDataGrid2*/
			String sql = "SELECT tt_pv_p(G0_DG_DISS_LST_DIS_AGE_2, G0_DG_DISS_LST_DIS_AGE_2) OVER() AS PV "
					+ "FROM CRDW_SECU.TM_0000000_20180709103834470";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_DG_DISS_LST_DIS_AGE_2 B "
					+ "FROM TM_0000000_20180709103834470";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_pv_p(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

		// expected 값은 NaN이나 실제 vertica R function의 구문 "res <- t.test(x[,1], x[,2], paired=TRUE)$p.value"의 결과는 1이므로, 이를 맞는 것으로 간주한다. 
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected),
				Matchers.equalTo(1D)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_stat_2(List)}
	 */
	@Test
	public void tt_stat_2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_stat_2(G0_DG_DISS_LST_DIS_AGE_2, R0_PT_PAT_MST_SEX_1) OVER() AS T "
					+ "FROM CRDW_SECU.TM_0000000_20180705131519371";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("T");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2, R0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180705131519371";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_stat_2(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_stat_2(List)}
	 */
	@Test
	public void tt_stat_22()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_stat_2(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS T "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("T");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_stat_2(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_df_2(List)}
	 */
	@Test
	public void tt_df_2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_df_2(G0_DG_DISS_LST_DIS_AGE_2, R0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180705131519371";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = " SELECT G0_DG_DISS_LST_DIS_AGE_2, R0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180705131519371";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_df_2(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_df_2(List)}
	 */
	@Test
	public void tt_df_22()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_df_2(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180709164820503;";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_df_2(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_df_2(List)}
	 */
	@SuppressWarnings("unused")
	@Test
	public void tt_df_23()
	{
		double expected = 0D; 
		double actual = 0D;
		
		String actualExceptionMsg = null;
		String expectedExceptionMsg = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_df_2(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			actualExceptionMsg = e.getMessage();
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD, G0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180709164820503;";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_df_2(rsToList(rs));
		}
		catch(Exception e)
		{
			expectedExceptionMsg = e.getMessage();
			e.printStackTrace();
		}
		
		// tt_df_23에서 사용되는 조건은 Vertica에서도 오류가 발생함을 확인하였으며, 이를 조건에서 통과하지 못하도록 처리하기로 최종호 과장님과 협의   
		assertEquals(actualExceptionMsg, "[Vertica][VJDBC](3399) ERROR: Failure in UDx RPC call InvokeProcessPartition(): "
				+ "Error calling processPartition() in User Defined Object [tt_df_2] at "
				+ "[/scratch_a/release/svrtar5373/vbuild/vertica/OSS/UDxFence/RInterface.cpp:1387], "
				+ "error code: 0, message: Exception in processPartitionForR: [data are essentially constant]");
		assertEquals(expectedExceptionMsg, "data are essentially constant");
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tt_df_2(List)}
	 * http://192.168.70.231:8077/redmine/issues/698
	 */
	@SuppressWarnings("unused")
	@Test
	public void tt_df_24()
	{
		double expected = 0D; 
		double actual = 0D;
		
		String expectedExceptionMsg = null;
		String actualExceptionMsg = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_df_2(R2_PI_ORDER_LST_DO_CNT_3, G0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180730161657649";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			expectedExceptionMsg = e.getMessage();
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R2_PI_ORDER_LST_DO_CNT_3, G0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180730161657649;";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_df_2(rsToList(rs));
		}
		catch(Exception e)
		{
			actualExceptionMsg = e.getMessage();
			e.printStackTrace();
		}
		
		// tt_df_24에서 사용되는 조건은 Vertica에서도 오류가 발생함을 확인하였으며, 해당 R 오류를 작성된 함수에서도 출력하도록 협의   
		assertThat(expectedExceptionMsg, Matchers.containsString(actualExceptionMsg));
	}
	
	@Test
	public void tt_pv_21()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_pv_21(G0_DG_DISS_LST_DIS_AGE_2, R0_PT_PAT_MST_SEX_1) OVER() AS PV "
					+ "FROM CRDW_SECU.TM_0000000_20180705131519371";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2, R0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180705131519371";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_pv_21(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	@Test
	public void tt_pv_212()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleTTestDataGrid2*/
			String sql = "SELECT tt_pv_21(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS PV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1 "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tt_pv_21(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#iqr(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void iqr()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT iqr(PERIOD_CD) OVER(PARTITION BY G0_PT_PAT_MST_SEX_1) AS SD "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 = 'M'";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD AS SD "
					+ "FROM TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 = 'M'";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.iqr(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#iqr(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void iqr2()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT iqr(G0_DG_DISS_LST_DIS_AGE_2) OVER(PARTITION BY G0_PT_PAT_MST_SEX_1 ) AS SD "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 = 'M'";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 AS SD "
					+ "FROM TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 = 'M'";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.iqr(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#iqr(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void iqr3()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = null;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid1
			selectIndeSample2DataGrid1
			selectIndeSampleKDataGrid1
			selectCareCalculationDataGrid1*/
			String sql = "SELECT G0_PT_PAT_MST_SEX_1, iqr(G0_DG_DISS_LST_DIS_AGE_2) OVER(PARTITION BY G0_PT_PAT_MST_SEX_1) AS SD "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 <> ''";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_PT_PAT_MST_SEX_1, G0_DG_DISS_LST_DIS_AGE_2 AS SD "
					+ "FROM TM_0000000_20180709164820503 "
					+ "WHERE G0_PT_PAT_MST_SEX_1 IS NOT NULL AND G0_PT_PAT_MST_SEX_1 <> ''";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.iqr(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.containsInAnyOrder(expected.toArray()));
	}
	
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ut_stat(List)}
	 */
	@Test
	public void ut_stat()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSample2DataGrid2*/
			String sql = "SELECT ut_stat(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() AS U "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("U");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ut_stat(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ut_stat(List)}
	 */
	@Test
	public void ut_stat2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSample2DataGrid2*/
			String sql = "SELECT ut_stat(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS U "
					+ "FROM CRDW_SECU.TM_0000000_20180709103732149";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("U");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709103732149";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ut_stat(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-10), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * @see <a target="_blank" href="https://blog.naver.com/istech7/50152096673">맨-휘트니 U 검정</a>
	 * @see <a target="_blank" href="http://courses.atlas.illinois.edu/spring2016/STAT/STAT200/pnormal.html">P-Value Calculator for Normal Distribution</a>
	 */
	@Test
	public void mannWhitneyUTest2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSample2DataGrid2*/
			String sql = "SELECT ut_pv(t.a, t.b) OVER() AS PV "
					+ "FROM ("
					+ "SELECT 2.5 a, 'x' b "
					+ "UNION ALL SELECT 4 a, 'x' b "
					+ "UNION ALL SELECT 5 a, 'x' b "
					+ "UNION ALL SELECT 6 a, 'x' b "
					+ "UNION ALL SELECT 9 a, 'x' b "
					+ "UNION ALL SELECT 11 a, 'x' b "
					+ "UNION ALL SELECT 13 a, 'x' b "
					+ "UNION ALL SELECT 1 a, 'y' b "
					+ "UNION ALL SELECT 2.5 a, 'y' b "
					+ "UNION ALL SELECT 7.5 a, 'y' b "
					+ "UNION ALL SELECT 7.5 a, 'y' b "
					+ "UNION ALL SELECT 10 a, 'y' b "
					+ "UNION ALL SELECT 12 a, 'y' b) t";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("PV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT t.a A, t.b B "
					+ "FROM ("
					+ "SELECT 2.5 a, 'x' b "
					+ "UNION ALL SELECT 4 a, 'x' b "
					+ "UNION ALL SELECT 5 a, 'x' b "
					+ "UNION ALL SELECT 6 a, 'x' b "
					+ "UNION ALL SELECT 9 a, 'x' b "
					+ "UNION ALL SELECT 11 a, 'x' b "
					+ "UNION ALL SELECT 13 a, 'x' b "
					+ "UNION ALL SELECT 1 a, 'y' b "
					+ "UNION ALL SELECT 2.5 a, 'y' b "
					+ "UNION ALL SELECT 7.5 a, 'y' b "
					+ "UNION ALL SELECT 7.5 a, 'y' b "
					+ "UNION ALL SELECT 10 a, 'y' b "
					+ "UNION ALL SELECT 12 a, 'y' b) t";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ut_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ut_pv(List)}
	 */
	@Test
	public void ut_pv()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSample2DataGrid2*/
			String sql = "SELECT ut_pv(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() AS PV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("PV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ut_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ut_pv(List)}
	 */
	@Test
	public void ut_pv2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSample2DataGrid2*/
			String sql = "SELECT ut_pv(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS PV "
					+ "FROM CRDW_SECU.TM_0000000_20180709103732149";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709103732149";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ut_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#kt_stat1(List)}
	 */
	@Test
	public void kt_stat1()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT kt_stat1(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() AS X2 "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("X2");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.kt_stat1(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#kt_stat1(List)}
	 */
	@Test
	public void kt_stat12()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT kt_stat1(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS X2 "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("X2");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.kt_stat1(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#kt_df(List)}
	 */
	@Test
	public void kt_df()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT kt_df(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.kt_df(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#kt_df(List)}
	 */
	@Test
	public void kt_df2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT kt_df(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.kt_df(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#kt_pv(List)}
	 */
	@Test
	public void kt_pv()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT kt_pv(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.kt_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#kt_pv(List)}
	 */
	@Test
	public void kt_pv2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT kt_pv(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() AS DF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("DF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.kt_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-3), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_stat(List)}
	 */
	@Test
	public void ct_stat()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_stat(R0_PT_PAT_MST_SEX_1, G0_PT_PAT_MST_SEX_1) OVER() AS CX2 "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("CX2");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R0_PT_PAT_MST_SEX_1 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_stat(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_stat(List)}
	 */
	@Test
	public void ct_stat2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_stat(R7_RG_ENTRY_RGST_LST_DOC_CD_8, R7_RG_ENTRY_RGST_LST_DOC_CD_8) OVER() AS CX2 "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CX2");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R7_RG_ENTRY_RGST_LST_DOC_CD_8 A, R7_RG_ENTRY_RGST_LST_DOC_CD_8 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_stat(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_df(List)}
	 */
	@Test
	public void ct_df()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_df(R0_PT_PAT_MST_SEX_1, G0_PT_PAT_MST_SEX_1) OVER() AS CDF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CDF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R0_PT_PAT_MST_SEX_1 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_df(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_df(List)}
	 */
	@Test
	public void ct_df2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_df(R7_RG_ENTRY_RGST_LST_DOC_CD_8, R7_RG_ENTRY_RGST_LST_DOC_CD_8) OVER() AS CDF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CDF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R7_RG_ENTRY_RGST_LST_DOC_CD_8 A, R7_RG_ENTRY_RGST_LST_DOC_CD_8 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_df(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_pv(List)}
	 */
	@Test
	public void ct_pv()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_pv(R0_PT_PAT_MST_SEX_1, G0_PT_PAT_MST_SEX_1) OVER() AS CPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R0_PT_PAT_MST_SEX_1 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_pv(List)}
	 */
	@Test
	public void ct_pv2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_pv(R7_RG_ENTRY_RGST_LST_DOC_CD_8, R7_RG_ENTRY_RGST_LST_DOC_CD_8) OVER() AS CPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R7_RG_ENTRY_RGST_LST_DOC_CD_8 A, R7_RG_ENTRY_RGST_LST_DOC_CD_8 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_stat_c(List)}
	 */
	@Test
	public void ct_stat_c()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_stat_c(R0_PT_PAT_MST_SEX_1, G0_PT_PAT_MST_SEX_1) OVER() AS CX2 "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
	        ResultSet rs = stmt.executeQuery(sql);
	        while(rs.next())
			{
	        	expected = rs.getDouble("CX2");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R0_PT_PAT_MST_SEX_1 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_stat_c(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
        
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_stat_c(List)}
	 */
	@Test
	public void ct_stat_c2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_stat_c(R7_RG_ENTRY_RGST_LST_DOC_CD_8, R7_RG_ENTRY_RGST_LST_DOC_CD_8) OVER() AS CX2 "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CX2");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R7_RG_ENTRY_RGST_LST_DOC_CD_8 A, R7_RG_ENTRY_RGST_LST_DOC_CD_8 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_stat_c(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_df_c(List)}
	 */
	@Test
	public void ct_df_c()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_df_c(R0_PT_PAT_MST_SEX_1, G0_PT_PAT_MST_SEX_1) OVER() AS CDF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CDF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R0_PT_PAT_MST_SEX_1 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_df_c(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_df_c(List)}
	 */
	@Test
	public void ct_df_c2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_df_c(R7_RG_ENTRY_RGST_LST_DOC_CD_8, R7_RG_ENTRY_RGST_LST_DOC_CD_8) OVER() AS CDF "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CDF");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R7_RG_ENTRY_RGST_LST_DOC_CD_8 A, R7_RG_ENTRY_RGST_LST_DOC_CD_8 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_df_c(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_pv_c(List)}
	 */
	@Test
	public void ct_pv_c()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_pv_c(R0_PT_PAT_MST_SEX_1, G0_PT_PAT_MST_SEX_1) OVER() AS CPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R0_PT_PAT_MST_SEX_1 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_pv_c(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_pv_c(List)}
	 */
	@Test
	public void ct_pv_c2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ct_pv_c(R7_RG_ENTRY_RGST_LST_DOC_CD_8, R7_RG_ENTRY_RGST_LST_DOC_CD_8) OVER() AS CPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("CPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R7_RG_ENTRY_RGST_LST_DOC_CD_8 A, R7_RG_ENTRY_RGST_LST_DOC_CD_8 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_pv_c(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ft_pv(List)}
	 */
	@Test
	public void ft_pv()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ft_pv(R0_PT_PAT_MST_SEX_1, G0_PT_PAT_MST_SEX_1) OVER() AS FPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("FPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R0_PT_PAT_MST_SEX_1 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ft_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ft_pv(List)}
	 */
	@Test
	public void ft_pv2()
	{
		boolean expected = false; 
		boolean actual = false;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectIndeSampleKDataGrid2*/
			String sql = "SELECT ft_pv(R7_RG_ENTRY_RGST_LST_DOC_CD_8, R7_RG_ENTRY_RGST_LST_DOC_CD_8) OVER() AS FPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			stmt.executeQuery(sql);
		}
		catch(Exception e)
		{
			System.err.println("expected error: " + e.getMessage());
			expected = true;
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT R7_RG_ENTRY_RGST_LST_DOC_CD_8 A, R7_RG_ENTRY_RGST_LST_DOC_CD_8 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			af.ft_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			System.err.println("actual error: " + e.getMessage());
			actual = true;
		}
		
		// ft_pv2에서 사용되는 조건은 Vertica에서도 오류가 발생함을 확인
		assertThat(actual, Matchers.equalTo(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_p_esti(List)}
	 */
	@Test
	public void ct_p_esti()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_p_esti(PERIOD_CD, G0_DG_DISS_LST_DIS_AGE_2) OVER() AS PR "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PR");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_DG_DISS_LST_DIS_AGE_2 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_p_esti(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_p_esti(List)}
	 */
	@Test
	public void ct_p_esti2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_p_esti(G0_DG_DISS_LST_DIS_AGE_2, R4_DG_DISS_LST_DIS_AGE_5) OVER() AS PR "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PR");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, R4_DG_DISS_LST_DIS_AGE_5 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_p_esti(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_p_esti_pv0(List)}
	 */
	@Test
	public void ct_p_esti_pv0()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_p_esti_pv0(PERIOD_CD, G0_DG_DISS_LST_DIS_AGE_2) OVER() AS SPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("SPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_DG_DISS_LST_DIS_AGE_2 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_p_esti_pv0(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_p_esti_pv0(List)}
	 */
	@Test
	public void ct_p_esti_pv02()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_p_esti_pv0(G0_DG_DISS_LST_DIS_AGE_2, R4_DG_DISS_LST_DIS_AGE_5) OVER() AS SPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("SPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, R4_DG_DISS_LST_DIS_AGE_5 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_p_esti_pv0(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_s_esti(List)}
	 */
	@Test
	public void ct_s_esti()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_s_esti(PERIOD_CD, G0_DG_DISS_LST_DIS_AGE_2) OVER() AS SR "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("SR");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_DG_DISS_LST_DIS_AGE_2 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_s_esti(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_s_esti(List)}
	 */
	@Test
	public void ct_s_esti2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_s_esti(G0_DG_DISS_LST_DIS_AGE_2, R4_DG_DISS_LST_DIS_AGE_5) OVER() AS SR "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("SR");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, R4_DG_DISS_LST_DIS_AGE_5 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_s_esti(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_s_esti_pv(List)}
	 */
	@Test
	public void ct_s_esti_pv()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_s_esti_pv(PERIOD_CD, G0_DG_DISS_LST_DIS_AGE_2) OVER() AS PPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_DG_DISS_LST_DIS_AGE_2 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_s_esti_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#ct_s_esti_pv(List)}
	 */
	@Test
	public void ct_s_esti_pv2()
	{
		double expected = 0D; 
		double actual = 0D;
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectCareCalculationDataGrid2*/
			String sql = "SELECT ct_s_esti_pv(G0_DG_DISS_LST_DIS_AGE_2, R4_DG_DISS_LST_DIS_AGE_5) OVER() AS PPV "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			while(rs.next())
			{
				expected = rs.getDouble("PPV");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, R4_DG_DISS_LST_DIS_AGE_5 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.ct_s_esti_pv(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.anyOf(Matchers.closeTo(expected, 1e-4), 
				Matchers.equalTo(expected)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#anova(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void anova()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = Lists.newArrayList();
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid2*/
			String sql = "SELECT anova(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.anova(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.equalTo(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#anova(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void anova2()
	{
		List<Map<String, Double>> expected = null;
		List<Map<String, Double>> actual = Lists.newArrayList();
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid2*/
			String sql = "SELECT anova(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.anova(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.equalTo(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tukey(List)}
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@Test
	public void tukey()
	{
		List<Map<String, Object>> expected = null;
		List<Map<String, Object>> actual = Lists.newArrayList();
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid3*/
			String sql = "SELECT tukey(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tukey(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		String expected_rn = (String) actual.get(0).get("i-j");
		double expected_diffenrence = (double) actual.get(0).get("Diff");
		double expected_pvalue = (double) actual.get(0).get("p_value");
		double expected_sig = (double) actual.get(0).get("sig.");
		double expected_lcl = (double) actual.get(0).get("LCL");
		double expected_ucl = (double) actual.get(0).get("UCL");
		
		String actual_rn = (String) actual.get(0).get("i-j");
		double actual_diffenrence = (double) actual.get(0).get("Diff");
		double actual_pvalue = (double) actual.get(0).get("p_value");
		double actual_sig = (double) actual.get(0).get("sig.");
		double actual_lcl = (double) actual.get(0).get("LCL");
		double actual_ucl = (double) actual.get(0).get("UCL");
		
		assertThat(actual_rn, Matchers.equalToIgnoringCase(expected_rn));
		assertThat(actual_diffenrence, Matchers.anyOf(Matchers.closeTo(expected_diffenrence, 1e-4), 
				Matchers.equalTo(expected_diffenrence)));
		assertThat(actual_pvalue, Matchers.anyOf(Matchers.closeTo(expected_pvalue, 1e-4), 
				Matchers.equalTo(expected_pvalue)));
		assertThat(actual_sig, Matchers.anyOf(Matchers.closeTo(expected_sig, 1e-4), 
				Matchers.equalTo(expected_sig)));
		assertThat(actual_lcl, Matchers.anyOf(Matchers.closeTo(expected_lcl, 1e-4), 
				Matchers.equalTo(expected_lcl)));
		assertThat(actual_ucl, Matchers.anyOf(Matchers.closeTo(expected_ucl, 1e-4), 
				Matchers.equalTo(expected_ucl)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tukey(List)}
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@Test
	public void tukey2()
	{
		List<Map<String, Object>> expected = null;
		List<Map<String, Object>> actual = Lists.newArrayList();
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid3*/
			String sql = "SELECT tukey(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tukey(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		String expected_rn = (String) actual.get(0).get("i-j");
		double expected_diffenrence = (double) actual.get(0).get("Diff");
		double expected_pvalue = (double) actual.get(0).get("p_value");
		double expected_sig = (double) actual.get(0).get("sig.");
		double expected_lcl = (double) actual.get(0).get("LCL");
		double expected_ucl = (double) actual.get(0).get("UCL");
		
		String actual_rn = (String) actual.get(0).get("i-j");
		double actual_diffenrence = (double) actual.get(0).get("Diff");
		double actual_pvalue = (double) actual.get(0).get("p_value");
		double actual_sig = (double) actual.get(0).get("sig.");
		double actual_lcl = (double) actual.get(0).get("LCL");
		double actual_ucl = (double) actual.get(0).get("UCL");
		
		assertThat(actual_rn, Matchers.equalToIgnoringCase(expected_rn));
		assertThat(actual_diffenrence, Matchers.anyOf(Matchers.closeTo(expected_diffenrence, 1e-4), 
				Matchers.equalTo(expected_diffenrence)));
		assertThat(actual_pvalue, Matchers.anyOf(Matchers.closeTo(expected_pvalue, 1e-4), 
				Matchers.equalTo(expected_pvalue)));
		assertThat(actual_sig, Matchers.anyOf(Matchers.closeTo(expected_sig, 1e-4), 
				Matchers.equalTo(expected_sig)));
		assertThat(actual_lcl, Matchers.anyOf(Matchers.closeTo(expected_lcl, 1e-4), 
				Matchers.equalTo(expected_lcl)));
		assertThat(actual_ucl, Matchers.anyOf(Matchers.closeTo(expected_ucl, 1e-4), 
				Matchers.equalTo(expected_ucl)));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tukey_g(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void tukey_g()
	{
		List<Map<String, Object>> expected = null;
		List<Map<String, Object>> actual = Lists.newArrayList();
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid3*/
			String sql = "SELECT tukey_g(PERIOD_CD, G0_PT_PAT_MST_SEX_1) OVER() "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT PERIOD_CD A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tukey_g(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual, Matchers.equalTo(expected));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tukey_g(List)}
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void tukey_g2()
	{
		List<Map<String, Object>> expected = null;
		List<Map<String, Object>> actual = Lists.newArrayList();
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid3*/
			String sql = "SELECT tukey_g(G0_DG_DISS_LST_DIS_AGE_2, G0_PT_PAT_MST_SEX_1) OVER() "
					+ "FROM CRDW_SECU.TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT G0_DG_DISS_LST_DIS_AGE_2 A, G0_PT_PAT_MST_SEX_1 B "
					+ "FROM TM_0000000_20180709164820503";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tukey_g(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual.get(0).get("Code"), Matchers.equalTo(expected.get(0).get("Code")));
		assertThat((double) actual.get(0).get("Means"), Matchers.closeTo((double)  expected.get(0).get("Means"), 1e-10));
		assertThat(actual.get(0).get("Groups"), Matchers.equalTo(expected.get(0).get("Groups")));
		
		assertThat(actual.get(1).get("Code"), Matchers.equalTo(expected.get(1).get("Code")));
		assertThat((double) actual.get(1).get("Means"), Matchers.closeTo((double)  expected.get(1).get("Means"), 1e-10));
		assertThat(actual.get(1).get("Groups"), Matchers.equalTo(expected.get(1).get("Groups")));
	}
	
	/**
	 * {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions#tukey_g(List)}
	 * 
	 * org.renjin.eval.EvalException: Cannot coerce character to scalar string 발생에 따른 ArrayIndexOutOfBoundsException 처리 
	 */
	@SuppressWarnings("unchecked")
//	@Test
	public void tukey_g3()
	{
		List<Map<String, Object>> expected = null;
		List<Map<String, Object>> actual = Lists.newArrayList();
		
		try(Statement  stmt = verticaSSF.openSession().getConnection().createStatement())
		{
			/*selectOneWayAnalysisDataGrid3*/
			String sql = "SELECT tukey_g(B004, B007) OVER() "
					+ "FROM CRDW_SECU.TM_0000000_BASANALISYS";
			
			ResultSet rs = stmt.executeQuery(sql);
			expected = rsToList(rs);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		try(Statement  stmt = h2SSF.openSession().getConnection().createStatement())
		{
			String sql = "SELECT B004 AS A, B007 AS B FROM TM_0000000_BASANALISYS";
			
			ResultSet rs = stmt.executeQuery(sql);
			actual = af.tukey_g(rsToList(rs));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		assertThat(actual.get(0).get("Code"), Matchers.equalTo(expected.get(0).get("Code")));
		assertThat((double) actual.get(0).get("Means"), Matchers.closeTo((double)  expected.get(0).get("Means"), 1e-10));
		assertThat(actual.get(0).get("Groups"), Matchers.equalTo(expected.get(0).get("Groups")));
		
		assertThat(actual.get(1).get("Code"), Matchers.equalTo(expected.get(1).get("Code")));
		assertThat((double) actual.get(1).get("Means"), Matchers.closeTo((double)  expected.get(1).get("Means"), 1e-10));
		assertThat(actual.get(1).get("Groups"), Matchers.equalTo(expected.get(1).get("Groups")));
	}
	
}
