package com.softcen.bigcen.med.analysisFunctions;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.script.ScriptEngine;

import org.renjin.script.RenjinScriptEngineFactory;
import org.renjin.sexp.SEXP;

import com.google.common.base.Preconditions;
import com.google.common.collect.Maps;
import com.google.common.math.Quantiles;
import com.google.common.math.Stats;
import com.google.common.primitives.Doubles;
import com.google.inject.internal.util.Lists;

/**
 * AnalysisFunctions Class는 Vertica R Functions로 구현된 기능을 대체하는 것을 목적합니다.
 * R Functions로 구현된 각 기능은 산출물(UUH-P6-600D-운영자매뉴얼-DB_20160806.doc)에서 확인 가능합니다.
 * 시각화 처리에 사용되는 R summary function을 추가로 구현합니다.
 * 
 */
public class AnalysisFunctions {
	
	private RenjinScriptEngineFactory factory;
	private ScriptEngine engine;
	
	private synchronized ScriptEngine getEngine()
	{
		if(engine == null)
		{
			if(factory == null)
			{
				factory = new RenjinScriptEngineFactory();
			}
			
			engine = factory.getScriptEngine();
		}
		
		return engine;
	}
	
	/**
	 * 6가지 통계 분석 결과를 반환합니다.<br>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/base/versions/3.5.1/topics/summary">summary</a>
	 * @param list
	 * @return min(최소값), 1st Qu.(1사 분위수), Median(중앙값), Mean(평균값), 3st Qu.(3사 분위수), Max(최대값)
	 */
	public double[] summary(List<Double> list)
	{
		/*> x <- c(3.5, 3.0, 3.2, 3.1, 3.6, 3.9)
		> summary(x)
		   Min. 1st Qu.  Median    Mean 3rd Qu.    Max. 
		  3.000   3.125   3.350   3.383   3.575   3.900*/
		
		List<Double> ret = Lists.newArrayList();

		DecimalFormat df = new DecimalFormat("###0.###");
		Stats stats = Stats.of(list);
		
		ret.add(Double.valueOf(df.format(stats.min())));
		ret.add(Double.valueOf(df.format(Quantiles.quartiles().index(1).compute(list))));
		ret.add(Double.valueOf(df.format(Quantiles.median().compute(list))));
		ret.add(Double.valueOf(df.format(stats.mean())));
		ret.add(Double.valueOf(df.format(Quantiles.quartiles().index(3).compute(list))));
		ret.add(Double.valueOf(df.format(stats.max())));
		
		return Doubles.toArray(ret);
	}
	
	/**
	 * list를 double[]로 변환합니다.<br>
	 * 
	 * @param list
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private static double[] toDoubleArray(List list)
	{
		double[] ret = new double[list.size()];
		
		for(int i = 0; i < ret.length; i++)
		{
			Object o = list.get(i);
			double d = 0d;
			
			if(o instanceof BigDecimal)
			{
				d = ((BigDecimal) o).doubleValue();
			}
			else if(o instanceof Integer)
			{
				d =  (double) ((Integer) o).intValue();
			}
			else if(o instanceof Long)
			{
				d =  (double) ((Long) o).longValue();
			}
			else
			{
				//d = (double) o;
				d =  (double) ((Long) o).longValue();
			}
			
			ret[i] = d;
		}
		
		return ret;
	}
	
	/**
	 * list를 String[]로 변환합니다.<br>
	 * 
	 * @param list
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private static String[] toStringArray(List list)
	{
		String[] ret = new String[list.size()];
		
		for(int i = 0; i < ret.length; i++)
		{
			ret[i] = (String) list.get(i);
		}
		
		return ret;
	}
	
	/**
	 * list를 Map<String, Object[]>로 변환합니다.<br>
	 * 리스트 [{PERIOD_CD=1, G0_PT_PAT_MST_SEX_1=F}, {PERIOD_CD=1, G0_PT_PAT_MST_SEX_1=F}, 
	 * {PERIOD_CD=1, G0_PT_PAT_MST_SEX_1=M}]가 입력되었을 경우, 
	 * 맵 {PERIOD_CD=[1, 1,1], G0_PT_PAT_MST_SEX_1=[F, F, M]을 반환합니다.<br>
	 * 
	 * @param list
	 * @return 
	 */
	@SuppressWarnings("rawtypes")
	private static Map<String, List<Object>> translate(List<Map<Object, Object>> list)
	{
		Map<String, List<Object>> ret = new HashMap<String, List<Object>>();
		
		for(Map<Object, Object> m : list)
		{
			Iterator iter = m.entrySet().iterator();
			while(iter.hasNext())
			{
				Map.Entry entry = (Map.Entry) iter.next();
				String k = (String) entry.getKey();
				Object v = entry.getValue();

				if(!ret.containsKey(k))
				{
					List<Object> l = Lists.newArrayList();
					ret.put(k, l);
				}
				
				ret.get(k).add(v);
			}
		}
			
		return ret;
	}
	
	/**
	 * list 내 Map의 key를 기준으로 value를 list로 묶어 반환합니다.<br>
	 * 리스트 [{A=1.0, B=79.0}, {A=1.0, B=46.0}, {A=1.0, B=71.0}]가 입력되었을 경우, 
	 * 맵 {A:[1.0, 1.0, 1.0], B[79.0, 46.0, 71.0]}를 반환합니다.<br>
	 * 
	 * @param list
	 * @return 
	 */
	protected Map<String, List<Double>> groupingByKey(List<Map<Object, Object>> list)
	{
		Map<String, List<Double>> ret = Maps.newHashMap();
		
		for(Map<Object, Object> m : list)
		{
			for(Entry<Object, Object> e : m.entrySet())
			{
				String k = (String) e.getKey();
				Object v = e.getValue();
				double d = 0D;
				
				if(v instanceof BigDecimal)
				{
					d = ((BigDecimal) v).doubleValue();
				}
				else if(v instanceof Integer)
				{
					d =  (double) ((Integer) v).intValue();
				}
				else if(v instanceof Long)
				{
					d =  (double) ((Long) v).longValue();
				}
				else
				{
					//d = (double) v;
					d =  (double) ((Long) v).longValue();
				}
				
				if(ret.containsKey(k))
				{
					ret.get(k).add(d);
				}
				else
				{
					List<Double> l = Lists.newArrayList(d);
					ret.put(k, l);
				}
			}
		}

		return ret;
	}
	
