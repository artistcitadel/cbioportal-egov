/* 
SELECT GMU.MTTN_EXAM_RSLT_ID      -- 돌연변이검사결과ID
     , GMU.RESCH_PAT_ID           -- 연구환자ID
     , GMU.GENE_EXAM_SPCN_ID      -- 유전자검사검체ID
     , GMU.EXAM_NO                -- 검사번호
     , GMU.GENE_EXAM_MTH_NM       -- 유전자검사방법명
     , GMU.CHRM_NO                -- 염색체번호
     , GMU.GENE_NM                -- 유전자명
     , GMU.GENE_VARI_ST_LOC_VAL   -- 유전자변이시작위치값
     , GMU.GENE_VARI_END_LOC_VAL  -- 유전자변이종료위치값
     , GMU.DNA_STRND_VAL          -- DNA가닥값
     , GMU.GENE_VARI_CLSF_NM      -- 유전자변이분류명
     , GMU.GENE_VARI_TYP_NO       -- 유전자변이유형번호
     , GMU.REF_ALLELE_SQNC_VAL    -- 참조대립유전자염기서열값
     , GMU.VARI_ALLELE_SQNC_VAL   -- 변이대립유전자염기서열값
     , GMU.MTTN_STAT_NO           -- 돌연변이상태번호
     , GMU.HGVSC_VAL              -- HGVSC값
     , GMU.HGVSP_VAL              -- HGVSP값
     , GMU.TOT_ALLELE_READ_CNT    -- 총대립유전자리드수
     , GMU.REF_ALLELE_READ_CNT    -- 참조대립유전자리드수
     , GMU.VARI_ALLELE_READ_CNT   -- 변이대립유전자리드수
     , GMU.VARI_ALLELE_READ_RT    -- 변이대립유전자리드비율
     , GMU.EXON_LOC_VAL           -- 엑손위치값
     , GMU.INTRN_LOC_VAL          -- 인트론위치값
     , GMU.TRSC_ID                -- 전사체ID
  FROM PMGERMUEM GMU
;
*/


/* MUTATIONS */
SELECT GMU.MTTN_EXAM_RSLT_ID         -- 돌연변이검사결과ID (화면표시X)
     , GMU.GENE_NM                   -- Gene (Annotation OncoKB 사용)
     , GMU.GENE_EXAM_MTH_NM          -- Methods
     , UPPER(GMU.HGVSP_VAL) AS HGVSP -- Protein Change (Annotation OncoKB 사용)
     , GMU.CHRM_NO                   -- Chromosome
     , GMU.GENE_VARI_ST_LOC_VAL      -- Start Pos
     , GMU.GENE_VARI_END_LOC_VAL     -- End Pos
     , GMU.REF_ALLELE_SQNC_VAL       -- Ref
     , GMU.VARI_ALLELE_SQNC_VAL      -- Var
     , MST.MTTN_STAT_NM              -- MS
     , GMU.GENE_VARI_CLSF_NM         -- Mutation Type
     , GMU.VARI_ALLELE_READ_RT       -- Allele Freq
     , GMU.TOT_ALLELE_READ_CNT       -- 총대립유전자리드수 (화면표시X Allele Freq 마우스 오버 사용)
     , GMU.VARI_ALLELE_READ_CNT      -- Variant Reads
     , GMU.REF_ALLELE_READ_CNT       -- Ref Reads
     , CASE WHEN GCV.GENE_NM IS NULL THEN 'Diploid' ELSE 'Amplification' END AS COPY   -- Copy #
     , ROUND((SELECT COUNT(DISTINCT RESCH_PAT_ID) FROM pmsdev.PMGERMUEM WHERE GENE_NM = GMU.GENE_NM) / PAT.PAT_CNT * 100, 1) AS COHORT_1   -- Cohort (밝은색)
     , ROUND((SELECT COUNT(DISTINCT RESCH_PAT_ID) FROM pmsdev.PMGERMUEM WHERE GENE_NM = GMU.GENE_NM AND HGVSP_VAL = GMU.HGVSP_VAL) / PAT.PAT_CNT * 100, 1) AS COHORT_2   -- Cohort (진한색)
     , SUM(MCS.GENE_VARI_OCCUR_CNT)  -- COSMIC
     , NULL                          -- 암종 (화면표시X Annotation OncoKB 사용)
  FROM pmsdev.PMGERMUEM GMU
  LEFT OUTER JOIN pmsdev.PMGERMUCS MCS
    ON GMU.MTTN_EXAM_RSLT_ID = MCS.MTTN_EXAM_RSLT_ID
  LEFT OUTER JOIN pmsdev.PMGEMMUST MST
    ON GMU.MTTN_STAT_NO = MST.MTTN_STAT_NO
  LEFT OUTER JOIN pmsdev.PMGERCVEM GCV
    ON GMU.RESCH_PAT_ID = GCV.RESCH_PAT_ID
   AND GMU.GENE_NM      = GCV.GENE_NM
     , ( SELECT COUNT(*) AS PAT_CNT   -- 전체환자수
           FROM ( SELECT RESCH_PAT_ID FROM pmsdev.PMGERMUEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERCVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERSVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERGNEX ) PAT_ALL
       ) PAT
 WHERE GMU.RESCH_PAT_ID = '10510117' -- 연구환자ID (조회조건)
 GROUP BY
       GMU.GENE_NM
     , GMU.GENE_EXAM_MTH_NM
     , GMU.HGVSP_VAL
     , GMU.CHRM_NO
     , GMU.GENE_VARI_ST_LOC_VAL
     , GMU.GENE_VARI_END_LOC_VAL
     , GMU.REF_ALLELE_SQNC_VAL
     , GMU.VARI_ALLELE_SQNC_VAL
     , MST.MTTN_STAT_NM
     , GMU.GENE_VARI_CLSF_NM
     , GMU.VARI_ALLELE_READ_RT
     , GMU.VARI_ALLELE_READ_CNT
     , GMU.REF_ALLELE_READ_CNT
     , GCV.GENE_NM
;



/* MUTATIONS - COSMIC */
SELECT MCS.CSMC_ID                 -- COSMIC ID
     , MCS.HGVSP_VAL               -- Protein Change
     , MCS.GENE_VARI_OCCUR_CNT     -- Occurrence
  FROM pmsdev.PMGERMUCS MCS
 WHERE MCS.MTTN_EXAM_RSLT_ID = 'SNM0000039124'      -- 돌연변이검사결과ID (조회조건)
;

/* COSMIC 정보 */
http://cancer.sanger.ac.uk/cosmic/mutation/overview?id=COSMIC ID
