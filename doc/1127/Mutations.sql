/* 
SELECT GMU.MTTN_EXAM_RSLT_ID      -- �������̰˻���ID
     , GMU.RESCH_PAT_ID           -- ����ȯ��ID
     , GMU.GENE_EXAM_SPCN_ID      -- �����ڰ˻��üID
     , GMU.EXAM_NO                -- �˻��ȣ
     , GMU.GENE_EXAM_MTH_NM       -- �����ڰ˻�����
     , GMU.CHRM_NO                -- ����ü��ȣ
     , GMU.GENE_NM                -- �����ڸ�
     , GMU.GENE_VARI_ST_LOC_VAL   -- �����ں��̽�����ġ��
     , GMU.GENE_VARI_END_LOC_VAL  -- �����ں���������ġ��
     , GMU.DNA_STRND_VAL          -- DNA���ڰ�
     , GMU.GENE_VARI_CLSF_NM      -- �����ں��̺з���
     , GMU.GENE_VARI_TYP_NO       -- �����ں���������ȣ
     , GMU.REF_ALLELE_SQNC_VAL    -- �����븳�����ڿ��⼭����
     , GMU.VARI_ALLELE_SQNC_VAL   -- ���̴븳�����ڿ��⼭����
     , GMU.MTTN_STAT_NO           -- �������̻��¹�ȣ
     , GMU.HGVSC_VAL              -- HGVSC��
     , GMU.HGVSP_VAL              -- HGVSP��
     , GMU.TOT_ALLELE_READ_CNT    -- �Ѵ븳�����ڸ����
     , GMU.REF_ALLELE_READ_CNT    -- �����븳�����ڸ����
     , GMU.VARI_ALLELE_READ_CNT   -- ���̴븳�����ڸ����
     , GMU.VARI_ALLELE_READ_RT    -- ���̴븳�����ڸ������
     , GMU.EXON_LOC_VAL           -- ������ġ��
     , GMU.INTRN_LOC_VAL          -- ��Ʈ����ġ��
     , GMU.TRSC_ID                -- ����üID
  FROM PMGERMUEM GMU
;
*/


/* MUTATIONS */
SELECT GMU.MTTN_EXAM_RSLT_ID         -- �������̰˻���ID (ȭ��ǥ��X)
     , GMU.GENE_NM                   -- Gene (Annotation OncoKB ���)
     , GMU.GENE_EXAM_MTH_NM          -- Methods
     , UPPER(GMU.HGVSP_VAL) AS HGVSP -- Protein Change (Annotation OncoKB ���)
     , GMU.CHRM_NO                   -- Chromosome
     , GMU.GENE_VARI_ST_LOC_VAL      -- Start Pos
     , GMU.GENE_VARI_END_LOC_VAL     -- End Pos
     , GMU.REF_ALLELE_SQNC_VAL       -- Ref
     , GMU.VARI_ALLELE_SQNC_VAL      -- Var
     , MST.MTTN_STAT_NM              -- MS
     , GMU.GENE_VARI_CLSF_NM         -- Mutation Type
     , GMU.VARI_ALLELE_READ_RT       -- Allele Freq
     , GMU.TOT_ALLELE_READ_CNT       -- �Ѵ븳�����ڸ���� (ȭ��ǥ��X Allele Freq ���콺 ���� ���)
     , GMU.VARI_ALLELE_READ_CNT      -- Variant Reads
     , GMU.REF_ALLELE_READ_CNT       -- Ref Reads
     , CASE WHEN GCV.GENE_NM IS NULL THEN 'Diploid' ELSE 'Amplification' END AS COPY   -- Copy #
     , ROUND((SELECT COUNT(DISTINCT RESCH_PAT_ID) FROM pmsdev.PMGERMUEM WHERE GENE_NM = GMU.GENE_NM) / PAT.PAT_CNT * 100, 1) AS COHORT_1   -- Cohort (������)
     , ROUND((SELECT COUNT(DISTINCT RESCH_PAT_ID) FROM pmsdev.PMGERMUEM WHERE GENE_NM = GMU.GENE_NM AND HGVSP_VAL = GMU.HGVSP_VAL) / PAT.PAT_CNT * 100, 1) AS COHORT_2   -- Cohort (���ѻ�)
     , SUM(MCS.GENE_VARI_OCCUR_CNT)  -- COSMIC
     , NULL                          -- ���� (ȭ��ǥ��X Annotation OncoKB ���)
  FROM pmsdev.PMGERMUEM GMU
  LEFT OUTER JOIN pmsdev.PMGERMUCS MCS
    ON GMU.MTTN_EXAM_RSLT_ID = MCS.MTTN_EXAM_RSLT_ID
  LEFT OUTER JOIN pmsdev.PMGEMMUST MST
    ON GMU.MTTN_STAT_NO = MST.MTTN_STAT_NO
  LEFT OUTER JOIN pmsdev.PMGERCVEM GCV
    ON GMU.RESCH_PAT_ID = GCV.RESCH_PAT_ID
   AND GMU.GENE_NM      = GCV.GENE_NM
     , ( SELECT COUNT(*) AS PAT_CNT   -- ��üȯ�ڼ�
           FROM ( SELECT RESCH_PAT_ID FROM pmsdev.PMGERMUEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERCVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERSVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERGNEX ) PAT_ALL
       ) PAT
 WHERE GMU.RESCH_PAT_ID = '10510117' -- ����ȯ��ID (��ȸ����)
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
 WHERE MCS.MTTN_EXAM_RSLT_ID = 'SNM0000039124'      -- �������̰˻���ID (��ȸ����)
;

/* COSMIC ���� */
http://cancer.sanger.ac.uk/cosmic/mutation/overview?id=COSMIC ID