	/**
	 * list 내 Map의 문자값을 갖는 value(존재하지 않을 경우 key)를 기준으로 list를 묶어 반환합니다.<br>
	 * 리스트 [{MID=1.0}, {MID=1.0}, {MID=1.0}]가 입력되었을 경우, 
	 * 맵 {MID:[1.0, 1.0, 1.0]}을 {@link GroupMap}에 담아 반환하고,
	 * 리스트[{G0_PT_PAT_MST_SEX_1=F, MEDIAN=0.0}, {G0_PT_PAT_MST_SEX_1=F, MEDIAN=0.0}, 
	 * {G0_PT_PAT_MST_SEX_1=M, MEDIAN=0.0}]가 입력되었을 경우, 
	 * 맵 {F:[0.0, 0.0], M:[0.0]}을 {@link GroupMap}에 담아 반환합니다.<br>
	 * 
	 * @param list
	 * @return
	 */
	protected GroupMap groupingByValue(List<Map<Object, Object>> list)
	{
//		AnalysisFunctionsTest tt_df_24 테스트(http://192.168.70.231:8077/redmine/issues/698)에 의해 주석 처리 
//		Preconditions.checkArgument(list.size() > 0, "list must have at least one");
		
		String keyName = null;
		String valueName = null;
		Map<String, List<Double>> ret = Maps.newHashMap();
		
		for(Map<Object, Object> m : list)
		{
			String key = null;
			double value = 0D;
			
			for(Entry<Object, Object> e : m.entrySet())
			{
				String k = (String) e.getKey();
				Object v = e.getValue();

				if(v instanceof String)
				{
					keyName = k;
					key = (String) v;
				}
				else if(v instanceof BigDecimal)
				{
					valueName = k;
					value = ((BigDecimal) v).doubleValue();
				}
				else if(v instanceof Integer)
				{
					valueName = k;
					value =  (double) ((Integer) v).intValue();
				}
				else if(v instanceof Long)
				{
					valueName = k;
					value =  (double) ((Long) v).longValue();
				}
				else
				{
					valueName = k;
					//value = (double) v;
					value = (double) ((Long) v).longValue();
				}
				
				if(key == null)
				{
					keyName = k;
					key = k;
				}
			}
			
			if(ret.containsKey(key))
			{
				ret.get(key).add(value);
			}
			else
			{
				List<Double> l = Lists.newArrayList(value);
				ret.put(key, l);
			}
		}
		
		return new GroupMap(keyName, valueName, ret);
	}
	
