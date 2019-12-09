/* 
SELECT GCV.CNV_EXAM_RSLT_ID      -- 복제수변이검사결과ID
     , GCV.RESCH_PAT_ID          -- 연구환자ID
     , GCV.GENE_EXAM_SPCN_ID     -- 유전자검사검체ID
     , GCV.EXAM_NO               -- 검사번호
     , GCV.GENE_EXAM_MTH_NM      -- 유전자검사방법명
     , GCV.CHRM_NO               -- 염색체번호
     , GCV.GENE_NM               -- 유전자명
     , GCV.BNLG_RT               -- 이진로그비율
     , GCV.CNV_PRDC_CNT          -- 복제수변이예측건수
     , GCV.CNV_STAT_NM           -- 복제수변이상태명
     , GCV.CHRM_SGMN_ST_LOC_VAL  -- 염색체분절시작위치값
     , GCV.CHRM_SGMN_END_LOC_VAL -- 염색체분절종료위치값
     , GCV.CYTB_NM               -- CYTOBAND명
     , GCV.GENE_READ_RSLT_VAL    -- 유전자판독결과값
     , GCV.GENE_VARI_RPRS_VAL    -- 유전자변이표현값
  FROM PMGERCVEM GCV
;
*/



/* Copy Number Alterations */
SELECT GCV.CNV_EXAM_RSLT_ID           -- 복제수변이검사결과ID (화면표시X)
     , GCV.GENE_NM                    -- Gene (Annotation OncoKB 사용)
     , GCV.GENE_EXAM_MTH_NM           -- Methods
     , UPPER(GCV.CNV_STAT_NM) AS CNA  -- CNA (Annotation OncoKB 사용)
     , GCV.CYTB_NM                    -- Cytoband
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERCVEM WHERE GENE_NM = GCV.GENE_NM) / PAT.PAT_CNT * 100, 1) AS COHORT_1   -- Cohort (밝은색)
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERCVEM WHERE GENE_NM = GCV.GENE_NM AND CNV_STAT_NM = GCV.CNV_STAT_NM) / PAT.PAT_CNT * 100, 1) AS COHORT_2   -- Cohort (진한색)
     , NULL                           -- 암종 (Annotation OncoKB 사용)
  FROM pmsdev.PMGERCVEM GCV
     , ( SELECT COUNT(*) AS PAT_CNT   -- 전체환자수
           FROM ( SELECT RESCH_PAT_ID FROM pmsdev.PMGERMUEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERCVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERSVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERGNEX ) PAT_ALL
       ) PAT
 WHERE GCV.RESCH_PAT_ID = '10510117'  -- 연구환자ID (조회조건)
;
