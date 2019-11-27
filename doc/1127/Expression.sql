/* 
SELECT GEX.EXAM_NO                 -- 검사번호
     , GEX.GENE_EXAM_MTH_NM        -- 유전자검사방법명
     , GEX.GENE_NM                 -- 유전자명
     , GEX.RESCH_PAT_ID            -- 연구환자ID
     , GEX.GENE_EXAM_SPCN_ID       -- 유전자검사검체ID
     , GEX.PTEG_GENE_READ_RSLT_VAL -- 병리검사유전자판독결과값
     , GEX.PTEG_GNEX_VAL           -- 병리검사유전자발현값
     , GEX.NGS_GNEX_VAL            -- NGS유전자발현값
     , GEX.GNEX_MSR_VAL            -- 유전자발현단위값
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
 WHERE GEX.RESCH_PAT_ID = '10510117'  -- 연구환자ID (조회조건)
;
