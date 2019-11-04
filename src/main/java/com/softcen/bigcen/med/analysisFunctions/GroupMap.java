package com.softcen.bigcen.med.analysisFunctions;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.common.primitives.Doubles;

/**
 * {@link AnalysisFunctions#groupingByValue(List)}에서 사용되는 클래스로,
 * {@link #map} 내 키값의 레이블명 {@link #keyName}와 
 * 리스트의 레이블명 {@link GroupMap#valueName}를 포함합니다.<br>   
 *
 */
public class GroupMap
{
	/**
	 * the number of groups
	 */
	private long m = 0L;
	
	/**
	 * the total number of subjects
	 */
	private long n = 0L;
	
	/**
	 * the total of all observations
	 */
	private double obs = 0D;
	
	private String keyName;
	private String valueName;
	private Map<String, List<Double>> map;
	private Set<double[]> set;
	private double[][] array;
	private double[] mergeArray;

	public GroupMap(String keyColumnName, String valueColumnName,
			Map<String, List<Double>> map) {
		super();
		this.m = map.size();
		this.keyName = keyColumnName;
		this.valueName = valueColumnName;
		this.map = map;
		
		set = Sets.newHashSet();
		array = new double[map.size()][];
		int i = 0;
		List<Double> vs = Lists.newArrayList();
		for(Entry<String, List<Double>> e : map.entrySet())
		{
			List<Double> v = e.getValue();
			vs.addAll(v);
			
			set.add(Doubles.toArray(v));
			array[i++] = Doubles.toArray(v);
			n += v.size();
			for (Double d : v)
			{
				obs += d;
		    }
		}
		mergeArray = Doubles.toArray(vs);
	}
	public long getM() {
		return m;
	}
	public long getN() {
		return n;
	}
	public double getObs() {
		return obs;
	}
	public String getKeyName() {
		return keyName;
	}
	public String getValueName() {
		return valueName;
	}
	public Map<String, List<Double>> getMap() {
		return map;
	}
	public Set<double[]> getSet() {
		return set;
	}
	public double[][] getArray() {
		return array;
	}
	public double[] getMergeArray() {
		return mergeArray;
	}
}
