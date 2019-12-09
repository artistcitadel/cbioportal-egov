/* 
SELECT GSV.SV_EXAM_RSLT_ID         -- 구조변이검사결과ID
     , GSV.RESCH_PAT_ID            -- 연구환자ID
     , GSV.GENE_EXAM_SPCN_ID       -- 유전자검사검체ID
     , GSV.EXAM_NO                 -- 검사번호
     , GSV.GENE_EXAM_MTH_NM        -- 유전자검사방법명
     , GSV.GENE_NM1                -- 유전자명1
     , GSV.GENE_NM2                -- 유전자명2
     , GSV.GENE_NM3                -- 유전자명3
     , GSV.CHRM_NO1                -- 염색체번호1
     , GSV.CHRM_NO2                -- 염색체번호2
     , GSV.CHRM_NO3                -- 염색체번호3
     , GSV.CHRM_SGMN_END_LOC_VAL1  -- 염색체분절종료위치값1
     , GSV.CHRM_SGMN_ST_LOC_VAL2   -- 염색체분절시작위치값2
     , GSV.CHRM_SGMN_END_LOC_VAL2  -- 염색체분절종료위치값2
     , GSV.CHRM_SGMN_ST_LOC_VAL3   -- 염색체분절시작위치값3
     , GSV.DNA_STRND_VAL1          -- DNA가닥값1
     , GSV.DNA_STRND_VAL2          -- DNA가닥값2
     , GSV.DNA_STRND_VAL3          -- DNA가닥값3
     , GSV.GENE_VARI_READ_CNT_VAL  -- 유전자변이리드수값
     , GSV.GENE_VARI_EVDN_SQNC_VAL -- 유전자변이증거염기서열값
     , GSV.CYTB_NM1                -- CYTOBAND명1
     , GSV.CYTB_NM2                -- CYTOBAND명2
     , GSV.CYTB_NM3                -- CYTOBAND명3
     , GSV.GENE_READ_RSLT_VAL      -- 유전자판독결과값
     , GSV.GENE_VARI_RPRS_VAL      -- 유전자변이표현값
  FROM PMGERSVEM GSV
;
*/



/* Structural Variations */
SELECT GSV.SV_EXAM_RSLT_ID            -- 구조변이검사결과ID (화면표시X)
     , GSV.GENE_NM1                   -- Gene1 (Annotation OncoKB 사용)
     , GSV.GENE_NM2                   -- Gene2 (Annotation OncoKB 사용)
     , GSV.GENE_EXAM_MTH_NM           -- Methods
     , GSV.CYTB_NM1                   -- Cytoband1
     , GSV.CYTB_NM2                   -- Cytoband2
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERSVEM WHERE GENE_NM1 = GSV.GENE_NM1) / PAT.PAT_CNT * 100, 1) AS COHORT_1   -- Cohort1 (밝은색)
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERSVEM WHERE GENE_NM2 = GSV.GENE_NM2) / PAT.PAT_CNT * 100, 1) AS COHORT_2   -- Cohort2 (밝은색)
     , NULL                           -- 암종 (Annotation OncoKB 사용)
  FROM pmsdev.PMGERSVEM GSV
     , ( SELECT COUNT(*) AS PAT_CNT   -- 전체환자수
           FROM ( SELECT RESCH_PAT_ID FROM pmsdev.PMGERMUEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERCVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERSVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERGNEX ) PAT_ALL
       ) PAT
 WHERE GSV.RESCH_PAT_ID = '57142645'  -- 연구환자ID (조회조건)
;