	/**
	 * 중앙값을 반환합니다.<br>
	 * 리스트 [{MID=1.0}, {MID=1.0}, {MID=1.0}, ...]가 입력되었을 경우, 
	 * 맵 [{MID=1.0}]와 같은 결과를 출력하고,
	 * 리스트 [{G0_PT_PAT_MST_SEX_1=F, MEDIAN=0.0}, {G0_PT_PAT_MST_SEX_1=F, MEDIAN=0.0}, {G0_PT_PAT_MST_SEX_1=M, MEDIAN=0.0}, ...]가 입력되었을 경우, 
	 * 맵 [{F=0.0}, {M=0.0}]와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * mid <- function(x){
	 *     res <- median(x[,1], na.rm = TRUE)
	 *     res
	 * }
	 * 
	 * midFactory <- function(){
	 *     list(name=mid,
	 *          udxtype=c("transform"),
	 *          intype=c("float"),
	 *          outtype=c("float"),
	 *          outnames=c("median"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/median">median</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list 
	 * @return 
	 * @throws Exception 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List mid(List list) throws Exception
	{
		List<Map<String, Object>> ret = Lists.newArrayList();
		
		GroupMap map = groupingByValue(list);
		for(Entry<String, List<Double>> entry : map.getMap().entrySet())
		{
			String k = entry.getKey();
			List<Double> v = entry.getValue();
			
			getEngine().put("A", toDoubleArray(v));
			
			org.renjin.sexp.SEXP output = null;
			Double median = null;
			try
			{
				output = (SEXP) getEngine().eval("median(A, na.rm = TRUE)");
				median = output.asReal();
			}
			catch(Exception e)
			{
				throw new RenjinException(e.getMessage(), e.getCause());
			}
				
			Map<String, Object> m = Maps.newHashMap();
			m.put(map.getKeyName(), k);
			m.put(map.getValueName(), median);
			ret.add(m);
		}
		
		return ret;
	}
	
	/**
	 * 표준편차를 반환합니다.<br>
	 * 리스트 [{SD=1.0}, {SD=1.0}, {SD=1.0}, ...]가 입력되었을 경우, 
	 * 맵 [{SD=0.0}]와 같은 결과를 출력하고,
	 * 리스트 [{SD=1.0, G0_PT_PAT_MST_SEX_1=F}, {SD=1.0, G0_PT_PAT_MST_SEX_1=F}, {SD=1.0, G0_PT_PAT_MST_SEX_1=M}, ...]가 입력되었을 경우, 
	 * 맵 [{F=0.0}, {M=0.0}]와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * sd0 <- function(x){
	 *     res <- sd(x[,1], na.rm = TRUE)
	 *     res
	 * }
	 *     
	 * sd0Factory <- function(){
	 *     list(name=sd0,
	 *          udxtype=c("transform"),
	 *          intype=c("float"),
	 *          outtype=c("float"),
	 *          outnames=c("sd"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/sd">sd</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List sd0(List list) throws Exception
	{
		List<Map<String, Object>> ret = Lists.newArrayList();
		
		GroupMap map = groupingByValue(list);
		for(Entry<String, List<Double>> entry : map.getMap().entrySet())
		{
			String k = entry.getKey();
			List<Double> v = entry.getValue();
			
			getEngine().put("A", toDoubleArray(v));
			
			org.renjin.sexp.SEXP output = null;
			Double median = null;
			try
			{
				output = (SEXP) getEngine().eval("sd(A, na.rm = TRUE)");
				median = output.asReal();
			}
			catch(Exception e)
			{
				throw new RenjinException(e.getMessage(), e.getCause());
			}
				
			Map<String, Object> m = Maps.newHashMap();
			m.put(map.getKeyName(), k);
			m.put(map.getValueName(), median);
			ret.add(m);
		}
		
	    return ret;
	}
  
	/**
	 * 대응표본 T검정 결과를 반환합니다.<br>
	 * 리스트 [{A=1.0, B=79.0}, {A=1.0, B=46.0}, {A=1.0, B=71.0}, ...]가 입력되었을 경우, 
	 * -47.720649811540575와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tt_stat_p <- function(x){
	 *     res <- t.test(x[,1], x[,2], paired=TRUE)$statistic
	 *     res
	 * }
	 *    
	 * tt_stat_pFactory <- function(){
	 *     list(name=tt_stat_p,
	 *          udxtype=c("transform"),
	 *          intype=c("float","float"),
	 *          outtype=c("float"),
	 *          outnames=c("t"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/t.test">Student's T-Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double tt_stat_p(List list) throws Exception
	{
	    Map<String, List<Double>> map = groupingByKey(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		String key0 = map.keySet().iterator().next();
		List<Double> value0 = map.get(key0);
		map.remove(key0);
		String key1 = map.keySet().iterator().next();
		List<Double> value1 = map.get(key1);
		
		getEngine().put("A", toDoubleArray(value0));
		getEngine().put("B", toDoubleArray(value1));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("t.test(A, B, paired=TRUE)$statistic");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}

	/**
	 * 대응표본 T검정 결과의 자유도를 반환합니다.<br>
	 * 리스트 [{A=1.0, B=79.0}, {A=1.0, B=46.0}, {A=1.0, B=71.0}, ...]가 입력되었을 경우, 
	 * 106.0과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tt_df_p <- function(x){
	 *     res <- t.test(x[,1], x[,2], paired=TRUE)$parameter
	 *     res
	 * }
	 *     
	 * tt_df_pFactory <- function(){
	 *     list(name=tt_df_p,
	 *          udxtype=c("transform"),
	 *          intype=c("float","float"),
	 *          outtype=c("float"),
	 *          outnames=c("df"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/t.test">Student's T-Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double tt_df_p(List list) throws Exception
    {
	    Map<String, List<Double>> map = groupingByKey(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		String key0 = map.keySet().iterator().next();
		List<Double> value0 = map.get(key0);
		map.remove(key0);
		String key1 = map.keySet().iterator().next();
		List<Double> value1 = map.get(key1);
		
		getEngine().put("A", toDoubleArray(value0));
		getEngine().put("B", toDoubleArray(value1));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("t.test(A, B, paired=TRUE)$parameter");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
    }
	
	/**
	 * 대응표본 T검정 결과의 P값을 반환합니다.<br>
	 * 리스트 [{A=1.0, B=79.0}, {A=1.0, B=46.0}, {A=1.0, B=71.0}, ...]가 입력되었을 경우, 
	 * 1.7745025700814717E-73과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tt_pv_p <- function(x){
	 *     	res <- t.test(x[,1], x[,2], paired=TRUE)$p.value
	 *     	res
	 * }
	 *     
	 * tt_pv_pFactory <- function(){
	 *     list(name=tt_pv_p,
	 *          udxtype=c("transform"),
	 *          intype=c("float","float"),
	 *          outtype=c("float"),
	 *          outnames=c("p_value"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/t.test">Student's T-Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double tt_pv_p(List list) throws Exception
	{
		Map<String, List<Double>> map = groupingByKey(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		String key0 = map.keySet().iterator().next();
		List<Double> value0 = map.get(key0);
		map.remove(key0);
		String key1 = map.keySet().iterator().next();
		List<Double> value1 = map.get(key1);
		
		getEngine().put("A", toDoubleArray(value0));
		getEngine().put("B", toDoubleArray(value1));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("t.test(A, B, paired=TRUE)$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 독립표본 T검정 결과를 반환합니다.<br>
	 * 리스트 [{F=0.0}, {F=0.0}, {M=0.0}, ...]가 입력되었을 경우, 
	 * 1.6801126304958316과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tt_stat_2 <- function(x){
	 *     	res <- t.test(x[,1]~x[,2])$statistic
	 *     	res
	 * }
	 *     
	 * tt_stat_2Factory <- function(){
	 *     list(name=tt_stat_2,
	 *          udxtype=c("transform"),
	 *          intype=c("float","varchar"),
	 *          outtype=c("float"),
	 *          outnames=c("t"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/t.test">Student's T-Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double tt_stat_2(List list) throws Exception
	{
	    Map<String, List<Double>> map =groupingByValue(list).getMap();
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		String key0 = map.keySet().iterator().next();
		List<Double> value0 = map.get(key0);
		map.remove(key0);
		String key1 = map.keySet().iterator().next();
		List<Double> value1 = map.get(key1);
		
		getEngine().put("A", toDoubleArray(value0));
		getEngine().put("B", toDoubleArray(value1));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("t.test(A, B)$statistic");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 독립표본 T검정 결과의 자유도를 반환합니다.<br>
	 * 리스트 [{G0_DG_DISS_LST_DIS_AGE_2=0.0, R0_PT_PAT_MST_SEX_1=F}, {G0_DG_DISS_LST_DIS_AGE_2=0.0, R0_PT_PAT_MST_SEX_1=F}, {G0_DG_DISS_LST_DIS_AGE_2=0.0, R0_PT_PAT_MST_SEX_1=M}, ...]가 입력되었을 경우, 
	 * 5481.552314964729과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tt_df_2 <- function(x){
	 *     res <- t.test(x[,1]~x[,2])$parameter
	 *     res
	 * }
	 *     
	 * tt_df_2Factory <- function(){
	 *     list(name=tt_df_2,
	 *          udxtype=c("transform"),
	 *          intype=c("float","varchar"),
	 *          outtype=c("float"),
	 *          outnames=c("df"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/t.test">Student's T-Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double tt_df_2(List list) throws Exception
    {
		Map<String, List<Double>> map =groupingByValue(list).getMap();
//		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		if(map.size() != 2)
		{
			throw new Exception("grouping factor must have exactly 2 levels");
		}
		
		String key0 = map.keySet().iterator().next();
		List<Double> value0 = map.get(key0);
		map.remove(key0);
		String key1 = map.keySet().iterator().next();
		List<Double> value1 = map.get(key1);
		
		getEngine().put("A", toDoubleArray(value0));
		getEngine().put("B", toDoubleArray(value1));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("t.test(A, B)$parameter");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
    }
	
	/**
	 * 독립표본 T검정 결과의 P값을 반환합니다.<br>
	 * 리스트 [{G0_DG_DISS_LST_DIS_AGE_2=0.0, R0_PT_PAT_MST_SEX_1=F}, {G0_DG_DISS_LST_DIS_AGE_2=0.0, R0_PT_PAT_MST_SEX_1=F}, {G0_DG_DISS_LST_DIS_AGE_2=0.0, R0_PT_PAT_MST_SEX_1=M}, ...]가 입력되었을 경우, 
	 * 0.09299238499608231과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tt_pv_21 <- function(x){
	 *     res <- t.test(x[,1]~x[,2])$p.value
	 *     res
	 * }
	 *     
	 * tt_pv_21Factory <- function(){
	 *     list(name=tt_pv_21,
	 *          udxtype=c("transform"),
	 *          intype=c("float","varchar"),
	 *          outtype=c("float"),
	 *          outnames=c("p_value"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/t.test">Student's T-Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double tt_pv_21(List list) throws Exception
	{
		Map<String, List<Double>> map =groupingByValue(list).getMap();
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		String key0 = map.keySet().iterator().next();
		List<Double> value0 = map.get(key0);
		map.remove(key0);
		String key1 = map.keySet().iterator().next();
		List<Double> value1 = map.get(key1);
		
		getEngine().put("A", toDoubleArray(value0));
		getEngine().put("B", toDoubleArray(value1));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("t.test(A, B)$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 사분범위를 반환합니다.<br>
	 * 리스트 [{SD=1.0}, {SD=1.0}, {SD=1.0}, ...]가 입력되었을 경우, 
	 * 맵 [{SD=0.0}]와 같은 결과를 출력하고,
	 * 리스트 [{SD=1.0, G0_PT_PAT_MST_SEX_1=F}, {SD=1.0, G0_PT_PAT_MST_SEX_1=F}, {SD=1.0, G0_PT_PAT_MST_SEX_1=M}, ...]가 입력되었을 경우, 
	 * 맵 [{F=0.0}, {M=0.0}]와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * iqr <- function(x){
	 *     	res <- IQR(x[,1], na.rm = TRUE, type=6)
	 *     	res
	 * }
	 *     
	 * iqrFactory <- function(){
	 *     	list(name=iqr,
	 *          udxtype=c("transform"),
	 *          intype=c("float"),
	 *          outtype=c("float"),
	 *          outnames=c("IQR"))
	 * }
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/IQR">IQR</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List iqr(List list) throws Exception
	{
		List<Map<String, Object>> ret = Lists.newArrayList();
		
		GroupMap map = groupingByValue(list);
		for(Entry<String, List<Double>> entry : map.getMap().entrySet())
		{
			String k = entry.getKey();
			List<Double> v = entry.getValue();
			
			getEngine().put("A", toDoubleArray(v));
			
			org.renjin.sexp.SEXP output = null;
			Double median = null;
			try
			{
				output = (SEXP) getEngine().eval("IQR(A, na.rm = TRUE, type=6)");
				median = output.asReal();
			}
			catch(Exception e)
			{
				throw new RenjinException(e.getMessage(), e.getCause());
			}
				
			Map<String, Object> m = Maps.newHashMap();
			m.put(map.getKeyName(), k);
			m.put(map.getValueName(), median);
			ret.add(m);
		}
		
		return ret;
	}
	
	/**
	 * 비모수 독립 2표본검정 내 Mann_Whitney U 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=F}, {A=1, B=F}, {A=1, B=M}, ...]가 입력되었을 경우, 
	 * 4,352,036와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ut_stat <- function(x){
	 * 		res <- wilcox.test(x[,1]~x[,2], correct =FALSE)$statistic
	 * 		res
	 * 	}
	 * 
	 * ut_statFactory <- function(){
	 * 		list(name=ut_stat,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("float","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("u"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/wilcox.test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ut_stat(List list) throws Exception
	{
		GroupMap map = groupingByValue(list);
		Preconditions.checkArgument(map.getMap().size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A", map.getArray()[0]);
		getEngine().put("B", map.getArray()[1]);
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("wilcox.test(A, B)$statistic");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 비모수 독립 2표본검정 내 P-value 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=F}, {A=1, B=F}, {A=1, B=M}, ...]가 입력되었을 경우, 
	 * NaN과 같은 결과를 출력합니다.<br><br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ut_pv <- function(x){
	 * 		res <- wilcox.test(x[,1]~x[,2], correct =FALSE)$p.value
	 * 		res
	 * 	}
	 * 
	 * ut_pvFactory <- function(){
	 * 		list(name=ut_pv,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("float","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("p_value"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://stat.ethz.ch/R-manual/R-devel/library/stats/html/wilcox.test.html">Wilcoxon Rank Sum and Signed Rank Tests</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ut_pv(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
	    getEngine().put("A", toDoubleArray(map.get("A")));
	    getEngine().put("B", toStringArray(map.get("B")));
		
	    org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("wilcox.test(A~as.factor(B), correct =FALSE)$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 비모수 독립 K표본검정 내 chi-squared 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=F}, {A=1, B=F}, {A=1, B=M}, ...]가 입력되었을 경우, 
	 * 1.0511과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * kt_stat1 <- function(x){
	 * 		res <- kruskal.test(x[,1]~x[,2])$statistic
	 * 		res
	 * 	}
	 * 
	 * kt_stat1Factory <- function(){
	 * 		list(name=kt_stat1,
	 * 	    	udxtype=c("transform"),
	 * 	    	intype=c("float","varchar"),
	 * 	    	outtype=c("float"),
	 * 	    	outnames=c("kruskal-wallis chi-squared"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/kruskal.test">Kruskal-Wallis Rank Sum Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double kt_stat1(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A", toDoubleArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("kruskal.test(A~as.factor(B))$statistic");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 비모수 독립 K표본검정 내 df 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=F}, {A=1, B=F}, {A=1, B=M}, ...]가 입력되었을 경우, 
	 * 1과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * kt_pv <- function(x){
	 * 		res <- kruskal.test(x[,1]~x[,2])$p.value
	 * 		res
	 * 	}
	 * 
	 * kt_pvFactory <- function(){
	 * 		list(name=kt_pv,
	 * 	    	udxtype=c("transform"),
	 * 	    	intype=c("float","varchar"),
	 * 	    	outtype=c("float"),
	 * 	    	outnames=c("df"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/kruskal.test">Kruskal-Wallis Rank Sum Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double kt_df(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A", toDoubleArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("kruskal.test(A~as.factor(B))$parameter");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 비모수 독립 K표본검정 내 p-value 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=F}, {A=1, B=F}, {A=1, B=M}, ...]가 입력되었을 경우, 
	 * 0.3053과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * kt_df <- function(x){
	 * 		res <- kruskal.test(x[,1]~x[,2])$parameter
	 * 		res
	 * 	}
	 * 
	 * kt_dfFactory <- function(){
	 * 		list(name=kt_df,
	 * 	    	udxtype=c("transform"),
	 * 	    	intype=c("float","varchar"),
	 * 	    	outtype=c("float"),
	 * 	    	outnames=c("df"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/kruskal.test">Kruskal-Wallis Rank Sum Test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double kt_pv(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A", toDoubleArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("kruskal.test(A~as.factor(B))$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 교차분석 내 카이제곱검정의 Pearson chi-squared 값 결과를 반환합니다.<br>
	 * 리스트 [{A=F, B=F}, {A=F, B=F}, {A=M, B=M}, ...]가 입력되었을 경우, 
	 * 5938과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_stat <- function(x){
	 * 		res <- chisq.test(x[,1], x[,2], correct = FALSE)$statistic
	 * 		res
	 * 	}
	 * 
	 * ct_statFactory <- function(){
	 * 		list(name=ct_stat,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("varchar","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("X-squared"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/chisq.test">Pearson's Chi-Squared Test For Count Data</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_stat(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A", toStringArray(map.get("A")));
	    getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("chisq.test(A, B, correct = FALSE)$statistic");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}

		return output.asReal();
	}
	
	/**
	 * 교차분석 내 카이제곱검정의 Pearson chi-squared df 결과를 반환합니다.<br>
	 * 리스트 [{A=F, B=F}, {A=F, B=F}, {A=M, B=M}, ...]가 입력되었을 경우, 
	 * 1과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_df <- function(x){
	 * 		res <- chisq.test(x[,1], x[,2], correct = FALSE)$parameter
	 * 		res
	 * 	}
	 * 
	 * ct_dfFactory <- function(){
	 * 		list(name=ct_df,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("varchar","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("df"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/chisq.test">Pearson's Chi-Squared Test For Count Data</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_df(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toStringArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("chisq.test(A, B, correct = FALSE)$parameter");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 교차분석 내 카이제곱검정의 Pearson chi-squared p-value 결과를 반환합니다.<br>
	 * 리스트 [{A=F, B=F}, {A=F, B=F}, {A=M, B=M}, ...]가 입력되었을 경우, 
	 * 0과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_pv <- function(x){
	 * 		res <- chisq.test(x[,1], x[,2], correct = FALSE)$p.value
	 * 		res
	 * 	}
	 * 
	 * ct_pvFactory <- function(){
	 * 		list(name=ct_pv,
	 * 	     	udxtype=c("transform"),
	 * 	     	intype=c("varchar","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("p_value"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/chisq.test">Pearson's Chi-Squared Test For Count Data</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_pv(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toStringArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("chisq.test(A, B, correct = FALSE)$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 교차분석 내 카이제곱검정의 연속성보정 값 결과를 반환합니다.<br>
	 * 리스트 [{A=F, B=F}, {A=F, B=F}, {A=M, B=M}, ...]가 입력되었을 경우, 
	 * 5933.9497313039와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_stat <- function(x){
	 * 		res <- chisq.test(x[,1], x[,2], correct = TRUE)$statistic
	 * 		res
	 * 	}
	 * 
	 * ct_statFactory <- function(){
	 * 		list(name=ct_stat_c,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("varchar","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("X-squared"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/chisq.test">Pearson's Chi-Squared Test For Count Data</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_stat_c(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
	    getEngine().put("A",  toStringArray(map.get("A")));
	    getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("chisq.test(A, B, correct = TRUE)$statistic");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}

		return output.asReal();
	}
	
	/**
	 * 교차분석 내 카이제곱검정의 연속성보정 df 결과를 반환합니다.<br>
	 * 리스트 [{A=F, B=F}, {A=F, B=F}, {A=M, B=M}, ...]가 입력되었을 경우, 
	 * 1과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_df <- function(x){
	 * 		res <- chisq.test(x[,1], x[,2], correct = TRUE)$parameter
	 * 		res
	 * 	}
	 * 
	 * ct_dfFactory <- function(){
	 * 		list(name=ct_df_c,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("varchar","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("df"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/chisq.test">Pearson's Chi-Squared Test For Count Data</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_df_c(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toStringArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("chisq.test(A, B, correct = TRUE)$parameter");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 교차분석 내 카이제곱검정의 연속성보정 p-value 결과를 반환합니다.<br>
	 * 리스트 [{A=F, B=F}, {A=F, B=F}, {A=M, B=M}, ...]가 입력되었을 경우, 
	 * 1과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_pv <- function(x){
	 * 		res <- chisq.test(x[,1], x[,2], correct = TRUE)$p.value
	 * 		res
	 * 	}
	 * 
	 * ct_pvFactory <- function(){
	 * 		list(name=ct_pv_c,
	 * 	     	udxtype=c("transform"),
	 * 	     	intype=c("varchar","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("p_value"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/chisq.test">Pearson's Chi-Squared Test For Count Data</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_pv_c(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toStringArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("chisq.test(A, B, correct = TRUE)$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 교차분석 내 카이제곱검정의 Fisher의 정확검증 p-value 결과를 반환합니다.<br>
	 * 리스트 [{A=F, B=F}, {A=F, B=F}, {A=M, B=M}, ...]가 입력되었을 경우, 
	 * 0과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ft_pv <- function(x){
	 * 		res <- fisher.test(x[,1], x[,2])$p.value
	 * 		res	
	 * 	}
	 * 
	 * ft_pvFactory <- function(){
	 * 		list(name=ft_pv,
	 * 	     	udxtype=c("transform"),
	 * 	     	intype=c("varchar","varchar"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("p_value"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/broman/versions/0.67-4/topics/fisher">Fisher's Exact Test For A Two-Way Table</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ft_pv(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toStringArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("fisher.test(A, B)$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 상관분석 내 Pearson 상관계수의 Pearson r 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=0}, {A=1, B=0}, {A=1, B=0}, ...]가 입력되었을 경우, 
	 * NaN과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_p_esti <- function(x){
	 * 		res <- cor.test(x[,1], x[,2], method="pearson")$estimate
	 * 		res	
	 * 	}
	 * 
	 * ct_p_estiFactory <- function(){
	 * 		list(name=ct_p_esti,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("float","float"),
	 * 	     	outtype=c("float"),
	 * 	     	outn
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/cor.test">Test For Association/Correlation Between Paired Samples</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_p_esti(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toDoubleArray(map.get("A")));
		getEngine().put("B", toDoubleArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("cor.test(A, B, method=\"pearson\")$estimate");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 상관분석 내 Pearson 상관계수의 P-value 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=0}, {A=1, B=0}, {A=1, B=0}, ...]가 입력되었을 경우, 
	 * NaN과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_p_esti_pv0 <- function(x){
	 * 		res <- cor.test(x[,1], x[,2], method="pearson")$p.value
	 * 		res	
	 * 	}
	 * 
	 * ct_p_esti_pv0Factory <- function(){
	 * 		list(name=ct_p_esti_pv0,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("float","float"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("p_value"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/cor.test">Test For Association/Correlation Between Paired Samples</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_p_esti_pv0(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toDoubleArray(map.get("A")));
		getEngine().put("B", toDoubleArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("cor.test(A, B, method=\"pearson\")$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 상관분석 내 Spearman 순위상관계수의 Spearman r 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=0}, {A=1, B=0}, {A=1, B=0}, ...]가 입력되었을 경우, 
	 * NaN과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_s_esti <- function(x){
	 * 		res <- cor.test(x[,1], x[,2], method="spearman")$estimate
	 * 		res	
	 * 	}
	 * 
	 * ct_s_estiFactory <- function(){
	 * 		list(name=ct_s_esti,
	 * 	     	udxtype=c("transform"),
	 * 	     	intype=c("float","float"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("Spearman cor"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/cor.test">Test For Association/Correlation Between Paired Samples</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_s_esti(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toDoubleArray(map.get("A")));
		getEngine().put("B", toDoubleArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("cor.test(A, B, method=\"spearman\")$estimate");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 상관분석 내 Spearman 순위상관계수의 P-value 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=0}, {A=1, B=0}, {A=1, B=0}, ...]가 입력되었을 경우, 
	 * NaN과 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * ct_s_esti_pv <- function(x){
	 * 		res <- cor.test(x[,1], x[,2], method="spearman")$p.value
	 * 		res	
	 * 	}
	 * 
	 * ct_s_esti_pvFactory <- function(){
	 * 		list(name=ct_s_esti_pv,
	 * 	     	udxtype=c("transform"),
	 * 	     	intype=c("float","float"),
	 * 	     	outtype=c("float"),
	 * 	     	outnames=c("p_value"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/cor.test">Test For Association/Correlation Between Paired Samples</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public double ct_s_esti_pv(List list) throws Exception
	{
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toDoubleArray(map.get("A")));
		getEngine().put("B", toDoubleArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("cor.test(A, B, method=\"spearman\")$p.value");
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return output.asReal();
	}
	
	/**
	 * 일원분산분석 내 일원분산분석 분산분석 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=0}, {A=1, B=0}, {A=1, B=0}, ...]가 입력되었을 경우, 
	 * [{p_value=0.263, Df=1.0, Sum Sq=0.0, Mean Sq=0.0, F value=1.253}, 
	 * {p_value=NaN, Df=5936.0, Sum Sq=0.0, Mean Sq=0.0, F value=NaN}]와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * anova <- function(x){
	 *     fitss <- round(summary(aov(x[,1]~x[,2]))[[1]]$'Sum Sq', digits = 3)
	 *     fitdf <- round(summary(aov(x[,1]~x[,2]))[[1]]$'Df', digits = 3)
	 *     fitms <- round(summary(aov(x[,1]~x[,2]))[[1]]$'Mean Sq', digits = 3)
	 *     fitf <- round(summary(aov(x[,1]~x[,2]))[[1]]$'F value', digits = 3)
	 *     fitpr <- round(summary(aov(x[,1]~x[,2]))[[1]]$'Pr(>F)', digits = 3)
	 *     fit <- data.frame(fitss,fitdf,fitms,fitf,fitpr)
	 * }
	 * 
	 * anovaFactory <- function(){
	 *     list(name=anova,
	 * 	         udxtype=c("transform"),
	 * 	         intype=c("float","varchar"),
	 * 	         outtype=c("float","float","float","float","float"),
	 * 	         outnames=c("Sum Sq","Df","Mean Sq","F value","p_value"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="http://personality-project.org/r/r.guide/r.anova.html">R and Analysis of Variance</a>
	 * @see <a target="_blank" href="https://onlinecourses.science.psu.edu/stat414/node/218/">The ANOVA Table</a>
	 * @see <a target="_blank" href="https://www.itl.nist.gov/div898/handbook/prc/section4/prc434.htm">One-way ANOVA calculations</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List anova(List list) throws Exception
	{
		List<Map<String, Double>> ret = Lists.newArrayList();
		
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A",  toDoubleArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));

		double[] fitss = new double[2];
		double[] fitdf = new double[2];
		double[] fitms = new double[2];
		double[] fitf = new double[2];
		double[] fitpr = new double[2];
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("round(summary(aov(A~B))[[1]]$'Sum Sq', digits = 3)");
			fitss[0] = output.getElementAsSEXP(0).asReal();
			fitss[1] = output.getElementAsSEXP(1).asReal();
			output = (SEXP) getEngine().eval("round(summary(aov(A~B))[[1]]$'Df', digits = 3)");
			fitdf[0] = output.getElementAsSEXP(0).asReal();
			fitdf[1] = output.getElementAsSEXP(1).asReal();
			output = (SEXP) getEngine().eval("round(summary(aov(A~B))[[1]]$'Mean Sq', digits = 3)");
			fitms[0] = output.getElementAsSEXP(0).asReal();
			fitms[1] = output.getElementAsSEXP(1).asReal();
			output = (SEXP) getEngine().eval("round(summary(aov(A~B))[[1]]$'F value', digits = 3)");
			fitf[0] = output.getElementAsSEXP(0).asReal();
			fitf[1] = output.getElementAsSEXP(1).asReal();
			output = (SEXP) getEngine().eval("round(summary(aov(A~B))[[1]]$'Pr(>F)', digits = 3)");
			fitpr[0] = output.getElementAsSEXP(0).asReal();
			fitpr[1] = output.getElementAsSEXP(1).asReal();
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		Map<String, Double> m0 = Maps.newHashMap();
		m0.put("Sum Sq", fitss[0]);
		m0.put("Df", fitdf[0]);
		m0.put("Mean Sq", fitms[0]);
		m0.put("F value", fitf[0]);
		m0.put("p_value", fitpr[0]);
		Map<String, Double> m1 = Maps.newHashMap();
		m1.put("Sum Sq", fitss[1]);
		m1.put("Df", fitdf[1]);
		m1.put("Mean Sq", fitms[1]);
		m1.put("F value", fitf[1]);
		m1.put("p_value", fitpr[1]);
		
		ret.add(m0);
		ret.add(m1);
		
		return ret;
	}
	
	/**
	 * 일원분산분석 내 사후분석(Tukey) 다중비교 결과를 반환합니다.<br>
	 * 리스트[{A=1, B=F}, {A=1, B=F}, {A=1, B=M}, ...]가 입력되었을 경우, 
	 * [{p_value=1.0, LCL=-1.88727237742938E-15, Diff=0.0, i-j=F - M, 
	 * sig.=1.0, UCL=1.88727237742938E-15}]와 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tukey <- function(x){
	 *     library("agricolae")
	 *     tb <- data.frame(x[,1],x[,2])
	 *		names(tb)[1] <- c("a")
	 * 		names(tb)[2] <- c("b")
	 * 		res2 <- lm(a~b,data=tb)
	 * 		com <- HSD.test(res2,"b",group=FALSE)$comparison
	 * 		rn <- rownames(com)
	 * 		tt <- data.frame(rn,com)
	 * 		tt
	 * 	}
	 * 
	 * tukeyFactory <- function(){
	 * 		list(name=tukey,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("float","varchar"),
	 * 	     	outtype=c("varchar","float","float","float","float","float"),
	 * 	     	outnames=c("i-j","Diff","p_value","sig.","LCL","UCL"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/lm">lm</a>
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/agricolae/versions/1.2-8/topics/HSD.test">HSD.test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @see <a target="_blank" href="http://packages.renjin.org/package/org.renjin.cran/agricolae">agricolae 1.2-8</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List tukey(List list) throws Exception
	{
		List<Map<String, Object>> ret = Lists.newArrayList();
		
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");

		getEngine().put("A", toDoubleArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		Map<String, Object> m = Maps.newHashMap();
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("library(\"agricolae\")\n"
					+ "tb <- data.frame(A,B)\n"
					+ "names(tb)[1] <- c(\"a\")\n"
					+ "names(tb)[2] <- c(\"b\")\n"
					+ "res2 <- lm(a~b,data=tb)\n"
					+ "com <- HSD.test(res2,\"b\",group=FALSE)$comparison\n"
					+ "rn <- rownames(com)\n"
					+ "data.frame(rn,com)");
			
			for(int i = 0 ; i <  output.length() ; i++)
			{
				switch(i)
				{
					case 0:	// rn
						m.put("i-j", output.getElementAsSEXP(i).getAttributes().get("levels").asString());
						break;
					case 1:	// diffenrence
						m.put("Diff", output.getElementAsSEXP(i).asReal());
						break;
					case 2:	// pvalue
						m.put("p_value", output.getElementAsSEXP(i).asReal());
						break;
					case 3:	// sig.
						m.put("sig.", 1.0);
						break;
					case 4:	// LCL
						m.put("LCL", output.getElementAsSEXP(i).asReal());
						break;
					case 5:	// UCL
						m.put("UCL", output.getElementAsSEXP(i).asReal());
						break;
				}
			}
			ret.add(m);	
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return ret;
	}
	
	/**
	 * 일원분산분석 내 사후분석(Tukey) 동일진단군 결과를 반환합니다.<br>
	 * 리스트 [{A=1, B=F}, {A=1, B=F}, {A=1, B=M}, ...]가 입력되었을 경우, 
	 * [{Means=1.0, Groups=a, Code=F}, {Means=1.0, Groups=a, Code=M}]와 
	 * 같은 결과를 출력합니다.<br>
	 * 아래의 Vertica R Functions을 대체합니다.<br> 
	 * <pre>
	 * tukey_g <- function(x){
	 * 		library("agricolae")
	 * 		tb <- data.frame(x[,1],x[,2])
	 * 		names(tb)[1] <- c("a")
	 * 		names(tb)[2] <- c("b")
	 * 		res2 <- lm(a~b,data=tb)
	 * 		com <- HSD.test(res2,"b",group=TRUE)$groups
	 * 		com
	 * 	}
	 * 
	 * tukey_gFactory <- function(){
	 * 		list(name=tukey_g,
	 * 	    	udxtype=c("transform"),
	 * 	     	intype=c("float","varchar"),
	 * 	     	outtype=c("varchar","float","varchar"),
	 * 	     	outnames=c("Code","Means","Groups"))
	 * 	}
	 * </pre>
	 * 
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/stats/versions/3.5.1/topics/lm">lm</a>
	 * @see <a target="_blank" href="https://www.rdocumentation.org/packages/agricolae/versions/1.2-8/topics/HSD.test">HSD.test</a>
	 * @see <a target="_blank" href="http://www.renjin.org/">renjin</a>
	 * @see <a target="_blank" href="http://packages.renjin.org/package/org.renjin.cran/agricolae">agricolae 1.2-8</a>
	 * @param list
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List tukey_g(List list) throws Exception
	{
		List<Map<String, Object>> ret = Lists.newArrayList();
		
		Map<String, List<Object>> map = translate(list);
		Preconditions.checkArgument(map.size() == 2, "grouping factor must have exactly 2 levels");
		
		getEngine().put("A", toDoubleArray(map.get("A")));
		getEngine().put("B", toStringArray(map.get("B")));
		
		org.renjin.sexp.SEXP output = null;
		try
		{
			output = (SEXP) getEngine().eval("library(\"agricolae\")\n"
					+ "tb <- data.frame(A,B)\n"
					+ "names(tb)[1] <- c(\"a\")\n"
					+ "names(tb)[2] <- c(\"b\")\n"
					+ "res2 <- lm(a~b,data=tb)\n"
					+ "HSD.test(res2,\"b\",group=TRUE)$groups");
			
			int retSize = output.getAttributes().get("row.names").length();
			for(int i = 0 ; i < retSize ; i++)
			{
				Map<String, Object> m = Maps.newHashMap();
				
				// trt
				m.put("Code", output.getAttributes().get("row.names").getElementAsSEXP(i).asString());
				
				for(int j = 0 ; j <  output.length() ; j++)
				{
					switch(j)
					{
						case 0:	// means
							m.put("Means", output.getElementAsSEXP(j).getElementAsSEXP(i).asReal());
							break;
						case 1:	// M
							String M = "";
							try
							{
								M = output.getElementAsSEXP(j).getAttributes().get("levels").getElementAsSEXP(i).asString();
							}
							catch(java.lang.ArrayIndexOutOfBoundsException e)
							{
								M = output.getElementAsSEXP(j).getAttributes().get("levels").asString();
							}
							m.put("Groups", M);
							break;
					}
				}

				ret.add(m);		
			}
		}
		catch(Exception e)
		{
			throw new RenjinException(e.getMessage(), e.getCause());
		}
		
		return ret;
	}
}
