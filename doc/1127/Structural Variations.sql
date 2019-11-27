/* 
SELECT GSV.SV_EXAM_RSLT_ID         -- �������̰˻���ID
     , GSV.RESCH_PAT_ID            -- ����ȯ��ID
     , GSV.GENE_EXAM_SPCN_ID       -- �����ڰ˻��üID
     , GSV.EXAM_NO                 -- �˻��ȣ
     , GSV.GENE_EXAM_MTH_NM        -- �����ڰ˻�����
     , GSV.GENE_NM1                -- �����ڸ�1
     , GSV.GENE_NM2                -- �����ڸ�2
     , GSV.GENE_NM3                -- �����ڸ�3
     , GSV.CHRM_NO1                -- ����ü��ȣ1
     , GSV.CHRM_NO2                -- ����ü��ȣ2
     , GSV.CHRM_NO3                -- ����ü��ȣ3
     , GSV.CHRM_SGMN_END_LOC_VAL1  -- ����ü����������ġ��1
     , GSV.CHRM_SGMN_ST_LOC_VAL2   -- ����ü����������ġ��2
     , GSV.CHRM_SGMN_END_LOC_VAL2  -- ����ü����������ġ��2
     , GSV.CHRM_SGMN_ST_LOC_VAL3   -- ����ü����������ġ��3
     , GSV.DNA_STRND_VAL1          -- DNA���ڰ�1
     , GSV.DNA_STRND_VAL2          -- DNA���ڰ�2
     , GSV.DNA_STRND_VAL3          -- DNA���ڰ�3
     , GSV.GENE_VARI_READ_CNT_VAL  -- �����ں��̸������
     , GSV.GENE_VARI_EVDN_SQNC_VAL -- �����ں������ſ��⼭����
     , GSV.CYTB_NM1                -- CYTOBAND��1
     , GSV.CYTB_NM2                -- CYTOBAND��2
     , GSV.CYTB_NM3                -- CYTOBAND��3
     , GSV.GENE_READ_RSLT_VAL      -- �������ǵ������
     , GSV.GENE_VARI_RPRS_VAL      -- �����ں���ǥ����
  FROM PMGERSVEM GSV
;
*/



/* Structural Variations */
SELECT GSV.SV_EXAM_RSLT_ID            -- �������̰˻���ID (ȭ��ǥ��X)
     , GSV.GENE_NM1                   -- Gene1 (Annotation OncoKB ���)
     , GSV.GENE_NM2                   -- Gene2 (Annotation OncoKB ���)
     , GSV.GENE_EXAM_MTH_NM           -- Methods
     , GSV.CYTB_NM1                   -- Cytoband1
     , GSV.CYTB_NM2                   -- Cytoband2
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERSVEM WHERE GENE_NM1 = GSV.GENE_NM1) / PAT.PAT_CNT * 100, 1) AS COHORT_1   -- Cohort1 (������)
     , ROUND((SELECT COUNT(*) FROM pmsdev.PMGERSVEM WHERE GENE_NM2 = GSV.GENE_NM2) / PAT.PAT_CNT * 100, 1) AS COHORT_2   -- Cohort2 (������)
     , NULL                           -- ���� (Annotation OncoKB ���)
  FROM pmsdev.PMGERSVEM GSV
     , ( SELECT COUNT(*) AS PAT_CNT   -- ��üȯ�ڼ�
           FROM ( SELECT RESCH_PAT_ID FROM pmsdev.PMGERMUEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERCVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERSVEM
                   UNION
                  SELECT RESCH_PAT_ID FROM pmsdev.PMGERGNEX ) PAT_ALL
       ) PAT
 WHERE GSV.RESCH_PAT_ID = '57142645'  -- ����ȯ��ID (��ȸ����)
;