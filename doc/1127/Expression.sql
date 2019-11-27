/* 
SELECT GEX.EXAM_NO                 -- �˻��ȣ
     , GEX.GENE_EXAM_MTH_NM        -- �����ڰ˻�����
     , GEX.GENE_NM                 -- �����ڸ�
     , GEX.RESCH_PAT_ID            -- ����ȯ��ID
     , GEX.GENE_EXAM_SPCN_ID       -- �����ڰ˻��üID
     , GEX.PTEG_GENE_READ_RSLT_VAL -- �����˻��������ǵ������
     , GEX.PTEG_GNEX_VAL           -- �����˻������ڹ�����
     , GEX.NGS_GNEX_VAL            -- NGS�����ڹ�����
     , GEX.GNEX_MSR_VAL            -- �����ڹ���������
  FROM PMGERGNEX GEX
;
*/



/* Expression */
SELECT GEX.GENE_NM                    -- Gene
     , GEX.GENE_EXAM_MTH_NM           -- Methods
     , GEX.PTEG_GENE_READ_RSLT_VAL    -- Expression Result
     , CASE WHEN GEX.GENE_EXAM_MTH_NM = 'NGS' THEN GEX.NGS_GNEX_VAL ELSE GEX.PTEG_GNEX_VAL END AS GNEX  -- Expression Value
     , GEX.GNEX_MSR_VAL               -- Expression Unit
  FROM pmsdev.PMGERGNEX GEX
 WHERE GEX.RESCH_PAT_ID = '10510117'  -- ����ȯ��ID (��ȸ����)
;
