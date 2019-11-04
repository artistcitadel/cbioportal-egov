package com.softcen.bigcen.med.utils;

public class PaginationUtils {
	private int pageIndex;				
    private int totalCount;				
    private int pageSize;				
    private int pageBlockSize;			
    private int totalPage;				
    private int startNum;				
    
	
    
	private StringBuilder sbPagination;
    
    /**
     * 
     */
    public PaginationUtils() {}
    
   
	public int getPageIndex() {
		return pageIndex;
	}

	
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	/**
	 * @return the totalCount
	 */
	public int getTotalCount() {
		return totalCount;
	}

	/**
	 * @param totalCount the totalCount to set
	 */
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	/**
	 * @return the pageSize
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * @param pageSize the pageSize to set
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * @return the pageBlockSize
	 */
	public int getPageBlockSize() {
		return pageBlockSize;
	}

	/**
	 * @param pageBlockSize the pageBlockSize to set
	 */
	public void setPageBlockSize(int pageBlockSize) {
		this.pageBlockSize = pageBlockSize;
	}

	/**
	 * @return the totalPage
	 */
	public int getTotalPage() {
		return totalPage;
	}

	/**
	 * @param totalPage the totalPage to set
	 */
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	
	/**
	 * 
	 * @return
	 */
	public int getStartNum() {
		if( pageIndex == 1){
			startNum = totalCount;
			
		}else{
			startNum = totalCount - ((pageIndex - 1) * pageSize);
		}
		
		return startNum;
	}
	
	
	
	/**
	 * 
	 * @return
	 */
	public StringBuilder renderHtmlOut() {
		sbPagination = new StringBuilder();
		
		sbPagination.append("<table class=\"naviTable\" align=\"center\">");
		sbPagination.append("<tr>");
		
		int tmpNum = ((pageIndex - 1) / pageBlockSize) * pageBlockSize + 1;
		
		if( tmpNum == 1){
			sbPagination.append("<th><a href=\"javascript:fn_searchPage('1');\"><img src=\"../images/icon_navi_01.gif\"></a></th>\n");
			sbPagination.append("<th><a href=\"javascript:fn_searchPage('1');\"><img src=\"../images/icon_navi_02.gif\"></a></th>\n");
		}else{
			sbPagination.append("<th><a href=\"javascript:fn_searchPage('1');\"><img src=\"../images/icon_navi_01.gif\"></a></th>\n");
			sbPagination.append("<th><a href=\"javascript:fn_searchPage('"+(tmpNum-pageBlockSize)+"');\"><img src=\"../images/icon_navi_02.gif\"></a></th>\n");
		}
		
		
		for(int i=1; i <= pageBlockSize; i++){
			if( tmpNum == pageIndex){
				sbPagination.append("<td class=\"F\">"+tmpNum+"</td>");
			}else{
				sbPagination.append("<td><a href=\"javascript:fn_searchPage('"+tmpNum+"');\">"+tmpNum+"</a></td>");
			}
			
			tmpNum += 1;
			
			if(tmpNum > totalPage) break;
		}
		
		if( pageIndex <= totalPage){
        	if( tmpNum > totalPage){
        		sbPagination.append("<th><a href=\"javascript:fn_searchPage('"+totalPage+"');\"><img src=\"../images/icon_navi_03.gif\"></a></th>\n");
        		sbPagination.append("<th><a href=\"javascript:fn_searchPage('"+totalPage+"');\"><img src=\"../images/icon_navi_04.gif\"></a></th>\n");
        		
        	}else{
        		sbPagination.append("<th><a href=\"javascript:fn_searchPage('"+tmpNum+"');\"><img src=\"../images/icon_navi_03.gif\"></a></th>\n");
        		sbPagination.append("<th><a href=\"javascript:fn_searchPage('"+totalPage+"');\"><img src=\"../images/icon_navi_04.gif\"></a></th>\n");
        	}
        }
		
		sbPagination.append("</tr>");
		sbPagination.append("</table>");
        
		return sbPagination;
	}
	
	
	public StringBuilder renderHtmlOutForBootstrap() {
		sbPagination = new StringBuilder();
		
		sbPagination.append("<ul class=\"pagination\">");
		
		int tmpNum = ((pageIndex - 1) / pageBlockSize) * pageBlockSize + 1;
		
		if( tmpNum == 1){
			sbPagination.append("<li class=\"disabled\"><a href=\"#\">&laquo;</a></li>");
		}else{
			sbPagination.append("<li><a href=\"javascript:fn_searchPage('"+(tmpNum-pageBlockSize)+"');\">&laquo;</a></li>");
			/*sbPagination.append("<th><a href=\"javascript:fn_searchPage('1');\"><img src=\"../images/icon_navi_01.gif\"></a></th>\n");
			sbPagination.append("<th><a href=\"javascript:fn_searchPage('"+(tmpNum-pageBlockSize)+"');\"><img src=\"../images/icon_navi_02.gif\"></a></th>\n");*/
		}
		
		
		for(int i=1; i <= pageBlockSize; i++){
			if( tmpNum == pageIndex){
				sbPagination.append("<li class=\"active\"><a href=\"#\">"+tmpNum+"</a></li>");
				
			}else{
				sbPagination.append("<li><a href=\"javascript:fn_searchPage('"+tmpNum+"');\">"+tmpNum+"</a></li>");
				
			}
			
			tmpNum += 1;
			
			if(tmpNum > totalPage) break;
		}
		
		if( pageIndex <= totalPage){
        	if( tmpNum > totalPage){
        		sbPagination.append("<li><a href=\"#\">&raquo;</a></li>");
        		
        	}else{
        		sbPagination.append("<li><a href=\"javascript:fn_searchPage('"+tmpNum+"');\">&raquo;</a></li>");
        	}
        }
		
		sbPagination.append("</ul>");
        
		return sbPagination;
	}
	
	/**
	 * 
	 */
	public void caluratePage(){
		
        totalPage    = (int) Math.ceil((double)totalCount / (double)pageSize);
        
        if( pageIndex > totalPage){
        	pageIndex = totalPage;
        }
        
        if(this.totalCount < 1){
        	pageIndex=1;
        }
        
	}
    
	/**
	 * 
	 * @param args
	 */
	public static void main(String[] args){
		PaginationUtils page = new PaginationUtils();
		page.setPageIndex(5);
		page.setPageSize(10);
		page.setPageBlockSize(10);
		
		page.setTotalCount(47);
		page.caluratePage();
		
		System.out.println("TOTAL PAGE : " + page.getTotalPage());
		System.out.println("page size : " + page.getPageSize());
		System.out.println("page index : " + page.getPageIndex());
		
		int startNum = 0;
		
		
		
		if( page.getPageIndex() == 1){
			startNum = page.getTotalCount();
			
		}else{
			startNum = page.getTotalCount() - ((page.getPageIndex() - 1) * page.getPageSize());
		}
		
		
		
		System.out.println("total : " + startNum);
		
		
		
		
		
	}

}
